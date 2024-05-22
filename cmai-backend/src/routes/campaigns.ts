import express from 'express';
import { createCampaign, getCampaigns } from '../controllers/campaignsController';

const router = express.Router();

router.post('/', createCampaign);
router.get('/', getCampaigns);

export default router;