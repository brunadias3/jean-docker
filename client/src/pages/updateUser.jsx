import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function UpdateUser() {
    const { id } = useParams();
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const ip = '172.20.10.9'

    async function getData() {
        await axios.get(`http://${ip}:3001/user/${id}`).then((response) => {
            const userData = response.data[0];
            setFirstName(userData.first_name)
            setLastName(userData.last_name)
            setEmail(userData.email)
            setPhone(userData.phone)
            setPassword(userData.password)
        })
    }

    useEffect(() => { getData() }, [])

    function comeback() {
        window.location.assign('/viewuser');
    }

    function handleUpdateUser() {
        axios.put(`http://${ip}:3001/update`, {
            id: id,
            first_name: firstname,
            last_name: lastname,
            email: email,
            phone: phone,
            password: password,
        });
        comeback()
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center w-screen h-screen mt-35">
                <div className="container mx-auto my-4 px-4 lg:px-20">
                    <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            <h1 className="font-bold uppercase text-5xl">Update User</h1>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                id="firstname" type="text" placeholder="First Name*" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                id="lastname" type="text" placeholder="Last Name*" value={lastname} onChange={(e) => setLastName(e.target.value)} />
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                id="email" type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                id="phone" type="number" placeholder="Phone*" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 mb-2 rounded-lg focus:outline-none focus:shadow-outline"
                                id="password" type="password" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="my-2 lg:w-1/4 flex items-center justify-center">
                            <button onClick={handleUpdateUser} className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline">
                                Update User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
