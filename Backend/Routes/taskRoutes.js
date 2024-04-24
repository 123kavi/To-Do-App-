//require express
const express=require('express')
//import controller
const {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
}=require('../controllers/taskController')

const requireAuth=require('../middleware/requireAuth')
const router=express.Router()
//require auth for all task routes
router.use(requireAuth)
// post tasks
router.post('/',createTask)
// get all tasks
router.get('/',getTasks)
// get a single tasks
router.get('/:id',getTask)
//delete a task
router.delete('/:id',deleteTask)
//update a task
router.patch('/:id',updateTask)
//export router
module.exports=router;