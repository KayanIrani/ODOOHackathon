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
    const userInput = req.body;
    if (!userInput.name){
        return res.status(400).json({success: false,data: "Please Provide all the fields"});
    }
    else{
        try {
            const user = await User.find({name:userInput.name});
            console.log(user)
            res.status(200).json({success: true, data: user});
        }
        catch(error){
            console.log("Error: ",error.message);
            res.status(500).json({success: false,data: "Invalid Username"});
        }
    }
}

export const deleteUser = async (req,res)=>
{
    const {id} = req.params;
    // console.log("ID :",id);
    try {
        await Chat.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Chosen Chat Deleted Successfully"});
    } catch (error) {
        res.status(404).json({success:false,message:"Couldn't find chat"})
    }
};