import Booking from '../models/Booking.js';

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('employee', 'name email')
      .populate('route', 'name pickupPoint dropPoint startTime endTime')
      .populate('driver', 'name phone')
      .sort({ createdAt: -1 });
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const createBooking = async (req, res) => {
  const { route, driver, date, time } = req.body;
  const employee = req.user._id;

  if (!route || !date || !time) {
    return res.status(400).json({ message: 'Route, booking date, and time are required.' });
  }

  try {
    const booking = new Booking({
      employee,
      route,
      driver: driver || null,
      date,
      time,
      status: 'CONFIRMED',
    });

    const saved = await booking.save();
    const populated = await Booking.findById(saved._id)
      .populate('employee', 'name email')
      .populate('route', 'name pickupPoint dropPoint startTime endTime')
      .populate('driver', 'name phone');
    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    Object.assign(booking, req.body);
    const updated = await booking.save();
    const populated = await Booking.findById(updated._id)
      .populate('employee', 'name email')
      .populate('route', 'name pickupPoint dropPoint startTime endTime')
      .populate('driver', 'name phone');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    booking.status = 'CANCELLED';
    const updated = await booking.save();
    const populated = await Booking.findById(updated._id)
      .populate('employee', 'name email')
      .populate('route', 'name pickupPoint dropPoint startTime endTime')
      .populate('driver', 'name phone');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await booking.deleteOne();
    return res.json({ message: 'Booking deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
