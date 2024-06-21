// TaskList.jsx
import React from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const TaskList = ({ tasks, handleDelete, setCompleted }) => {
  // if (!tasks || tasks.length === 0) {
  //   return (
  //     <div>
  //       <h2>Task List</h2>
  //       <p>No tasks available</p>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        {/* <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Add Task
        </button> */}
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
          {tasks.map((task, index) => (
            // <li key={task._id} className='mt-3 flex flex-row justify-between'>
            //   <div>{task.title}</div>
            //   <div>{task.description}</div>
            //   <button onClick={() => handleDelete(task._id)} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>Mark as Completed</button>
            // </li>
            <TaskRow key={index} task={task} deleteItem={handleDelete} setCompleted={setCompleted}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

const TaskRow = ({ task, deleteItem, setCompleted }) => {
  const statusClasses = {
    'completed': 'bg-green-100 text-green-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'not started': 'bg-red-100 text-red-800',
  };

  const priorityClasses = {
    'High': 'bg-blue-100 text-blue-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Low': 'bg-green-100 text-green-800',
  };
  const navigate= useNavigate()
  const handleTaskClick=()=>{
    navigate('/task-info', { state: { task } })
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 hover:cursor-pointer" onClick={handleTaskClick}>
      <td className="py-3 px-4">{task.title}</td>
      <td className="py-3 px-4">{task.assigned_to}</td>
      <td className="py-3 px-4">{task.due_date}</td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[task.status]}`}>
          {task.status}
        </span>
      </td>

      <td className="py-3 px-4 flex items-center gap-4">
        {/* <button className="mr-2 text-gray-500 hover:text-gray-700">🔄</button>
        <button className="mr-2 text-gray-500 hover:text-gray-700">📝</button>
        <button className="text-gray-500 hover:text-gray-700">💬</button> */}
        <button className=' text-red-500 text-3xl r' onClick={() => { deleteItem(task.title, task.assigned_to) }}><MdDeleteForever /></button>
        <button className='text-green-500 text-2xl' onClick={() => { setCompleted(task.title, task.assigned_to) }}><FaCheckCircle /></button>
      </td>
    </tr>
  );
};
