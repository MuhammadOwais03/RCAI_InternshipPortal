import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
}

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
});

export async function PUT(req) {
  try {
    const { id, assignedProject, progress } = await req.json();
    await connectDB();
    const Intern = mongoose.models.Intern || mongoose.model('Intern', internSchema, 'internsList');

    // ✅ Ensure `id` is a valid ObjectId
    const updatedIntern = await Intern.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id), 
      { assignedProject, progress }, 
      { new: true } // Return updated document
    );

    if (!updatedIntern) {
      return NextResponse.json({ error: 'Intern not found' }, { status: 404 });
    }

    return NextResponse.json(updatedIntern);
  } catch (error) {
    console.error('Error updating intern:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
