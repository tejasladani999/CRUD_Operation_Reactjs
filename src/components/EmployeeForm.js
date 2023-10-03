import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    department: '',
    employeeName: '',
    gender: 'Male', // Default value
    experience: '',
    deptType: 'Government', // Default value
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation here if needed

        // Generate a unique ID for each entry (You can use a library like 'uuid' for this)
        const uniqueId = uuidv4();

        // Create a new employee object with the unique ID
        // const newEmployee = {id: uniqueId, ...formData };

    // Send data to a JSON file (or API endpoint)
    axios
      .post('http://localhost:3200/posts', formData) // Replace with your API endpoint or JSON file
      .then((response) => {
        console.log(response.data)

        alert("Employee Data sucessfully inserted!")
        // Clear the form
        setFormData({
          department: '',
          employeeName: '',
          gender: 'Male',
          experience: '',
          deptType: 'Government',
        });
        navigate("/");
      })
      .catch((error) => {
        alert('Error saving data.');
      });
  };

  return (
    <div className='container'>
      <h2>Insert Employee Details</h2>
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
          <button type="submit" className='btn btn-primary col-5'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
