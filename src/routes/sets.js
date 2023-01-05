import express from 'express';
import { createSets, getSets } from '../controllers/sets.js';

const router = express.Router();

router.get('/', getSets);

export default router;
