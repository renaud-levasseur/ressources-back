import express from "express";
import { GetCategoriesByRessourceId, GetRessourcesByCategoryId, createRessourceCategory, deleteRessourceCategory, updateRessourceCategory } from "../controllers/ressourceCategory.controller";

const router = express.Router();

router.post('/createRessourceCategory', createRessourceCategory);
router.get('/categoryRessources/:id', GetRessourcesByCategoryId);
router.get('/ressourceCategories/:id', GetCategoriesByRessourceId);
router.patch('/updateRessourceCategory/:id', updateRessourceCategory);
router.delete('/deleteRessourceCategory/:id', deleteRessourceCategory);

export default router;