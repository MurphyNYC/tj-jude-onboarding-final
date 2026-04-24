import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — TJ Jude Onboarding",
};

export default function AdminIndex() {
  return (
    <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center p-8">
      <div className="rounded-2xl bg-white/50 border border-black/5 p-8 text-center max-w-sm backdrop-blur-xl">
        <h1 className="text-[22px] font-semibold text-[#1c1c1e] mb-3">Admin Dashboard</h1>
        <p className="text-[15px] text-[#6e6e73] mb-5">
          Enter a session ID in the URL to view onboarding data.
        </p>
        <code className="block bg-white/60 rounded-xl p-3 text-[12px] text-[#a1a1a6]">
          /admin/&lt;session-id&gt;
        </code>
      </div>
    </div>
  );
}
