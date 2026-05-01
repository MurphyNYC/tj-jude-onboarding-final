"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useOnboardingStore } from "@/lib/store";
import { questions, TOTAL_QUESTIONS } from "@/lib/questions";
import { useState, useCallback, useEffect } from "react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { GlassCard } from "@/components/GlassCard";
import { HeroScreen } from "@/components/HeroScreen";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { OpenTextInput } from "@/components/questions/OpenTextInput";
import { MultiChoiceCards } from "@/components/questions/MultiChoiceCards";
import { MultiChoiceOther } from "@/components/questions/MultiChoiceOther";
import { ToggleList } from "@/components/questions/ToggleList";
import { FeatureCards } from "@/components/questions/FeatureCards";
import { CompletionScreen } from "@/components/CompletionScreen";
import { ProgressPip } from "@/components/ProgressPip";

const contentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
    scale: 0.98,
  }),
};

const transitionProps = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
  mass: 0.8,
};

export default function Home() {
  const {
    isFlipped,
    setFlipped,
    currentStep,
    goNext,
    goPrev,
    setStep,
    setAnswer,
    answers,
    complete,
    isComplete,
  } = useOnboardingStore();

  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentStep >= 1 && currentStep <= TOTAL_QUESTIONS) {
        if (e.key === "ArrowRight") {
          const q = questions[currentStep - 1];
          if (answers[q.id]) {
            setDirection(1);
            goNext();
          }
        } else if (e.key === "ArrowLeft" && currentStep > 1) {
          setDirection(-1);
          goPrev();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, answers, goNext, goPrev]);

  const handleStart = () => {
    setFlipped(true);
    setTimeout(() => {
      setStep(0);
    }, 500);
  };

  const handleWelcomeStart = () => {
    setDirection(1);
    goNext();
  };

  const handleAnswer = useCallback(
    (answer: string | string[]) => {
      const currentQuestion = questions[currentStep - 1];
      if (currentQuestion) {
        setAnswer(currentQuestion.id, answer);
      }

      if (currentStep >= TOTAL_QUESTIONS) {
        handleComplete();
      } else {
        setDirection(1);
        setTimeout(() => goNext(), 180);
      }
    },
    [currentStep, goNext, setAnswer]
  );

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        sessionId: useOnboardingStore.getState().sessionId,
        answers,
        completedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Netlify Forms capture fallback
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "premium-onboarding",
          sessionId: payload.sessionId,
          completedAt: payload.completedAt,
          answers: JSON.stringify(payload.answers),
        }).toString(),
      });

      if (response.ok) {
        complete();
      } else {
        complete();
      }
    } catch (error) {
      complete();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      goPrev();
    }
  };

  const renderQuestion = () => {
    if (currentStep < 1 || currentStep > TOTAL_QUESTIONS) return null;
    const q = questions[currentStep - 1];

    switch (q.type) {
      case "open_text":
        return (
          <OpenTextInput
            key={q.id}
            question={q.question}
            placeholder={q.placeholder}
            onAnswer={handleAnswer}
          />
        );
      case "multi_choice_other":
        return (
          <MultiChoiceOther
            key={q.id}
            question={q.question}
            options={q.options || []}
            onAnswer={handleAnswer}
          />
        );
      case "multi_choice":
        return (
          <MultiChoiceCards
            key={q.id}
            question={q.question}
            options={q.options || []}
            allowMultiple={q.allowMultiple}
            onAnswer={handleAnswer}
          />
        );
      case "toggle":
        return (
          <ToggleList
            key={q.id}
            question={q.question}
            options={q.options || []}
            onAnswer={handleAnswer}
          />
        );
      case "feature_cards":
        return (
          <FeatureCards
            key={q.id}
            question={q.question}
            options={q.options || []}
            onAnswer={handleAnswer}
          />
        );
      default:
        return null;
    }
  };

  const showPips = currentStep >= 1 && currentStep <= TOTAL_QUESTIONS;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AmbientBackground />

      <form name="premium-onboarding" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="text" name="sessionId" />
        <input type="text" name="completedAt" />
        <textarea name="answers" />
        <input type="text" name="bot-field" />
      </form>

      {/* Centered card container */}
      <div className="absolute inset-0 z-10 grid place-items-center p-4 sm:p-6">
        <GlassCard className="w-full max-w-xl max-h-[86vh] flex flex-col">
          {/* Progress pips */}
          {showPips && (
            <motion.div
              className="pt-5 px-6 sm:px-8 flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ProgressPip current={currentStep} total={TOTAL_QUESTIONS} />
            </motion.div>
          )}

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-6 pt-2">
            <AnimatePresence mode="wait" custom={direction}>
              {/* Landing */}
              {!isFlipped && (
                <motion.div
                  key="landing"
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transitionProps}
                >
                  <HeroScreen onStart={handleStart} />
                </motion.div>
              )}

              {/* Welcome */}
              {isFlipped && currentStep === 0 && (
                <motion.div
                  key="welcome"
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transitionProps}
                >
                  <WelcomeScreen onStart={handleWelcomeStart} />
                </motion.div>
              )}

              {/* Questions */}
              {currentStep >= 1 && currentStep <= TOTAL_QUESTIONS && (
                <motion.div
                  key={`q-${currentStep}`}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transitionProps}
                >
                  {/* Back */}
                  {currentStep > 1 && (
                    <motion.button
                      className="mb-3 text-[13px] text-[#a1a1a6] flex items-center gap-1 hover:text-[#6e6e73] transition-colors"
                      onClick={handleBack}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                      Back
                    </motion.button>
                  )}

                  {renderQuestion()}
                </motion.div>
              )}

              {/* Completion */}
              {(currentStep > TOTAL_QUESTIONS || isComplete) && (
                <motion.div
                  key="complete"
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transitionProps}
                >
                  <CompletionScreen isSubmitting={isSubmitting} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
