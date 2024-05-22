import express, { Application, Request, Response } from 'express';
import sequelize from './db';
import campaignsRouter from './routes/campaigns';
import leadsRouter from './routes/leads';
import subscriptionsRouter from './routes/subscriptions';

const app: Application = express();

// Middleware
app.use(express.json());

// Connect to PostgreSQL
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Routes
app.use('/api/campaigns', campaignsRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/subscriptions', subscriptionsRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});