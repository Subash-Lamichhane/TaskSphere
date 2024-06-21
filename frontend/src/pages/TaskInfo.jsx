import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const TaskInfo = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const task = location.state?.task;
    const setCompleteHandler = async ({taskTitle, assignedTo}) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/api/tasks/complete/${taskTitle}`, {
                assigned_to: assignedTo,
            }, {
                headers: {
                    'x-access-token': token,
                },
            });
            // setTasks(tasks.map(task =>
            //     task.title === taskTitle && task.assigned_to === assignedTo
            //         ? { ...task, status: 'completed' }
            //         : task
            // ));
            navigate('/dashboard')
        } catch (error) {
            console.error('Error marking task as completed:', error);
        }
    };

    const handleDelete = async ({taskTitle, assignedTo}) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/tasks/title/${taskTitle}`, {
                headers: {
                    'x-access-token': token,
                },
                params: {
                    assigned_to: assignedTo,
                },
            });
            // setTasks(tasks.filter(task => task.title !== taskTitle || task.assigned_to !== assignedTo));
            navigate('/dashboard')
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    return (
        <>
            <Navbar />
            <div className=''>
                <div className="bg-white rounded-lg shadow-xl border p-6 max-w-2xl mx-auto my-44">
                    <h2 className="text-xl font-bold mb-4">{task.title}</h2>

                    <div className="space-y-4 mb-6">
                        <div className="flex">
                            <span className="font-semibold w-32">Description:</span>
                            <span className="flex-1">{task.description}</span>
                        </div>

                        <div className="flex items-center">
                            <span className="font-semibold w-32">Status:</span>
                            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">{task.status}</span>
                        </div>

                        <div className="flex">
                            <span className="font-semibold w-32">Due Date:</span>
                            <span>{task.due_date}</span>
                        </div>

                        <div className="flex items-center">
                            <span className="font-semibold w-32">Assigned To:</span>
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                {task.assigned_to}
                            </span>
                        </div>

                        <div className="flex">
                            <span className="font-semibold w-32">Team ID:</span>
                            <span>{task.team_id}</span>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-300" onClick={() => { setCompleteHandler({ taskTitle: task.title, assignedTo: task.assigned_to }) }}>
                            Mark as Completed
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300" onClick={() => { handleDelete({ taskTitle: task.title, assignedTo: task.assigned_to }) }}>
                            Delete Task
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TaskInfo;