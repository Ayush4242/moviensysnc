import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Visitor from '../models/Visitor.js';
import Vendor from '../models/Vendor.js';
import Driver from '../models/Driver.js';
import Vehicle from '../models/Vehicle.js';
import Route from '../models/Route.js';
import Booking from '../models/Booking.js';
import Schedule from '../models/Schedule.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/moviesync');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Visitor.deleteMany({});
    await Vendor.deleteMany({});
    await Driver.deleteMany({});
    await Vehicle.deleteMany({});
    await Route.deleteMany({});
    await Booking.deleteMany({});
    await Schedule.deleteMany({});

    console.log('Cleared existing database collections.');

    
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@moviesync.com',
      password: 'password123',
      role: 'ADMIN',
    });

    const empUser1 = await User.create({
      name: 'Sarah Connor',
      email: 'employee@moviesync.com',
      password: 'password123',
      role: 'EMPLOYEE',
    });

    const empUser2 = await User.create({
      name: 'John Doe',
      email: 'john.doe@moviesync.com',
      password: 'password123',
      role: 'EMPLOYEE',
    });

    const securityUser = await User.create({
      name: 'Security Officer Guard',
      email: 'security@moviesync.com',
      password: 'password123',
      role: 'SECURITY',
    });

    const superVendorUser = await User.create({
      name: 'Apex Fleet Manager',
      email: 'vendor@moviesync.com',
      password: 'password123',
      role: 'SUPER_VENDOR',
    });

    await User.create({
      name: 'Sub Vendor Agent',
      email: 'subvendor@moviesync.com',
      password: 'password123',
      role: 'SUB_VENDOR',
    });

    const driverUser = await User.create({
      name: 'Rahul Sharma (Driver)',
      email: 'driver@moviesync.com',
      password: 'password123',
      role: 'DRIVER',
    });

    console.log('Created Seed Users.');

    
    const superVendor = await Vendor.create({
      name: 'ABC Fleet Logistics',
      email: 'contact@abcfleet.com',
      phone: '+91 9876543210',
      type: 'SUPER',
      parentVendor: null,
      canManageFleet: true,
      status: 'ACTIVE',
    });

    const regionalVendor = await Vendor.create({
      name: 'Punjab Fleet Services',
      email: 'punjab@abcfleet.com',
      phone: '+91 9876543211',
      type: 'REGIONAL',
      parentVendor: superVendor._id,
      canManageFleet: true,
      status: 'ACTIVE',
    });

    const cityVendor = await Vendor.create({
      name: 'Ludhiana City Logistics',
      email: 'ludhiana@abcfleet.com',
      phone: '+91 9876543212',
      type: 'CITY',
      parentVendor: regionalVendor._id,
      canManageFleet: false,
      status: 'ACTIVE',
    });

    console.log('Created Seed Vendors.');

    
    const vehicle1 = await Vehicle.create({
      registrationNumber: 'PB-10-AB-1234',
      model: 'Force Traveller 14 Seater',
      seatingCapacity: 14,
      fuelType: 'DIESEL',
      vendor: superVendor._id,
      status: 'ACTIVE',
    });

    const vehicle2 = await Vehicle.create({
      registrationNumber: 'PB-08-CD-5678',
      model: 'Tata Winger 12 Seater',
      seatingCapacity: 12,
      fuelType: 'CNG',
      vendor: regionalVendor._id,
      status: 'ACTIVE',
    });

    const vehicle3 = await Vehicle.create({
      registrationNumber: 'DL-01-EV-9999',
      model: 'Eicher Skyline EV Bus',
      seatingCapacity: 24,
      fuelType: 'ELECTRIC',
      vendor: cityVendor._id,
      status: 'ACTIVE',
    });

    console.log('Created Seed Vehicles.');

    
    const driver1 = await Driver.create({
      name: 'Rahul Sharma',
      phone: '+91 9123456789',
      licenseNumber: 'DL-1420110012345',
      vendor: superVendor._id,
      vehicle: vehicle1._id,
      licenseExpiry: new Date(Date.now() + 365 * 86400000), // 1 year valid
      status: 'ACTIVE',
      documents: [
        { docType: 'Driving License', documentNumber: 'DL-1420110012345', expiryDate: new Date(Date.now() + 365 * 86400000), status: 'Valid' },
        { docType: 'RC', documentNumber: 'RC-998811', expiryDate: new Date(Date.now() + 200 * 86400000), status: 'Valid' },
        { docType: 'Permit', documentNumber: 'PERMIT-443322', expiryDate: new Date(Date.now() + 150 * 86400000), status: 'Valid' },
        { docType: 'Pollution Certificate', documentNumber: 'PUC-112233', expiryDate: new Date(Date.now() - 5 * 86400000), status: 'Expired' }
      ]
    });

    const driver2 = await Driver.create({
      name: 'Amit Kumar',
      phone: '+91 9811223344',
      licenseNumber: 'PB-0820150098765',
      vendor: regionalVendor._id,
      vehicle: vehicle2._id,
      licenseExpiry: new Date(Date.now() + 180 * 86400000),
      status: 'ACTIVE',
      documents: [
        { docType: 'Driving License', documentNumber: 'PB-0820150098765', expiryDate: new Date(Date.now() + 180 * 86400000), status: 'Valid' },
        { docType: 'RC', documentNumber: 'RC-776655', expiryDate: new Date(Date.now() + 300 * 86400000), status: 'Valid' },
        { docType: 'Permit', documentNumber: 'PERMIT-889900', expiryDate: new Date(Date.now() + 90 * 86400000), status: 'Valid' },
        { docType: 'Pollution Certificate', documentNumber: 'PUC-445566', expiryDate: new Date(Date.now() + 60 * 86400000), status: 'Valid' }
      ]
    });

    const driver3 = await Driver.create({
      name: 'Vikram Singh',
      phone: '+91 9777888999',
      licenseNumber: 'HR-2620180054321',
      vendor: cityVendor._id,
      vehicle: vehicle3._id,
      licenseExpiry: new Date(Date.now() - 30 * 86400000), // Expired
      status: 'INACTIVE',
      documents: [
        { docType: 'Driving License', documentNumber: 'HR-2620180054321', expiryDate: new Date(Date.now() - 30 * 86400000), status: 'Expired' },
        { docType: 'RC', documentNumber: 'RC-112244', expiryDate: new Date(Date.now() + 120 * 86400000), status: 'Valid' },
        { docType: 'Permit', documentNumber: 'PERMIT-334455', expiryDate: new Date(Date.now() - 10 * 86400000), status: 'Expired' },
        { docType: 'Pollution Certificate', documentNumber: 'PUC-667788', expiryDate: new Date(Date.now() + 45 * 86400000), status: 'Valid' }
      ]
    });

    // Link vehicle to driver
    vehicle1.driver = driver1._id;
    await vehicle1.save();
    vehicle2.driver = driver2._id;
    await vehicle2.save();
    vehicle3.driver = driver3._id;
    await vehicle3.save();

    console.log('Created Seed Drivers.');

    // 5. Create Visitors
    const today = new Date().toISOString().split('T')[0];

    await Visitor.create({
      fullName: 'Robert Downey Jr.',
      phone: '+1 555-0199',
      email: 'robert@marvelstudios.com',
      company: 'Marvel Entertainment',
      purpose: 'Movie Sync Tech Demo',
      host: empUser1._id,
      visitDate: today,
      startTime: '09:30',
      endTime: '12:30',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      status: 'APPROVED',
      checkInTime: new Date(),
      createdBy: empUser1._id,
    });

    await Visitor.create({
      fullName: 'Emma Watson',
      phone: '+44 7700-9000',
      email: 'emma.watson@cinema.co.uk',
      company: 'Warner Bros',
      purpose: 'Script Audit & Transport Review',
      host: empUser1._id,
      visitDate: today,
      startTime: '14:00',
      endTime: '16:00',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      status: 'PENDING',
      createdBy: empUser1._id,
    });

    await Visitor.create({
      fullName: 'Christopher Nolan',
      phone: '+1 555-0188',
      email: 'nolan@syncproductions.com',
      company: 'Syncopy Films',
      purpose: 'Studio Location Visit',
      host: empUser2._id,
      visitDate: today,
      startTime: '11:00',
      endTime: '15:00',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      status: 'CHECKED_IN',
      checkInTime: new Date(),
      createdBy: empUser2._id,
    });

    console.log('Created Seed Visitors.');

    // 6. Create Routes
    const route1 = await Route.create({
      name: 'North Campus Shuttle',
      pickupPoint: 'North Metro Gate 2',
      dropPoint: 'MovieSync HQ Main Building',
      startTime: '08:30',
      endTime: '09:15',
    });

    const route2 = await Route.create({
      name: 'South Studio Express',
      pickupPoint: 'South Residential Complex',
      dropPoint: 'MovieSync Production Hub',
      startTime: '09:00',
      endTime: '09:45',
    });

    console.log('Created Seed Routes.');

    // 7. Create Shuttle Bookings
    await Booking.create({
      employee: empUser1._id,
      route: route1._id,
      driver: driver1._id,
      date: today,
      time: '08:30',
      status: 'CONFIRMED',
    });

    await Booking.create({
      employee: empUser2._id,
      route: route2._id,
      driver: driver2._id,
      date: today,
      time: '09:00',
      status: 'CONFIRMED',
    });

    await Booking.create({
      employee: empUser1._id,
      route: route1._id,
      driver: driver1._id,
      date: today,
      time: '17:30',
      status: 'PENDING',
    });

    console.log('Created Seed Bookings.');

    // 8. Create Driver Schedules
    await Schedule.create({
      driver: driver1._id,
      date: today,
      startTime: '09:00',
      endTime: '17:00',
      breakStart: '13:00',
      breakEnd: '14:00',
    });

    await Schedule.create({
      driver: driver2._id,
      date: today,
      startTime: '08:00',
      endTime: '16:00',
      breakStart: '12:00',
      breakEnd: '13:00',
    });

    await Schedule.create({
      driver: driver3._id,
      date: today,
      startTime: '10:00',
      endTime: '18:00',
      breakStart: '14:00',
      breakEnd: '15:00',
    });

    console.log('Created Seed Schedules.');

    console.log('Seed process completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seedData();
