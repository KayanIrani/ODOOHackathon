import User from "../models/users.model.js"
import mongoose  from "mongoose"


export const getUsers = async (req,res) =>{
    try {
        const users = await User.find({});
        res.status(200).json({success:true,data:users})
    } catch (error) {
        console.log("Error: ",error.message);
        res.status(500).json({success: false,data: "Users are empty"});
    }
};

export const getSpecificUser = async (req,res) =>{
    const userInput = req.query;
    if (!userInput.name){
        return res.status(400).json({success: false,data: "Please Provide all the fields"});
    }
    else{
        try {
            const user = await User.find({Username:userInput.name});
            console.log(user)
            res.status(200).json({success: true, data: user});
        }
        catch(error){
            console.log("Error: ",error.message);
            res.status(500).json({success: false,data: "Invalid Username"});
        }
    }
}

export const createUser = async (req,res)=>{
    const user = req.body;

    if (!user.UserFirstName || !user.UserLastName || !user.UserEmail || !user.Username || !user.UserPassword || !user.UserImage){
        return res.status(400).json({success: false,message: "Please Provide all the fields"});
    }
    const newUser = User.create(user);

    try {
        // await newUser.save();
        res.status(200).json({success: true,data: newUser});
    } catch (error) {
        console.error('Error: ',error);
        return res.status(500).json({success: false,message: "Internal Sever Error"});
    }
};

export const deleteUser = async (req,res)=>
{
    const {id} = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({success: true, data: "Chosen User Deleted Successfully"});
    } catch (error) {
        res.status(404).json({success:false,data:"Couldn't find User"})
    }
};