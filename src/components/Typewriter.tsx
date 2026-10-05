"use client";

import { useEffect, useRef, useState } from "react";

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 2200;

// Types each phrase, holds, deletes it, then types the next.
// Server render (and reduced motion) shows the first phrase, complete and static.
// Pauses while scrolled out of view or while the tab is hidden, so it never
// costs CPU or battery when nobody can see it.
export function Typewriter({ phrases }: { phrases: readonly string[] }) {
  const [text, setText] = useState(phrases[0]);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let index = 0;
    let length = phrases[0].length;
    let deleting = true;
    let timer = 0;
    let onScreen = true;

    const running = () => onScreen && document.visibilityState === "visible";
    const schedule = (ms: number) => {
      clearTimeout(timer);
      if (running()) timer = window.setTimeout(tick, ms);
    };

    function tick() {
      const phrase = phrases[index];
      if (deleting) {
        length -= 1;
        setText(phrase.slice(0, length));
        if (length === 0) {
          deleting = false;
          index = (index + 1) % phrases.length;
          schedule(300);
        } else {
          schedule(DELETE_MS);
        }
      } else {
        length += 1;
        setText(phrase.slice(0, length));
        if (length === phrase.length) {
          deleting = true;
          schedule(HOLD_MS);
        } else {
          schedule(TYPE_MS);
        }
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      schedule(HOLD_MS / 2);
    });
    if (ref.current) observer.observe(ref.current);

    const onVisibility = () => schedule(HOLD_MS / 2);
    document.addEventListener("visibilitychange", onVisibility);

    schedule(HOLD_MS);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [phrases]);

  return (
    <span ref={ref} className="typed" aria-hidden="true">
      {text}
      <span className="type-caret" />
    </span>
  );
}
