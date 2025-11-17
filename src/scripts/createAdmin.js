// src/scripts/createAdmin.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import 'dotenv/config';

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected');

    const adminPhone = '+380671234567'; // CHANGED!!!
    const adminPassword = 'admin123'; // CHANGED!!!

    const exists = await User.findOne({ phone: adminPhone });

    if (exists) {
      console.log('A user with this phone number already exists.');

      // Update role to admin
      exists.role = 'admin';
      exists.password = await bcrypt.hash(adminPassword, 10);
      await exists.save();

      console.log('User upgraded to admin');
      console.log(`Phone: ${adminPhone}`);
      console.log(`Password: ${adminPassword}`);

      process.exit(0);
    }

    // Create a new administrator
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await User.create({
      name: 'Admin',
      phone: adminPhone,
      password: hashedPassword,
      lastname: 'Administrator',
      email: 'admin@clothica.com',
      role: 'admin',
    });

    console.log('Admin created:');
    console.log(`Phone: ${admin.phone}`);
    console.log(`Password: ${adminPassword}`);
    console.log('You MUST change your password after your first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();