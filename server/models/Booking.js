import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
    date: { type: String, required: true }, // Format YYYY-MM-DD
    time: { type: String, required: true }, // Format HH:mm
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
