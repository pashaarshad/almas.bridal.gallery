"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, MapPin, Sparkles, Check, Phone, Loader2, AlertCircle } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    weddingDate: "",
    coutureType: "Bridal Lehenga",
    consultationType: "Mumbai Flagship Store (Vakola, Santacruz East)",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Consultation submission error:", err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again or reach out on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello ALMAS Bridal Gallery, I would like to book a private consultation for ${formData.coutureType}. My wedding date is ${formData.weddingDate || 'TBD'}. Name: ${formData.name || 'Bridal Client'}.`
    );
    window.open(`https://wa.me/919004656157?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] border border-[#D8C7AA] rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#63594C] hover:text-[#111111] rounded-full hover:bg-[#EFE8DD] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF6EE] text-[#1E7D42] border border-[#BDE3CA] flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1915]">
              Consultation Confirmed
            </h3>
            <p className="text-sm text-[#5B5246] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#201B17]">{formData.name}</strong>. Your consultation details have been recorded in our atelier system. Our senior bridal couture stylist will contact you via WhatsApp and phone within 24 hours to confirm your private appointment.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-2.5 rounded text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Connect on WhatsApp Now
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="border border-[#3B342C] text-[#3B342C] hover:bg-[#3B342C] hover:text-white px-6 py-2.5 rounded text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="text-center space-y-1.5 mb-6">
              <div className="flex items-center justify-center space-x-2 text-[#A67936]">
                <Sparkles className="w-4 h-4" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-medium">
                  Private Atelier Experience
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1915]">
                Book a Private Consultation
              </h3>
              <p className="text-xs text-[#70675B] font-light max-w-sm mx-auto">
                Select your preferred couture styling session with our master couturiers.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
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
                    placeholder="e.g. Ayesha Rahman"
                    className="w-full bg-white border border-[#D5C6AF] rounded px-3.5 py-2.5 text-xs text-[#201C18] focus:outline-none focus:border-[#C69A59]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#473F36] mb-1 font-medium">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-white border border-[#D5C6AF] rounded px-3.5 py-2.5 text-xs text-[#201C18] focus:outline-none focus:border-[#C69A59]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#473F36] mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ayesha@example.com"
                    className="w-full bg-white border border-[#D5C6AF] rounded px-3.5 py-2.5 text-xs text-[#201C18] focus:outline-none focus:border-[#C69A59]"
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
                    className="w-full bg-white border border-[#D5C6AF] rounded px-3.5 py-2.5 text-xs text-[#201C18] focus:outline-none focus:border-[#C69A59]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#473F36] mb-1 font-medium">
                    Ensemble Interest
                  </label>
                  <select
                    value={formData.coutureType}
                    onChange={(e) => setFormData({ ...formData, coutureType: e.target.value })}
                    className="w-full bg-white border border-[#D5C6AF] rounded px-3.5 py-2.5 text-xs text-[#201C18] focus:outline-none focus:border-[#C69A59]"
                  >
                    <option value="Bridal Lehenga">Bridal Lehenga</option>
                    <option value="Groom Sherwani">Groom Sherwani</option>
                    <option value="Couple Ensemble">Couple Matching Ensemble</option>
                    <option value="Reception Gown">Reception Gown / Outfit</option>
                    <option value="Custom Bespoke Couture">Custom Bespoke Couture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#473F36] mb-1 font-medium">
                    Consultation Location
                  </label>
                  <select
                    value={formData.consultationType}
                    onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                    className="w-full bg-white border border-[#D5C6AF] rounded px-3.5 py-2.5 text-xs text-[#201C18] focus:outline-none focus:border-[#C69A59]"
                  >
                    <option value="Mumbai Flagship Store (Vakola, Santacruz East)">Mumbai Store (Vakola, Santacruz East)</option>
                    <option value="Virtual Video Consultation">Virtual Video Consultation (Worldwide)</option>
                    <option value="London VIP Trunk Show">London VIP Trunk Show</option>
                    <option value="Dubai Atelier Consultation">Dubai Atelier Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#473F36] mb-1 font-medium">
                  Styling Notes / Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details on your preferred color palette (gold, maroon, champagne), embroidery preferences..."
                  className="w-full bg-white border border-[#D5C6AF] rounded px-3.5 py-2 text-xs text-[#201C18] focus:outline-none focus:border-[#C69A59]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C69A59] hover:bg-[#B38747] disabled:bg-[#C69A59]/60 text-white py-3 rounded text-xs uppercase tracking-widest font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving to Atelier System...</span>
                    </>
                  ) : (
                    <span>Request Consultation Appointment</span>
                  )}
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="text-xs text-[#635848] hover:text-[#075E54] flex items-center justify-center gap-1.5 mx-auto font-medium"
                >
                  <span>Or book instantly via WhatsApp: +91 90046 56157</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
