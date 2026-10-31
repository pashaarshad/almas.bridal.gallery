import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

function generateCouponCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ALMAS-10-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, weddingDate, preferredCity, bridalInterest } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required to claim the 10% voucher." },
        { status: 400 }
      );
    }

    const cleanPhone = phone.trim();
    const cleanEmail = email ? email.trim().toLowerCase() : "";

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "almas_bridal_db");
    const couponsCollection = db.collection("offline_coupons");

    // Check if phone number already registered for a coupon
    const existing = await couponsCollection.findOne({ phone: cleanPhone });
    if (existing) {
      return NextResponse.json(
        {
          success: true,
          alreadyIssued: true,
          message: "You have already claimed your 10% offline store discount code!",
          couponCode: existing.couponCode,
          status: existing.status,
          createdAt: existing.createdAt,
          discount: "10% OFF",
          name: existing.name,
        },
        { status: 200 }
      );
    }

    const couponCode = generateCouponCode();

    const newCoupon = {
      name: name.trim(),
      phone: cleanPhone,
      email: cleanEmail,
      weddingDate: weddingDate || null,
      preferredCity: preferredCity || "Mumbai (Vakola, Santacruz East)",
      bridalInterest: bridalInterest || "Bridal Lehenga Couture",
      couponCode,
      discount: "10% OFF",
      storeLocations: [
        "Shop No. 2 Vaviya Mansion 33/257, Anand Nagar, Nehru Road, Vakola, Santacruz (E), Mumbai 400055",
        "London Studio / Dubai Atelier",
      ],
      status: "CLAIMED", // CLAIMED -> VERIFIED / REDEEMED / REJECTED
      redeemedAt: null,
      redeemedBy: null,
      notes: "",
      createdAt: new Date(),
    };

    const result = await couponsCollection.insertOne(newCoupon);

    return NextResponse.json(
      {
        success: true,
        message: "Congratulations! Your 10% offline store coupon has been activated.",
        couponCode,
        discount: "10% OFF",
        id: result.insertedId,
        createdAt: newCoupon.createdAt,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error generating offline discount coupon:", error);
    return NextResponse.json(
      { error: "Failed to generate discount coupon. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "almas_bridal_db");
    const couponsCollection = db.collection("offline_coupons");

    if (code) {
      const coupon = await couponsCollection.findOne({ couponCode: code.trim().toUpperCase() });
      if (!coupon) {
        return NextResponse.json({ error: "Invalid coupon code." }, { status: 404 });
      }
      return NextResponse.json({ success: true, coupon });
    }

    const coupons = await couponsCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ success: true, count: coupons.length, coupons });
  } catch (error: any) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json(
      { error: "Failed to retrieve coupons." },
      { status: 500 }
    );
  }
}
