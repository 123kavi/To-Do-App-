import taskImg from '../images/image.gif';
import { Link } from 'react-router-dom';


const Landing = () => {
    const hours = new Date().getHours();
    const greeting = getGreeting(hours);

    function getGreeting(hour) {
        if (hour >= 5 && hour < 12) {
            return "Good morning";
        } else if (hour >= 12 && hour < 18) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    }

    return (
        <div className="w-full pt-10 pb-10 bg-gray-50">
            <div className="w-10/12 mx-auto text-center md:text-left">
                <h2 className="pt-4 pb-4 text-lg font-semibold text-orange-500">{greeting}!</h2>
                <h3 className="pb-4 text-center font-semibold text-lg">Welcome to the ToDo App.</h3>
                <p className="pb-2 text-center font-semibold text-lg">Careful planning is the path to success.</p>
                <imgage className="h-64 mx-auto" src={taskImg} alt="Task Image" />
                <div className="w-full max-w-xs mx-auto mt-4">
                    <Link to="/Login">
                        <button className="w-full py-2 bg-gradient-to-r from-purple-800 to-blue-600 cursor-pointer text-white font-semibold rounded-full shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Landing;
