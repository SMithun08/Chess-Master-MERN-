import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { Transition } from '@headlessui/react';
import  useUser  from '../../hooks/useUser';
import  { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
const Classes = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const { currentUser } = useUser();
    const role = currentUser?.role;
    const [enrolledClasses, setEnrolledClasses] = useState([]);

    const handleHover = (index) => {
        setHoveredCard(index);
    };

    const [classes, setClasses] = useState([]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosFetch.get('/classes')
            .then(res => setClasses(res.data))
            .catch(err => console.log(err))
    }, [])

    const handelSelect = (id) => {
        axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
            .then(res => setEnrolledClasses(res.data))
            .catch(err => console.log(err))
        if (!currentUser) {
            return toast.error('Please Login First');
        }
        axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
        .then(res => {
            // Check if the class has already been selected
            if (res.data.classId === id) {
                return toast.error('Already Selected');
            }
            
            // Check if the class is already enrolled
            if (enrolledClasses.find(item => item.classes._id === id)) {
                return toast.error('Already Enrolled');
            }
    
            // If neither condition is met, proceed to add to cart
            const data = {
                classId: id,
                userMail: currentUser.email,
                date: new Date()
            };
    
            // Use toast.promise to handle the add-to-cart process
            return toast.promise(
                axiosSecure.post('/add-to-cart', data)
                    .then(res => {
                        console.log(res.data);
                    }),
                {
                    pending: 'Selecting...',
                    success: 'Selected Successfully',
                    error: {
                        render({ data }) {
                            return `Error: ${data.message}`;
                        }
                    }
                }
            );
        })
        .catch(error => {
            // Handle any errors that occur during the axios.get request
            toast.error(`Error: ${error.message}`);
        });
    

    }
    // Filter classes to only show those with status "approved"
    const approvedClasses = classes.filter(classes => classes.status === 'approved');

    return (
        <div>

            <div className="mt-20 pt-3">
                <h1 className="text-4xl font-bold text-center text-dark-primary">Classes</h1>
            </div>


            <div className="my-16 w-[90%] gap-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto">
                {classes.map((cls, index) => (
                    <div
                        key={index}
                        className={`relative hover:-translate-y-2  duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-[350px] mx-auto ${cls.availableSeats < 1 ? 'bg-red-300' : 'bg-white'} dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
                        onMouseEnter={() => handleHover(index)}
                        onMouseLeave={() => handleHover(null)}
                    >
                        <div className="relative h-48">
                            <div
                                className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-60' : ''
                                    }`}
                            />
                            <img
                                src={cls.image}
                                alt="Course Image"
                                className="object-cover w-full h-full"
                            />
                            <Transition
                                show={hoveredCard === index}
                                enter="transition-opacity duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute inset-0 flex items-center justify-center">

                                    <button onClick={() => handelSelect(cls._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin Can not be able to select ' ? cls.availableSeats <1 : 'No seat avalible' : 'You can select this classes' } disabled={role === 'admin' || role === 'instructor' || cls.availableSeats < 1} className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">
                                        Select
                                    </button>

                                </div>
                            </Transition>
                        </div>
                        <div className="px-6 py-2">
                            <h3 className={`${cls.name.length > 25 ? 'text-[14px]' : 'text-[16px]'}  font-bold`}>{cls.name}</h3>
                            <p className="text-gray-500 text-xs">Instructor : {cls.instructorName}</p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-gray-600 text-xs">Available Seats: <span className='text-secondary'>{cls.availableSeats}</span> </span>
                                <span className="text-green-500 font-semibold">${cls.price}</span>
                            </div>
                            
                            <Link to={`/class/${cls._id}`}><button className="px-4 py-2 mt-4 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">
                                        View
                                    </button></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;
