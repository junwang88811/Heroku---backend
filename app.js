import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import subscribeRoutes from './routes/subscribeRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import landingRecipeRoutes from './routes/landingRecipeRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { logRequest } from './utils/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';
// import { FirebaseApp } from './Config/FirebaseConfig.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://wangs-kitchen.vercel.app'], // Frontend URL
    methods: 'GET,POST,PUT,DELETE, PATCH', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  })
);

app.use(express.json());
app.use(logRequest);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/landing-recipe', landingRecipeRoutes);
app.use('/api/order', orderRoutes);

app.use('/api/chat', chatRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/subscribe', subscribeRoutes);

app.use(errorHandler);

// Uncomment if needed for Firebase test endpoint
// app.get('/', async (req, res) => {
//   try {
//     res.json({ message: 'Firebase is working!', firebaseAppName: FirebaseApp.name });
//   } catch (error) {
//     res.status(500).json({ error: 'Firebase test failed', details: error.message });
//   }
// });

export default app;
