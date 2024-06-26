import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import TaskInfo from './pages/TaskInfo';
import Manage from './pages/Manage';
import About from './pages/AboutPage';
// import Test from './pages/Test';
// import Tasks from './pages/Tasks';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task-info" element={<TaskInfo/>} />
        <Route path="/manage" element={<Manage/>} />
        <Route path="/about" element={<About/>} />
        {/* <Route path="/tasks" element={<Tasks />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
