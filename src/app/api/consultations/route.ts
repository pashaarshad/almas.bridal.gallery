import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, weddingDate, coutureType, consultationType, message } = body;

    // Basic validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required fields." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "almas_bridal_db");
    const consultationsCollection = db.collection("consultations");

    const newConsultation = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      weddingDate: weddingDate || null,
      coutureType: coutureType || "Bridal Lehenga",
      consultationType: consultationType || "Dubai Atelier (In-Person)",
      message: message ? message.trim() : "",
      status: "pending",
      createdAt: new Date(),
      source: "website_modal",
    };

    const result = await consultationsCollection.insertOne(newConsultation);

    return NextResponse.json(
      {
        success: true,
        message: "Consultation request saved successfully.",
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving consultation to MongoDB:", error);
    return NextResponse.json(
      { error: "Internal server error. Failed to save consultation." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "almas_bridal_db");
    const consultations = await db
      .collection("consultations")
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ success: true, count: consultations.length, data: consultations });
  } catch (error: any) {
    console.error("Error fetching consultations:", error);
    return NextResponse.json(
      { error: "Failed to retrieve consultations." },
      { status: 500 }
    );
  }
}
