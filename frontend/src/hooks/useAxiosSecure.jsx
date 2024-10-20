import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../utilities/providers/AuthProvider'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const useAxiosSecure = () => {
    const { logout } = useContext(AuthContext);
    const navigate  = useNavigate();
    

    const axiosSecure = axios.create({
      baseURL: 'http://localhost:5000'
    });


    // Add request interceptor to include the token
    /*axiosSecure.interceptors.request.use(config => {
        if (currentUser && currentUser.token) {
            config.headers.Authorization = `Bearer ${currentUser.token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });*/

        
    useEffect(() => {
          // Add a request interceptor
          const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if(token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
          })

          // Add response interceptor
          const responseInterceptor = axiosSecure.interceptors.response.use((response) => response, async(error) => {
              if(error.response && (error.response.status === 401 || error.response.status === 403)){
                  await logout();
                  navigate('/login');
                  throw error;
              }

              throw error;
          })

          return () => {
              axiosSecure.interceptors.request.eject(requestInterceptor);
              axiosSecure.interceptors.response.eject(responseInterceptor);
          }

    }, [logout, navigate, axiosSecure]);

    return axiosSecure;
}

export default useAxiosSecure;