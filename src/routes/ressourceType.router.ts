import express from "express";
import { GetRessourcesByRessourceTypeId, createRessourceType, deleteRessourceType, getRessourceTypeById, getRessourceTypes, updateRessourceType } from "../controllers/ressourceType.controller";

const router = express.Router();

router.post('/createRessourceType', createRessourceType);
router.get('/ressourceTypes', getRessourceTypes);
router.get('/ressourceTypeRessources/:id', GetRessourcesByRessourceTypeId);
router.get('/ressourceType/:id', getRessourceTypeById);
router.patch('/updateRessourceType/:id', updateRessourceType);
router.delete('/deleteRessourceType/:id', deleteRessourceType);

export default router;