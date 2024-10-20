import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../../../hooks/useUser';
import { toast, ToastContainer } from 'react-toastify';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';


import 'react-toastify/dist/ReactToastify.css';  // Import the CSS file


const CheckoutPayment = ({ price, cartItm }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useUser();
    const [clientSecret, setClientSecret] = useState('');
    const [message, setMessage] = useState('');
    const [succeeded, setSucceeded] = useState(false);
    const [cart, setCart] = useState([]);

    const navigate = useNavigate(); // Use navigate for redirect

    // Ensure price is valid
    if (price < 0 || !price) {
        return <Navigate to="/dashboard/my-selected" replace />;
    }

    useEffect(() => {
        // Fetch cart items
        axiosSecure.get(`/cart/${currentUser?.email}`)
            .then((res) => {
                const classesId = res.data.map(item => item._id);
                setCart(classesId);
            })
            .catch((err) => {
                console.error('Error fetching cart items:', err);
                setMessage('Failed to fetch cart items');
            });
    }, [currentUser, axiosSecure]);

    useEffect(() => {
        // Create payment intent
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret);
                //console.log('Client secret:', res.data.clientSecret);
            })
            .catch(err => {
                console.error('Error creating payment intent:', err);
                setMessage('Failed to create payment intent');
            });
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || !clientSecret) {
            setMessage('Stripe or clientSecret is not initialized.');
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            setMessage('Card information is incomplete');
            return;
        }

        // Create payment method
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentMethodError) {
            setMessage(`Payment method error: ${paymentMethodError.message}`);
            return;
        }

        // Confirm card payment
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card,
                    billing_details: {
                        name: currentUser.name || 'Unknown',
                        email: currentUser.email || 'Anonymous',
                    },
                },
            }
        );

        if (confirmError) {
            setMessage(`Confirmation error: ${confirmError.message}`);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            // Payment successful
            const transactionId = paymentIntent.id;
            const amount = paymentIntent.amount / 100;
            const data = {
                transactionId,
                amount,
                userEmail: currentUser.email, // Use consistent naming
                classesId: cartItm ? [cartItm] : cart, // Ensure this reflects what you're using
                date: new Date(),
            };
        
            // Redirect to success page and handle API call with toast notifications
            setMessage('');
            setSucceeded('Payment Success');
            return toast.promise(
                axiosSecure.post('/payment-info', data)
                    .then(res => {
                        console.log(res.data); // Handle successful response
                    })
                    .catch(error => {
                        console.error('Error saving payment info:', error); // Log error in case of failure
                    })
            );
        } else {
            // Payment failed
            setMessage('Payment failed, please try again.');
        }
        
    };

    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold">
                Payment Amount: <span className="text-secondary">${price}</span>
            </h1>
            <form onSubmit={handleSubmit} className="stripe-custom-class">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: { color: '#9e2146' },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                {message && <p className="text-red-500">{message}</p>}
                {succeeded && <p className="text-green-500">Payment successful!</p>}
            </form>
        </div>
    );
};

export default CheckoutPayment;
