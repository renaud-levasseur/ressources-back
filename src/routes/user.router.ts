import express from "express";
import { createUser, deleteUser, getUserById, updateUser } from "../controllers/user.controller";

const router = express.Router();

router.post('/create-user', createUser);
router.get('/user/:id', getUserById);
router.patch('update-user/:id', updateUser);
router.delete('delete-user/:id', deleteUser);

export default router;