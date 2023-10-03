import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams(); // Get the ID from the URL parameter
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    department: '',
    employeeName: '',
    gender: 'Male',
    experience: '',
    deptType: 'Government',
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Fetch the existing employee data using the ID
    axios
      .get(`http://localhost:3200/posts/${id}`) // Replace with your API endpoint
      .then((response) => {
        const employeeData = response.data;
        setFormData({
          department: employeeData.department,
          employeeName: employeeData.employeeName,
          gender: employeeData.gender,
          experience: employeeData.experience,
          deptType: employeeData.deptType,
        });
      })
      .catch((error) => {
        setErrorMessage('Error fetching employee data.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the employee data
    axios
      .put(`http://localhost:3200/posts/${id}`, formData) // Replace with your API endpoint
      .then((response) => {
        setSuccessMessage('Data updated successfully.');
        alert('Employee details successfully updated!')
        navigate("/");
      })
      .catch((error) => {
        alert('Error updating data.');
      });
  };

  return (
    <div className='container'>
      <h2>Edit Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group' >
          <label htmlFor="department">Department:</label>
          <select
            className='form-control'
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="Sales">Sales</option>
            <option value="Purchase">Purchase</option>
            <option value="R&D">R&D</option>
            <option value="Production">Production</option>
            <option value="WareHouse">WareHouse</option>
          </select>
        </div>
        <div className='form-group' >
          <label htmlFor="employeeName">Employee Name:</label>
          <input
            className='form-control'
            type="text"
            id="employeeName"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group' >
          <label className='form-check form-check-inline'>Gender:</label>
            <div className='form-check form-check-inline'>
            <input
            className='form-check-input '
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />
          <label className='form-check-label '>
            Male
          </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
            className='form-check-input'
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />
          <label className='form-check-label'>
            Female
          </label>
          </div>
        </div>
        <div className='form-group' >
          <label htmlFor="experience">Date of Joining:</label>
          <input
            className='form-control'
            type="date"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group' >
          <label htmlFor="deptType">Department Type:</label>
          <select
            className='form-control'
            id="deptType"
            name="deptType"
            value={formData.deptType}
            onChange={handleChange}
            required
          >
            <option value="Government">Government</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div align='center'>
          <button type="submit" className='btn btn-primary col-5'>Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
