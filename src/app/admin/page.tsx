"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Check,
  X,
  Search,
  RefreshCw,
  Tag,
  Calendar,
  Phone,
  Mail,
  Store,
  Clock,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  LogOut,
  Users,
  Sparkles,
} from "lucide-react";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [inputKey, setInputKey] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"coupons" | "consultations">("coupons");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>({
    totalCoupons: 0,
    claimedCoupons: 0,
    approvedCoupons: 0,
    totalConsultations: 0,
  });
  const [coupons, setCoupons] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [verificationCode, setVerificationCode] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");

  // Check stored auth
  useEffect(() => {
    const savedKey = sessionStorage.getItem("almas_admin_key");
    if (savedKey) {
      setAdminKey(savedKey);
      fetchDashboardData(savedKey);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    fetchDashboardData(inputKey);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("almas_admin_key");
    setIsAuthenticated(false);
    setAdminKey("");
    setInputKey("");
  };

  const fetchDashboardData = async (key: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/manage?key=${encodeURIComponent(key)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid Access Key.");
      }

      setStats(data.stats);
      setCoupons(data.coupons || []);
      setConsultations(data.consultations || []);
      setIsAuthenticated(true);
      setAdminKey(key);
      sessionStorage.setItem("almas_admin_key", key);
    } catch (err: any) {
      setAuthError(err.message || "Failed to log in.");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const updateCouponStatus = async (id: string, action: "APPROVED" | "REJECTED" | "CLAIMED") => {
    try {
      const res = await fetch("/api/admin/manage", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          id,
          type: "coupon",
          action,
          adminName: "Store Manager",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update.");

      // Refresh list
      fetchDashboardData(adminKey);
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  // Instant Verification Box
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) return;

    const code = verificationCode.trim().toUpperCase();
    const found = coupons.find((c) => c.couponCode.toUpperCase() === code);

    if (!found) {
      setVerifyMessage("NOT_FOUND");
    } else {
      setSearchTerm(found.couponCode);
      setVerifyMessage("FOUND");
    }
  };

  // Filter coupons
  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.couponCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ? true : c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filter consultations
  const filteredConsultations = consultations.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-[#110E0C] text-[#FAF7F2] font-sans">
      {/* Top Header */}
      <header className="border-b border-[#2B231D] bg-[#1A1410] sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="relative h-10 w-44">
              <Image
                src="/logos/logo-gold-bright.png"
                alt="ALMAS BRIDAL GALLERY"
                fill
                className="object-contain object-left"
              />
            </Link>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded">
              Store Admin
            </span>
          </div>

          {isAuthenticated && (
            <div className="flex items-center space-x-4 text-xs">
              <div className="hidden sm:block text-right">
                <p className="font-medium text-[#FAF7F2]">Mumbai Store Atelier</p>
                <p className="text-[10px] text-[#A69784]">Vakola, Santacruz East</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-[#A69784] hover:text-[#D4AF37] border border-[#3A3027] hover:border-[#D4AF37] px-3 py-1.5 rounded transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="max-w-md mx-auto my-12 bg-[#1A1512] border border-[#382C23] rounded-2xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="font-serif text-2xl text-white">Almas Atelier Portal</h2>
              <p className="text-xs text-[#9E9080]">
                Enter your store security key to access 10% coupon verification & consultation logs.
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-red-950/60 border border-red-700/60 text-red-300 text-xs rounded-lg">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#BAAEA0] mb-1.5">
                  Store Admin Security Key
                </label>
                <input
                  type="password"
                  required
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Enter key (default: almas2026)"
                  className="w-full bg-[#120F0D] border border-[#44362B] text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#C69A59] via-[#D4AF37] to-[#A67830] text-[#140F0A] py-3 rounded-lg text-xs uppercase tracking-widest font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Connecting to MongoDB...</span>
                ) : (
                  <>
                    <span>Unlock Store Management</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-8">
            
            {/* Top Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#1A1410] border border-[#33271E] rounded-xl p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#9E9080]">
                  Total 10% Vouchers
                </span>
                <p className="font-serif text-3xl text-white mt-1 font-bold">
                  {stats.totalCoupons}
                </p>
                <p className="text-[10px] text-[#D4AF37] mt-0.5">Marketing Registrations</p>
              </div>

              <div className="bg-[#1A1410] border border-[#33271E] rounded-xl p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#9E9080]">
                  Pending In-Store Visits
                </span>
                <p className="font-serif text-3xl text-[#F2C054] mt-1 font-bold">
                  {stats.claimedCoupons}
                </p>
                <p className="text-[10px] text-[#A69784] mt-0.5">Ready to verify & redeem</p>
              </div>

              <div className="bg-[#1A1410] border border-[#33271E] rounded-xl p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#9E9080]">
                  Redeemed / Approved
                </span>
                <p className="font-serif text-3xl text-[#34D399] mt-1 font-bold">
                  {stats.approvedCoupons}
                </p>
                <p className="text-[10px] text-[#34D399] mt-0.5">10% discount granted</p>
              </div>

              <div className="bg-[#1A1410] border border-[#33271E] rounded-xl p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#9E9080]">
                  Private Consultations
                </span>
                <p className="font-serif text-3xl text-white mt-1 font-bold">
                  {stats.totalConsultations}
                </p>
                <p className="text-[10px] text-[#A69784] mt-0.5">Bespoke Couture Inquiries</p>
              </div>
            </div>

            {/* Offline In-Store Instant Verification Bar */}
            <div className="bg-gradient-to-r from-[#291A14] via-[#1F140E] to-[#291A14] border-2 border-[#D4AF37]/50 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <Store className="w-5 h-5" />
                    <span className="text-xs uppercase font-bold tracking-widest">
                      In-Store Customer Verification Desk
                    </span>
                  </div>
                  <p className="text-xs text-[#C7BBAE]">
                    When a client visits the Santacruz store and shows their coupon code, enter it below to immediately approve their 10% discount.
                  </p>
                </div>

                <form onSubmit={handleVerifyCode} className="w-full md:w-auto flex items-center gap-2">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter Code (e.g. ALMAS-10-...)"
                    className="bg-[#120D0A] border border-[#524032] text-white px-4 py-2.5 rounded-lg text-sm font-mono tracking-wider focus:outline-none focus:border-[#D4AF37] uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#C29F2B] text-[#140F0A] px-4 py-2.5 rounded-lg text-xs uppercase font-bold tracking-wider whitespace-nowrap transition-colors"
                  >
                    Lookup
                  </button>
                </form>
              </div>

              {verifyMessage === "FOUND" && (
                <div className="mt-3 p-2.5 bg-emerald-950/60 border border-emerald-600/50 rounded-lg text-emerald-300 text-xs flex items-center justify-between">
                  <span>✓ Coupon identified in database! Check customer record below to click &ldquo;Approve / Redeem&rdquo;.</span>
                  <button onClick={() => setVerifyMessage("")} className="text-xs underline">Dismiss</button>
                </div>
              )}

              {verifyMessage === "NOT_FOUND" && (
                <div className="mt-3 p-2.5 bg-red-950/60 border border-red-600/50 rounded-lg text-red-300 text-xs flex items-center justify-between">
                  <span>✗ No coupon found with this code. Please check spelling or phone number.</span>
                  <button onClick={() => setVerifyMessage("")} className="text-xs underline">Dismiss</button>
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-[#2B231D] pb-3">
              <div className="flex space-x-3">
                <button
                  onClick={() => setActiveTab("coupons")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTab === "coupons"
                      ? "bg-[#D4AF37] text-[#120D0A]"
                      : "text-[#A69784] hover:text-white hover:bg-[#1F1712]"
                  }`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>10% Offline Coupons ({coupons.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("consultations")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTab === "consultations"
                      ? "bg-[#D4AF37] text-[#120D0A]"
                      : "text-[#A69784] hover:text-white hover:bg-[#1F1712]"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Consultation Bookings ({consultations.length})</span>
                </button>
              </div>

              <button
                onClick={() => fetchDashboardData(adminKey)}
                disabled={loading}
                className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh Live Data</span>
              </button>
            </div>

            {/* Tab 1: 10% Coupons Table */}
            {activeTab === "coupons" && (
              <div className="space-y-4">
                {/* Search & Status Filter */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-[#8C7E70] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by client name, mobile, coupon code..."
                      className="w-full bg-[#1A1410] border border-[#33271E] rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8C7E70]">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-[#1A1410] border border-[#33271E] text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="CLAIMED">Claimed (Pending Visit)</option>
                      <option value="APPROVED">Approved / Redeemed</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="bg-[#18120E] border border-[#2B2119] rounded-xl overflow-x-auto shadow-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#2B2119] bg-[#120E0A] text-[#8C7E70] uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Mobile & City</th>
                        <th className="py-3 px-4">Coupon Code</th>
                        <th className="py-3 px-4">Event Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Registered Date</th>
                        <th className="py-3 px-4 text-right">In-Store Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2B2119] text-[#D8CEBF]">
                      {filteredCoupons.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-xs text-[#7A6E62]">
                            No coupon registrations found.
                          </td>
                        </tr>
                      ) : (
                        filteredCoupons.map((c) => (
                          <tr key={c._id} className="hover:bg-[#201812] transition-colors">
                            <td className="py-3.5 px-4 font-medium text-white">
                              {c.name}
                              {c.email && (
                                <span className="block text-[10px] text-[#8C7E70] font-normal">
                                  {c.email}
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <a
                                href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#34D399] hover:underline flex items-center gap-1"
                              >
                                <span>{c.phone}</span>
                              </a>
                              <span className="block text-[10px] text-[#8C7E70]">
                                {c.preferredCity}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-mono bg-black/60 border border-[#D4AF37]/40 text-[#F5DE9C] px-2 py-1 rounded text-xs font-bold tracking-wider">
                                {c.couponCode}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-[#A89C8C]">
                              {c.weddingDate || "Not Specified"}
                            </td>
                            <td className="py-3.5 px-4">
                              {c.status === "CLAIMED" && (
                                <span className="bg-amber-950/70 text-amber-300 border border-amber-600/40 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                                  Claimed (Pending)
                                </span>
                              )}
                              {(c.status === "APPROVED" || c.status === "REDEEMED") && (
                                <span className="bg-emerald-950/70 text-emerald-300 border border-emerald-600/40 px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 w-fit">
                                  <Check className="w-3 h-3" />
                                  <span>10% Applied</span>
                                </span>
                              )}
                              {c.status === "REJECTED" && (
                                <span className="bg-rose-950/70 text-rose-300 border border-rose-600/40 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                                  Rejected
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-[11px] text-[#8C7E70]">
                              {new Date(c.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              {c.status === "CLAIMED" ? (
                                <div className="flex items-center justify-end space-x-2">
                                  <button
                                    onClick={() => updateCouponStatus(c._id, "APPROVED")}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-colors"
                                  >
                                    Approve 10%
                                  </button>
                                  <button
                                    onClick={() => updateCouponStatus(c._id, "REJECTED")}
                                    className="bg-rose-900/60 hover:bg-rose-800 text-rose-200 px-2 py-1 rounded text-[10px] uppercase tracking-wider transition-colors"
                                  >
                                    Reject
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => updateCouponStatus(c._id, "CLAIMED")}
                                  className="text-[10px] text-[#A69784] hover:underline"
                                >
                                  Reset Status
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Consultation Bookings */}
            {activeTab === "consultations" && (
              <div className="space-y-4">
                <div className="bg-[#18120E] border border-[#2B2119] rounded-xl overflow-x-auto shadow-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#2B2119] bg-[#120E0A] text-[#8C7E70] uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Mobile & Email</th>
                        <th className="py-3 px-4">Couture Type</th>
                        <th className="py-3 px-4">Consultation Mode</th>
                        <th className="py-3 px-4">Event Date</th>
                        <th className="py-3 px-4">Notes</th>
                        <th className="py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2B2119] text-[#D8CEBF]">
                      {filteredConsultations.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-xs text-[#7A6E62]">
                            No consultation inquiries found.
                          </td>
                        </tr>
                      ) : (
                        filteredConsultations.map((item) => (
                          <tr key={item._id} className="hover:bg-[#201812] transition-colors">
                            <td className="py-3.5 px-4 font-medium text-white">
                              {item.name}
                            </td>
                            <td className="py-3.5 px-4">
                              <a
                                href={`https://wa.me/${item.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#34D399] hover:underline flex items-center gap-1"
                              >
                                <span>{item.phone}</span>
                              </a>
                              <span className="block text-[10px] text-[#8C7E70]">
                                {item.email}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-[#D4AF37] font-medium">
                              {item.coutureType}
                            </td>
                            <td className="py-3.5 px-4 text-[#A89C8C]">
                              {item.consultationType}
                            </td>
                            <td className="py-3.5 px-4 text-[#A89C8C]">
                              {item.weddingDate || "N/A"}
                            </td>
                            <td className="py-3.5 px-4 text-[#9C9082] max-w-xs truncate">
                              {item.message || "-"}
                            </td>
                            <td className="py-3.5 px-4 text-[11px] text-[#8C7E70]">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
