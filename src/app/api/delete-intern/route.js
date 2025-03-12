import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ewe111vijay:01Bzd9eV1Y9A0GnK@cluster0.wc35e.mongodb.net/InternsPortal?retryWrites=true&w=majority';

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
    cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const Intern = mongoose.models.Intern || mongoose.model('Intern', internSchema, 'internsList');
    const { id } = params;
    await Intern.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Intern deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const Intern = mongoose.models.Intern || mongoose.model('Intern', internSchema, 'internsList');
    const { id } = params;
    const body = await request.json();
    const updatedIntern = await Intern.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updatedIntern);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}