import express from "express";
import { GetParticipationsByRessourceId, GetParticipationsByUserId, createParticipation, deleteParticipation, getParticipationById, getParticipations } from "../controllers/participation.controller";

const router = express.Router();

router.post('/createParticipation', createParticipation);
router.get('/participations', getParticipations);
router.get('/ressourceParticipations/:id', GetParticipationsByRessourceId);
router.get('/userParticipations/:id', GetParticipationsByUserId);
router.get('/participation/:id', getParticipationById);
router.delete('/deleteParticipation/:id', deleteParticipation);

export default router;