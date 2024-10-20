import React from 'react';
import  useUser  from '../../hooks/useUser';
import { Navigate} from 'react-router-dom';

const StudentRoute = ({ children }) => {
    const { currentUser } = useUser();
   
    if (!currentUser ||  currentUser.role !== 'user') {
        return <Navigate to="/dashboard" />
    }


    return children;
};

export default StudentRoute;