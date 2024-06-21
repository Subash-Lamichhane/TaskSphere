// src/TaskItem.jsx
import React from 'react';

const TaskItem = ({ task, onMarkAsCompleted }) => {
  const handleMarkCompleted = () => {
    onMarkAsCompleted(task._id);
  };

  return (
    <li className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">{task.title}</h3>
      <p className="text-gray-700 mb-2">Description: {task.description}</p>
      <p className="text-gray-700 mb-2">Status: {task.status}</p>
      <p className="text-gray-700 mb-2">Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
      <p className="text-gray-700 mb-2">Assigned To: {task.assigned_to.email}</p>
      <button
        onClick={handleMarkCompleted}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Mark as Completed
      </button>
    </li>
  );
};

export default TaskItem;
