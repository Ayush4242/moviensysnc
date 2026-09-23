import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    purpose: { type: String, required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    visitDate: { type: String, required: true }, 
    startTime: { type: String, required: true }, 
    endTime: { type: String, required: true },   
    photo: { type: String, default: '' },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'CHECKED_IN', 'CHECKED_OUT'],
      default: 'PENDING',
    },
    checkInTime: { type: Date, default: null },
    checkOutTime: { type: Date, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;
