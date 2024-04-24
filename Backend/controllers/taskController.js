const mongoose=require('mongoose')
//import task schema
const Task=require('../models/taskModel')
//post task
const createTask=async(req,res)=>{
    const {taskInfo,description,duration}=req.body
    try {
        const user_id=req.user._id
        const task=await Task.create({taskInfo,description,duration,user_id})
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error:"All fields must be filled"})
    }
}
// get all tasks
const getTasks=async(req,res)=>{
    const user_id=req.user._id
    try {
        const tasks=await Task.find({user_id}).sort({createdAt:-1})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
// get a single tasks
const getTask=async(req,res)=>{
    const {id}=req.params
    try {
        const task=await Task.findById(id)
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({mssg:"No such task available"})
        }
        if(!task){
            return res.status(400).json({mssg:"No such task found"})
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({mssg:"Can't get tasks"})
    }
}
//delete task
const deleteTask=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({mssg:"No such task found!"})
    }
    const task=await Task.findOneAndDelete({_id:id})
    if(!task){
        res.status(400).json({mssg:"No task found"})
    }
    console.log("Task deleted successfully!")
    res.status(200).json(task)
}
//update task
const updateTask=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(400).json({mssg:"No such task found"})
    }
    const task=await Task.findOneAndUpdate({_id:id},{...req.body})
    if(!task){
       return res.status(400).json({mssg:"No task found"})
    }
    console.log("Task updated successfully!")
    console.log(task)
    return res.status(200).json(task)
}
module.exports={
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
}
