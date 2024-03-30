import express from "express";
import { GetRessourcesByUserId, createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller";

const router = express.Router();

router.post('/createUser', createUser);
router.get('/users', getUsers);
router.get('/userRessources/:id', GetRessourcesByUserId);
router.get('/user/:id', getUserById);
router.patch('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

export default router;