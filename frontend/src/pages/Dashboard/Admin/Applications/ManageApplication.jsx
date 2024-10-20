import React, { useState, useEffect } from 'react';
import useAxiosFetch from '../../../../hooks/useAxiosFetch';
import Swal from 'sweetalert2';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    axiosFetch.get('/all-instructor-applications')
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching applications:', err);
        setLoading(false);
      });
  }, []);

  const handleApprove = (id) => {
    axiosFetch.patch(`/approve-instructor/${id}`)
      .then(() => {
        Swal.fire('Approved!', 'Application has been approved.', 'success');
        setApplications(applications.filter(app => app._id !== id));
      })
      .catch((err) => {
        console.error('Error approving application:', err);
      });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: 'Reject Application',
      input: 'text',
      inputLabel: 'Reason for rejection',
      showCancelButton: true,
      confirmButtonText: 'Reject',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        axiosFetch.patch(`/reject-instructor/${id}`, { reason: result.value })
          .then(() => {
            Swal.fire('Rejected!', 'Application has been rejected.', 'success');
            setApplications(applications.filter(app => app._id !== id));
          })
          .catch((err) => {
            console.error('Error rejecting application:', err);
          });
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Manage Applications</h1>
      <ul>
        {applications.map(app => (
          <li key={app._id}>
            <p>{app.name} ({app.email}) - {app.experience}</p>
            <button onClick={() => handleApprove(app._id)} className="bg-green-500">Approve</button>
            <button onClick={() => handleReject(app._id)} className="bg-red-500">Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageApplications;
