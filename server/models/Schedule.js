import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema(
  {
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    date: { type: String, required: true }, // Format YYYY-MM-DD
    startTime: { type: String, required: true }, // e.g. "09:00"
    endTime: { type: String, required: true },   // e.g. "17:00"
    breakStart: { type: String, required: true },// e.g. "13:00"
    breakEnd: { type: String, required: true },  // e.g. "14:00"
  },
  { timestamps: true }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;
