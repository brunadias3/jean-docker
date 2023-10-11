import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

export default function ViewUser() {
    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Password', 'Update', 'Delete']
    const [users, setUsers] = useState();
    const ip = '172.20.10.9'

    async function getData() {
        await axios.get(`http://${ip}:3001/viewuser`).then((response) => setUsers(response.data))
    }

    async function handleDeleteUser(id) {
        await axios.delete(`http://${ip}:3001/delete/${id}`);
        await getData();
    }


    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <div className='mb-20'>
                <Navbar />
            </div>
            <div className='w-full bg-gray-700 flex justify-center'>
                <div className="overflow-x-auto rounded-lg">
                    <table className="text-sm text-center text-gray-400 shadow-md">
                        <thead className="text-xs uppercase text-gray-400">
                            <tr>
                                {headers.map((header) =>
                                    <th key={header} scope="col" className="px-6 py-3 bg-gray-800">
                                        {header}
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user) =>
                                <tr key={user.id} className="border-b border-gray-700">
                                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white bg-gray-800">
                                        {user.first_name}
                                    </td>

                                    <td className="px-6 py-4 bg-gray-800">
                                        {user.last_name}
                                    </td>

                                    <td className="px-6 py-4 bg-gray-800">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4 bg-gray-800">
                                        {user.phone}
                                    </td>

                                    <td className="px-6 py-4 bg-gray-800">
                                        {user.password}
                                    </td>

                                    <td className="px-6 py-4 bg-gray-800">
                                        <button
                                            onClick={() => { window.location.href = "/update/" + user.id }}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Update
                                        </button>
                                    </td>

                                    <td className="px-6 py-4 bg-gray-800">
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
