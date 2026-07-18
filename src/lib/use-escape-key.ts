import { useEffect } from "react";

/** Calls `handler` whenever the Escape key is pressed. Used by modal dialogs
    to close on Escape. */
export function useEscapeKey(handler: () => void): void {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handler();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler]);
}
