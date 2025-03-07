import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file"); // Get uploaded file

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const data = await pdfParse(buffer); // Parse PDF content

    return NextResponse.json({ text: data.text }); // Return extracted text
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
