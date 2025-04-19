// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ewe111vijay:01Bzd9eV1Y9A0GnK@cluster0.wc35e.mongodb.net/InternsPortal?retryWrites=true&w=majority';

// const internSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   phone: String,
//   address: String,
//   email: String,
//   university: String,
//   period: String,
//   domain: String,
//   department: String,
//   linkedin: String,
//   profilePic: Buffer,
//   resume: Buffer,
//   assignedProject: { type: String, default: "" },
//   progress: { type: Number, default: 0 } // Progress in percentage
// });

// let cached = global.mongoose;
// if (!cached) cached = global.mongoose = { conn: null, promise: null };

// async function connectDB() {
//   if (cached.conn) return cached.conn;
//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => mongoose);
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export async function GET() {
//   try {
//     await connectDB();
//     const Intern = mongoose.models.Intern || mongoose.model('Intern', internSchema, 'internsList');
//     const interns = await Intern.find({});
//     const internsData = interns.map(intern => ({
//       ...intern.toObject(),
//       id: intern._id.toString(),
//       _id: undefined
//     }));
//     return NextResponse.json(internsData);
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
// export async function PUT(req) {
//   try {
//     const { id, assignedProject, progress } = await req.json();
//     await connectDB();
//     const Intern = mongoose.models.Intern || mongoose.model('Intern', internSchema, 'internsList');

//     // ✅ Ensure `id` is a valid ObjectId
//     const updatedIntern = await Intern.findByIdAndUpdate(
//       new mongoose.Types.ObjectId(id), 
//       { assignedProject, progress }, 
//       { new: true } // Return updated document
//     );

//     if (!updatedIntern) {
//       return NextResponse.json({ error: 'Intern not found' }, { status: 404 });
//     }

//     return NextResponse.json(updatedIntern);
//   } catch (error) {
//     console.error('Error updating intern:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
