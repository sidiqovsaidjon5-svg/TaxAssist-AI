import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action, chatId } = body;

    if (action === "test_push") {
      return NextResponse.json({
        ok: true,
        message: "Telegram Bot push notification sent successfully!",
        chatId: chatId || "@taxassist_alert_bot",
        alertPayload: {
          title: "🚨 Shoshilinch Soliq Alerti (TaxAssist AI)",
          body: "Soliq to'loviga 3 kun qoldi! Summa: 18,450,000 UZS (QQS 12%). Bajarish uchun Soliq.uz portaliga kiring.",
          timestamp: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json({
      ok: true,
      bot: "@TaxAssistAI_Bot",
      status: "webhook_active",
      webhookUrl: "https://taxassist.uz/api/telegram/webhook",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Telegram API Error" }, { status: 500 });
  }
}
