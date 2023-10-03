import React, { useState, useEffect, useRef } from 'react';
import { Link} from 'react-router-dom';
import moment from "moment";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

const DataTable = ({data}) => {

    useEffect(() => {
        // Initialize DataTables
        const dataTable = $(document).ready(function () {
          $('#Table').DataTable();
        });  
      }, [data]);

  return (
    <table id='Table' align='center' style={{width:"80%"}}>
        <thead>
          <tr>
            <th>Department</th>
            <th>Employee Name</th>
            <th>Gender</th>
            <th>Experience</th>
            <th>DeptType</th>
            <th colSpan={2}>Action   
              <Link to="/EmployeeForm"> 
              <button className='btn btn-outline-primary'>Add Employee</button>
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
                <Link to={`/EmployeeDelete/${employee.id}`}>
                <button className='btn btn-outline-danger'>Delete</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
  )
}

export default DataTable