import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {login,error}=useLogin()
    const [load,setload]=useState(true)


    const handleSubmit=async(e)=>{
        e.preventDefault()
        setload(false)
        await login(email,password)
    }
    return (
        <div class="w-full bg-gradient-to-r from bg-white-600 to-blue-600 h-screen pt-16">
        <p class={`${load ? 'hidden':'block' } text-center pb-5 text-white`}>Please wait...this might take a while..</p>
        <form class="bg-gray-900 text-white w-72 p-5 m-auto rounded-md shadow-sm shadow-black" onSubmit={handleSubmit}>
        <h3 class="text-center text-orange-600 font-semibold">Login</h3>
        <label>Email</label><br/>
        <input 
        type="email"
        onChange={(e)=>setEmail(e.target.value)} 
        value={email}
        class="w-60 p-1 rounded-md shadow-sm shadow-blue-700 text-black bg-gray-100"
        /><br/>
        <label>Password</label><br/>
        <input 
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password} 
        class="w-60 p-1 rounded-md shadow-sm shadow-blue-700 text-black bg-gray-100"
        /><br/>
        <button class="mt-5 bg-gradient-to-r from-purple-800 to-blue-600 cursor-pointer p-1 rounded-md shadow-md shadow-black">Login</button>
        {error && <div class=" bg-red-300 mt-5 p-1 rounded-md text-red-700">{error}</div>}

        <p class="pb-4 pt-4">Don't have an account? <a class="text-red-500" href="/Landing/signup">Sign up</a></p>
        </form>
        </div>
    );
}
 
export default Login;

// disabled={isLoading} 