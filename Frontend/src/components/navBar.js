import logoImg from '../images/R.png'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
const NavBar = () => {
    const {logout}=useLogout()
    const {user}=useAuthContext()
    const handleClick=()=>{
        logout()
    }
    return (
        <div class="w-full bg-gray-800 text-white p-4">
        <div class="w-10/12 block md:flex m-auto justify-between">
        <div class="pb-4 md:pb-0 flex">
            <img class="w-8" src={logoImg} alt="logoImg"/>
            <h2 class="text-orange-600 text-lg font-semibold">Tasks To Do!</h2>
        </div>
        <ul class="flex navul">
        {user && (
        <div class="flex">
        <span class="mr-4">{user.email}</span>
        <li class="bg-gradient-to-r from-purple-800 to-blue-600 cursor-pointer text-white p-2 -mt-2 rounded-md shadow-md shadow-black hover:bg-black hover:text-white" onClick={handleClick}>Logout</li>
        </div>
        )}
        {!user && (
            <div class="flex">
        <Link to="/Landing/Signup"><li class="ml-5 mr-5">Sign up</li></Link>
        <Link to="/Landing/Login"><li class="mr-5">Login</li></Link>
        </div>
        )}
        {/* <Link to="/Landing"><li>Exit</li></Link> */}
        </ul>
        </div>
        </div>
    );
}
 
export default NavBar;