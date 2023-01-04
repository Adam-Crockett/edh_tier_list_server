import express from 'express';
import { createSets, getSets } from '../controllers/sets.js';

const router = express.Router();

router.get('/sets', getSets);
router.post('/', getSets);

export default router;
