import express from "express";
import { GetFilesByRessourceId, createRessource, deleteRessource, getRessourceById, getRessources, updateRessource } from "../controllers/ressource.controller";

const router = express.Router();

router.post('/createRessource', createRessource);
router.get('/ressources', getRessources);
router.get('/ressourceFiles/:id', GetFilesByRessourceId);
router.get('/ressource/:id', getRessourceById);
router.patch('/updateRessource/:id', updateRessource);
router.delete('/deleteRessource/:id', deleteRessource);

export default router;