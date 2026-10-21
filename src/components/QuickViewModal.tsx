"use client";

import React from "react";
import Image from "next/image";
import { X, Sparkles, Check, ArrowRight } from "lucide-react";

interface QuickViewItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  image: string;
  details: string;
  priceTag?: string;
}

interface QuickViewModalProps {
  item: QuickViewItem | null;
  onClose: () => void;
  onBookFitting: () => void;
}

export default function QuickViewModal({
  item,
  onClose,
  onBookFitting,
}: QuickViewModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] border border-[#D5C6AF] rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#63594C] hover:text-[#111111] rounded-full hover:bg-[#EFE8DD] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          
          {/* Image */}
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#E8E0D2] border border-[#D5C6AF]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover object-center"
            />
            {item.priceTag && (
              <div className="absolute top-3 left-3 bg-[#1B1714]/85 backdrop-blur-sm text-[#E2BC6B] px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold border border-[#E2BC6B]/40">
                {item.priceTag}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-[#A67936] text-[11px] uppercase tracking-[0.25em] font-medium mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ALMAS Haute Couture</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1915] font-normal leading-tight">
                {item.title}
              </h3>

              <p className="text-sm font-serif italic text-[#6B1B25] mt-1">
                {item.tagline}
              </p>

              <div className="w-12 h-[1.5px] bg-[#C69A59] my-4" />

              <p className="text-xs sm:text-sm text-[#5B5246] leading-relaxed font-light">
                {item.details}
              </p>

              {/* Highlights */}
              <div className="mt-5 space-y-2 text-xs text-[#4A4237]">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#A67936]" />
                  <span>Pure handwoven heritage silks & French velvet</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#A67936]" />
                  <span>Customizable ghera flare, dupatta borders & sleeve length</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#A67936]" />
                  <span>Complimentary master tailor VIP fittings in Dubai & London</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onClose();
                  onBookFitting();
                }}
                className="bg-[#C69A59] hover:bg-[#B38747] text-white px-6 py-3 rounded text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <span>Book Fitting For This Ensemble</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
