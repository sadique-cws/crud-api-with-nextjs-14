"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {
  let router = useRouter()

  const handleLogout = async () => {
    let res = await fetch("http://127.0.0.1:3000/api/admin/logout", {method:"POST"});

    let data = await res.json();


    router.push("/")


  }
  return (
    <div className='flex flex-1 bg-teal-700 text-white justify-between px-4 py-2'>
        <Link href="/" className='text-white font-bold text-2xl'>CRUD API</Link>

        <button type='button' onClick={handleLogout} className='bg-red-500 text-white px-3 py-2 rounded hover:bg-red-800'>Logout</button>
    </div>
  )
}

export default Header