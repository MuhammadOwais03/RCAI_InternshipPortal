// app/api/save-intern/route.js
import { NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import mongoose from 'mongoose';

// MongoDB connection setup
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ewe111vijay:01Bzd9eV1Y9A0GnK@cluster0.wc35e.mongodb.net/InternsPortal?retryWrites=true&w=majority';

// Define Intern Schema
const internSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  email: String,
  university: String,
  period: String,
  domain: String,
  department: String,
  linkedin: String,
  profilePic: Buffer,
  resume: Buffer
});

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(mongoose => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export async function POST(request) {
  try {
    await connectDB();
    const Intern = mongoose.models.Intern || mongoose.model('Intern', internSchema, 'internsList');

    const formData = await request.formData();
    const entries = Array.from(formData.entries());
    
    const processedData = {
      profilePic: null,
      resume: null
    };

    for (const [key, value] of entries) {
      if (value instanceof File) {
        const buffer = Buffer.from(await value.arrayBuffer());
        if (key === 'profilePic') processedData.profilePic = buffer;
        if (key === 'resume') processedData.resume = buffer;
      } else {
        processedData[key] = value;
      }
    }

    const newIntern = new Intern(processedData);
    await newIntern.save();

    return NextResponse.json(
      { message: 'Intern data saved successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}