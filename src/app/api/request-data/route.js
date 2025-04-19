import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Inter } from "next/font/google";

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
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Model definition
function getInternModel() {
  console.log(mongoose.models);
  if (mongoose.models.Intern) return mongoose.models.Intern;
  return mongoose.model("Intern", internSchema, "interns");
}

export async function GET() {
  try {
    await connectDB();
    const Intern = getInternModel();
    const interns = await Intern.find({ progress: 0 }).sort({ createdAt: -1 });
    
    const internsData = interns.map((intern) => {
      const resumeBuffer = intern.resume;
      let resumeUrl = "";
      try {
        resumeUrl = resumeBuffer
          ? Buffer.from(resumeBuffer).toString("base64")
          : "";
        resumeUrl = Buffer.from(resumeUrl, "base64").toString("utf8");
      } catch (err) {
        console.error("Error decoding resume for intern", intern._id, err);
      }
      return {
        ...intern.toObject(),
        id: intern._id.toString(),
        resume: resumeUrl,
        _id: undefined,
      };
    });
    console.log("Enter", interns);

    return NextResponse.json(internsData);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    // Parse request body
    const { id, Type } = await req.json();

    // Validate inputs
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid or missing id" },
        { status: 400 }
      );
    }
    if (!Type || typeof Type !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing Type" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();
    const Intern = getInternModel();

    // Handle operation based on Type
    const typeLower = Type.toLowerCase();
    if (typeLower === "accept") {
      const updatedIntern = await Intern.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        { progress: 1 },
        { new: true }
      );

      if (!updatedIntern) {
        return NextResponse.json(
          { error: "Intern not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        ...updatedIntern.toObject(),
        id: updatedIntern._id.toString(),
        _id: undefined,
      });
    } else if (typeLower === "delete") {
      const deletedIntern = await Intern.findByIdAndDelete(
        new mongoose.Types.ObjectId(id)
      );

      if (!deletedIntern) {
        return NextResponse.json(
          { error: "Intern not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: "Intern deleted successfully", id });
    } else {
      return NextResponse.json(
        { error: "Invalid Type value" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in PUT route:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
