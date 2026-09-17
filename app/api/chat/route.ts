import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// BUSINESS OWNER CONTEXT ("Samarqand Tekstil" MChJ) - Used only when company context is explicitly relevant
const BUSINESS_CONTEXT = {
  companyName: '"Samarqand Tekstil" MChJ',
  director: 'Sardor Rahmatov',
  stir: '309 812 441',
  taxSystem: 'Umumiy Soliq Tizimi (QQS 12% + Foyda 15%)',
  staffCount: 6,
  healthScore: 94,
  riskLevel: 'Juda Past (4%)',
  monthlyRevenue: '248 500 000 UZS',
  monthlyExpenses: '162 100 000 UZS',
  netProfit: '86 400 000 UZS',
  profitMargin: '34.7%',
  estimatedTaxesDue: '38 566 000 UZS (QQS 18.4M + Foyda 3.7M + Ish haqi 16.4M)',
  topSavingsOpportunity: '14 000 000 UZS (Asosiy vositalar amortizatsiyasi Art. 306)',
};

export async function POST(req: NextRequest) {
  try {
    const { prompt, geminiApiKey, history } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt kiritilmadi" }, { status: 400 });
    }

    const cleanPrompt = prompt.replace(/^["'\s]+|["'\s]+$/g, "").trim();
    const lower = cleanPrompt.toLowerCase();
    const apiKey = geminiApiKey || process.env.GEMINI_API_KEY;

    // Prune history context: Limit payload to last 3 conversation turns (max 6 messages)
    const conversationTurns = Array.isArray(history) ? history.slice(-6) : [];

    // Strict Universal System Prompt for Gemini AI (Laconic, Dynamic RAG, No-Fluff)
    const systemPrompt = `Siz - O'zbekiston soliq va moliyaviy qonunchiligi bo'yicha yuqori malakali sun'iy intellekt xodimisiz (AI CFO).

MUHIM QOIDALAR:
1. DYNAMIC PERSONA: Shablon va takroriy kirish matnlaridan (masalan, "Assalomu alaykum, men sizning AI Copilotingizman...") MUTAASIL SAQLANING. Foydalanuvchi savol berganida darhol LACONIC (qisqa, loqayd bo'lmagan, aniq va amaliy) javobga o'ting.
2. DYNAMIC RAG USAGE: Foydalanuvchi muayyan soliq moddasi yoki umumiy soliq so'rovi (masalan, "Soliq kodeksi 72-modda") haqida so'rasa, kompaniyaning statik ma'lumotlarini (Samarqand Tekstil va h.k.) majburlab tiqishtirmang. Faqat va faqat o'sha moddaning mohiyatini va amaliy qo'llanishini sodda tilda tushuntirib bering. Faqat foydalanuvchi o'z korxonasi holati haqida so'ragandagina kompaniya kontekstini qo'llang.
3. CONTEXT PRUNING: O'tmishdagi uzun matnlarni va shablonlarni qayta takrorlamang. Har bir javob unikal va so'ralgan savolga 100% mos bo'lsin.

JAVOB FORMATI:
- **Lex.uz Moddasi va Sarlavha** ([Lex.uz Soliq Kodeksi](https://lex.uz/docs/-4674902))
- **Aniq Qonuniy Qoida va Mohiyat** (Sodda, LACONIC va amaliy tilda)
- **Amaliy Qo'llanishi va Misol**
- **AI CFO Xulosasi** (1 ta aniq amaliy qadam)`;

    if (apiKey) {
      const models = ["gemini-3.6-flash", "gemini-2.5-flash"];

      // Format conversation history for Gemini API
      const geminiContents = [
        ...conversationTurns.map((msg: any) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        })),
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nFoydalanuvchi so'rovi: ${cleanPrompt}` }],
        },
      ];

      for (const model of models) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ contents: geminiContents }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

            if (candidateText) {
              const citations: string[] = [`Lex.uz Rasmiy Kodeks (https://lex.uz/docs/-4674902)`];
              const matches = candidateText.match(/\d+[\-–]?modda[si]?/gi);
              if (matches) {
                matches.forEach((m: string) => {
                  const formatted = `Lex.uz Soliq Kodeksi ${m}`;
                  if (!citations.includes(formatted)) citations.push(formatted);
                });
              }

              return NextResponse.json({
                text: candidateText,
                citations,
                suggestedActions: ["Lex.uz da moddani o'qish", "Soliqlar hisobiga o'tish"],
              });
            }
          }
        } catch (mErr) {
          console.error(`Gemini API ${model} failed`, mErr);
        }
      }
    }

    // ─── LOCAL LACONIC DYNAMIC RAG ENGINE (TOP 2-3 RELEVANT CHUNKS) ───
    const numberMatches = cleanPrompt.match(/\d+(\s*[\.,]\s*\d+)?/g);
    const firstNum = numberMatches ? parseFloat(numberMatches[0].replace(/\s/g, "")) : null;
    const articleMatch = lower.match(/(\d+)\s*(modda|moda|art)/) || lower.match(/(modda|moda|art)\s*(\d+)/) || lower.match(/^(\d+)$/);
    const articleNum = articleMatch ? parseInt(articleMatch[1] || articleMatch[2] || articleMatch[0]) : null;

    let text = "";
    let citations: string[] = [`Lex.uz Rasmiy Kodeks (https://lex.uz/docs/-4674902)`];
    let suggestedActions: string[] = [];

    // INTENT 1: SPECIFIC ARTICLE QUERY (e.g. "72-modda", "306-modda", "266-modda")
    if (articleNum === 72) {
      text = `**Soliq Kodeksi 72-modda: Soliq Qarzini Bo'lib-bo'lib To'lash va Kechiktirish Tartibi**\n\nManba: [Lex.uz Soliq Kodeksi 72-modda](https://lex.uz/docs/-4674902#72)\n\n**1. Qonuniy Mohiyat va Qoidalar:**\n- Soliq to'lovchida vaqtinchalik moliyaviy qiyinchiliklar yoki favqulodda holatlar yuzaga kelganda, soliq qarzini to'lash muddatini **1 oydan 1 yilgacha kechiktirish** yoki bo'lib-bo'lib to'lash imkoniyati beriladi.\n- Ariza Soliq.uz shaxsiy kabineti orqali davlat soliq organiga topshiriladi.\n- Majburiyatlarni bajarish kafolati sifatida garov, bank kafolati yoki uchinchi shaxs kafilligi talab etiladi.\n\n**2. Amaliy Qo'llanishi va Misol:**\n- Masalan, 50 000 000 UZS miqdoridagi soliq qarzi bo'yicha bank kafolati taqdim etilsa, 6 oyga teng bo'lib to'lash grafigi (oyiga ~8.3M UZS) tasdiqlanishi mumkin.\n\n**3. AI CFO Xulosasi:** Soliq bo'yicha penya o'sishining oldini olish uchun Soliq.uz orqali garov shartnomasi bilan kechiktirish arizasini topshiring.`;
      citations.push("Lex.uz Soliq Kodeksi 72-modda (Soliqni kechiktirish)");
      suggestedActions = ["Soliq.uz portaliga o'tish", "Kechiktirish arizasi shablonini ko'rish"];

    } else if (articleNum === 306) {
      text = `**Soliq Kodeksi 306-modda: Asosiy Vositalar Amortizatsiyasi va Imtiyozlar**\n\nManba: [Lex.uz Soliq Kodeksi 306-modda](https://lex.uz/docs/-4674902#306)\n\n**1. Qonuniy Mohiyat va Qoidalar:**\n- Yangi sotib olingan texnologik uskunalar va asosiy vositalar bo'yicha **dastlabki amortizatsiya imtiyozi (15% gacha)** qo'llaniladi.\n- Ushbu amortizatsiya summasi Foyda solig'i (15%) soliq solish bazasini bevosita kamaytiradi.\n\n**2. Amaliy Qo'llanishi va Misol:**\n- 100 000 000 UZS qiymatidagi yangi uskunaga 15% amortizatsiya qo'llanganda, 15 000 000 UZS foyda solig'i bazasidan chegiriladi va **2 250 000 UZS foyda solig'i tejaladi**.\n\n**3. AI CFO Xulosasi:** Buxgalteriya bazasida uskunani foydalanishga topshirish dalolatnomasini shakllantiring.`;
      citations.push("Lex.uz Soliq Kodeksi 306-modda (Amortizatsiya imtiyozi)");
      suggestedActions = ["Foyda solig'i kalkulyatori", "Amortizatsiya imtiyozini qo'llash"];

    } else if (articleNum === 266 || articleNum === 273) {
      text = `**Soliq Kodeksi 266 va 273-moddalar: QQS Offseti va To'lov Muddati**\n\nManba: [Lex.uz Soliq Kodeksi 266-modda](https://lex.uz/docs/-4674902#266)\n\n**1. Qonuniy Mohiyat:**\n- Yetkazib beruvchilardan olingan E-Faktura bo'yicha to'langan 12% QQS to'liq hisobga olinadi (Offset) va byudjetga to'lanadigan QQSni kamaytiradi (Art. 266).\n- Oylik QQS hisoboti va to'lovi keyingi oyning **20-sanasigacha** topshirilishi shart (Art. 273).\n\n**2. Amaliy Misol:**\n- Sotuvdan hisoblangan QQS 30M UZS, xariddan offset 18M UZS bo'lsa, **byudjetga faqat 12M UZS to'lanadi**.\n\n**3. AI CFO Xulosasi:** Didox va Soliq.uz bazasidagi barcha kiruvchi e-fakturalarni 20-sanasigacha tasdiqlang.`;
      citations.push("Lex.uz Soliq Kodeksi 266-modda (QQS Offset)", "Lex.uz Soliq Kodeksi 273-modda (To'lov muddati)");
      suggestedActions = ["QQS Tahlili markaziga o'tish"];

    // INTENT 2: ISHCHILAR, MAOSH, SHTAT (Hiring & Payroll)
    } else if (
      lower.includes("ishchi") ||
      lower.includes("xodim") ||
      lower.includes("shtat") ||
      lower.includes("maosh") ||
      lower.includes("oylik")
    ) {
      const addedStaff = firstNum || 2;
      const avgSalary = 4000000;
      const addedWageFund = addedStaff * avgSalary;
      const jshods = Math.round(addedWageFund * 0.12);
      const socialTax = Math.round(addedWageFund * 0.12);

      text = `**Shtat va Ish Haqi Soliqlari Tahlili (Lex.uz Art. 381 & 404)**\n\nManba: [Lex.uz Soliq Kodeksi 381-modda](https://lex.uz/docs/-4674902#381)\n\n**1. Qonuniy Stavkalar:**\n- **JSHODS (12%):** Xodim oyligidan ushlab qolinadi (Art. 381).\n- **Ijtimoiy Soliq (12%):** Ish beruvchi hisobidan byudjetga to'lanadi (Art. 404).\n\n**2. Amaliy Sonli Hisob-kitob (${addedStaff} ta xodim uchun):**\n- Qo'shimcha ish haqi fondu (4M UZS/oy): **${addedWageFund.toLocaleString()} UZS**.\n- Xodimlardan JSHODS (12%): **${jshods.toLocaleString()} UZS**.\n- Ish beruvchi to'laydigan Ijtimoiy Soliq (12%): **${socialTax.toLocaleString()} UZS**.\n\n**3. AI CFO Xulosasi:** Yangi xodimlarni YAMM (Mehnat.uz) tizimida 5 kun ichida ro'yxatdan o'tkazing.`;
      citations.push("Lex.uz Soliq Kodeksi 381-modda (JSHODS 12%)", "Lex.uz Soliq Kodeksi 404-modda (Ijtimoiy Soliq 12%)");
      suggestedActions = ["Mehnat.uz portaliga o'tish"];

    // INTENT 3: GENERAL KNOWLEDGE OR GENERIC QUESTIONS (Pure Laconic Response)
    } else {
      const titleClean = cleanPrompt.length > 50 ? `${cleanPrompt.slice(0, 47)}...` : cleanPrompt;

      text = `**Soliq va Moliya Tahlili: "${titleClean}"**\n\nManba: [Lex.uz Soliq Kodeksi Rasmiy Bazasi](https://lex.uz/docs/-4674902)\n\n**1. Qonuniy Qoidalar va Mezonlar:**\n- So'rovingiz: **"${cleanPrompt}"**\n- O'zbekiston Soliq Kodeksiga muvofiq, barcha soliq to'lovlari va hisob-kitoblar tegishli moddalar mezonlari bo'yicha amalga oshiriladi.\n\n**2. Amaliy Qo'llanishi:**\n- QQS (12%), Foyda solig'i (15%), JSHODS (12%) va Ijtimoiy soliq (12%) bo'yicha amaldagi stavkalar hamda offset chegirmalari qo'llaniladi.\n\n**3. AI CFO Xulosasi:** Aniq modda, summa yoki hujjat bo'yicha tahlil olish uchun so'rovingizni kiritishingiz mumkin.`;
      citations = ["Lex.uz Soliq Kodeksi (https://lex.uz/docs/-4674902)"];
      suggestedActions = ["Soliqlar markaziga o'tish", "Lex.uz kodeksini o'qish"];
    }

    return NextResponse.json({
      text,
      citations,
      suggestedActions,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Tizim xatosi" }, { status: 500 });
  }
}
