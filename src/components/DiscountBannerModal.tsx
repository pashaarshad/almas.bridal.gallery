"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Tag,
  Sparkles,
  X,
  CheckCircle,
  Copy,
  Store,
  Calendar,
  Gift,
  ArrowRight,
  Phone,
  ShieldCheck,
  Loader2,
} from "lucide-react";

export default function DiscountBannerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [couponResult, setCouponResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    weddingDate: "",
    bridalInterest: "Bridal Lehenga Couture",
    preferredCity: "Mumbai (Vakola, Santacruz East)",
  });

  // Automatically show the popup after 3 seconds on initial visit, unless previously dismissed
  useEffect(() => {
    const hasSeen = localStorage.getItem("almas_10_claimed");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/discount-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate coupon code.");
      }

      setCouponResult(data);
      localStorage.setItem("almas_10_claimed", data.couponCode);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (couponResult?.couponCode) {
      navigator.clipboard.writeText(couponResult.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const openWhatsAppConfirmation = () => {
    const text = encodeURIComponent(
      `Hello ALMAS Bridal Gallery! I just claimed my 10% Offline Store Discount Coupon: [${couponResult.couponCode}]. My name is ${formData.name || couponResult.name || 'Client'}. I would like to visit the Vakola, Santacruz East boutique.`
    );
    window.open(`https://wa.me/919004656157?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Floating Marketing Badge (always accessible in bottom-right corner) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-[#8C1D2D] via-[#630E1B] to-[#3B070F] text-[#FAF7F2] px-5 py-3 rounded-full shadow-2xl border-2 border-[#D4AF37]/80 hover:border-[#F2D06B] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#2B0309] flex items-center justify-center font-bold text-xs shadow-md animate-pulse">
            10%
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest text-[#E6C676] font-semibold">
              Offline Boutique Offer
            </p>
            <p className="text-xs font-serif font-bold tracking-wide">
              Get 10% OFF In-Store
            </p>
          </div>
          <Sparkles className="w-4 h-4 text-[#E6C676] group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Main Luxury Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#FAF7F2] border-2 border-[#D4AF37]/60 rounded-3xl max-w-xl w-full max-h-[94vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#63594C] hover:text-[#111111] rounded-full hover:bg-[#EFE8DD] transition-colors z-10"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* If Coupon is Claimed -> Show Voucher Pass Screen */}
            {couponResult ? (
              <div className="text-center py-4 space-y-6">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#EBF6EE] border border-[#BDE3CA] text-[#1E7D42] mb-1">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#A67936] font-semibold">
                    OFFICIAL ATELIER VOUCHER
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#1E1915]">
                    10% Off In-Store Voucher
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B5246] max-w-md mx-auto">
                    Show this voucher at our Mumbai flagship boutique during your visit to redeem 10% off your couture ensemble.
                  </p>
                </div>

                {/* Golden Physical-style Voucher Card */}
                <div className="relative bg-gradient-to-br from-[#1F1915] via-[#2E241E] to-[#120F0D] text-[#FAF7F2] p-6 rounded-2xl border-2 border-dashed border-[#D4AF37] shadow-xl overflow-hidden text-left space-y-4">
                  {/* Watermark Logo */}
                  <div className="absolute right-3 top-3 opacity-15 pointer-events-none">
                    <Sparkles className="w-24 h-24 text-[#D4AF37]" />
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                        ALMAS BRIDAL GALLERY • MUMBAI
                      </span>
                      <h4 className="font-serif text-xl font-bold text-white mt-0.5">
                        VIP Client Privilege Pass
                      </h4>
                    </div>
                    <div className="bg-[#D4AF37] text-[#1F1915] px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider">
                      10% OFF
                    </div>
                  </div>

                  {/* Coupon Code Big Box */}
                  <div className="bg-black/50 border border-[#D4AF37]/50 rounded-xl p-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#AFA496]">
                        Your Unique Verification Code
                      </p>
                      <p className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-[#F5DE9C]">
                        {couponResult.couponCode}
                      </p>
                    </div>

                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#BFA133] text-[#1F1915] px-3 py-2 rounded-lg text-xs font-semibold tracking-wider transition-colors"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-black" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Store Details Box */}
                  <div className="text-[11px] text-[#D8CEBF] space-y-1.5 pt-1 border-t border-white/10">
                    <p className="flex items-start gap-1.5">
                      <Store className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Redeem At:</strong> Shop No. 2 Vaviya Mansion 33/257, Anand Nagar, Nehru Road, Vakola, Santacruz (E), Mumbai 400055
                      </span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                      <span>
                        <strong>Store Contacts:</strong> +91 90046 56157 / +91 98922 74267
                      </span>
                    </p>
                    <p className="flex items-center gap-1.5 text-[#A89C8C] text-[10px]">
                      <ShieldCheck className="w-3 h-3 text-[#1E7D42]" />
                      <span>Stored in Almas Atelier Admin Verification System.</span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={openWhatsAppConfirmation}
                    className="bg-[#25D366] hover:bg-[#1EBE5A] text-white px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Send Voucher to Store WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="border border-[#443B33] text-[#443B33] hover:bg-[#443B33] hover:text-white px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-medium transition-colors"
                  >
                    Close & Keep Browsing
                  </button>
                </div>
              </div>
            ) : (
              /* Claim Form Screen */
              <div>
                {/* Header Graphic & Badge */}
                <div className="text-center space-y-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4EADA] border border-[#D5C6AF] text-[#8C1D2D] text-[11px] font-semibold uppercase tracking-widest">
                    <Gift className="w-3.5 h-3.5" />
                    <span>Exclusive Mumbai Store Launch Offer</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-[#1E1915] font-normal leading-tight">
                    Claim Your 10% Off <br />
                    <span className="italic text-[#8C1D2D] font-light">Offline Store Voucher</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#665D52] font-light max-w-md mx-auto leading-relaxed">
                    Register below to unlock a unique 10% discount pass. Present this pass at our <strong>Vakola, Santacruz East Mumbai boutique</strong> during your visit.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#473F36] mb-1 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Riya Sharma"
                        className="w-full bg-white border border-[#D5C6AF] rounded-lg px-3.5 py-2.5 text-xs text-[#201C18] focus:outline-none focus:border-[#C69A59]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#473F36] mb-1 font-medium">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98922 74267"
                        className="w-full bg-white border border-[#D5C6AF] rounded-lg px-3.5 py-2.5 text-xs text-[#201C18] focus:outline-none focus:border-[#C69A59]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#473F36] mb-1 font-medium">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="riya@example.com"
                        className="w-full bg-white border border-[#D5C6AF] rounded-lg px-3.5 py-2.5 text-xs text-[#201C18] focus:outline-none focus:border-[#C69A59]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#473F36] mb-1 font-medium">
                        Wedding / Event Date
                      </label>
                      <input
                        type="date"
                        value={formData.weddingDate}
                        onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                        className="w-full bg-white border border-[#D5C6AF] rounded-lg px-3.5 py-2.5 text-xs text-[#201C18] focus:outline-none focus:border-[#C69A59]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#473F36] mb-1 font-medium">
                        Couture Interest
                      </label>
                      <select
                        value={formData.bridalInterest}
                        onChange={(e) => setFormData({ ...formData, bridalInterest: e.target.value })}
                        className="w-full bg-white border border-[#D5C6AF] rounded-lg px-3.5 py-2.5 text-xs text-[#201C18] focus:outline-none focus:border-[#C69A59]"
                      >
                        <option value="Bridal Lehenga Couture">Bridal Lehenga Couture</option>
                        <option value="Groom Sherwani Collection">Groom Sherwani Collection</option>
                        <option value="Reception Evening Gowns">Reception Evening Gowns</option>
                        <option value="Couple Matching Wardrobe">Couple Matching Wardrobe</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#473F36] mb-1 font-medium">
                        Preferred Boutique Store
                      </label>
                      <select
                        value={formData.preferredCity}
                        onChange={(e) => setFormData({ ...formData, preferredCity: e.target.value })}
                        className="w-full bg-white border border-[#D5C6AF] rounded-lg px-3.5 py-2.5 text-xs text-[#201C18] focus:outline-none focus:border-[#C69A59]"
                      >
                        <option value="Mumbai (Vakola, Santacruz East)">Mumbai (Vakola, Santacruz East)</option>
                        <option value="London Studio (Trunk Show)">London Studio (Trunk Show)</option>
                        <option value="Colombo / Dubai Atelier">Colombo / Dubai Atelier</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#C69A59] via-[#D4AF37] to-[#B38747] hover:brightness-105 text-[#1A140F] py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-widest font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Generating Your Pass...</span>
                        </>
                      ) : (
                        <>
                          <span>Claim 10% Off In-Store Code</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-[#7F7466] pt-1">
                    Valid for in-person store visits at ALMAS Bridal Gallery, Vakola, Santacruz East, Mumbai.
                  </p>
                </form>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
