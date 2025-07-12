import mongoose from "mongoose";
import express from 'express';
import dotenv from "dotenv";
import path from 'path';
import router from "./routes/users.route.js";
import { ConnectDB } from "./config/db.js";
const app = express();
const __dirname = path.resolve()

dotenv.config()
app.use(express.json());
app.use("/api/users",router)
app.listen(5000,()=>{
    ConnectDB();
    console.log("Server at http://localhost:5000");
});

