import React from 'react'
import useUser from '../../hooks/useUser';
import {HashLoader} from "react-spinners";

const Dashboard = () => {
  const {currentUser, isLoading} = useUser();
  const role = currentUser?.role;

  if(isLoading) {
    return <div className='flex justify-center  items-center h-screen'>
      <HashLoader color="#FF1949" size={50}/>
    </div>
    
  }

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard