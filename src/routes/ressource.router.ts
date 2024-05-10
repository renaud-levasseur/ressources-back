import express from "express";
import { createRessource, getAllRessources } from "../controllers/ressource.controller";
import upload from "../middleware/upload.middleware";
import { CategoryName, RelationName, RessourceTypeName } from "../shared/enums";

const router = express.Router();

router.post('/createRessource/:userId', upload.array('files') , createRessource);
router.get('/getAllRessources', getAllRessources);

// Get enums ressources
router.get('/enumsRessource', (_req, res) => { 
    res.json({
        categories: Object.values(CategoryName),
        ressourcesTypes: Object.values(RessourceTypeName),
        relations: Object.values(RelationName)
    });
});

export default router;