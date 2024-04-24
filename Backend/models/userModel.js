//require mongoose
const mongoose=require('mongoose')
// require bcrypty
const bcrypt=require('bcrypt')
//require validator
const validator=require('validator')
//initiate schema creation
const Schema=mongoose.Schema
//create schema
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
//create a static method
userSchema.statics.signup=async function(email,password){
    //validation
    if(!email){
        throw Error("Email must be filled")
    }
    if(!password){
        throw Error("Password must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Enter a Valid Email")
    }
    if(!validator.isStrongPassword(password)){
        throw Error ("Enter a strong password")
    }
    const exists = await this.findOne({ email })
    if(exists){
        throw Error ("Email already in use")
    }
    // generate a salt
    const salt=await bcrypt.genSalt(5)
    //hash password
    const hash=await bcrypt.hash(password,salt)
    // create user record/document
    const user=await this.create({email,password:hash})

    return user
}

// create a static login method
userSchema.statics.login=async function(email,password){
        //validation
        if(!email){
            throw Error("Email must be filled")
        }
        if(!password){
            throw Error("Password must be filled")
        }
        const user = await this.findOne({ email })
        if(!user){
            throw Error ("Email doesn't exist")
        }
        // compare the passwords
        const match=await bcrypt.compare(password,user.password)
        if(!match){
            throw Error("Incorrect passoword")
        }

        return user

}
//export model
module.exports=mongoose.model('User',userSchema)