import { redirect } from "next/navigation"

const page = async ({params}) => {
    let {record_id} = params
    const singleRecords = await fetch(`http://localhost:3000/api/records/${record_id}`)
    const res = await singleRecords.json()


    const handleUpdate = async (formdata) => {
        "use server"
        let name = formdata.get("name");
      let contact =  formdata.get("contact")
      let email = formdata.get("email")
      let city = formdata.get("city")

      let data =  {name, contact, email, city}
        let res = await fetch(`http://localhost:3000/api/records/${record_id}`, {method:"PUT", body:JSON.stringify(data)});
        let updateData = await res.json();

        console.log(updateData.msg)

        redirect("/");
    }

  return (
    <div className="flex flex-1 justify-center">
        <div className="w-1/3 mt-5">
        <div className="w-full"><h1 className="text-white text-3xl  mb-2 font-semibold">Edit Record Here</h1></div>
            <div className="border p-4 rounded">
            <form method='POST' action={handleUpdate}>
            <div className='mb-3 flex flex-col gap-3'>
              <label htmlFor='name'>Name</label>
              <input type='text' defaultValue={res.name} id='name' name='name' className='border w-full px-2 py-1 text-black' placeholder='Enter name' />
            </div>
            <div className='mb-3 flex flex-col gap-3'>
              <label htmlFor='contact'>contact</label>
              <input type='text' defaultValue={res.contact} id='contact' name='contact' className='border w-full px-2 py-1 text-black' placeholder='Enter contact' />
            </div>
            <div className='mb-3 flex flex-col gap-3'>
              <label htmlFor='city'>city</label>
              <input type='text' defaultValue={res.city} id='city' name='city' className='border w-full px-2 py-1 text-black' placeholder='Enter city' />
            </div>
            <div className='mb-3 flex flex-col gap-3'>
              <label htmlFor='email'>email</label>
              <input type='email' defaultValue={res.email} id='email' name='email' className='border w-full px-2 py-1 text-black' placeholder='Enter email' />
            </div>
            <div className='mb-3 flex'>
              <button type='submit' className='bg-teal-700 text-600 px-3 py-3 rounded w-full'>Edit Record</button>
            </div>
          </form>
            </div>
        </div>
    </div>
  )
}

export default page