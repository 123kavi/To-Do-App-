// require express
const express=require('express')
//require controller functions
const { loginUser, signupUser } = require('../controllers/userController')
//use express router
const router=express.Router()
//login route
router.post('/login',loginUser)
//signup route
router.post('/signup',signupUser)
// export router
module.exports=router