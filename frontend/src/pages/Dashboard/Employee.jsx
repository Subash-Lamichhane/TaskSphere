// src/EmployeeView.jsx
import React from 'react';
import TaskList from '../TaskList';
import { useNavigate } from 'react-router-dom';

const EmployeeView = ({ userDetail, tasks, handleDelete, setCompleteHandler, permissions }) => {
    const navigate = useNavigate()
    return (
        <div>
            <div className='flex justify-between mt-6'>
                <div>
                    <h2 className="text-xl font-bold mb-2">Employee Dashboard</h2>
                </div>
                {permissions.permittedManage &&
                    <div>
                        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" onClick={() => { navigate('/manage') }}>
                            Manage staffs
                        </button>
                    </div>
                }
            </div>
            {permissions.permittedRead &&
                <TaskList tasks={tasks} handleDelete={handleDelete} setCompleted={setCompleteHandler} permissions={permissions} />
            }
        </div>
    );
};

export default EmployeeView;
