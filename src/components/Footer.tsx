"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0D0D0D] text-[#ECE6DC] border-t border-[#24211D] relative overflow-hidden">
      
      {/* Subtle background ambient gold glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Column 1: Logo, Tagline, Socials (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo image in gold */}
            <div className="relative h-14 w-56">
              <Image
                src="/logos/logo-gold-bright.png"
                alt="ALMAS BRIDAL GALLERY"
                fill
                className="object-contain object-left"
              />
            </div>

            {/* Tagline */}
            <p className="text-xs uppercase tracking-[0.25em] text-[#C69A59] font-medium">
              Brides • Dreams • Forever
            </p>

            <p className="text-xs text-[#9E9589] font-light max-w-sm leading-relaxed">
              27 Years of Timeless Elegance. Bespoke luxury bridal & groom couture across London, Mumbai, and Colombo.
            </p>

            {/* Social Icons matching screenshot */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://www.instagram.com/almas.bridal.gallery/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#2D2A26] flex items-center justify-center text-[#B0A696] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-[#2D2A26] flex items-center justify-center text-[#B0A696] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-[#2D2A26] flex items-center justify-center text-[#B0A696] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-cinzel text-sm uppercase tracking-[0.2em] text-[#F3EEE6] font-semibold">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A89E90] font-light">
              <li>
                <a href="#hero" className="hover:text-[#D4AF37] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#D4AF37] transition-colors">
                  Bridal Collection
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#D4AF37] transition-colors">
                  Groom
                </a>
              </li>
              <li>
                <a href="#our-story" className="hover:text-[#D4AF37] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-[#D4AF37] transition-colors">
                  Journal
                </a>
              </li>
              <li>
                <Link href="/admin" className="text-[#D4AF37] hover:underline flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get in Touch & Mumbai Flagship Store Details (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-cinzel text-sm uppercase tracking-[0.2em] text-[#F3EEE6] font-semibold">
              Mumbai Boutique
            </h3>
            <ul className="space-y-3 text-xs text-[#A89E90] font-light">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C69A59] flex-shrink-0 mt-0.5" />
                <span>
                  Shop No. 2 Vaviya Mansion 33/257, Anand Nagar, Om Co-op HSG SOC Ltd, Nehru Road, Vakola, Santacruz (E), Mumbai 400055
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C69A59] flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+919004656157" className="hover:text-[#D4AF37] transition-colors">
                    +91 90046 56157
                  </a>
                  <a href="tel:+919892274267" className="hover:text-[#D4AF37] transition-colors">
                    +91 98922 74267
                  </a>
                  <a href="tel:+918655071053" className="hover:text-[#D4AF37] transition-colors">
                    +91 86550 71053
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C69A59] flex-shrink-0" />
                <a href="mailto:info@almasbridalgallery.com" className="hover:text-[#D4AF37] transition-colors">
                  info@almasbridalgallery.com
                </a>
              </li>
            </ul>

            <div className="pt-1 text-[11px] text-[#A69784] leading-relaxed">
              Global Ateliers: London • Mumbai • Colombo • Dubai
            </div>
          </div>

          {/* Column 4: Royal Couple Gold Line Art (lg:col-span-3) */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/images/footer-royal-couple.png"
                alt="Almas Royal Couple Gold Line Art"
                fill
                className="object-contain object-center"
              />
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-14 pt-8 border-t border-[#221F1B] flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#736B5F] font-light gap-4">
          <p>© 2026 ALMAS BRIDAL GALLERY. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <Link href="/admin" className="hover:text-[#D4AF37] transition-colors">
              Store Manager Portal
            </Link>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
