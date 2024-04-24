import { useState, useEffect } from 'react';
import TasksDetails from '../components/TasksDetails';
import loadingImg from '../images/8ac12962c05648c55ca85771f4a69b2d.gif';
import { useTasksContext } from '../hooks/useTasksContext';
import { SERVER_URL } from '../constants/server_url';
import { useAuthContext } from '../hooks/useAuthContext';

let newTaskCounter = 0;

const Home = () => {
  const [newTask, setNewTask] = useState(true);
  const [taskInfo, setTaskInfo] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const [taskSuccess, setTaskSuccess] = useState(false);
  const [loading, setIsLoading] = useState(false);

  // fetch all tasks
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`${SERVER_URL}/api/task`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          "Access-Control-Allow-Origin": "*",
        }
      });
      const json = await response.json();
      if (response.ok) {
        console.log("Tasks fetched successfully!");
        dispatch({ type: 'SET_TASKS', payload: json });
        console.log(json);
      }
    };
    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  //create new tasks
  const handleAddNewTask = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!user) {
      setError("You are not logged in");
      return;
    }
    const task = { taskInfo, description, duration };
    const response = await fetch(`${SERVER_URL}/api/task`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
        "Access-Control-Allow-Origin": "*",
      }
    });
    const json = await response.json();
    console.log("Task created successfully!");
    if (!response.ok) {
      setError(json.error);
    } else {
      try {
        setTaskInfo('');
        setDuration('');
        setDescription('');
        dispatch({ type: 'CREATE_TASK', payload: json });
      } catch (error) {
        setError("An error occurred while adding the tasks");
      }
      setTaskInfo('');
      setDuration('');
      setDescription('');
      setError('');
      setIsLoading(false);
      setTaskSuccess(true);
      setTimeout(() => {
        setTaskSuccess(false);
      }, 1500);
    }
  };

  const handleNewTask = () => {
    setNewTask(false);
    newTaskCounter++;
    if (newTaskCounter === 1) {
      setNewTask(false);
      newTaskCounter = 0;
    }
  };

  const handleClose = () => {
    setNewTask(true);
    newTaskCounter++;
    if (newTaskCounter === 1) {
      setNewTask(true);
      newTaskCounter = 0;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div className="pt-5 m-auto homeholder">
        <h2 className="text-center pb-2">ll of us have what we need to do, but keeping track of our tasks can be a challenge sometimes. Don't let your to-dos overwhelm you!<br />
          <strong className="text-orange-500 italic">All of us have what we need to do, but keeping track of our tasks can be a challenge sometimes. Don't let your to-dos overwhelm you!!</strong></h2>
        <button onClick={handleNewTask} className="ml-5 md:ml-16 bg-gradient-to-r from-purple-800 to-blue-600 p-2 rounded-md shadow-black shadow-md text-white hover:bg-black">Add New Task</button>
        <img className={`${loading ? 'block' : 'hidden'} w-20 mt-4 m-auto`} src={loadingImg} alt='loading gif' />
        <h2 className="pt-4 text-red-600 text-center">{error}</h2>
        <h2 className={`text-center text-green-600 ${taskSuccess ? 'block' : 'hidden'}`}>New Task Added Successfully!</h2>
        <form className={`bg-gray-900 shadow-blue-500 shadow-md w-full md:w-96 p-4 rounded-md mt-8 m-auto text-white ${newTask ? 'hidden' : 'block'}`}>
          <label className="text-lg">Task Name:</label><br />
          <input
            type="text"
            className="p-1 w-full md:w-64 rounded-md shadow-orange-500 shadow-sm text-black bg-gray-200"
            placeholder="Reading"
            required
            onChange={(e) => setTaskInfo(e.target.value)}
            value={taskInfo}
          /><br />
          <label className="text-lg">Duration:</label><br />
          <input
            type="text"
            className="p-1 w-full md:w-64 rounded-md shadow-orange-500 text-black shadow-sm bg-gray-200"
            placeholder="2 hours"
            required
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          /><br />
          <label className="text-lg">Description:</label><br />
          <textarea
            className="p-1 w-full md:w-64 rounded-md shadow-blue-500 shadow-sm text-black bg-gray-200"
            placeholder="Read Harry poter 1 chaper1 " cols="40" rows="5"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea><br />
          <button className="bg-gradient-to-r from-purple-800 to-blue-600 text-white p-2 rounded w-full md:w-36 shadow-md shadow-black mt-5 mb-2 text-center hover:bg-red-600" onClick={handleAddNewTask}>Add Task</button>
          <h2 id='closeBtn' className="text-center"><span onClick={handleClose} className={` cursor-pointer w-6 m-auto text-center bg-gradient-to-r from-purple-800 to-blue-600 shadow-black shadow-sm p-2 rounded-full hover:bg-red-600 hover:text-white ${newTask ? 'hidden' : 'block'}`}>X</span></h2>
        </form>
      </div>
      <hr className="w-full md:w-10/12 m-auto mt-8" />
      {/* <section className="z-50 relative bg-gradient-to-r from bg-purple-600 to-blue-600 pb-10 -mt-1 md:-mt-0 rounded-t-xl"> */}
        <h2 className="pt-5 pb-5 font-bold text-normal md:text-lg text-black md:text-white ml-5 md:ml-16">My Tasks:</h2>
        <div>
          {tasks && tasks.map((task) => (
            task && <TasksDetails key={task._id} task={task} />
          ))}
        </div>
      {/* </section> */}
    </div>
  );
}

export default Home;
