import express from "express";
import { GetCommentsByRessourceId, GetCommentsByUserId, createComment, deleteComment, getCommentById, getComments, updateComment } from "../controllers/comment.controller";

const router = express.Router();

router.post('/createComment', createComment);
router.get('/comments', getComments);
router.get('/ressourceComments/:id', GetCommentsByRessourceId);
router.get('/userComments/:id', GetCommentsByUserId);
router.get('/comment/:id', getCommentById);
router.patch('/updateComment/:id', updateComment);
router.delete('/deleteComment/:id', deleteComment);

export default router;