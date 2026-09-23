import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    seatingCapacity: { type: Number, required: true },
    fuelType: {
      type: String,
      enum: ['DIESEL', 'PETROL', 'CNG', 'ELECTRIC'],
      default: 'DIESEL',
    },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'MAINTENANCE'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;
