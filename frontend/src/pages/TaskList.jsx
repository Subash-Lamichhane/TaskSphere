// TaskList.jsx
import React from 'react';

const TaskList = ({ tasks, onMarkAsCompleted }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div>
        <h2>Task List</h2>
        <p>No tasks available</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className='mt-3 flex flex-row justify-between'>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <button onClick={() => onMarkAsCompleted(task._id)} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>Mark as Completed</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
