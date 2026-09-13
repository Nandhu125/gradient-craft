import { test, expect, describe } from "bun:test";
import { encodeState, resolveInitialState } from "./studio-share";
import { DEFAULT_STUDIO_STATE } from "@/types/studio";
import { TEMPLATES } from "@/data/templates";

// resolveInitialState only needs the URLSearchParams `get` method.
function params(map: Record<string, string>) {
  return { get: (key: string) => map[key] ?? null };
}

describe("encodeState", () => {
  test("produces a URL-safe token (no +, /, or = padding)", () => {
    const token = encodeState(DEFAULT_STUDIO_STATE);
    expect(token).not.toMatch(/[+/=]/);
  });
});

describe("resolveInitialState", () => {
  test("round-trips an encoded state via the ?s param", () => {
    const custom = structuredClone(DEFAULT_STUDIO_STATE);
    custom.baseColor.color = "#123456";
    custom.gradient.angle = 42;
    const token = encodeState(custom);
    expect(resolveInitialState(params({ s: token }))).toEqual(custom);
  });

  test("falls back to default for a malformed ?s token", () => {
    expect(resolveInitialState(params({ s: "not-base64!!" }))).toEqual(
      DEFAULT_STUDIO_STATE
    );
  });

  test("hydrates a template's embedded studioState via ?template", () => {
    const tpl = TEMPLATES.find((t) => t.studioState);
    expect(tpl).toBeDefined();
    expect(resolveInitialState(params({ template: tpl!.id }))).toEqual(
      tpl!.studioState
    );
  });

  test("returns the default state when no params are present", () => {
    expect(resolveInitialState(params({}))).toEqual(DEFAULT_STUDIO_STATE);
  });

  test("prefers a valid ?s token over a ?template", () => {
    const custom = structuredClone(DEFAULT_STUDIO_STATE);
    custom.noise.enabled = true;
    const tpl = TEMPLATES.find((t) => t.studioState)!;
    const resolved = resolveInitialState(
      params({ s: encodeState(custom), template: tpl.id })
    );
    expect(resolved).toEqual(custom);
  });
});
