import { Request, Response } from 'express';
import Lead from '../models/Lead';
import csvParser from '../utils/csvParser';

export const createLeads = async (req: Request, res: Response) => {
  try {
    const leads = await csvParser(req.file.buffer);
    const newLeads = await Lead.bulkCreate(leads);
    res.status(201).json(newLeads);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.findAll();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};