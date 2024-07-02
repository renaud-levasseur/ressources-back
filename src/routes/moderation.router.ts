import express from "express";
import { deleteComment, deleteRessource, getAllComments, getAllRessources } from "../controllers/moderation.controller";

const router = express.Router();

router.get('/getAllComments', getAllComments);
router.delete('/deleteComment/:commentId', deleteComment);

router.get('/getAllRessources', getAllRessources);
router.delete('/deleteRessource/:ressourceId', deleteRessource);


export default router;