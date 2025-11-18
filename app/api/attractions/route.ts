import { NextResponse } from "next/server";
import { TOBAGO_ATTRACTIONS } from "@/lib/attractions";

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      attractions: TOBAGO_ATTRACTIONS 
    });
  } catch (error) {
    console.error("Error fetching attractions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch attractions" },
      { status: 500 }
    );
  }
}

