"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (category: string) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectResult,
}: SearchModalProps) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const quickSuggestions = [
    "Golden Champagne Lehenga",
    "Royal Velvet Sherwani",
    "Reception Rose Gold Gowns",
    "Zardozi Bridal Veils",
    "Polki Jewellery Styling",
    "Dubai Atelier Consultation",
  ];

  const searchItems = [
    {
      title: "Royal Crimson Bridal Lehenga",
      category: "Bridal Collection",
      tag: "Heritage Zardozi",
      image: "/images/bridal-collection.jpg",
    },
    {
      title: "Ivory & Champagne Silk Sherwani",
      category: "Groom Collection",
      tag: "Royal Brocade",
      image: "/images/groom-collection.jpg",
    },
    {
      title: "Rose Gold Embellished Reception Gown",
      category: "Reception Collection",
      tag: "Crystal Couture",
      image: "/images/reception-collection.jpg",
    },
    {
      title: "Imperial Gold Veiled Bride",
      category: "Hero Showcase",
      tag: "Signature Masterpiece",
      image: "/images/hero-bride.jpg",
    },
  ];

  const filteredItems = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] border border-[#D5C6AF] rounded-2xl max-w-2xl w-full shadow-2xl relative p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#63594C] hover:text-[#111111] rounded-full hover:bg-[#EFE8DD] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Input Bar */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-[#A67936] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search collections, fabrics, couture styles..."
            className="w-full bg-white border border-[#D5C6AF] rounded-xl pl-11 pr-4 py-3 text-sm text-[#201C18] focus:outline-none focus:border-[#C69A59] shadow-inner"
          />
        </div>

        {/* Quick Suggestion Tags */}
        <div className="mb-6">
          <p className="text-[11px] uppercase tracking-wider text-[#7A7165] font-medium mb-2.5">
            Popular Searches
          </p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(tag)}
                className="bg-white hover:bg-[#F2EAE0] text-[#4A4237] border border-[#E0D3C1] text-xs px-3 py-1.5 rounded-full transition-colors font-light"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                onClose();
                onSelectResult(item.category);
              }}
              className="flex items-center space-x-4 p-2.5 rounded-xl hover:bg-white border border-transparent hover:border-[#E0D3C1] transition-all cursor-pointer group"
            >
              <div className="relative w-14 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#E8E0D2]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-[#A67936] font-semibold">
                  {item.category}
                </span>
                <h4 className="text-sm font-serif text-[#221D18] truncate group-hover:text-[#A67936] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#807669] font-light">
                  {item.tag}
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-[#C69A59] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
