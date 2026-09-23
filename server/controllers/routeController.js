import Route from '../models/Route.js';

export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find().sort({ name: 1 });
    return res.json(routes);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const createRoute = async (req, res) => {
  const { name, pickupPoint, dropPoint, startTime, endTime } = req.body;
  if (!name || !pickupPoint || !dropPoint || !startTime || !endTime) {
    return res.status(400).json({ message: 'Route name, pickup point, drop point, start time, and end time are required.' });
  }

  try {
    const route = new Route({ name, pickupPoint, dropPoint, startTime, endTime });
    const saved = await route.save();
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const updateRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    Object.assign(route, req.body);
    const updated = await route.save();
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    await route.deleteOne();
    return res.json({ message: 'Route deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
