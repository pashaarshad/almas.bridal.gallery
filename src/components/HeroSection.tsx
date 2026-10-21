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
    <section id="hero" className="relative bg-[#FAF7F2] overflow-hidden pt-6 pb-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 md:space-y-8 z-10">
            {/* Sub-label */}
            <div className="inline-block">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#A67936]">
                Luxury Bridal Couture
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[1.05] tracking-tight text-[#1D1916] font-normal">
              A Story <br />
              <span className="italic font-light">of You</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg text-[#5A534C] font-light max-w-md leading-relaxed">
              Timeless designs for life&apos;s most beautiful moments. Handcrafted perfection created to celebrate your timeless love story.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreCollections}
                className="bg-[#C69A59] hover:bg-[#B38747] text-white px-7 py-3.5 rounded text-xs sm:text-sm uppercase tracking-wider font-medium flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="border border-[#2C2723] hover:border-[#C69A59] hover:text-[#C69A59] text-[#2C2723] px-7 py-3.5 rounded text-xs sm:text-sm uppercase tracking-wider font-medium transition-all duration-300 flex items-center justify-center bg-transparent"
              >
                Book a Consultation
              </button>
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end items-center">
            
            {/* The Main Hero Bridal Image with Arch Border */}
            <div className="relative w-full max-w-[540px] aspect-[4/5] sm:aspect-[3/4] rounded-t-[140px] sm:rounded-t-[200px] overflow-hidden shadow-2xl border-4 border-[#F2ECE1]">
              <Image
                src="/images/hero-bride.jpg"
                alt="Almas Royal Champagne Gold Bridal Couture"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
              {/* Subtle gold sheen overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right Vertical Editorial Tagline */}
            <div className="hidden xl:flex flex-col items-center ml-6 self-center space-y-4">
              <div className="writing-vertical-lr text-[11px] uppercase tracking-[0.35em] text-[#8C8276] font-medium flex items-center space-x-3">
                <span className="rotate-180 inline-block py-1">BRIDES</span>
                <span className="rotate-180 inline-block py-1">DREAMS</span>
                <span className="rotate-180 inline-block py-1">FOREVER</span>
              </div>
              <div className="w-[1.5px] h-20 bg-[#CBA266]/60" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
