"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { DARK_TEMPLATES, LIGHT_TEMPLATES, type Template } from "@/data/templates";

function TemplateCard({ template }: { template: Template }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(template.css);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = template.css;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [template.css]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
        background: "rgba(255,255,255,0.03)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.4)" : "none",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Preview */}
      <div style={{ height: 220, position: "relative", ...template.previewStyle }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <button
            onClick={handleCopy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 15 }}>
              {copied ? "check" : "content_copy"}
            </span>
            {copied ? "Copied!" : "Copy CSS"}
          </button>

          {template.studioState && (
            <Link
              href={`/studio?template=${template.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 10,
                border: "none",
                background: "#cc97ff",
                color: "#0e0e0f",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none",
                fontFamily: "inherit",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 15 }}>
                open_in_new
              </span>
              Edit in Studio
            </Link>
          )}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 18px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>
            {template.name}
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 10.5, color: "rgba(255,255,255,0.2)", lineHeight: 1.6 }}>
            {template.layers}
          </div>
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            fontWeight: 500,
            padding: "3px 10px",
            borderRadius: 100,
            whiteSpace: "nowrap",
            marginTop: 2,
            color: template.category === "dark" ? "rgba(196,181,253,0.4)" : "rgba(251,191,36,0.5)",
            background: template.category === "dark" ? "rgba(139,92,246,0.06)" : "rgba(251,191,36,0.06)",
          }}
        >
          {template.category === "dark" ? "DARK" : "LIGHT"}
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <div style={{ background: "#09090b", color: "#fff", minHeight: "100vh", fontFamily: "'Inter', sans-serif", WebkitFontSmoothing: "antialiased" }}>
      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 40px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(9,9,11,0.8)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Logo size={26} active />
            <span style={{ fontFamily: "monospace", fontSize: 14.5, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>
              GradientCraft
            </span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Link href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</Link>
            <span style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>Templates</span>
            <Link href="/studio" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Studio</Link>
          </div>
        </div>
        <Link
          href="/studio"
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: "#cc97ff", color: "#0e0e0f", fontSize: 13, fontWeight: 600, textDecoration: "none" }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 16 }}>brush</span>
          Open Studio
        </Link>
      </nav>

      {/* Header */}
      <div style={{ padding: "48px 40px 0", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 20, padding: "5px 14px 5px 7px", borderRadius: 100, border: "1px solid rgba(139,92,246,0.2)", background: "rgba(139,92,246,0.06)", fontFamily: "monospace", fontSize: 11, color: "rgba(196,181,253,0.7)" }}>
          <div style={{ width: 18, height: 18, borderRadius: 5, background: "conic-gradient(from 299deg, #5711a2, #8000ff, #8b1fff, #5711a2)" }} />
          GradientCraft Templates
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 6, color: "#fff" }}>
          Premade Backgrounds
        </h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", maxWidth: 520, lineHeight: 1.6, margin: 0 }}>
          {DARK_TEMPLATES.length + LIGHT_TEMPLATES.length} production-ready CSS backgrounds. Hover a card to copy the CSS or open it in the Studio to edit.
        </p>
      </div>

      {/* Dark section */}
      <div style={{ padding: "36px 40px 12px", maxWidth: 1320, margin: "0 auto", fontFamily: "monospace", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(139,92,246,0.5)" }}>
        Dark Themes — {DARK_TEMPLATES.length} templates
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 20, padding: "8px 40px 20px", maxWidth: 1320, margin: "0 auto" }}>
        {DARK_TEMPLATES.map((t) => <TemplateCard key={t.id} template={t} />)}
      </div>

      {/* Light section */}
      <div style={{ padding: "36px 40px 12px", maxWidth: 1320, margin: "0 auto", fontFamily: "monospace", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(251,191,36,0.5)" }}>
        Light Themes — {LIGHT_TEMPLATES.length} templates
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 20, padding: "8px 40px 48px", maxWidth: 1320, margin: "0 auto" }}>
        {LIGHT_TEMPLATES.map((t) => <TemplateCard key={t.id} template={t} />)}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "0 40px 48px", fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.15)" }}>
        Each template is editable in{" "}
        <Link href="/studio" style={{ color: "rgba(196,181,253,0.3)", textDecoration: "none" }}>
          GradientCraft Studio
        </Link>
        {" "}· Pick → Tweak → Copy CSS
      </div>
    </div>
  );
}
