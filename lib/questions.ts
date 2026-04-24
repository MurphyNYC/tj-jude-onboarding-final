"use client";

export interface QuestionOption {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface Question {
  id: string;
  section: string;
  type: "open_text" | "multi_choice" | "multi_choice_other" | "toggle" | "feature_cards";
  question: string;
  placeholder?: string;
  options?: QuestionOption[];
  allowMultiple?: boolean;
  skippable?: boolean;
}

export const TOTAL_QUESTIONS = 9;

export const questions: Question[] = [
  // Section 1: Who Are You?
  {
    id: "q1_about",
    section: "Who Are You?",
    type: "open_text",
    question: "What's the thing people know you for? Dancer? Event host? That guy who made the billboard thing?",
    placeholder: "Just type whatever. Doesn't need to be fancy.",
  },
  {
    id: "q2_time_suck",
    section: "Who Are You?",
    type: "multi_choice_other",
    question: "What eats up your time that you wish you could hand off?",
    allowMultiple: true,
    options: [
      { value: "party_logistics", label: "Party logistics (guest lists, RSVPs, who's bringing who)" },
      { value: "brand_emails", label: "Brand emails (follow-ups, negotiations, tracking)" },
      { value: "class_admin", label: "Class admin (signups, payments, scheduling)" },
      { value: "content_planning", label: "Content planning (what to post, when, captions)" },
      { value: "money_tracking", label: "Money tracking (who owes what, who paid, who didn't)" },
      { value: "other", label: "Something else — tell me" },
    ],
  },

  // Section 2: How Do You Work?
  {
    id: "q3_comm_style",
    section: "How Do You Work?",
    type: "multi_choice",
    question: "When I message you, how do you want it to feel?",
    options: [
      { value: "quick_bullets", label: "Quick bullets — facts only, no fluff" },
      { value: "conversational", label: "Conversational — like a friend sliding into your DMs" },
      { value: "daily_digest", label: "Daily digest — one summary, once a day" },
      { value: "only_urgent", label: "Only urgent stuff — don't bother me unless it matters" },
    ],
  },
  {
    id: "q4_autonomy",
    section: "How Do You Work?",
    type: "toggle",
    question: "What can I handle without bothering you?",
    options: [
      { value: "guest_list_replies", label: "Guest list replies (\"yeah you're in\" / \"nah it's full\")" },
      { value: "calendar_reminders", label: "Calendar reminders (\"event tonight at 9\")" },
      { value: "draft_followups", label: "Draft follow-ups to brands (you review before I send)" },
      { value: "class_waitlist", label: "Class waitlist management" },
      { value: "nothing", label: "Nothing — ask me first on everything" },
    ],
  },

  // Section 3: What Should I Handle?
  {
    id: "q5_features",
    section: "What Should I Handle?",
    type: "feature_cards",
    question: "Pick what you want me to take off your plate.",
    allowMultiple: true,
    options: [
      { value: "guest_list_auto", label: "Auto-reply to guest list requests", icon: "Smartphone" },
      { value: "money_tracking", label: "Track money and send reminders (who paid, who owes)", icon: "DollarSign" },
      { value: "calendar_mgmt", label: "Manage your calendar and events", icon: "Calendar" },
      { value: "brand_followups", label: "Handle brand deal follow-ups", icon: "Handshake" },
      { value: "revenue_report", label: "Show you monthly revenue", icon: "BarChart" },
      { value: "draft_content", label: "Draft emails and captions", icon: "Mail" },
      { value: "travel_plan", label: "Plan travel between boroughs", icon: "Car" },
    ],
  },

  // Section 4: Your Style
  {
    id: "q6_tone",
    section: "Your Style",
    type: "multi_choice",
    question: "When I'm talking to your followers, brands, or guests — what's the vibe?",
    options: [
      { value: "professional_warm", label: "Professional but warm (like you at a meeting)" },
      { value: "casual", label: "Casual like you talk (no filter, real)" },
      { value: "short_direct", label: "Short and direct (nobody's got time)" },
      { value: "overly_polite", label: "Overly polite (better safe than sorry)" },
    ],
  },
  {
    id: "q7_learning",
    section: "Your Style",
    type: "multi_choice",
    question: "How should I learn what you like and don't like?",
    options: [
      { value: "ask_each", label: "Ask after each thing (\"was that good or nah?\")" },
      { value: "watch_adapt", label: "Watch and adapt silently (I'll figure it out)" },
      { value: "weekly_checkin", label: "Weekly check-in (we talk once a week)" },
      { value: "feedback_on_error", label: "You tell me when I mess up (no scheduled check-in)" },
    ],
  },

  // Section 5: Money & Privacy
  {
    id: "q8_revenue_visibility",
    section: "Money & Privacy",
    type: "multi_choice",
    question: "How often do you want me to hit you with money updates?",
    options: [
      { value: "realtime", label: "Real-time alerts (every payment, every invoice)" },
      { value: "weekly", label: "Weekly summary (Sundays, here's what happened)" },
      { value: "monthly", label: "Monthly report (one big picture)" },
      { value: "on_request", label: "Only when you ask (don't tell me unless I ask)" },
    ],
  },
  {
    id: "q9_privacy",
    section: "Money & Privacy",
    type: "multi_choice",
    question: "Who gets access to what I learn about your business?",
    options: [
      { value: "only_you", label: "Only you (I'm your secret)" },
      { value: "you_shapiro", label: "You + Shapiro (he's building this thing)" },
      { value: "you_team", label: "You + your team (if you have one)" },
      { value: "you_accountant", label: "You + your accountant (they need the numbers anyway)" },
    ],
  },
];
