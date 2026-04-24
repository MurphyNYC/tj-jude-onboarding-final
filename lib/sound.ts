"use client";

import { Howl } from "howler";

let sounds: Record<string, Howl> = {};
let isInitialized = false;
let isMuted = false;

export function initSounds() {
  if (isInitialized) return;

  sounds = {
    load: new Howl({
      src: ["/sounds/load-chime.wav"],
      volume: 0.3,
    }),
    flip: new Howl({
      src: ["/sounds/flip-swoosh.wav"],
      volume: 0.2,
    }),
    message: new Howl({
      src: ["/sounds/message-pop.wav"],
      volume: 0.15,
    }),
    success: new Howl({
      src: ["/sounds/success-ding.wav"],
      volume: 0.4,
    }),
  };

  isInitialized = true;
}

export function playSound(name: "load" | "flip" | "message" | "success") {
  if (isMuted || !isInitialized) return;
  sounds[name]?.play();
}

export function setMuted(muted: boolean) {
  isMuted = muted;
  if (muted) {
    Howler.mute(true);
  } else {
    Howler.mute(false);
  }
}

export function toggleMute() {
  isMuted = !isMuted;
  setMuted(isMuted);
  return isMuted;
}
