//require mongoose
const mongoose=require('mongoose')
//initiate schema creation
const Schema=mongoose.Schema
//create schema
const taskShema=new Schema({
    taskInfo:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('task',taskShema)