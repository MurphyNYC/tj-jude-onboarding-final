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

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("session_id", params.sessionId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: data.data });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
