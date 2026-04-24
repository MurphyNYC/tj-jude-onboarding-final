"use client";

interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="progress-apple w-full">
      <div
        className="progress-apple-fill"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
