import express from "express";
import { createUser } from "../controllers/userController";

const router = express.Router();

router.post('/create-user', createUser);