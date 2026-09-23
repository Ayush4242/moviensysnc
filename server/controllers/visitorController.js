import Visitor from '../models/Visitor.js';

export const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find()
      .populate('host', 'name email role')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    return res.json(visitors);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id)
      .populate('host', 'name email role')
      .populate('createdBy', 'name email');
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    return res.json(visitor);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const createVisitor = async (req, res) => {
  const { fullName, phone, email, company, purpose, host, visitDate, startTime, endTime, photo } = req.body;

  if (!fullName || !phone || !email || !company || !purpose || !host || !visitDate || !startTime || !endTime) {
    return res.status(400).json({ message: 'Visitor full name, phone, email, company, purpose, host, visit date, start time, and end time are required.' });
  }

  try {
    const visitor = new Visitor({
      fullName,
      phone,
      email,
      company,
      purpose,
      host,
      visitDate,
      startTime,
      endTime,
      photo: photo || '',
      createdBy: req.user ? req.user._id : null,
      status: 'PENDING',
    });

    const createdVisitor = await visitor.save();
    const populated = await Visitor.findById(createdVisitor._id).populate('host', 'name email role');
    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    Object.assign(visitor, req.body);
    const updated = await visitor.save();
    const populated = await Visitor.findById(updated._id).populate('host', 'name email role');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    await visitor.deleteOne();
    return res.json({ message: 'Visitor removed' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const approveVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    visitor.status = 'APPROVED';
    const updated = await visitor.save();
    const populated = await Visitor.findById(updated._id).populate('host', 'name email role');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const rejectVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    visitor.status = 'REJECTED';
    const updated = await visitor.save();
    const populated = await Visitor.findById(updated._id).populate('host', 'name email role');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const checkInVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    visitor.status = 'CHECKED_IN';
    visitor.checkInTime = new Date();
    const updated = await visitor.save();
    const populated = await Visitor.findById(updated._id).populate('host', 'name email role');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const checkOutVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    visitor.status = 'CHECKED_OUT';
    visitor.checkOutTime = new Date();
    const updated = await visitor.save();
    const populated = await Visitor.findById(updated._id).populate('host', 'name email role');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
