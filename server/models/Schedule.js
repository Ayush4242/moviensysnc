import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema(
  {
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    date: { type: String, required: true }, 
    startTime: { type: String, required: true }, 
    endTime: { type: String, required: true },   
    breakStart: { type: String, required: true },
    breakEnd: { type: String, required: true },  
  },
  { timestamps: true }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;
