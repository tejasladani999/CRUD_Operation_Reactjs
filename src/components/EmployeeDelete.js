import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeDelete = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();

  const handleDelete = () => {
    // Send a DELETE request to the API endpoint with the employee ID
    axios
      .delete(`http://localhost:3200/posts/${id}`)
      .then((response) => {
        console.log(response.data);
        alert('Employee is Deleted!');// Redirect back to the home page after successful deletion
        navigate('/');
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  useEffect(() => {
    // Call the handleDelete function when the component mounts
    handleDelete();
  }, []);

  return (
    <div>
      {/* You can add a loading indicator or message here */}
    </div>
  );
};

export default EmployeeDelete;
