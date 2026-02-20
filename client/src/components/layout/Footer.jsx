"use client";

import React from "react";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" }
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" }
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" }
  ]
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid gap-10 md:grid-cols-5">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <a
              href="#top"
              className="text-lg font-semibold text-white"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Memona
            </a>
            <p className="mt-4 max-w-xs text-sm text-stone-400">
              Capture moments, relive emotions, and build a living timeline of your life's most meaningful memories.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 bg-stone-800 text-sm font-medium text-stone-300 transition hover:border-stone-600 hover:bg-stone-700 hover:text-white"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 bg-stone-800 text-sm font-medium text-stone-300 transition hover:border-stone-600 hover:bg-stone-700 hover:text-white"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 bg-stone-800 text-sm font-medium text-stone-300 transition hover:border-stone-600 hover:bg-stone-700 hover:text-white"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 bg-stone-800 text-sm font-medium text-stone-300 transition hover:border-stone-600 hover:bg-stone-700 hover:text-white"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Support</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-8 md:flex-row">
          <p className="text-sm text-stone-500">
            © {currentYear} Memona. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-stone-500 transition hover:text-stone-300">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-stone-500 transition hover:text-stone-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-stone-500 transition hover:text-stone-300">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


