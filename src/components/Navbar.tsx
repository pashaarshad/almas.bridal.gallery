"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X, Calendar, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenSearch: () => void;
}

export default function Navbar({ onOpenBooking, onOpenSearch }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Bridal Collection", href: "#collections" },
    { name: "Groom", href: "#collections" },
    { name: "Our Story", href: "#our-story" },
    { name: "Journal", href: "#journal" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm py-2.5 border-b border-[#E8DEC8]"
          : "bg-[#FAF7F2] py-4 border-b border-[#EFE8DE]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on Left */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-11 w-44 sm:h-13 sm:w-56 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/logos/logo-gold.png"
                alt="ALMAS BRIDAL GALLERY"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.16em] text-[#3A3530] hover:text-[#B88846] transition-colors relative py-1 font-medium group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B88846] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="hidden sm:flex items-center space-x-5">
            <button
              onClick={onOpenSearch}
              aria-label="Search Collection"
              className="p-2 text-[#4A4540] hover:text-[#B88846] transition-colors rounded-full hover:bg-[#F2ECE3]"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBooking}
              className="bg-[#C69A59] hover:bg-[#B38747] text-white px-5 py-2.5 rounded text-xs uppercase tracking-widest font-medium transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="p-2 text-[#4A4540] hover:text-[#B88846]"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 text-[#2A2520] hover:text-[#B88846]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF7F2] border-b border-[#E8DEC8] px-6 py-6 animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-[#3A3530] hover:text-[#B88846] font-medium py-1 border-b border-[#F0E8DC]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#C69A59] hover:bg-[#B38747] text-white py-3 rounded text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
