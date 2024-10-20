import React from 'react'
import useUser from '../../../hooks/useUser';
import welcomeImg from "../../../assets/dashboard/urban-welcome.svg";
import { Link } from 'react-router-dom';

const StudentCP = () => {
    const {currentUser} = useUser();

  return (
    <div className='h-screen flex justify-center items-center p-2' >
        <div>
            <div>
                <div>
                    <img onContextMenu={e => e.preventDefault()} src={welcomeImg} alt="" className='h-[200px]' placeholder='blur' />
                </div>
                <h1 className='text-4xl capitalize font-bold'> Hi, <span className='text-secondary items-stretch'> {currentUser?.name} </span>
                Welcome to your Dashboard </h1>
                <p className='text-center text-base py-2'>
                    This is the Student dashboard
                </p>

                <div className='text-center'>
                    <h2 className='font-bold'>You jump any page you want from here</h2>
                    <div className='flex items-center justify-center my-4 gap-3 flex-wrap'>
                        <div className='border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1'>
                            <Link to='/dashboard/enrolled-class'> My Enroll </Link>
                        </div>
                        <div className='border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1'>
                            <Link to='/dashboard/my-selected'> My Selected </Link>
                        </div>
                        <div className='border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1'>
                            <Link to='/dashboard/my-payments'> Payment History </Link>
                        </div>
                        {/* <div className='border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1'> */}
                            {/* <Link to='/dashboard/apply-instructor'> Join as a Instructor </Link> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudentCP