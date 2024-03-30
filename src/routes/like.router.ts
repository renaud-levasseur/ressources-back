import express from "express";
import { GetLikesByRessourceId, GetLikesByUserId, createLike, deleteLike, getLikeById, getLikes } from "../controllers/like.controller";

const router = express.Router();

router.post('/createLike', createLike);
router.get('/likes', getLikes);
router.get('/ressourceLikes/:id', GetLikesByRessourceId);
router.get('/userLikes/:id', GetLikesByUserId);
router.get('/like/:id', getLikeById);
router.delete('/deleteLike/:id', deleteLike);

export default router;