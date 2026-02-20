"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function SignupPage() {
  const [step, setStep] = useState("choice");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [formError, setFormError] = useState("");
  const [accountType, setAccountType] = useState("Personal");
  const { signup, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated]);

  const submitEmail = (e) => {
    e.preventDefault();
    setStep("profile");
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    setFormError("");
    try {
      await signup({ name, email, password, accountType });
      window.location.href = "/dashboard?firstTime=1";
    } catch (error) {
      setFormError(error.message || "Sign up failed");
    }
  };

  const handleGoogleSignup = async () => {
    const demoEmail = `user${Date.now()}@gmail.com`;
    try {
      await signup({
        name: "Google User",
        email: demoEmail,
        password: "oauth-google",
        accountType: "Personal"
      });
      window.location.href = "/dashboard?firstTime=1";
    } catch (error) {
      setFormError(error.message || "Google signup failed");
    }
  };

  return (
    <main className="flex min-h-screen">
      {/* Left Side - Emotional Montage */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/image1.png')`,
            filter: 'brightness(0.7)'
          }}
        />
        {/* Multiple image overlays for montage effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center animate-pulse"
          style={{
            backgroundImage: `url('/images/image2.png')`,
            opacity: 0.5,
            filter: 'blur(2px)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-transparent to-stone-900/40" />
        
        {/* Content on left side */}
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <h2 
            className={`text-4xl font-semibold leading-tight transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Your story begins here.
          </h2>
          <p 
            className={`mt-4 max-w-md text-lg text-stone-200 transition-all duration-700 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Join thousands of others preserving their most precious memories.
          </p>
          
          {/* Feature highlights */}
          <div className={`mt-12 space-y-4 transition-all duration-700 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="flex items-center gap-3">
              <i className="fas fa-cloud text-amber-300"></i>
              <span>Secure cloud storage</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fas fa-lock text-amber-300"></i>
              <span>Private by default</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fas fa-wand-magic-sparkles text-amber-300"></i>
              <span>AI-powered memory videos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="premium-page flex w-full items-center justify-center lg:w-1/2 bg-stone-50 px-6 py-16">
        <div 
          className={`w-full max-w-md transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="premium-surface p-8 md:p-10">
          {/* Mobile Header */}
          <div className="mb-8 text-center lg:hidden">
            <a href="/" className="inline-block text-2xl font-semibold tracking-wide text-stone-800">
              Memona
            </a>
          </div>

          <h1 className="text-3xl font-semibold text-stone-900">
            {step === "choice" && "Create your account"}
            {step === "google" && "Continue with Google"}
            {step === "email" && "Sign up with email"}
            {step === "profile" && "Complete your profile"}
          </h1>

          <p className="mt-2 text-sm text-stone-600">
            {step === "choice" && "Choose how you want to get started"}
            {step === "google" && "One click to create your account"}
            {step === "email" && "Fill in your details to continue"}
            {step === "profile" && "Tell us a bit about yourself"}
          </p>
          {formError && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {formError}
            </div>
          )}

          {step === "choice" && (
            <div className="mt-8 space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white px-5 py-3.5 text-left font-medium text-stone-700 transition-all hover:border-stone-300 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full rounded-xl border border-stone-200 bg-white px-5 py-3.5 text-left font-medium text-stone-700 transition-all hover:border-stone-300 hover:bg-stone-50"
              >
                Continue with Email
              </button>
            </div>
          )}

          {step === "google" && (
            <div className="mt-8 space-y-4">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <p className="text-sm text-amber-800">
                  <i className="fas fa-info-circle mr-2"></i>
                  Google authentication is ready. Click continue to proceed.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep("profile")}
                className="w-full rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-stone-800"
              >
                Continue
              </button>
            </div>
          )}

          {step === "email" && (
            <form className="mt-8 space-y-4" onSubmit={submitEmail}>
              <input
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <button 
                type="submit"
                className="w-full rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-stone-800"
              >
                Create Account
              </button>
            </form>
          )}

          {step === "profile" && (
            <form className="mt-8 space-y-4" onSubmit={submitProfile}>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Display Name</label>
                <input
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  placeholder="How should we call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Account Type</label>
                <select
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option>Personal - Just for me</option>
                  <option>Family - Sharing with family</option>
                  <option>Travel - Document my journeys</option>
                </select>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-amber-300 px-6 py-3.5 text-sm font-semibold text-stone-900 transition-all hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Setting up...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          )}

          {/* Trust Text */}
          <p className="mt-8 text-center text-xs text-stone-500">
            <i className="fas fa-shield-alt mr-1"></i>
            Private by default. Your memories stay yours.
          </p>

          {/* Login Link */}
          {step === "choice" && (
            <p className="mt-6 text-center text-sm text-stone-600">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-amber-600 hover:text-amber-700">
                Log in
              </a>
            </p>
          )}
          </div>
        </div>
      </div>
    </main>
  );
}

