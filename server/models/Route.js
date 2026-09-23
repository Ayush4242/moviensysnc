import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pickupPoint: { type: String, required: true },
    dropPoint: { type: String, required: true },
    startTime: { type: String, required: true }, 
    endTime: { type: String, required: true },   
  },
  { timestamps: true }
);

const Route = mongoose.model('Route', routeSchema);
export default Route;
