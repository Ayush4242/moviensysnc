import Schedule from '../models/Schedule.js';

export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate('driver', 'name phone licenseNumber status')
      .sort({ date: -1 });
    return res.json(schedules);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const createSchedule = async (req, res) => {
  const { driver, date, startTime, endTime, breakStart, breakEnd } = req.body;
  if (!driver || !date || !startTime || !endTime || !breakStart || !breakEnd) {
    return res.status(400).json({ message: 'Driver, date, duty start time, duty end time, break start, and break end are required.' });
  }

  try {
    const schedule = new Schedule({
      driver,
      date,
      startTime,
      endTime,
      breakStart,
      breakEnd,
    });

    const saved = await schedule.save();
    const populated = await Schedule.findById(saved._id).populate('driver', 'name phone licenseNumber status');
    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    Object.assign(schedule, req.body);
    const updated = await schedule.save();
    const populated = await Schedule.findById(updated._id).populate('driver', 'name phone licenseNumber status');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    await schedule.deleteOne();
    return res.json({ message: 'Schedule deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
