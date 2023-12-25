const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'wfvwuvgvby23trr327ybqdba';

const signup = async (req,res)=>{
    const {username, email, password} = req.body;
    try{
        const existingUser = await userModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"User already exist"});
        }

        const hashPassword = await bcrypt.hash(password,10);

        const result = await userModel.create({
            username: username,
            email:email,
            password: hashPassword
        })

        const token = jwt.sign({ email:result.email, id:result._id },SECRET_KEY);

        res.status(201).json({
            user:result,
            token:token
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"something went wrong"
        })
    }
}

const signin = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({email:email});

        if(!existingUser){
            return res.status(404).json({message:"user not found"});
        }

        const matchPassword = await bcrypt.compare(password,existingUser.password);

        if(!matchPassword){
            return res.status(400).json("Invalid password");
        }

        const token = jwt.sign({ email:existingUser.email,id:existingUser._id },SECRET_KEY);

        res.status(201).json({
            user: existingUser,
            token: token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"something went wrong"
        })
    }
}

module.exports = {signin,signup};