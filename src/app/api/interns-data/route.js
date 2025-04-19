import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://owaisiqbal2021:EduTrack123@cluster0.3ehm2.mongodb.net/LInternshipPortal";

// Schema definition
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
  resume: Buffer,
  assignedProject: { type: String, default: "" },
  progress: { type: Number, default: 0 },
  seen: { type: Boolean, default: false },
});

// Database connection caching
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

// Model definition
function getInternModel() {
  if (mongoose.models.Intern) return mongoose.models.Intern;
  return mongoose.model('Intern', internSchema, 'interns');
}

export async function GET() {
  try {
    await connectDB();
    const Intern = getInternModel();
    const interns = await Intern.find({ progress: { $ne: 0 } });

    const internsData = interns.map(intern => ({
      ...intern.toObject(),
      id: intern._id.toString(),
      _id: undefined
    }));
    return NextResponse.json(internsData);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, assignedProject, progress } = await req.json();
    await connectDB();
    const Intern = getInternModel();

    const updatedIntern = await Intern.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      { assignedProject, progress },
      { new: true }
    );

    if (!updatedIntern) {
      return NextResponse.json({ error: 'Intern not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...updatedIntern.toObject(),
      id: updatedIntern._id.toString(),
      _id: undefined
    });
  } catch (error) {
    console.error('Error updating intern:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}