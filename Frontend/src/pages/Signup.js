import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {signup,error}=useSignup()
    const [load,setload]=useState(true)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setload(false)
        await signup(email,password)

    }
    return (
        <div class="w-full bg-gradient-to-r from bg-white-600 to-blue-600 h-screen pt-16">
        <p class={`${load ? 'hidden':'block' } text-center text-white pb-5`}>Please wait...this might take a while..</p>
        <form class="bg-gray-900 text-white w-72 p-5 m-auto rounded-md shadow-sm shadow-black" onSubmit={handleSubmit}>
        <h3 class="text-center text-orange-600 font-semibold">Sign Up</h3>
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
        <button  class="mt-5 bg-gradient-to-r from-purple-800 to-blue-600 cursor-pointer p-1 rounded-md shadow-md shadow-black">Sign up</button>

        {error && <div class=" bg-red-300 mt-5 p-1 rounded-md text-red-700">{error}</div>}
        <p class="pt-4 pb-4">Already have an account! <a class="text-red-500" href="/landing/login">Login</a></p>
        </form>
        </div>
    );
}
 
export default Signup;
