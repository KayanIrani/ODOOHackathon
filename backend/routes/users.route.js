import express from 'express';
import { getUsers,getSpecificUser, deleteUser,createUser } from '../controllers/users.controller.js';

const router = express.Router();

router.get("/",getUsers);
router.get("/search",getSpecificUser);
router.post("/",createUser);
router.delete("/:id",deleteUser);

export default router;