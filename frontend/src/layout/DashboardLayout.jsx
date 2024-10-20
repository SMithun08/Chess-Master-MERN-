import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from "react-icons/bi";
import { FaHome, FaUsers } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";
import { BsFillPostcardFill } from 'react-icons/bs';
import { SiGoogleclassroom, SiInstructure } from 'react-icons/si';
import { TbBrandAppleArcade } from 'react-icons/tb';
import { MenuItem } from '@mui/material';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { MdExplore, MdOfflineBolt, MdPayments, MdPendingActions } from 'react-icons/md';
import { GiFigurehead, GiTeacher } from 'react-icons/gi';
import Swal from "sweetalert2";
import Scroll from '../hooks/useScroll';
import { HashLoader } from 'react-spinners';

const adminNavItems = [
    {to: "/dashboard/admin-home", icon: <BiHomeAlt className="text-2x1" />, label: "Dashboard Home"},
    {to: "/dashboard/manage-users", icon: <FaUsers className="text-2x1" />, label: " Manage Users"},
    {to: "/dashboard/manage-class", icon: <BsFillPostcardFill className="text-2x1" />, label: "Manage Class"},
    //{to: "/dashboard/manage-applications", icon: <TbBrandAppleArcade className="text-2x1" />, label: "Applications"}
];

const instructorNavItems = [
    {to: "/dashboard/instructor-cp", icon: <FaHome className="text-2x1" />, label: "Home"},
    {to: "/dashboard/add-class", icon: <MdExplore className="text-2x1" />, label: "Add A Class"},
    {to: "/dashboard/my-classes", icon: <IoSchoolSharp className="text-2x1" />, label: "My-Classes"},
    {to: "/dashboard/my-pending", icon: <MdPendingActions className="text-2x1" />, label: "Pending Classes"},
    {to: "/dashboard/my-approved", icon: <IoMdDoneAll className="text-2x1" />, label: "Approved Classes"},
];

const studentNavItems = [
    {to: "/dashboard/student-cp", icon: <BiHomeAlt className="text-2x1" />, label: "Dashboard"},
    {to: "/dashboard/enrolled-class", icon: <SiGoogleclassroom className="text-2x1" />, label: " My Enrolled"},
    {to: "/dashboard/my-selected", icon: <BiSelectMultiple className="text-2x1" />, label: "My Selected"},
    {to: "/dashboard/my-payments", icon: <MdPayments className="text-2x1" />, label: "Payment History"},
    //{to: "/dashboard/apply-instructor", icon: <SiInstructure className="text-2x1" />, label: "Apply For Instructor"},
];

const lastMenuItems = [
    {to: "/", icon:<BiHomeAlt className='text-2xl'/>, label: "Main Home"},
    {to: "/classes", icon: <SiGoogleclassroom className="text-2x1" />, label: "Classes"},
    {to: "/instructors", icon: <GiTeacher className="text-3x1" />, label: "Instructors"},
]


const DashboardLayout = () => {
    const [open, setOpen] = useState(true);
    const {loader, logout} = useAuth();
    const {currentUser} = useUser();
    const navigate = useNavigate();
    const role = currentUser?.role;

   const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't to logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout me!"
          }).then((result) => {
            if (result.isConfirmed) {
                logout().then( Swal.fire({
                    title: "Logged Out!",
                    text: "Your were logged out.",
                    icon: "success",
                    
                  })).catch((error) => console.log(error));
              }
              navigate("/"); 
          });
      };

   // const role = "admin";

   if(loader) {
    return <div className='flex justify-center  items-center h-screen'>
      <HashLoader color="#FF1949" size={50}/>
    </div>
    }

  return (
    <div className='flex'>
        <div className={`${open ? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"} bg-white h-screen p-5 md:block hidden pt-8 relative 
        duration-300`}>
            <div className='flex gap-x-4 items-center'>
                <img onClick={() => setOpen(!open)} src="/ogo.png" alt="" className={`cursor-pointer h-[40px] duration-500 ${open && "rotate-[360deg]"}`}/>
                <Link to="/"><h1 onClick={() => setOpen(!open)} className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${!open && "scale-0"}`} >
                Chess Master</h1></Link>
            </div>
            {/* NavLinks */}
            {/* admin roles */}
            {role === "admin" && <ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small> MENU </small></p>
                    {
                        role === "admin" && adminNavItems.map((menuItem, index) => (
                            <li key={index} className="mb-2">
                                <NavLink to={menuItem.to}
                                className ={({ isActive }) => 
                                        `flex ${isActive ? "bg-red-500 text-white": "text-[#413F44]"
                                        } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm
                                        items-center gap-x-4`
                                }>{menuItem.icon}
                            <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                </NavLink>
                            </li>
                        ))}
                </ul>
            }

            {/* instructor roles */}
            {role === "instructor" && <ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small> MENU </small></p>
                    {
                        role === "instructor" && instructorNavItems.map((menuItem, index) => (
                            <li key={index} className="mb-2">
                                <NavLink to={menuItem.to}
                                className ={({ isActive }) => 
                                        `flex ${isActive ? "bg-red-500 text-white": "text-[#413F44]"
                                        } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm
                                        items-center gap-x-4`
                                }>{menuItem.icon}
                            <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                </NavLink>
                            </li>
                        ))}
                </ul>
            }

            {/* student roles */}
            {role === "user" && <ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small> MENU </small></p>
                    {
                        role === "user" && studentNavItems.map((menuItem, index) => (
                            <li key={index} className="mb-2">
                                <NavLink to={menuItem.to}
                                className ={({ isActive }) => 
                                        `flex ${isActive ? "bg-red-500 text-white": "text-[#413F44]"
                                        } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm
                                        items-center gap-x-4`
                                }>{menuItem.icon}
                            <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                </NavLink>
                            </li>
                        ))}
                </ul>
            }

            <ul className='pt-6'>
                <p className={`ml-3 text-gray-500 ${!open && "hidden"} uppercase mb-3`}><small> UsefulLinks </small></p>
                {
                    lastMenuItems.map((menuItem, index) => (
                            <li key={index} className="mb-2">
                                <NavLink to={menuItem.to}
                                className ={({ isActive }) => 
                                        `flex ${isActive ? "bg-red-500 text-white": "text-[#413F44]"
                                        } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm
                                        items-center gap-x-4`
                                }>{menuItem.icon}
                            <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                </NavLink>
                            </li>
                ))}
                <NavLink
                    onClick={() => handleLogOut()}
                    className={({ isActive }) =>
                            `flex duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm
                            items-center gap-x-4`
                   }
                >
                    <BiLogInCircle className='text-2xl' />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>LogOut</span>
                </NavLink>
            </ul>
        </div>
        
        <div className='h-screen overflow-y-auto px-8 flex-1'>
            <Scroll/>
            <Outlet />
        </div>
    </div>
  )
}

export default DashboardLayout