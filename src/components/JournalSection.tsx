"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock, X } from "lucide-react";

interface Article {
  id: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
}

export default function JournalSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: "trends-2026",
      title: "Bridal Trends 2026",
      date: "OCTOBER 2026",
      readTime: "4 MIN READ",
      image: "/images/journal-trends.jpg",
      excerpt: "From celestial champagne gold palettes to ethereal trailing veil capes, explore what is defining royal weddings this season.",
      content: `The 2026 bridal season embraces the synthesis of majestic historic heritage and modern ease. 

1. Champagne Gold & Metallic Zardozi: While classic deep crimson velvet remains royal, brides are increasingly choosing warm champagne, antique gold, and gilded ivory tones with subtle zardozi work.
2. Architectural Sheer Veils: Dramatic cathedral length veils embroidered with couple monograms and poetic verses.
3. Lightweight Grandeur: Multi-layered silk gheras that provide voluminous royal flare without the burden of excessive weight, allowing effortless grace.`,
    },
    {
      id: "jewellery-guide",
      title: "Jewellery Guide for Brides",
      date: "SEPTEMBER 2026",
      readTime: "5 MIN READ",
      image: "/images/journal-jewellery.jpg",
      excerpt: "How to harmonize heirloom Polki, uncut diamonds, and Columbian emerald chokers with your handcrafted couture lehenga.",
      content: `Choosing the right bridal jewelry requires a delicate balance of neckline geometry, embroidery hue, and face framing.

1. Neckline Harmony: Deep sweetheart and scoop necklines demand majestic choker sets layered with a longer haar.
2. Metal Matching: For champagne and gold lehengas, uncut Polki diamonds set in 24k gold foil enhance warmth. For ruby red velvet, emerald beads provide an incomparable regal contrast.
3. The Matha Patti & Nath: Statement nose rings and symmetrical maang tikkas anchor your bridal portrait.`,
    },
    {
      id: "wedding-stories",
      title: "Real Wedding Stories",
      date: "AUGUST 2026",
      readTime: "6 MIN READ",
      image: "/images/journal-real-weddings.jpg",
      excerpt: "Step inside an unforgettable royal celebration held amidst the desert palaces of the Emirates and heritage palaces of Rajasthan.",
      content: `Real bride Farah and groom Tariq chose ALMAS BRIDAL GALLERY to create their three-day wedding wardrobe.

From their private consultation at our Dubai atelier to the grand sunset pheras in Udaipur, every drape of Farah's customized champagne lehenga sparkled under palace chandeliers. 

"The team at Almas didn't just design my wedding outfit; they captured the exact dream I have had since childhood," shares Farah.`,
    },
  ];

  return (
    <section id="journal" className="bg-[#FAF7F2] py-16 sm:py-24 border-t border-[#EAE0CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#E8DEC8]">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1E1915] font-normal tracking-tight">
            From Our Journal
          </h2>
          
          <button
            onClick={() => setSelectedArticle(articles[0])}
            className="text-xs uppercase tracking-widest text-[#2E2822] hover:text-[#C69A59] font-medium flex items-center gap-1.5 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Column Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className="group cursor-pointer flex flex-col space-y-3"
            >
              {/* Image with Aspect Ratio */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-[#ECE4D8] border border-[#E5DAC8] transition-transform duration-500 group-hover:shadow-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>

              {/* Title & Metadata */}
              <div className="pt-1">
                <h3 className="font-serif text-lg sm:text-xl text-[#221D18] group-hover:text-[#A67936] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#70685D] mt-1.5 line-clamp-2 leading-relaxed font-light">
                  {item.excerpt}
                </p>
                <div className="flex items-center space-x-3 text-[10px] uppercase tracking-widest text-[#9C8F7E] mt-2 font-medium">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative border border-[#E5DAC8] shadow-2xl">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 text-[#5E5549] hover:text-[#111111] rounded-full hover:bg-[#F2ECE3] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 border border-[#E5DAC8]">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center space-x-3 text-[11px] uppercase tracking-widest text-[#A67936] font-medium mb-2">
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {selectedArticle.readTime}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1915] mb-4">
              {selectedArticle.title}
            </h3>

            <div className="prose prose-sm text-[#4E463E] leading-relaxed whitespace-pre-line font-light">
              {selectedArticle.content}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E8DFC9] flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-[#C69A59] hover:bg-[#B38747] text-white px-6 py-2.5 rounded text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
