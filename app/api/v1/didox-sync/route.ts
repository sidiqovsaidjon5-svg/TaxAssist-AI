import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json({
    status: "synced",
    totalInvoicesSynced: 48,
    vatOffsetTotal: "18 000 000 UZS",
    discrepanciesFound: 1,
    discrepancyDetail: '"Oazis MChJ" ijara shartnomasida QQS 15% noto\'g\'ri ko\'rsatilgan (Art. 237)',
    syncedAt: new Date().toISOString(),
    message: "Didox va Soliq.uz E-Fakturalari muvaffaqiyatli sinxronlandi!",
  });
}

export async function GET() {
  return POST();
}
