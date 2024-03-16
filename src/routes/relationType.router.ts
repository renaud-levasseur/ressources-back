import express from "express";
import { createRelationType, deleteRelationType, getRelationTypeById, getRelationTypes, getRessourcesByRelationTypeId, updateRelationType } from "../controllers/relationType.controller";

const router = express.Router();

router.post('/createRelationType', createRelationType);
router.get('/relationTypes', getRelationTypes);
router.get('/relationTypeRessources/:id', getRessourcesByRelationTypeId);
router.get('/relationType/:id', getRelationTypeById);
router.patch('/updateRelationType/:id', updateRelationType);
router.delete('/deleteRelationType/:id', deleteRelationType);

export default router;