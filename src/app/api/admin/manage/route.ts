import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

// Master access verification for store manager / admin
const ADMIN_SECRET = process.env.ADMIN_SECRET || "almas2026";

function verifyAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("x-admin-key") || req.nextUrl.searchParams.get("key");
  return authHeader === ADMIN_SECRET;
}

export async function GET(request: NextRequest) {
  try {
    if (!verifyAuth(request)) {
      return NextResponse.json({ error: "Unauthorized access to Almas Admin." }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "almas_bridal_db");

    const coupons = await db
      .collection("offline_coupons")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const consultations = await db
      .collection("consultations")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const stats = {
      totalCoupons: coupons.length,
      claimedCoupons: coupons.filter((c) => c.status === "CLAIMED").length,
      approvedCoupons: coupons.filter((c) => c.status === "APPROVED" || c.status === "REDEEMED").length,
      totalConsultations: consultations.length,
      storeCity: "Mumbai (Vakola, Santacruz East)",
    };

    return NextResponse.json({ success: true, stats, coupons, consultations });
  } catch (error: any) {
    console.error("Admin API GET error:", error);
    return NextResponse.json({ error: "Failed to load admin data." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!verifyAuth(request)) {
      return NextResponse.json({ error: "Unauthorized access to Almas Admin." }, { status: 401 });
    }

    const body = await request.json();
    const { id, type, action, notes, adminName } = body;

    if (!id || !action) {
      return NextResponse.json({ error: "Item id and action required." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "almas_bridal_db");

    const objectId = new ObjectId(id);

    if (type === "coupon") {
      const collection = db.collection("offline_coupons");
      const updateData: any = {
        status: action, // "APPROVED" | "REDEEMED" | "CLAIMED" | "REJECTED"
        updatedAt: new Date(),
        updatedBy: adminName || "Store Staff",
      };

      if (action === "APPROVED" || action === "REDEEMED") {
        updateData.redeemedAt = new Date();
      }

      if (notes) {
        updateData.notes = notes;
      }

      const result = await collection.updateOne({ _id: objectId }, { $set: updateData });

      return NextResponse.json({
        success: true,
        message: `Coupon status successfully updated to ${action}.`,
        result,
      });
    } else if (type === "consultation") {
      const collection = db.collection("consultations");
      const result = await collection.updateOne(
        { _id: objectId },
        {
          $set: {
            status: action, // "CONFIRMED" | "COMPLETED" | "CANCELLED"
            updatedAt: new Date(),
          },
        }
      );
      return NextResponse.json({
        success: true,
        message: `Consultation status updated to ${action}.`,
        result,
      });
    }

    return NextResponse.json({ error: "Invalid type provided." }, { status: 400 });
  } catch (error: any) {
    console.error("Admin API PATCH error:", error);
    return NextResponse.json({ error: "Failed to update item." }, { status: 500 });
  }
}
