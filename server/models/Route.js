import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pickupPoint: { type: String, required: true },
    dropPoint: { type: String, required: true },
    startTime: { type: String, required: true }, // Format HH:mm
    endTime: { type: String, required: true },   // Format HH:mm
  },
  { timestamps: true }
);

const Route = mongoose.model('Route', routeSchema);
export default Route;
