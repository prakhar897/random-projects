import { Request, Response } from 'express';
import Campaign from '../models/Campaign';
import Lead from '../models/Lead';

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const { title, leadIds } = req.body;
    const leads = await Lead.findAll({ where: { id: leadIds } });
    const campaign = await Campaign.create({ title });
    await campaign.addLeads(leads);
    res.status(201).json(campaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.findAll({ include: [Lead] });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};