import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  docType: { type: String, required: true }, // e.g. 'Driving License', 'RC', 'Permit', 'Pollution Certificate'
  documentNumber: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  status: { type: String, default: 'Valid' },
});

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', default: null },
    licenseExpiry: { type: Date, required: true },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    documents: [documentSchema],
  },
  { timestamps: true }
);

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;
