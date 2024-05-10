import express from "express";
import { createUser,updateUser,getUserById } from "../controllers/user.controller";

const router = express.Router();

router.post('/createSpecificUser', createUser);
router.patch('/updateUser/:id', updateUser);
router.get('/user/:id', getUserById);

export default router; 