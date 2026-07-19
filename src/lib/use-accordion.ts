import { useState, useCallback } from "react";

// Accordion open-set with a hard cap. Toggling an open item closes it;
// opening one past `max` evicts the oldest (FIFO) so the panel never stacks
// into an endless scroll.
export function useAccordion<T>(
  initial: T[],
  max = 2
): [T[], (item: T) => void] {
  const [open, setOpen] = useState<T[]>(initial);

  const toggle = useCallback(
    (item: T) => {
      setOpen((prev) => {
        if (prev.includes(item)) return prev.filter((t) => t !== item);
        return [...prev, item].slice(-max);
      });
    },
    [max]
  );

  return [open, toggle];
}
