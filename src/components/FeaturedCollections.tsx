"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Eye } from "lucide-react";

interface CollectionItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  image: string;
  details: string;
  priceTag?: string;
}

interface FeaturedCollectionsProps {
  onSelectItem: (item: CollectionItem) => void;
}

export default function FeaturedCollections({ onSelectItem }: FeaturedCollectionsProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const collections: CollectionItem[] = [
    {
      id: "bridal",
      title: "Bridal Collection",
      category: "bridal",
      tagline: "Timeless Crimson & Champagne Lehengas",
      image: "/images/bridal-collection.jpg",
      details: "Heavily hand-embroidered velvet and silk lehengas with antique zardozi, dabka, and real polki embellishments. Crafted for royal weddings.",
      priceTag: "Bespoke Couture",
    },
    {
      id: "groom",
      title: "Groom Collection",
      category: "groom",
      tagline: "Regal Sherwanis & Safas",
      image: "/images/groom-collection.jpg",
      details: "Raw silk and brocade sherwanis paired with hand-tied safas, embellished stoles, and royal heritage jewelry buttons.",
      priceTag: "Master Crafted",
    },
    {
      id: "reception",
      title: "Reception Collection",
      category: "reception",
      tagline: "Modern Blush & Rose Gold Gowns",
      image: "/images/reception-collection.jpg",
      details: "Contemporary evening gowns and modern lehengas detailed with Swarovski crystals, sequins, and graceful dramatic capes.",
      priceTag: "Haute Couture",
    },
  ];

  const filtered = activeTab === "all" 
    ? collections 
    : collections.filter((c) => c.category === activeTab);

  return (
    <section id="collections" className="bg-[#FAF7F2] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with decorative gold divider lines */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-3">
            <span className="w-12 sm:w-20 h-[1px] bg-[#C69A59]" />
            <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.22em] text-[#1F1B17] font-normal">
              Featured Collections
            </h2>
            <span className="w-12 sm:w-20 h-[1px] bg-[#C69A59]" />
          </div>
          <p className="text-xs sm:text-sm text-[#776F64] tracking-wider uppercase font-light">
            Exquisite Handcrafted Bridal Ensembles for Royalty
          </p>
        </div>

        {/* 3 Column Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 lg:gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group cursor-pointer flex flex-col bg-[#FAF7F2] border border-[#E5DAC8] transition-all duration-500 hover:shadow-2xl hover:border-[#C69A59] hover:-translate-y-1.5"
            >
              {/* Image Container with Luxury Aspect Ratio */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE4D8]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />

                {/* Hover Quick View Overlay */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur-sm text-[#26211C] px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5" />
                    Quick View
                  </span>
                </div>
              </div>

              {/* Bottom Action Bar Button matching exact screenshot */}
              <div className="border-t border-[#E5DAC8] bg-[#F9F5EE] py-4 px-5 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#C69A59]">
                <span className="text-xs sm:text-sm font-serif tracking-[0.12em] uppercase text-[#2B2520] group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <span>{item.title}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
