// src/EmployeeView.jsx
import React from 'react';
import TaskList from '../TaskList';

const EmployeeView = ({ userDetail, tasks, handleDelete, setCompleteHandler }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Employee Dashboard</h2>
            <TaskList tasks={tasks} handleDelete={handleDelete} setCompleteHandler={setCompleteHandler} />
        </div>
    );
};

export default EmployeeView;
