import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

export default function CreateUser() {
    const [values,setValues] = useState();
    const ip = '107.21.206.241'

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    }

    function comeback() {
        window.location.assign ('/viewuser');
    }

    function handleClickButton() {
        axios.post(`http://${ip}:3001/create`, {
            first_name: values.firstname,
            last_name: values.lastname,
            email: values.email,
            phone: values.phone,
            password: values.password,
        }).then((response) =>{
            console.log(response)
        })
        comeback()
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center w-screen h-screen mt-35">
                <div className="container mx-auto my-4 px-4 lg:px-20">
                    <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            <h1 className="font-bold uppercase text-5xl">Create User</h1>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                name='firstname' type="text" placeholder="First Name*" onChange={handleChangeValues} />
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                name='lastname' type="text" placeholder="Last Name*" onChange={handleChangeValues} />
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                name='email' type="email" placeholder="Email*" onChange={handleChangeValues} />
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                name='phone' type="number" placeholder="Phone*" onChange={handleChangeValues} />
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 mb-2 rounded-lg focus:outline-none focus:shadow-outline"
                                name='password' type="password" placeholder="Password*" onChange={handleChangeValues} />
                        </div>

                        <div className="my-2 lg:w-1/4 flex items-center justify-center">
                            <button className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline" onClick={handleClickButton}>
                                Create User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
