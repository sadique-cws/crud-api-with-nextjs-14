import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from './components/Loading';

const page = async () => {

  const res = await fetch("http://localhost:3000/api/records", {cache:"no-cache"});
  const records = await res.json()


  const handleSubmit = async (formdata) => {
    "use server"
      let name = formdata.get("name");
      let contact =  formdata.get("contact")
      let email = formdata.get("email")
      let city = formdata.get("city")

      let data =  {name, contact, email, city}

      const res = await fetch("http://localhost:3000/api/records", {method:"POST", body: JSON.stringify(data)})
      const records =  await res.json()

      console.log(records.msg);
  }

  // delete server action

  const handleDelete = async (id, formData) => {
    "use server"
    const res = await fetch(`http://localhost:3000/api/records/${id}`, {method:"DELETE"})
    const records = await res.json()
    redirect("/");
  }

  return (
    <div>
     

      <div className='flex px-10 py-5 gap-10'>
        <div className='w-1/3'>
          <form method='POST' action={handleSubmit}>
            <div className='mb-3 flex flex-col gap-3'>
              <label htmlFor='name'>Name</label>
              <input type='text' id='name' name='name' className='border w-full px-2 py-1 text-black' placeholder='Enter name' />
            </div>
            <div className='mb-3 flex flex-col gap-3'>
              <label htmlFor='contact'>contact</label>
              <input type='text' id='contact' name='contact' className='border w-full px-2 py-1 text-black' placeholder='Enter contact' />
            </div>
            <div className='mb-3 flex flex-col gap-3'>
              <label htmlFor='city'>city</label>
              <input type='text' id='city' name='city' className='border w-full px-2 py-1 text-black' placeholder='Enter city' />
            </div>
            <div className='mb-3 flex flex-col gap-3'>
              <label htmlFor='email'>email</label>
              <input type='email' id='email' name='email' className='border w-full px-2 py-1 text-black' placeholder='Enter email' />
            </div>
            <div className='mb-3 flex'>
              <button type='submit' className='bg-teal-700 text-600 px-3 py-3 rounded w-full'>Create Record</button>
            </div>
          </form>
        </div>
        <div className='w-2/3'>
         <table className='border w-full'>
            <thead>
              <tr>
                <th className='border p-2'>Id</th>
                <th className='border p-2'>Name</th>
                <th className='border p-2'>Email</th>
                <th className='border p-2'>Contact</th>
                <th className='border p-2'>City</th>
                <th className='border p-2'>Action</th>
              </tr>
            </thead>
            <tbody>

              {records.map((record, index) => {
                let id = record._id
                let handleDeletewithid = handleDelete.bind(null, id)
                return (
                <tr key={index}>
                  <td className='border p-2 text-center'>{record._id}</td>
                  <td className='border p-2 text-center'>{record.name}</td>
                  <td className='border p-2 text-center'>{record.email}</td>
                  <td className='border p-2 text-center'>{record.contact}</td>
                  <td className='border p-2 text-center'>{record.city}</td>
                  <td className='border p-2 text-center flex gap-2'>
                      <form action={handleDeletewithid} method='POST'>
                          <input type='submit' className='bg-red-500 text-white px-3 py-2 rounded'/>
                      </form>
                      <Link href={`/edit/${record._id}`} className="bg-sky-700 text-white px-3 py-2 rounded">Edit</Link>
                  </td> 
                </tr>
              ) } )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page