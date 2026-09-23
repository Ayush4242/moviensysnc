import Driver from '../models/Driver.js';

export const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find()
      .populate('vendor', 'name type')
      .populate('vehicle', 'registrationNumber model');
    return res.json(drivers);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const createDriver = async (req, res) => {
  const { name, phone, licenseNumber, vendor, vehicle, licenseExpiry, documents } = req.body;

  if (!name || !phone || !licenseNumber || !vendor || !licenseExpiry) {
    return res.status(400).json({ message: 'Driver name, phone, license number, vendor, and license expiry are required.' });
  }

  try {
    const defaultDocs = documents || [
      { docType: 'Driving License', documentNumber: licenseNumber, expiryDate: licenseExpiry, status: 'Valid' },
      { docType: 'RC', documentNumber: 'RC-' + Math.floor(1000 + Math.random() * 9000), expiryDate: new Date(Date.now() + 365 * 86400000), status: 'Valid' },
      { docType: 'Permit', documentNumber: 'PERMIT-' + Math.floor(1000 + Math.random() * 9000), expiryDate: new Date(Date.now() + 180 * 86400000), status: 'Valid' },
      { docType: 'Pollution Certificate', documentNumber: 'PUC-' + Math.floor(1000 + Math.random() * 9000), expiryDate: new Date(Date.now() + 90 * 86400000), status: 'Valid' }
    ];

    const driver = new Driver({
      name,
      phone,
      licenseNumber,
      vendor,
      vehicle: vehicle || null,
      licenseExpiry,
      documents: defaultDocs,
    });

    const saved = await driver.save();
    const populated = await Driver.findById(saved._id)
      .populate('vendor', 'name type')
      .populate('vehicle', 'registrationNumber model');
    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    Object.assign(driver, req.body);
    const updated = await driver.save();
    const populated = await Driver.findById(updated._id)
      .populate('vendor', 'name type')
      .populate('vehicle', 'registrationNumber model');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    await driver.deleteOne();
    return res.json({ message: 'Driver deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
