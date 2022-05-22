const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator");
const { isErrorFounds, validationMessages } = require("../utils/errorHelper");
const {passwordHashing} = require("../utils/commonUtils");
const jwt = require("jsonwebtoken");

const signUp = async(req,res)=>{
    const {error} = validationResult(req.body);
    console.log(req.body);
    console.log(error);

    if (error) return res.status(400).json(error.details[0].message);
    let user = {};
    user = await User.findOne({$or: [{email:req.body.email}, {username: req.body.username}]});
    if(user) return res.status(400).send("User already registered");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    user = new User({username: req.body.username, email: req.body.email, password: hashedPassword})
    const token = user.generateJWT();
    await user.save();
    return res.status(201).send({
            message:"Registration Succesfull",
        })
}

const signIn = async(req,res)=>{
    
    const errors = validationMessages(validationResult(req).mapped());
    if (isErrorFounds(errors)) return res.status(400).json(errors)
    const { nslId, password } = req.body;
    const user = await User.findOne({ nslId }).lean();
    //if user not found
    if (!user) return res.status(400).json({ "message": "Wrong Credentials" });
    if(user.isFirstTimeLogin && user.password === password){ 
        const {password, ...rest} = user;
        const token = await jwt.sign(rest, process.env.JWT_SECRET_KEY, {expiresIn: "7d"});
        return res.status(200).json({"message": "Login Success", "data": rest, "token": token });
    } 
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) return res.status(400).json({ "message": "User or password Incorect" });
    const {password: pass, ...rest} = user;
    //after successfully -> token creation
    const token = await jwt.sign(rest, process.env.JWT_SECRET_KEY, {expiresIn: "7d"});
    return res.status(200).json({message:"Successfully Login","data": rest,"token":token, })
}

const passwordChange = async(req, res)=> {
    try{

        const {nslId, password} = req.body;
        const user= await User.findOne({nslId});
        if(!user) return res.status(400).json("error");
        await User.findOneAndUpdate({nslId}, {$set: {
            password: await passwordHashing(password)
        }})
    }catch(e){
        console.log(e);
        return res.status(500).json({"message": "Password not changes"})
    }
}

const createUser = async(req, res) => {
    try{
        if(req.user.role === "admin"|| req.user.role === "teamlead"){
            const {username, role,...rest} = req.body;
            const user = await new User({
                username: req.body.username, role: req.body.role,
                password: "12345",//using default password
                ...rest
            }).save();
            return res.status(200).json({"message": "user created", "data": user})
        }
        return res.status(400).json({"message": "You are not authorize to create user account"})
    }catch(err){
        console.log(err);
        return res.status(500).json({"message": "Account not create at this moment"})
    }
}

const findAllMember = async(req, res)=> {
    const users= await User.find({role: "user"});
    if(users.length > 0){

       return res.status(200).json({users});
    }
     return res.status(400).json({"message": "No data found"})
}
const findAllTeamLead = async(req, res)=> {
    const users= await User.find({role: "teamlead"});
    if(users.length > 0){
       return res.status(200).json({users});
    }
     return res.status(400).json({"message": "No data found"})
}


const getAlluser = async(req, res)=> {
    try{
        const user = await User.find({});
        const {password, ...rest} = user;
    return res.status(200).json({"data": rest});
}catch(e){
    return res.status(500).json({"message": "Problem in fetch user"});

}
}
module.exports = {
    signIn, signUp, passwordChange, createUser, getAlluser,findAllMember, findAllTeamLead
}