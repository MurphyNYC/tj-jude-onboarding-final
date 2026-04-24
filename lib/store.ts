"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  sessionId: string;
  isFlipped: boolean;
  currentStep: number; // -1 = before start, 0 = welcome, 1-9 = questions, 10+ = complete
  answers: Record<string, string | string[]>;
  isComplete: boolean;
  startedAt: string | null;
  completedAt: string | null;

  // Actions
  setFlipped: (value: boolean) => void;
  setStep: (step: number) => void;
  goNext: () => void;
  goPrev: () => void;
  setAnswer: (questionId: string, answer: string | string[]) => void;
  complete: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      sessionId: typeof crypto !== "undefined" ? crypto.randomUUID() : Date.now().toString(),
      isFlipped: false,
      currentStep: -1,
      answers: {},
      isComplete: false,
      startedAt: null,
      completedAt: null,

      setFlipped: (value) => set({ isFlipped: value, startedAt: value ? new Date().toISOString() : null }),

      setStep: (step) => set({ currentStep: step }),

      goNext: () => {
        const { currentStep } = get();
        set({ currentStep: currentStep + 1 });
      },

      goPrev: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: answer },
        })),

      complete: () =>
        set({
          isComplete: true,
          completedAt: new Date().toISOString(),
        }),

      reset: () =>
        set({
          sessionId: typeof crypto !== "undefined" ? crypto.randomUUID() : Date.now().toString(),
          isFlipped: false,
          currentStep: -1,
          answers: {},
          isComplete: false,
          startedAt: null,
          completedAt: null,
        }),
    }),
    {
      name: "tj-onboarding",
      partialize: (state) => ({
        sessionId: state.sessionId,
        isFlipped: state.isFlipped,
        currentStep: state.currentStep,
        answers: state.answers,
        isComplete: state.isComplete,
        startedAt: state.startedAt,
        completedAt: state.completedAt,
      }),
    }
  )
);
