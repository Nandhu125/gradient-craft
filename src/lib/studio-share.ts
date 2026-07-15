import type { StudioState } from "@/types/studio";

// Serialize a StudioState into a compact, URL-safe token for the `?s=` param.
// The token is base64url of the UTF-8 JSON — no padding, no reserved chars.
export function encodeState(state: StudioState): string {
  const json = JSON.stringify(state);
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Inverse of encodeState. Returns null for anything that isn't a well-formed
// StudioState token so the caller can fall back to a default/template state.
export function decodeState(param: string): StudioState | null {
  try {
    const b64 = param.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    const obj = JSON.parse(json) as Partial<StudioState>;
    if (
      obj &&
      obj.baseColor &&
      obj.gradient &&
      obj.pattern &&
      obj.noise &&
      obj.animation
    ) {
      return obj as StudioState;
    }
    return null;
  } catch {
    return null;
  }
}
