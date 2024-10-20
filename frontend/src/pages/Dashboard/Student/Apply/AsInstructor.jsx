import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiBriefcase, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useUser from '../../../../hooks/useUser';
import useAxiosFetch from '../../../../hooks/useAxiosFetch';
import { ScaleLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const AsInstructor = () => {
  const { currentUser } = useUser();
  const [submittedData, setSubmittedData] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();

  const onSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const experience = e.target.experience.value;

    const data = { name, email, experience };

    axiosFetch.post('/as-instructor', data)
      .then((res) => {
        console.log(res.data);
        Swal.fire('Success', 'Your application has been submitted!', 'success');
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        Swal.fire('Error', error.response?.data?.message || 'Error submitting the form', 'error');
      });
  };

  useEffect(() => {
    if (currentUser?.email) {
      axiosFetch.get(`/applied-instructors/${currentUser.email}`)
        .then((res) => {
          setSubmittedData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [currentUser?.email]);

  if (loading) {
    return <div className='h-full w-full flex justify-center items-center'><ScaleLoader color="#FF1949" /></div>;
  }

  return (
    <AnimatePresence>
      {!submittedData?.name && (
        <form onSubmit={onSubmit}>
          {/* Form inputs for Name, Email, Experience */}
          <button type="submit" className="bg-secondary text-white px-4 py-2 rounded-md">Submit</button>
        </form>
      )}

      {submittedData?.name && (
        <div>Your application is submitted. Now wait for admin approval.</div>
      )}
    </AnimatePresence>
  );
};

export default AsInstructor;
