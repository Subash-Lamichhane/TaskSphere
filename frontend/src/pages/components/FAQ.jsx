import React, { useState } from 'react';
import faqimage from "../../assets/images/faq.png";
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }
  const faqs = [
    {
      question: "What features does the task management system offer for team collaboration?",
      answer: "The task management system allows users to assign, track, and manage tasks based on user roles. It provides features for creating tasks, setting deadlines, tracking progress, and collaborating with team members to ensure efficient task management."
    },
    {
      question: "What can a Manager do within the task management system?",
      answer: "Managers can create, read, update, and delete tasks assigned to their team. They also have the ability to manage team members by assigning tasks, tracking team progress, and ensuring that the team meets their deadlines and goals."
    },
    {
      question: "What permissions does an Employee have in the task management system?",
      answer: "Employees can view and update tasks that are assigned to them. They can mark tasks as complete, add comments, and update the progress of their tasks to keep managers informed about their work status."
    },
    {
      question: "How does the task management system handle task assignments?",
      answer: "Tasks can be assigned by Managers or Admins to specific team members. Each task includes details such as descriptions, deadlines, and priority levels. The assignee can then view and update the task as they work on it."
    },
    {
      question: "Is it possible to track the progress of tasks in the system?",
      answer: "Absolutely! The task management system provides tools to track the progress of tasks. Users can update the status of their tasks, set milestones, and view progress reports to ensure that all tasks are on track."
    },
    {
      question: "Are there any limitations on the number of tasks or users in the system?",
      answer: "There might be some limitations depending on the specific implementation and technical constraints of the system. Generally, the system is designed to handle a substantial number of tasks and users to support team collaboration efficiently."
    }
  ];
  
  

  return (
    <div className="bg-white text-black p-6 pb-14 mt-24">
      <div className="mx-10 md:mx-24">
        <h2 className="text-5xl font-bold mb-14 text-center">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="hidden md:flex justify-center items-center">
            <img src={faqimage} alt="FAQ" className="w-full h-auto md:max-w-md" />
          </div>
          <div>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300"
                  onClick={() => toggleOpen(index)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{faq.question}</span>
                    <span className="text-2xl">{openIndex === index ? '-' : '+'}</span>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-gray-200 mt-2 rounded-lg">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQ;