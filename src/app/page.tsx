"use client";

import React, { useState } from "react";
import TopAnnouncementBar from "../components/TopAnnouncementBar";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ValueProposition from "../components/ValueProposition";
import FeaturedCollections from "../components/FeaturedCollections";
import OurStorySection from "../components/OurStorySection";
import ConsultationBanner from "../components/ConsultationBanner";
import JournalSection from "../components/JournalSection";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModal";
import QuickViewModal from "../components/QuickViewModal";
import SearchModal from "../components/SearchModal";
import DiscountBannerModal from "../components/DiscountBannerModal";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleExploreCollections = () => {
    const el = document.getElementById("collections");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchResult = (category: string) => {
    handleExploreCollections();
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#222222] selection:bg-[#E2BC6B]/30 selection:text-[#1A1A1A]">
      {/* 1. Top Announcement Bar */}
      <TopAnnouncementBar />

      {/* 2. Main Luxury Sticky Navbar */}
      <Navbar
        onOpenBooking={() => setBookingOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* 3. Hero Section matching Screenshot 1 */}
      <HeroSection
        onOpenBooking={() => setBookingOpen(true)}
        onExploreCollections={handleExploreCollections}
      />

      {/* 4. Four Badges Value Proposition */}
      <ValueProposition />

      {/* 5. Featured Collections Cards */}
      <FeaturedCollections
        onSelectItem={(item) => setSelectedItem(item)}
      />

      {/* 6. Our Story Section */}
      <OurStorySection
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* 7. Book a Private Consultation Burgundy Banner */}
      <ConsultationBanner
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* 8. From Our Journal Section */}
      <JournalSection />

      {/* 9. Luxury Obsidian & Gold Footer */}
      <Footer />

      {/* Modals & Dialogs */}
      <ConsultationModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      <QuickViewModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onBookFitting={() => {
          setSelectedItem(null);
          setBookingOpen(true);
        }}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectResult={handleSearchResult}
      />

      {/* 10% Offline In-Store Coupon Marketing Modal & Floating Trigger */}
      <DiscountBannerModal />
    </main>
  );
}
