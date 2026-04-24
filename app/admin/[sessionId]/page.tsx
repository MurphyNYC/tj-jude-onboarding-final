"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface SessionData {
  client: string;
  sessionId: string;
  completedAt: string;
  responses: Array<{
    questionId: string;
    question: string;
    answer: string | string[];
    section: string;
  }>;
  derivedProfile: {
    role: string[];
    painPoints: string[];
    communicationStyle: string;
    autonomyLevel: string[];
    featuresRequested: string[];
    tonePreference: string;
    learningStyle: string;
    revenueReporting: string;
    privacyLevel: string;
  };
  agentConfig: {
    tone: string;
    authority: string[];
    features: string[];
    privacy: string;
  };
}

export default function AdminPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const [data, setData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/export/${sessionId}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center">
        <p className="text-[15px] text-[#6e6e73]">Loading session data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center">
        <p className="text-[15px] text-[#6e6e73]">Session not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef] p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-[32px] font-bold text-[#1c1c1e] mb-1">TJ Jude — Onboarding Data</h1>
        <p className="text-[13px] text-[#6e6e73] mb-8">
          Session: {data.sessionId} · Completed: {new Date(data.completedAt).toLocaleString()}
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white/50 border border-black/5 p-6 backdrop-blur-xl">
            <h2 className="text-[18px] font-semibold text-[#1c1c1e] mb-4">Derived Profile</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[12px] text-[#a1a1a6] uppercase tracking-wide">Role</p>
                <p className="text-[15px] text-[#1c1c1e]">{data.derivedProfile.role.join(", ") || "N/A"}</p>
              </div>
              <div>
                <p className="text-[12px] text-[#a1a1a6] uppercase tracking-wide">Communication</p>
                <p className="text-[15px] text-[#1c1c1e]">{data.derivedProfile.communicationStyle || "N/A"}</p>
              </div>
              <div>
                <p className="text-[12px] text-[#a1a1a6] uppercase tracking-wide">Tone</p>
                <p className="text-[15px] text-[#1c1c1e]">{data.derivedProfile.tonePreference || "N/A"}</p>
              </div>
              <div>
                <p className="text-[12px] text-[#a1a1a6] uppercase tracking-wide">Revenue</p>
                <p className="text-[15px] text-[#1c1c1e]">{data.derivedProfile.revenueReporting || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/50 border border-black/5 p-6 backdrop-blur-xl">
            <h2 className="text-[18px] font-semibold text-[#1c1c1e] mb-4">All Responses</h2>
            <div className="space-y-3">
              {data.responses.map((r) => (
                <div key={r.questionId} className="border-b border-black/5 pb-3 last:border-0">
                  <p className="text-[11px] text-[#6366f1] font-medium uppercase tracking-wide">{r.section}</p>
                  <p className="text-[15px] text-[#1c1c1e] mb-0.5">{r.question}</p>
                  <p className="text-[14px] text-[#6e6e73]">
                    {Array.isArray(r.answer) ? r.answer.join(", ") : r.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/50 border border-black/5 p-6 backdrop-blur-xl">
            <pre className="text-[12px] text-[#6e6e73] overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
