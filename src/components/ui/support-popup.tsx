"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { XIcon, CheckIcon, CopyIcon, HeartIcon } from "@/components/ui/icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  hasActive: boolean;
}

const UPI_ID = "dharnanandhu015@okaxis"; 
const PAYPAL_URL = "https://paypal.me/yourusername";
const DISPLAY_NAME = "Nandhu";

export function SupportPopup({ isOpen, onClose, hasActive }: Props) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"upi" | "paypal">("upi");

  // Generate UPI Payment URI
  const upiUri = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(DISPLAY_NAME)}&cu=INR`;
  
  // Generate QR Code URLs
  const getQrUrl = (data: string) => 
    `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}&bgcolor=${hasActive ? "ffffff00" : "ffffff"}&color=${hasActive ? "ffffff" : "111111"}&margin=10`;

  const upiQrUrl = getQrUrl(upiUri);
  const paypalQrUrl = getQrUrl(PAYPAL_URL);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyPaypal = () => {
    navigator.clipboard.writeText(PAYPAL_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-end justify-start p-6 pointer-events-none"
    >
      {/* Backdrop - subtle fade */}
      <div 
        className="absolute inset-0 bg-black/5 backdrop-blur-[2px] pointer-events-auto"
        onClick={onClose}
      />

      {/* Popup Window */}
      <div 
        className={`relative w-[min(calc(100vw-48px),380px)] rounded-[32px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border pointer-events-auto origin-bottom-left animate-[popupBouncy_0.6s_cubic-bezier(0.34,1.56,0.64,1)_both] overflow-hidden ${
          hasActive 
            ? "bg-white/10 border-white/20 text-white" 
            : "bg-white border-black/5 text-[#111]"
        } backdrop-blur-3xl`}
      >
        {/* Decorative background shape */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-20 pointer-events-none ${
          hasActive ? "bg-white" : "bg-[#4f46e5]"
        }`} />

        <div className="relative p-7">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                hasActive ? "bg-white/10" : "bg-[#4f46e5]/5"
              }`}>
                <HeartIcon size={18} className={hasActive ? "text-white" : "text-[#4f46e5]"} />
              </div>
              <span className="font-bold tracking-tight">Support Craft</span>
            </div>
            <button 
              onClick={onClose}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                hasActive ? "hover:bg-white/10 text-white/40" : "hover:bg-black/5 text-black/30"
              }`}
            >
              <XIcon size={18} />
            </button>
          </div>

          <p className={`text-[14px] leading-relaxed mb-6 ${hasActive ? "text-white/70" : "text-[#666]"}`}>
            Fuel the development of new atmospheric textures! Your support keeps this project alive. ☕
          </p>

          {/* Tab Switcher */}
          <div className={`flex p-1 rounded-2xl mb-6 ${
            hasActive ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/5"
          }`}>
            <button 
              onClick={() => setActiveTab("upi")}
              className={`flex-1 py-2 text-[12px] font-bold rounded-xl transition-all ${
                activeTab === "upi" 
                  ? hasActive ? "bg-white/20 shadow-sm" : "bg-white shadow-sm"
                  : "opacity-40 hover:opacity-100"
              }`}
            >
              UPI (India)
            </button>
            <button 
              onClick={() => setActiveTab("paypal")}
              className={`flex-1 py-2 text-[12px] font-bold rounded-xl transition-all ${
                activeTab === "paypal" 
                  ? hasActive ? "bg-white/20 shadow-sm" : "bg-white shadow-sm"
                  : "opacity-40 hover:opacity-100"
              }`}
            >
              PayPal (Global)
            </button>
          </div>

          {/* QR Container with bouncy transition */}
          <div className={`aspect-square w-full rounded-2xl border-2 p-4 mb-7 flex items-center justify-center group transition-all duration-500 hover:scale-[1.02] ${
            hasActive ? "border-white/10 bg-white/5" : "border-black/5 bg-white shadow-inner"
          }`}>
            <div className="text-center relative w-full h-full flex flex-col items-center justify-center">
              <Image 
                key={activeTab}
                src={activeTab === "upi" ? upiQrUrl : paypalQrUrl} 
                alt={`${activeTab} QR Code`} 
                width={160}
                height={160}
                className={`w-40 h-40 object-contain transition-all duration-500 animate-in fade-in zoom-in-90 ${hasActive ? "brightness-110 contrast-125" : ""}`}
              />
              <div className="mt-4 text-[9px] font-mono opacity-30 tracking-[0.4em] uppercase font-bold">
                Scan to Support
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {activeTab === "upi" ? (
              <button
                onClick={handleCopyUPI}
                className={`flex items-center justify-center gap-3 py-3.5 rounded-2xl font-bold text-[13.5px] transition-all active:scale-95 shadow-sm ${
                  copied 
                    ? "bg-green-500 text-white" 
                    : hasActive 
                      ? "bg-white text-black hover:bg-white/90" 
                      : "bg-[#111] text-white hover:bg-black/90"
                }`}
              >
                {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                {copied ? "UPI ID Copied" : "Copy UPI Address"}
              </button>
            ) : (
              <a
                href={PAYPAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-3 py-3.5 rounded-2xl font-bold text-[13.5px] transition-all active:scale-95 border ${
                  hasActive 
                    ? "border-white/20 hover:bg-white/10 text-white" 
                    : "border-black/10 hover:bg-black/5 text-[#111]"
                }`}
              >
                Go to PayPal.me
              </a>
            )}
            
            {activeTab === "paypal" && (
              <button
                onClick={handleCopyPaypal}
                className={`flex items-center justify-center gap-3 py-2 text-[11px] font-bold opacity-40 hover:opacity-100 transition-opacity`}
              >
                {copied ? "Link Copied" : "Copy Link"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
