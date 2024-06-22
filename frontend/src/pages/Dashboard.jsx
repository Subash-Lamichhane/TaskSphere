// src/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminView from './Dashboard/Admin';
import ManagerView from './Dashboard/Manager';
import EmployeeView from './Dashboard/Employee';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState('');
    const [employeeEmails, setEmployeeEmails] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [userDetail, setUserDetail] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [assignedToEmail, setAssignedToEmail] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:3000/api/tasks', {
                        headers: {
                            'x-access-token': token,
                        },
                    });
                    setTasks(response.data.tasks);
                    setLoading(false);
                } else {
                    navigate('/login')
                }
            } catch (error) {
                navigate('/login')
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/user-role', {
                    headers: {
                        'x-access-token': token,
                    },
                });
                setUserDetail(response.data.user);
                setUserRole(response.data.user.role);
                setSelectedEmployees([response.data.user.email]);

            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        fetchUserRole();
    }, []);

    useEffect(() => {
        if (userRole === 'manager') {
            const fetchEmployeeEmails = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get('http://localhost:3000/api/employees/emails', {
                        headers: {
                            'x-access-token': token,
                        },
                    });
                    setEmployeeEmails(response.data.employees);
                } catch (error) {
                    console.error('Error fetching employee emails:', error);
                }
            };

            fetchEmployeeEmails();
        }
    }, [userRole]);

    const handleDelete = async (taskTitle, assignedTo) => {
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
            setTasks(tasks.filter(task => task.title !== taskTitle || task.assigned_to !== assignedTo));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:3000/api/teams', {
                teamName,
                members: selectedEmployees,
            }, {
                headers: {
                    'x-access-token': token,
                },
            });
            window.location.reload();
            // Handle successful team creation, if needed
        } catch (error) {
            console.error('Error creating team:', error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            if (userDetail.role === 'employee') {
                setAssignedToEmail(userDetail.email);
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:3000/api/tasks', {
                    title: newTaskName,
                    description: newTaskDescription,
                    status: 'not started',
                    due_date: dueDate,
                    assigned_to_email: userDetail.email,
                    team_id: userDetail.team_id
                }, {
                    headers: {
                        'x-access-token': token,
                    },
                });
                setTasks([...tasks, response.data.task]);
                setNewTaskName('');
                setNewTaskDescription('');
            } else {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:3000/api/tasks', {
                    title: newTaskName,
                    description: newTaskDescription,
                    status: 'not started',
                    due_date: dueDate,
                    assigned_to_email: assignedToEmail,
                    team_id: userDetail.team_id
                }, {
                    headers: {
                        'x-access-token': token,
                    },
                });
                setTasks([...tasks, response.data.task]);
                setNewTaskName('');
                setNewTaskDescription('');
            }

        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const setCompleteHandler = async (taskTitle, assignedTo) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/api/tasks/complete/${taskTitle}`, {
                assigned_to: assignedTo,
            }, {
                headers: {
                    'x-access-token': token,
                },
            });
            setTasks(tasks.map(task =>
                task.title === taskTitle && task.assigned_to === assignedTo
                    ? { ...task, status: 'completed' }
                    : task
            ));
        } catch (error) {
            console.error('Error marking task as completed:', error);
        }
    };

    const handleCheckboxChange = (email) => {
        const updatedSelectedEmployees = selectedEmployees.includes(email)
            ? selectedEmployees.filter(emp => emp !== email)
            : [...selectedEmployees, email];
        setSelectedEmployees(updatedSelectedEmployees);
    };

    return (
        <>
            <div className="flex flex-col justify-between min-h-screen">
                <Navbar />
                <div className="container mx-auto px-4 py-8 mb-8">
                    <h1 className="text-3xl font-bold mb-4">Task Dashboard</h1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {userRole === 'admin' && (
                                <AdminView
                                    userDetail={userDetail}
                                    tasks={tasks}
                                    handleDelete={handleDelete}
                                    setCompleteHandler={setCompleteHandler}
                                />
                            )}
                            {userRole === 'manager' && (
                                <ManagerView
                                    userDetail={userDetail}
                                    tasks={tasks}
                                    handleDelete={handleDelete}
                                    setCompleteHandler={setCompleteHandler}
                                    employeeEmails={employeeEmails}
                                    handleCreateTeam={handleCreateTeam}
                                    selectedEmployees={selectedEmployees}
                                    handleCheckboxChange={handleCheckboxChange}
                                    teamName={teamName}
                                    setTeamName={setTeamName}
                                />
                            )}
                            {userRole === 'employee' && (
                                <EmployeeView
                                    userDetail={userDetail}
                                    tasks={tasks}
                                    handleDelete={handleDelete}
                                    setCompleteHandler={setCompleteHandler}
                                />
                            )}
                            <h2 className="text-xl font-bold mt-8 mb-2">Create New Task</h2>
                            <form onSubmit={handleCreateTask} className="space-y-2">
                                <div>
                                    <label htmlFor="newTaskName" className="block text-sm font-medium text-gray-700">Task Name</label>
                                    <input type="text" id="newTaskName" name="newTaskName" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                                </div>
                                <div>
                                    <label htmlFor="newTaskDescription" className="block text-sm font-medium text-gray-700">Task Description</label>
                                    <textarea id="newTaskDescription" name="newTaskDescription" value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" required/>
                                </div>
                                <div>
                                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                                    <input type="date" id="dueDate" name="dueDate" onChange={(e) => setDueDate(e.target.value)} className="mt-1 block px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" required/>
                                </div>
                                {(userRole === 'manager' || userRole === 'admin') && (
                                    <div>
                                        <label htmlFor="assignedToEmail" className="block text-sm font-medium text-gray-700">Assigned To Email</label>
                                        <input type="email" id="assignedToEmail" name="assignedToEmail" onChange={(e) => setAssignedToEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" required/>
                                    </div>
                                )}
                                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-4">Create Task</button>
                            </form>
                        </>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Dashboard;
