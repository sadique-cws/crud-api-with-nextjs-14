"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginForm = () => {
    const router = useRouter()
    const [username, setUsername]  = useState("");
    const [password, setPassword]  = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();


        let records = {username, password};

        let data = await fetch("http://127.0.0.1:3000/api/admin/login", {
            method:"POST", 
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(records)
        });

        let res = await data.json();

        if(res.success){
            router.push("/")
        }
        else{
            alert(res.msg);
        }
        
    }

  return (
    <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data" className="w-1/4">
            <div className="mb-3 flex flex-col">
                    <label htmlFor="username" className="text-slate-500">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border px-3 py-2 rounded w-full" id="username" />
            </div>
            <div className="mb-3 flex flex-col">
                    <label htmlFor="password" className="text-slate-500">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-3 py-2 rounded w-full" id="password" />
            </div>
            
            <div className="mb-3 flex flex-col">
                    <button type='submit' className="bg-green-600 text-white hover:bg-green-700 rounded-lg px-3 py-2 w-full" value="Create an Account">Login Here </button>
            </div>

        </form>
  )
}

export default LoginForm