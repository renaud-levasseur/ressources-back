import express from "express";
import { createChat, getChats, getChatsByResourceId, getChatsByUserId, getChatById, updateChat, deleteChat,} from "../controllers/chat.controller";

const router = express.Router();

router.post('/chats', createChat);
router.get('/chats', getChats);
router.get('/chats/resources/:resourceId', getChatsByResourceId);
router.get('/chats/users/:userId', getChatsByUserId);
router.get('/chats/:id', getChatById);
router.put('/chats/:id', updateChat);
router.delete('/chats/:id', deleteChat);

export default router;
