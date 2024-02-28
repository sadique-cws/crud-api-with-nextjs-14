import LoginForm from "../components/LoginForm";

const page = () => {

   
  return (
    <div className="flex justify-center mt-10 h-screen flex-col items-center">
        <h1 className="text-3xl font-semibold">Login Here</h1>
        <LoginForm/>
    </div>
  )
}

export default page