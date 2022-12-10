import express from 'express';
import { createSets, getSets } from '../controllers/sets.js';

const router = express.Router();

router.post('/', createSets);

export default router;
