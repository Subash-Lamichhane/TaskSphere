// src/ManagerView.jsx
import React from 'react';
import TaskList from './../TaskList';

const ManagerView = ({ userDetail, tasks, handleDelete, setCompleteHandler, employeeEmails, handleCreateTeam, selectedEmployees, handleCheckboxChange, teamName, setTeamName }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Manager Dashboard</h2>
            
            <TaskList tasks={tasks} handleDelete={handleDelete} setCompleteHandler={setCompleteHandler} />
            
            {userDetail && !userDetail.team_id && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Create Team</h2>
                    <form onSubmit={handleCreateTeam} className="space-y-2">
                        <div>
                            <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">Team Name</label>
                            <input type="text" id="teamName" name="teamName" value={teamName} onChange={(e) => setTeamName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Select Employees</label>
                            {employeeEmails.map(email => (
                                <div key={email} className="flex items-center">
                                    <input type="checkbox" id={email} name={email} checked={selectedEmployees.includes(email)} onChange={() => handleCheckboxChange(email)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                    <label htmlFor={email} className="ml-2 block text-sm text-gray-900">{email}</label>
                                </div>
                            ))}
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4">Create Team</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManagerView;
