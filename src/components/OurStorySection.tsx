"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface OurStorySectionProps {
  onOpenBooking: () => void;
}

export default function OurStorySection({ onOpenBooking }: OurStorySectionProps) {
  return (
    <section id="our-story" className="bg-[#FAF7F2] py-16 sm:py-24 border-t border-[#EAE0CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column Story Text */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            
            {/* Header Tag */}
            <div className="flex items-center space-x-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A67936]">
                OUR STORY
              </span>
              <span className="w-12 h-[1px] bg-[#C69A59]" />
            </div>

            {/* Main Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.12] text-[#1E1915] font-normal">
              Crafting Dreams <br />
              <span className="italic font-light">Since Forever</span>
            </h2>

            {/* Sub-heading / philosophy */}
            <h3 className="font-serif text-xl sm:text-2xl text-[#6B1B25] italic font-normal">
              More Than a Dress, A Forever Moment
            </h3>

            {/* Story Paragraph */}
            <p className="text-sm sm:text-base text-[#554D45] font-light leading-relaxed">
              At <strong className="font-semibold text-[#2C241E]">ALMAS BRIDAL GALLERY</strong>, we believe every bride carries a unique story. We create more than outfits — we craft emotions, memories, and timeless moments for your most special journey.
            </p>

            <p className="text-sm sm:text-base text-[#554D45] font-light leading-relaxed">
              From our flagship studio in Dubai to royal brides worldwide, each creation is meticulously shaped by master artisans using heritage embroidery traditions passed down through centuries.
            </p>

            {/* Button */}
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="bg-[#C69A59] hover:bg-[#B38747] text-white px-7 py-3.5 rounded text-xs sm:text-sm uppercase tracking-wider font-medium flex items-center gap-2.5 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column Story Image */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#F2ECE1]">
              <Image
                src="/images/our-story-couple.jpg"
                alt="ALMAS Royal Bride and Groom Palace Portrait"
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-103"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 700px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Decorative Corner Filigree Accent */}
            <div className="hidden sm:block absolute -bottom-5 -left-5 bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DAC8] shadow-lg max-w-[240px]">
              <p className="font-serif italic text-[#6B1B25] text-sm">
                &ldquo;Where tradition meets eternal couture elegance.&rdquo;
              </p>
              <p className="text-[10px] uppercase tracking-widest text-[#998A76] mt-1">
                Dubai • Atelier
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
