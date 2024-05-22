import { Request, Response } from 'express';
import Subscription from '../models/Subscription';

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { name, email, plan } = req.body;
    const subscription = await Subscription.create({ name, email, plan });
    res.status(201).json(subscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await Subscription.findAll();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};