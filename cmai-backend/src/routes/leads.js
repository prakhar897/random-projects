import express from 'express';
import multer from 'multer';
import { createLeads, getLeads } from '../controllers/leadsController';

const router = express.Router();
const upload = multer();

router.post('/', upload.single('file'), createLeads);
router.get('/', getLeads);

export default router;