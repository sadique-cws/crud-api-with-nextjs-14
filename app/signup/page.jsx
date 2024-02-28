
const page = () => {

    const handleSubmit = async (formData) => {
        "use server";
        let username = formData.get("username");
        let password = formData.get("password");

        let records = {username, password};

        let data = await fetch("http://127.0.0.1:3000/api/admin/register", {method:"POST", body: JSON.stringify(records)});

        let res = await data.json();

        console.log(res.msg);
    }
  return (
    <div className="flex justify-center mt-10 h-screen">
        <form action={handleSubmit} method="POST" className="w-1/4">
            <div className="mb-3 flex flex-col">
                    <label htmlFor="username" className="text-slate-500">Username</label>
                    <input type="text" name="username" className="border px-3 py-2 rounded w-full" id="username" />
            </div>
            <div className="mb-3 flex flex-col">
                    <label htmlFor="password" className="text-slate-500">Password</label>
                    <input type="password" name="password" className="border px-3 py-2 rounded w-full" id="password" />
            </div>
            
            <div className="mb-3 flex flex-col">
                    <input type="submit" className="bg-green-600 text-white hover:bg-green-700 rounded-lg px-3 py-2 w-full" value="Create an Account" />
            </div>

        </form>
    </div>
  )
}

export default page