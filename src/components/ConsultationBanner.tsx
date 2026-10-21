"use client";

import React from "react";
import Image from "next/image";
import { Calendar, ArrowRight, Scissors, Crown, Star } from "lucide-react";

interface ConsultationBannerProps {
  onOpenBooking: () => void;
}

export default function ConsultationBanner({ onOpenBooking }: ConsultationBannerProps) {
  return (
    <section className="relative overflow-hidden bg-[#36060D] text-[#F9F5EE] border-t border-b border-[#5E121E]">
      
      {/* Background Palace Arch Texture with Burgundy Overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-luminosity">
        <Image
          src="/images/consultation-palace.jpg"
          alt="Palace Interior Ambiance"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#2B0309]/95 via-[#3D0811]/90 to-[#2B0309]/95" />

      {/* Ornate Gold Filigree Corners (SVG) */}
      <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/40 pointer-events-none" />
      <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]/40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]/40 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Calendar Icon, Text & Button */}
          <div className="lg:col-span-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            
            {/* Gold Calendar Badge */}
            <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-[#8C1D2D]/60 to-[#4D0A14] border border-[#D4AF37]/50 flex flex-col items-center justify-center p-2 shadow-inner">
              <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-[#E2BC6B] stroke-[1.5]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E2BC6B] mt-1">
                Dubai
              </span>
            </div>

            {/* Consultation Text & CTA */}
            <div className="space-y-3">
              <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.16em] text-white">
                Book a Private Consultation
              </h2>
              <p className="text-xs sm:text-sm text-[#E2D5C4] font-light max-w-xl leading-relaxed">
                Experience a personalized one-on-one styling consultation with our bridal couture experts and find the perfect ensemble for your special day.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="bg-[#C69A59] hover:bg-[#B38747] text-white px-7 py-3 rounded text-xs uppercase tracking-widest font-medium flex items-center gap-2.5 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: 3 Luxury Badges with Divider */}
          <div className="lg:col-span-4 lg:border-l lg:border-[#7A1C29] lg:pl-8 flex flex-row lg:flex-row justify-around items-center gap-4 pt-6 lg:pt-0 border-t lg:border-t-0 border-[#5C1420]">
            
            <div className="flex flex-col items-center text-center space-y-1.5 group">
              <div className="p-2.5 rounded-full bg-[#520F1B] border border-[#9A2D3E] text-[#E5C175] transition-transform group-hover:scale-110">
                <Scissors className="w-4 h-4" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#E8DCCB]">
                Personalized<br />Styling
              </span>
            </div>

            <div className="flex flex-col items-center text-center space-y-1.5 group">
              <div className="p-2.5 rounded-full bg-[#520F1B] border border-[#9A2D3E] text-[#E5C175] transition-transform group-hover:scale-110">
                <Crown className="w-4 h-4" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#E8DCCB]">
                Exclusive<br />Collections
              </span>
            </div>

            <div className="flex flex-col items-center text-center space-y-1.5 group">
              <div className="p-2.5 rounded-full bg-[#520F1B] border border-[#9A2D3E] text-[#E5C175] transition-transform group-hover:scale-110">
                <Star className="w-4 h-4" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#E8DCCB]">
                Premium<br />Experience
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
