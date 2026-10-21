"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreCollections: () => void;
}

export default function HeroSection({
  onOpenBooking,
  onExploreCollections,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] xl:min-h-[780px] bg-[#FAF8F5] overflow-hidden flex items-center"
    >
      {/* Background Hero Image - Full Width & Seamlessly Integrated */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-almas-exact.jpg"
          alt="ALMAS Luxury Bridal Couture - A Story of You"
          fill
          priority
          className="object-cover object-[75%_center] sm:object-right lg:object-center"
          sizes="100vw"
        />
        {/* Soft Left Gradient Overlay: Ensures crystal clear typography contrast while revealing the grand palace & bride */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/85 md:via-[#FAF8F5]/60 to-transparent pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Column Text Content matching exact screenshot layout */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 sm:space-y-7 max-w-xl">
            {/* Top Label */}
            <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#91764F] font-semibold">
              LUXURY BRIDAL COUTURE
            </p>

            {/* Main Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6rem] leading-[1.0] text-[#1E1915] font-normal tracking-tight">
              A Story <br />
              <span className="font-serif">of You</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#3C3630] font-light max-w-md leading-relaxed">
              Timeless designs for life&apos;s most beautiful moments.
            </p>

            {/* Action Buttons matching screenshot */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreCollections}
                className="bg-[#C69A59] hover:bg-[#B38747] text-white px-7 py-3.5 rounded text-xs sm:text-sm tracking-wider font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="border border-[#3D3730] hover:border-[#C69A59] hover:text-[#C69A59] bg-[#FAF8F5]/80 backdrop-blur-sm text-[#241F1A] px-7 py-3.5 rounded text-xs sm:text-sm tracking-wider font-medium transition-all duration-300 flex items-center justify-center"
              >
                Book a Consultation
              </button>
            </div>
          </div>

          {/* Far Right: Vertical Tagline matching screenshot */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 justify-end items-center pr-2">
            <div className="flex flex-col items-center space-y-3">
              <div className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-[#665D52] space-y-1.5 text-center">
                <p>BRIDES</p>
                <p>DREAMS</p>
                <p>FOREVER</p>
              </div>
              <div className="w-[1px] h-16 bg-[#B88846]/70" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
