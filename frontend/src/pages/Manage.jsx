import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Manage = () => {
    const [staffEmails, setStaffEmails] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchStaffEmails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/peopleDetails', {
                    headers: {
                        'x-access-token': token,
                    },
                });
                setStaffEmails(response.data.users);
            } catch (error) {
                console.error('Error fetching staff emails:', error);
            }
        };

        fetchStaffEmails();

    }, []);

    const deleteStaff = async (staffEmail) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/users/`, {
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json'
                },
                data: {
                    email: staffEmail
                }
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error deleting staff:', error);
        }
    }

    return (
        <>  
                    <div className="flex flex-col justify-between min-h-screen">
            <div>
                <Navbar />
            </div>
            <div className='flex justify-center items-center my-24 mx-20 min-h-[50vh]'>
                <table className="w-1/2 bg-white shadow-md rounded mt-10">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                        {staffEmails.map((staff, index) => (
                            <tr className="border-b border-gray-200 hover:bg-gray-100 hover:cursor-pointer" key={index}>
                                <td className="py-3 px-4">{staff.name}</td>
                                <td className="py-3 px-4">{staff.email}</td>

                                <td className="py-3 px-4 flex items-center gap-4">
                                    {/* <button className="mr-2 text-gray-500 hover:text-gray-700">🔄</button>
      <button className="mr-2 text-gray-500 hover:text-gray-700">📝</button>
      <button className="text-gray-500 hover:text-gray-700">💬</button> */}
                                    <button className=' text-red-500 text-3xl r' onClick={() => {deleteStaff(staff.email) }}><MdDeleteForever /></button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
            <Footer/>
            </div>
        </>
    )
}

export default Manage