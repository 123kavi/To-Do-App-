import { TaskContext } from "../context/taskContext";
import { useContext } from "react";
export const useTasksContext = () => {
        const context=useContext(TaskContext)
        if(!context){
            throw Error("useTasksContext must be used inside a taskContextProvider")
        }
        return context
}