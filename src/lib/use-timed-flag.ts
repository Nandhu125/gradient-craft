import { useState, useRef, useCallback } from "react";

// A transient boolean flag: `trigger()` flips it true and it auto-resets to
// false after `duration` ms. Backs "Copied!" / "Link copied!" style feedback.
export function useTimedFlag(duration = 2000): [boolean, () => void] {
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = useCallback(() => {
    setActive(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(false), duration);
  }, [duration]);

  return [active, trigger];
}
