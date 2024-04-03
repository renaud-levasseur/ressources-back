import express from "express";
import { createChat, getChats, getChatsByRessourceId, getChatsByUserId, getChatById, updateChat, deleteChat,} from "../controllers/chat.controller";

const router = express.Router();

router.post('/createChat', createChat);
router.get('/chats', getChats);
router.get('/ressourceChats/:id', getChatsByRessourceId);
router.get('/userChats/:id', getChatsByUserId);
router.get('/chat/:id', getChatById);
router.patch('/updateChat/:id', updateChat);
router.delete('/deleteChat/:id', deleteChat);

export default router;
