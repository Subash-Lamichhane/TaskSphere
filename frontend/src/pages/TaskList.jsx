// TaskList.jsx
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const TaskList = ({ tasks, handleDelete, setCompleted, permissions }) => {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [remainingTasks, setRemainingTasks] = useState(0);

  useEffect(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const remaining = total - completed;

    setTotalTasks(total);
    setCompletedTasks(completed);
    setRemainingTasks(remaining);
  }, [tasks]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6 flex-col">
        <h1 className="text-3xl font-bold">Tasks</h1>
        {/* <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Add Task
        </button> */}
        <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-14 md:px-24 my-6 '>
          <div className='bg-black text-white rounded-xl py-6 mx-12 text-center'>
            <h2 className='text-xl font-bold'>Total Tasks: <span className='text-3xl ml-4'>{totalTasks}</span></h2>
          </div>

          <div className='bg-yellow-200 text-black rounded-xl py-6 mx-12 text-center'>
            <h2 className='text-xl font-bold'>Tasks Completed: <span className='text-3xl ml-4'>{completedTasks}</span></h2>
          </div>

          <div className='bg-red-200 text-black rounded-xl py-6 mx-12 text-center'>
            <h2 className='text-xl font-bold'>Remaining Tasks: <span className='text-3xl ml-4'>{remainingTasks}</span></h2>
          </div>
        </div>
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
            <TaskRow key={index} task={task} deleteItem={handleDelete} setCompleted={setCompleted} permissions={permissions}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

const TaskRow = ({ task, deleteItem, setCompleted, permissions }) => {
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
  const navigate = useNavigate()
  const handleTaskClick = () => {
    navigate('/task-info', { state: { task } })
  }
  console.log(task)
  const formattedDueDate = task.due_date.split('T')[0];

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 hover:cursor-pointer">
      <td className="py-3 px-4" onClick={handleTaskClick}>{task.title}</td>
      <td className="py-3 px-4" onClick={handleTaskClick}>{task.assigned_to}</td>
      <td className="py-3 px-4" onClick={handleTaskClick}>{formattedDueDate}</td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[task.status]}`} onClick={handleTaskClick}>
          {task.status}
        </span>
      </td>

      <td className="py-3 px-4 flex items-center gap-4">
        {/* <button className="mr-2 text-gray-500 hover:text-gray-700">🔄</button>
        <button className="mr-2 text-gray-500 hover:text-gray-700">📝</button>
        <button className="text-gray-500 hover:text-gray-700">💬</button> */}
        {permissions.permittedDelete == true &&
          <button className=' text-red-500 text-3xl r' onClick={() => { deleteItem(task.title, task.assigned_to) }}><MdDeleteForever /></button>
        }
        {permissions.permittedMark == true &&
          <button className='text-green-500 text-2xl' onClick={() => { setCompleted(task.title, task.assigned_to) }}><FaCheckCircle /></button>
        }
      </td>
    </tr>
  );
};
