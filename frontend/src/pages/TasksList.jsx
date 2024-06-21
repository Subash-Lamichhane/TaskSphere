import React, { useState } from 'react';
const TasksList = (tasks) => {
  console.log(tasks)
    // const [tasks] = useState([
    //     { title: 'Implement new feature', assignedTo: 'John Doe', dueDate: '2023-06-30', status: 'Completed', priority: 'High' },
    //     { title: 'Fix bug in login flow', assignedTo: 'Sarah Ahn', dueDate: '2023-07-15', status: 'In Progress', priority: 'Medium' },
    //     { title: 'Improve performance on landing page', assignedTo: 'Michael Reeves', dueDate: '2023-08-01', status: 'Overdue', priority: 'High' },
    //     { title: 'Refactor codebase to use new libraries', assignedTo: 'Emily Wang', dueDate: '2023-09-30', status: 'In Progress', priority: 'Low' },
    //   ]);
    
      return (
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              Add Task
            </button>
          </div>
          <table className="w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Assigned To</th>
                <th className="py-3 px-4 text-left">Due Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
            {tasks.map(task => (
                <TaskRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default TasksList

const TaskRow = ({ task }) => {
    
    const statusClasses = {
      'Completed': 'bg-green-100 text-green-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'Overdue': 'bg-red-100 text-red-800',
    };
  
    const priorityClasses = {
      'High': 'bg-blue-100 text-blue-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800',
    };
  
    return (
      
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-4">{task.title}</td>
        <td className="py-3 px-4">{task.assigned_to}</td>
        <td className="py-3 px-4">{task.due_date}</td>
        <td className="py-3 px-4">
          <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[task.status]}`}>
            {task.status}
          </span>
        </td>

        <td className="py-3 px-4">
          <button className="mr-2 text-gray-500 hover:text-gray-700">🔄</button>
          <button className="mr-2 text-gray-500 hover:text-gray-700">📝</button>
          <button className="text-gray-500 hover:text-gray-700">💬</button>
        </td>
      </tr>
    );
  };