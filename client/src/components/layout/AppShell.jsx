"use client";

import React, { useEffect, useState } from "react";
import UserDropdown from "../ui/UserDropdown";
import { useAuthStore } from "../../store/authStore";

const navItems = [
  { id: "timeline", label: "Timeline", href: "/dashboard" },
  { id: "albums", label: "Albums", href: "#" },
  { id: "map", label: "Map", href: "/map" },
  { id: "support", label: "Support", href: "/support" },
  { id: "settings", label: "Settings", href: "/settings" }
];

export default function AppShell({
  activeNav = "timeline",
  title,
  subtitle,
  children,
  isNewUser = false,
  contentClassName = "max-w-6xl",
  centerHeading = false
}) {
  const user = useAuthStore((state) => state.user);
  const initialize = useAuthStore((state) => state.initialize);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const boot = async () => {
      await initialize();
      setReady(true);
    };
    boot();
  }, [initialize]);

  useEffect(() => {
    if (ready && !user) {
      window.location.href = "/login";
    }
  }, [ready, user]);

  if (!ready || !user) {
    return (
      <main className="premium-page flex min-h-screen items-center justify-center">
        <div className="premium-surface px-6 py-5 text-sm text-stone-700">Loading your account...</div>
      </main>
    );
  }

  return (
    <main className="premium-page min-h-screen">
      <div className="premium-bg-orb premium-bg-orb-a" />
      <div className="premium-bg-orb premium-bg-orb-b" />

      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/dashboard" className="text-lg font-semibold tracking-wide text-stone-900">
            Memona
          </a>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeNav === item.id
                    ? "bg-amber-100 text-amber-800"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <UserDropdown
            isNewUser={isNewUser}
            user={{
              name: user?.name || "User",
              initial: user?.name?.charAt(0)?.toUpperCase() || "U",
              email: user?.email || "user@example.com"
            }}
          />
        </nav>
      </header>

      <section className={`relative z-10 mx-auto px-6 py-10 ${contentClassName}`}>
        {(title || subtitle) && (
          <div className={`mb-8 ${centerHeading ? "text-center" : ""}`}>
            {title && <h1 className="text-3xl font-semibold text-stone-900">{title}</h1>}
            {subtitle && <p className={`mt-2 text-stone-600 ${centerHeading ? "mx-auto max-w-2xl" : ""}`}>{subtitle}</p>}
          </div>
        )}
        {children}
      </section>
    </main>
  );
}
