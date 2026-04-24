import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabase() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase environment variables are not configured");
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, answers, completedAt } = body;

    if (!sessionId || !answers) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const exportData = {
      client: "TJ Jude",
      sessionId,
      completedAt: completedAt || new Date().toISOString(),
      responses: Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        question: getQuestionText(questionId),
        answer,
        section: getQuestionSection(questionId),
      })),
      derivedProfile: deriveProfile(answers),
      agentConfig: deriveAgentConfig(answers),
    };

    // Store in Supabase if configured
    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = getSupabase();
        const { error: dbError } = await supabase
          .from("sessions")
          .upsert({
            session_id: sessionId,
            data: exportData,
            completed_at: exportData.completedAt,
            client: "TJ Jude",
          });

        if (dbError) {
          console.error("Supabase error:", dbError);
        }
      } catch (dbErr) {
        console.error("Supabase connection failed:", dbErr);
      }
    } else {
      console.warn("Supabase not configured — skipping database save");
    }

    // Send Telegram notification if configured
    await sendTelegramNotification(exportData);

    return NextResponse.json({ success: true, data: exportData });
  } catch (error) {
    console.error("Completion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function sendTelegramNotification(data: any) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.SHAPIRO_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("Telegram credentials not configured");
    return;
  }

  const summary = `🎯 TJ Jude — Onboarding Complete

Status: All 9 questions answered. Session saved.

📊 Quick Snapshot:
• Role: ${data.derivedProfile.role.join(", ") || "Not specified"}
• Biggest time suck: ${Array.isArray(data.derivedProfile.painPoints) ? data.derivedProfile.painPoints.join(", ") : "N/A"}
• Communication style: ${data.derivedProfile.communicationStyle || "N/A"}
• Features requested: ${Array.isArray(data.derivedProfile.featuresRequested) ? data.derivedProfile.featuresRequested.join(", ") : "N/A"}
• Revenue reporting: ${data.derivedProfile.revenueReporting || "N/A"}

⏱️ Next: Review → Build agent → Test → Deploy

Reply here when you're ready to start building.`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: summary,
      }),
    });
  } catch (err) {
    console.error("Telegram notification failed:", err);
  }
}

function getQuestionText(id: string): string {
  const questions: Record<string, string> = {
    q1_about: "What's the thing people know you for?",
    q2_time_suck: "What eats up your time that you wish you could hand off?",
    q3_comm_style: "When I message you, how do you want it to feel?",
    q4_autonomy: "What can I handle without bothering you?",
    q5_features: "Pick what you want me to take off your plate.",
    q6_tone: "When I'm talking to your followers, brands, or guests — what's the vibe?",
    q7_learning: "How should I learn what you like and don't like?",
    q8_revenue_visibility: "How often do you want me to hit you with money updates?",
    q9_privacy: "Who gets access to what I learn about your business?",
  };
  return questions[id] || id;
}

function getQuestionSection(id: string): string {
  const sections: Record<string, string> = {
    q1_about: "Who Are You?",
    q2_time_suck: "Who Are You?",
    q3_comm_style: "How Do You Work?",
    q4_autonomy: "How Do You Work?",
    q5_features: "What Should I Handle?",
    q6_tone: "Your Style",
    q7_learning: "Your Style",
    q8_revenue_visibility: "Money & Privacy",
    q9_privacy: "Money & Privacy",
  };
  return sections[id] || "General";
}

function deriveProfile(answers: Record<string, string | string[]>) {
  return {
    role: extractRoles(answers.q1_about as string),
    painPoints: (answers.q2_time_suck as string[]) || [],
    communicationStyle: (answers.q3_comm_style as string) || "",
    autonomyLevel: (answers.q4_autonomy as string[]) || [],
    featuresRequested: (answers.q5_features as string[]) || [],
    tonePreference: (answers.q6_tone as string) || "",
    learningStyle: (answers.q7_learning as string) || "",
    revenueReporting: (answers.q8_revenue_visibility as string) || "",
    privacyLevel: (answers.q9_privacy as string) || "",
  };
}

function deriveAgentConfig(answers: Record<string, string | string[]>) {
  return {
    tone: (answers.q6_tone as string) || "casual",
    authority: ((answers.q4_autonomy as string[]) || []).filter((a) => a !== "nothing"),
    features: (answers.q5_features as string[]) || [],
    privacy: (answers.q9_privacy as string) || "only_you",
  };
}

function extractRoles(text: string): string[] {
  if (!text) return [];
  const keywords = ["dancer", "host", "choreographer", "creator", "influencer"];
  return keywords.filter((k) => text.toLowerCase().includes(k));
}
