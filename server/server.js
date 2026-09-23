import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import visitorRoutes from './routes/visitorRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/schedules', scheduleRoutes);

app.get('/', (req, res) => {
  res.send('DriveHub API server running');
});

// Basic 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'API Route Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
