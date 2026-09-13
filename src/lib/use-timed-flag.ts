import { useState, useRef, useCallback } from "react";

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
