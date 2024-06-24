// src/ManagerView.jsx
import React, { useState } from 'react';
import TaskList from '../TaskList';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const ManagerView = ({ userDetail, tasks, handleDelete, setCompleteHandler, employeeEmails, handleCreateTeam, selectedEmployees, handleCheckboxChange, teamName, setTeamName, permissions }) => {
    const [noTeamList, setNoTeamList] = useState([]);
    const [selectedNoTeamEmployees, setSelectedNoTeamEmployees] = useState([]);

    useEffect(() => {
        const fetchNoTeamList = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/employees/no-team', {
                    headers: {
                        'x-access-token': token,
                    },
                });
                console.log(response.data)
                setNoTeamList(response.data.employees);
            } catch (error) {
                console.error('Error fetching employee emails:', error);
            }
        };

        fetchNoTeamList();
    }, []);

    const handleAddToTeam = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await Promise.all(selectedNoTeamEmployees.map(email => 
                axios.put('http://localhost:3000/api/users/team', 
                    { email, team_id: userDetail.team_id },
                    { headers: { 'x-access-token': token } }
                )
            ));
            alert('Employees successfully added to the team');
            // Optionally, you can refresh the noTeamList here to reflect changes
        } catch (error) {
            console.error('Error adding employees to the team:', error);
            alert('Failed to add employees to the team');
        }
        window.location.reload();
    };
    
    const handleAddCheckboxChange = (email) => {
        setSelectedNoTeamEmployees(prev =>
            prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
        );
    };

    const navigate = useNavigate()
    return (
        <div>
            <div className='flex justify-between mt-6'>
                <div>
                    <h2 className="text-xl font-bold mb-2">Manager Dashboard</h2>
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

            {userDetail && !userDetail.team_id && (
                <div className="mt-8 max-w-lg p-6 bg-white rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-indigo-600">Create Team</h2>
                    <form onSubmit={handleCreateTeam} className="space-y-4">
                        <div>
                            <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">Team Name</label>
                            <input
                                type="text"
                                id="teamName"
                                name="teamName"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Select Employees</label>
                            <div className="mt-2 space-y-2">
                                {employeeEmails.map(email => (
                                    <div key={email} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={email}
                                            name={email}
                                            checked={selectedEmployees.includes(email)}
                                            onChange={() => handleCheckboxChange(email)}
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                        <label htmlFor={email} className="ml-3 text-sm text-gray-900">{email}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className=" bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm mt-4 transition duration-200"
                        >
                            Create Team
                        </button>
                    </form>
                </div>
            )}
            {userDetail && userDetail.team_id && (
                <div className="mt-8 max-w-lg p-6 bg-white rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-indigo-600">Add To Team</h2>
                    <form onSubmit={handleAddToTeam} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Select Employees</label>
                            <div className="mt-2 space-y-2">
                                {noTeamList.length==0 && <>
                                <div className='text-gray-700 bg-gray-100 px-4 py-2 rounded-xl'>There are no employee with no team.</div>
                                </>}
                                {noTeamList.map(user => (
                                    <div key={user.email} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={user.email}
                                            name={user.email}
                                            checked={selectedNoTeamEmployees.includes(user.email)}
                                            onChange={() => handleAddCheckboxChange(user.email)}
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                        <label htmlFor={user.email} className="ml-3 text-sm text-gray-900">{user.email}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm mt-4 transition duration-200"
                        >
                            Add to Team
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManagerView;
