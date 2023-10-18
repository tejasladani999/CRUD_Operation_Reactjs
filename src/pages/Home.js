import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import moment from "moment";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

const Home = () => {
  const [data, setData] = useState([]);

 const getData = () => { 
    axios
    .get('http://localhost:3200/posts')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }; 

  useEffect(() => {
    getData();
}, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3200/posts/${id}`)
      .then((response) => {
        console.log(response.data);
        alert('Employee is Deleted!');
        getData();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  useEffect(() => {
    const initializeDataTables = setTimeout(() => {
      $('#Table').DataTable();
    }, 500); 
  
    return () => clearTimeout(initializeDataTables);
  }, [data]);

  return (
    <div style={{alignItems:"center"}}>
      <h1 align="center" style={{margin:20}}>Employee Management</h1>
      <table id='Table' className='table table-striped'>
        <thead>
          <tr>
            <th>Department</th>
            <th>Employee Name</th>
            <th>Gender</th>
            <th>Experience</th>
            <th>Department Type</th>
            <th>Action   
              <Link to="/EmployeeForm"> 
              <button className='btn btn-outline-primary mx-4'>Add Employee</button>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee, index) => (
            <tr className={employee.deptType === 'Government' ? 'text-danger' : 'text-success' } key={index}>
              <td>{employee.department}</td>
              <td>{employee.employeeName}</td>
              <td>{employee.gender}</td>
              <td>{moment(employee.experience).fromNow(true)}</td>
              <td>{employee.deptType}</td>
              <td>
                <Link to={`/EditEmployee/${employee.id}`}>
                <button className='btn btn-outline-warning mx-5'>Edit</button>
                </Link>
                <button className='btn btn-outline-danger' onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home