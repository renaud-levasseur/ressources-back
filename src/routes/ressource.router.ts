import express from "express";
import { createRessource, getAllRessources, getCommentsByRessourceId, sendCommentRessource, toggleFavoriteRessource, toggleLikeRessource } from "../controllers/ressource.controller";
import upload from "../middleware/upload.middleware";
import { CategoryName, RelationName, RessourceTypeName } from "../shared/enums";

const router = express.Router();

//Ressources
router.post('/createRessource/:userId', upload.array('files') , createRessource);
router.get('/getAllRessources', getAllRessources);

//Comments
router.post('/sendComment/:userId/:ressourceId', sendCommentRessource);
router.get('/getCommentsRessources/:ressourceId', getCommentsByRessourceId);

//Likes and Favorites
router.post('/toggleLike/:userId/:ressourceId', toggleLikeRessource);
router.post('/toggleFavorite/:userId/:ressourceId', toggleFavoriteRessource);

// Get enums ressources
router.get('/enumsRessource', (_req, res) => { 
    res.json({
        categories: Object.values(CategoryName),
        ressourcesTypes: Object.values(RessourceTypeName),
        relations: Object.values(RelationName)
    });
});

export default router;