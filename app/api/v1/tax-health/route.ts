import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "success",
    company: '"Samarqand Tekstil" MChJ',
    stir: "309 812 441",
    taxHealthScore: 94,
    taxHealthLevel: "A'lo",
    riskLevel: "Juda Past (4%)",
    fineCount: 0,
    potentialSavingsStr: "14 200 000 UZS",
    updatedAt: new Date().toISOString(),
  });
}

export async function POST() {
  return GET();
}
