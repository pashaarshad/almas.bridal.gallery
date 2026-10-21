"use client";

import React from "react";
import { Gem, Crown, Heart, Star } from "lucide-react";

export default function ValueProposition() {
  const values = [
    {
      icon: Gem,
      title: "Premium Craftsmanship",
      description: "Artisanal hand-embroidery and rare fabrics",
    },
    {
      icon: Crown,
      title: "Exclusive Collections",
      description: "One-of-a-kind bespoke couture ensembles",
    },
    {
      icon: Heart,
      title: "Personalized Consultation",
      description: "One-on-one styling with master couturiers",
    },
    {
      icon: Star,
      title: "A Forever Experience",
      description: "Creating memories cherished for generations",
    },
  ];

  return (
    <section className="bg-[#FAF7F2] border-t border-b border-[#E8DFC9] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#E8DEC8]">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center space-x-3.5 px-3 sm:px-5 py-3 ${
                  idx > 1 ? "pt-6 md:pt-0" : ""
                }`}
              >
                <div className="p-2.5 rounded-full bg-[#F4EBD9]/60 text-[#B88846] flex-shrink-0 border border-[#E5D7BF]">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#2B2622]">
                    {item.title}
                  </h2>
                  <p className="text-[11px] text-[#7A7268] mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
