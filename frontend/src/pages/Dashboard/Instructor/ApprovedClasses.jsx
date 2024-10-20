import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUser from '../../../hooks/useUser';
import { Fade, Slide } from 'react-awesome-reveal';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ApprovedClasses = () => {
    const [classes, setClasses] = useState([]);
    const { currentUser, isLoading } = useUser();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/classes/${currentUser?.email}`)
            .then(res => setClasses(res.data))
            .catch(err => console.log('Error fetching classes:', err));
    }, [isLoading, currentUser?.email]);

    const approvedClasses = classes.filter(cls => cls.status === 'approved');

    return (
        <div>
            <div className="my-9">
                <h1 className='text-4xl font-bold text-center'>
                    Approved <span className='text-secondary'>Classes</span>
                </h1>
                <div className="text-center">
                    <Fade duration={100} className='text-[12px] text-center' cascade>
                        Here you can see the classes that have been approved.
                    </Fade>
                </div>
                <div className="">
                    {approvedClasses.length === 0 ? (
                        <div className='text-center text-2xl font-bold mt-10'>
                            No Approved Classes
                        </div>
                    ) : (
                        <div className="mt-9">
                            {approvedClasses.map((cls, index) => (
                                <Slide
                                    duration={1000}
                                    key={index}
                                    className='mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg'
                                >
                                    <div className="bg-white flex rounded-lg gap-8 shadow p-4">
                                        <div className="">
                                            <img
                                                className='max-h-[200px] max-w-[300px]'
                                                src={cls.image}
                                                alt=""
                                            />
                                        </div>
                                        <div className="w-full">
                                            <h1 className='text-[21px] font-bold text-secondary border-b pb-2 mb-2'>
                                                {cls.name}
                                            </h1>
                                            <div className="flex gap-5">
                                                <div className="">
                                                    <h1 className='font-bold mb-3'>Some Info:</h1>
                                                    <h1 className='text-secondary my-2'>
                                                        <span className='text-black'>Total Student</span>: {cls.totalEnrolled ? cls.totalEnrolled : 0}
                                                    </h1>
                                                    <h1 className='text-secondary'>
                                                        <span className='text-black'>Total Seats</span>: {cls.availableSeats}
                                                    </h1>
                                                    <h1 className='text-secondary my-2'>
                                                        <span className='text-black'>Status</span>: <span className={`font-bold text-green-500`}>{cls.status}</span>
                                                    </h1>
                                                </div>
                                                <div className="">
                                                    <h1 className='font-bold mb-3'>.....</h1>
                                                    <h1 className='text-secondary my-2'>
                                                        <span className='text-black'>Price</span>: {cls.price} <span className='text-black'>$</span>
                                                    </h1>
                                                    <h1 className='text-secondary my-2'>
                                                        <span className='text-black'>Submitted</span>: <span className=''>{cls.submitted ? moment(cls.submitted).format('MMMM Do YYYY') : 'Not Get Data'}</span>
                                                    </h1>
                                                </div>
                                                <div className="w-1/3">
                                                    <h1 className='font-bold mb-3'>Action:</h1>
                                                    
                                                    <button
                                                        className='px-3 bg-secondary font-bold py-1 text-white w-full rounded-lg'
                                                        onClick={() => navigate(`/dashboard/update/${cls._id}`)}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Slide>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApprovedClasses;
