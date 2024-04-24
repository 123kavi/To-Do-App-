import { SERVER_URL } from "../constants/server_url";
import { useTasksContext } from "../hooks/useTasksContext";
import deleteIcon from '../images/delete-icon-image-15.jpg'
import { useAuthContext } from "../hooks/useAuthContext";
import {useState} from "react"
const TaskDetails = ({task}) => {
    const {dispatch}=useTasksContext()
    const {user}=useAuthContext()
    const handleDelete=async()=>{
        if(!user){
            return
        }
        try {
            const response=await fetch(SERVER_URL+'/api/task/'+task._id,{
                method:'DELETE',
                headers:{
                    'Authorization':`Bearer ${user.token}`,
                    "Access-Control-Allow-Origin": "*",
                }
            })
          
            if(response.ok){
                dispatch({type:'DELETE_TASK',payload:task})
            }
        }
         catch (error) {
            console.log(error)
        }
    }
    const taskHolder=document.querySelector('#taskHolder')
    const [isEditing,setIsEditing]=useState(false)
    const [editedTaskInfo,setEditedTaskInfo]=useState(task.taskInfo)
    const [editedDuration,setEditedDuration]=useState(task.duration)
    const [editedDescription,setEditedDescription]=useState(task.description)

    const handleUpdate=()=>{
        setIsEditing(true)
    }

    const handleSave=async()=>{
        if(!user){
            return
        }

        const updatedTask={
            ...task,
            taskInfo:editedTaskInfo,
            duration:editedDuration,
            description:editedDescription,
        }

        try {
            console.log("sending tasks",updatedTask)
            const response=await fetch(SERVER_URL+'/api/task/'+task._id,{
                method:'PATCH',
                headers:{
                    'Authorization':`Bearer ${user.token}`,
                    'Content-Type':'application/json',
                    "Access-Control-Allow-Origin": "*",
                },
                body:JSON.stringify(updatedTask)
            })
            // const json=await response.json()
            if(response.ok){
                console.log("patch made")
                dispatch({type:'UPDATE_TASK',payload:updatedTask})
                setIsEditing(false)
            }
            else{
                console.log("Failed to update task")
            }
        }
         catch (error) {
            console.log(error)
        }
        setEditedTaskInfo(taskHolder.innerText)
        setIsEditing(false)
    }
    return (
        <div id="taskHolder"  class="bg-gray-900 w-11/12 md:w-8/12 m-auto text-white p-4 rounded-md mb-5 flex justify-between shadow-sm shadow-blue-600">
        <div>
        {isEditing ? (
            <>
            <input 
            type="text" 
            value={editedTaskInfo} 
            onChange={(e) => setEditedTaskInfo(e.target.value)} 
            className="font-semibold text-orange-700 rounded-md p-1"
        />
        <p> Duration :</p>
        <input 
            type="text" 
            value={editedDuration} 
            onChange={(e) => setEditedDuration(e.target.value)} 
            className="text-black rounded-md p-1"
        />
        <p>Description:<br/>
            <input 
                type="text" 
                value={editedDescription} 
                onChange={(e) => setEditedDescription(e.target.value)} 
                className="text-green-500 rounded-md p-1"
            />
        </p>
        </>
        )
        :
        (
            <>
            <h2 class="font-semibold text-orange-700">Task : {task.taskInfo}</h2>
            <p>Duration: {task.duration}</p>
            <p>Description:<br/><span class="text-green-500">{task.description}</span></p>
            </>
        )
        }
        </div>
        <div class="block">
        <img class="w-auto h-5" onClick={handleDelete} src={deleteIcon} alt="deleteIcon"/>
        {
            isEditing ? (<button class="bg-gradient-to-r from-purple-800 to-blue-600 cursor-pointer p-1 rounded-md mt-5 shadow-sm shadow-white" onClick={handleSave}>Save</button>)
            :
            (<button class="bg-gradient-to-r from-purple-800 to-blue-600 cursor-pointer p-1 rounded-md mt-5 shadow-sm shadow-white" onClick={handleUpdate}>Update</button>)
        }
        </div>
        </div>
    )
}
 
export default TaskDetails;