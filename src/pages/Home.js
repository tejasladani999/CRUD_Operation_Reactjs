import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import moment from "moment";


const Home = () => {
  const [data, setData] = useState([]);

  getData( () => { 
  useEffect(() => {
    axios.get('http://localhost:3200/posts')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); 
})

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

  return (
    <div  align="center" className='center-table'>
      <h1 style={{margin:20}}>Employee Management</h1>
      <table id='Table' className='table table-striped table-bordered table-hover' align='center' style={{width:"80%"}}>
        <thead>
          <tr>
            <th>Department</th>
            <th>Employee Name</th>
            <th>Gender</th>
            <th>Experience</th>
            <th>Department Type</th>
            <th colSpan={2}>Action   
              <Link to="/EmployeeForm"> 
              <button className='btn btn-outline-primary' style={{marginLeft:"5px"}}>Add Employee</button>
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
                {/* Add action buttons or links here */}
                <Link to={`/EditEmployee/${employee.id}`}>
                <button className='btn btn-outline-warning' style={{marginRight:"50px"}}>Edit</button>
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