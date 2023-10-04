import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Create from './components/EmployeeForm';
import Edit from './components/EditEmployee';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/EmployeeForm" element={<Create/>} />
          <Route exact path="/EditEmployee/:id" element={<Edit/>} />
      </Routes>
    </Router>
  );
}

export default App;
