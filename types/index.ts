export interface OnboardingExport {
  client: "TJ Jude";
  sessionId: string;
  completedAt: string;
  responses: {
    questionId: string;
    question: string;
    answer: string | string[];
    section: string;
  }[];
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
