import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import Home from './pages/Home';
import NavBar from './components/navBar';
import Login from './pages/Login';
import Signup from './pages/Signup'
import { useAuthContext } from './hooks/useAuthContext';
import Landing from './pages/Landing';
function App() {
  const {user}=useAuthContext()
  return (
    <div className="App">
    <Router>
    <NavBar/>
    <Routes>
    <Route exact path='/Landing' element={<Landing/>}/>
    <Route path='/' 
    element={user ? <Home/> : <Navigate to="/Landing" />}
    />
    <Route path='/Landing/login'
    element={!user ? <Login/> :<Navigate to="/"/>}
    />
    <Route path='/Landing/signup'
    element={!user ? <Signup/> :<Navigate to="/"/>}
    />
    </Routes>
    </Router>
    </div>
  );
}

export default App;
