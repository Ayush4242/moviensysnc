import Vehicle from '../models/Vehicle.js';
import Driver from '../models/Driver.js';

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate('vendor', 'name type')
      .populate('driver', 'name phone');
    return res.json(vehicles);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const createVehicle = async (req, res) => {
  const { registrationNumber, model, seatingCapacity, fuelType, vendor, driver, status } = req.body;

  if (!registrationNumber || !model || !seatingCapacity || !vendor) {
    return res.status(400).json({ message: 'Vehicle registration number, model, seating capacity, and vendor are required.' });
  }

  try {
    const existing = await Vehicle.findOne({ registrationNumber });
    if (existing) {
      return res.status(400).json({ message: 'Vehicle with this registration number already exists.' });
    }

    const vehicle = new Vehicle({
      registrationNumber,
      model,
      seatingCapacity,
      fuelType: fuelType || 'DIESEL',
      vendor,
      driver: driver || null,
      status: status || 'ACTIVE',
    });

    const saved = await vehicle.save();

    if (driver) {
      await Driver.findByIdAndUpdate(driver, { vehicle: saved._id });
    }

    const populated = await Vehicle.findById(saved._id)
      .populate('vendor', 'name type')
      .populate('driver', 'name phone');
    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const previousDriverId = vehicle.driver;
    Object.assign(vehicle, req.body);
    const updated = await vehicle.save();

    // If driver changed, sync driver model reference
    if (req.body.driver !== undefined && String(req.body.driver) !== String(previousDriverId)) {
      if (previousDriverId) {
        await Driver.findByIdAndUpdate(previousDriverId, { vehicle: null });
      }
      if (req.body.driver) {
        await Driver.findByIdAndUpdate(req.body.driver, { vehicle: updated._id });
      }
    }

    const populated = await Vehicle.findById(updated._id)
      .populate('vendor', 'name type')
      .populate('driver', 'name phone');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    if (vehicle.driver) {
      await Driver.findByIdAndUpdate(vehicle.driver, { vehicle: null });
    }
    await vehicle.deleteOne();
    return res.json({ message: 'Vehicle deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
