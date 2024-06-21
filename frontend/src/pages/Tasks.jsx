

import { useState } from "react"

export default function Tasks() {
  const tasks = [
    {
      id: 1,
      title: "Finish quarterly report",
      description: "Compile data and write up the Q4 report for the leadership team.",
      assignedTo: "John Doe",
      completed: false,
    },
    {
      id: 2,
      title: "Implement new design system",
      description: "Update all components to use the new design system guidelines.",
      assignedTo: "Jane Smith",
      completed: false,
    },
    {
      id: 3,
      title: "Migrate to new CRM platform",
      description: "Research, test, and migrate customer data to the new CRM system.",
      assignedTo: "Michael Johnson",
      completed: true,
    },
    {
      id: 4,
      title: "Optimize website performance",
      description: "Identify and fix performance bottlenecks on the company website.",
      assignedTo: "Sarah Lee",
      completed: false,
    },
    {
      id: 5,
      title: "Plan Q1 marketing campaign",
      description: "Develop the strategy, content, and timeline for the Q1 marketing push.",
      assignedTo: "David Kim",
      completed: false,
    },
    {
      id: 6,
      title: "Conduct user research interviews",
      description: "Schedule and run user interviews to gather feedback on new product features.",
      assignedTo: "Emily Chen",
      completed: true,
    },
  ]
  const [completedTasks, setCompletedTasks] = useState([])
  const handleMarkComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true }
      }
      return task
    })
    setCompletedTasks([...completedTasks, tasks.find((task) => task.id === taskId)])
    setTasks(updatedTasks)
  }
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white  rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">{task.title}</h2>
            <p className="text-gray-600  mb-4">{task.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 ">Assigned to: {task.assignedTo}</p>
              {!task.completed && (
                <button cla
                  onClick={() => handleMarkComplete(task.id)}
                  className="bg-black text-white px-4 py-2 rounded-md"
                >
                  Mark as Complete
                </button>
              )}
              {task.completed && <span className="text-green-500 font-medium">Completed</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}