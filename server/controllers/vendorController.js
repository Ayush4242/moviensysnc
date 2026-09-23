import Vendor from '../models/Vendor.js';

export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('parentVendor', 'name type');
    return res.json(vendors);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const createVendor = async (req, res) => {
  const { name, email, phone, type, parentVendor, canManageFleet } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Vendor name, email, and phone are required.' });
  }

  try {
    const vendor = new Vendor({
      name,
      email,
      phone,
      type: type || 'SUPER',
      parentVendor: parentVendor || null,
      canManageFleet: canManageFleet !== undefined ? canManageFleet : true,
    });

    const saved = await vendor.save();
    const populated = await Vendor.findById(saved._id).populate('parentVendor', 'name type');
    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    Object.assign(vendor, req.body);
    const updated = await vendor.save();
    const populated = await Vendor.findById(updated._id).populate('parentVendor', 'name type');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const moveVendor = async (req, res) => {
  const { newParentId } = req.body;
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    if (newParentId === req.params.id) {
      return res.status(400).json({ message: 'Vendor cannot be its own parent' });
    }

    vendor.parentVendor = newParentId || null;
    const updated = await vendor.save();
    const populated = await Vendor.findById(updated._id).populate('parentVendor', 'name type');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const toggleDelegation = async (req, res) => {
  const { canManageFleet } = req.body;
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    vendor.canManageFleet = canManageFleet;
    const updated = await vendor.save();
    const populated = await Vendor.findById(updated._id).populate('parentVendor', 'name type');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    await vendor.deleteOne();
    return res.json({ message: 'Vendor deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
