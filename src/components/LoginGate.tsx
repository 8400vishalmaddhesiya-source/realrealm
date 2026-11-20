import React, { useState } from 'react';
import { AlertCircle, ArrowRight, ChefHat, Moon, Sun, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export function LoginGate() {
  const { signInWithGoogle, enterGuestMode, authBusy, authError, clearAuthError } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between px-4 sm:px-8 py-6 max-w-7xl mx-auto">
      <header className="flex items-center justify-between gap-6">
        <span className="font-display text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 whitespace-nowrap shrink-0">
          Rasoi &amp; Realm
        </span>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 text-xs font-medium hover:border-amber-600/50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-700" />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </header>

      <main className="my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-center py-4">
          <p className="text-xs font-medium tracking-widest uppercase text-amber-800 dark:text-amber-400 mb-4">
            Global Culinary &amp; Beverage Archive
          </p>
          <h1
            className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 leading-[1.12] mb-5"
            style={{ textWrap: 'balance' }}
          >
            Authentic Regional Craft, Documented Without Vagueness
          </h1>
          <p className="text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl mb-8">
            Explore 14-point standardized recipes across Indian regional kitchens, classic world dishes, and traditional beverages—complete with exact thermal cues, an 8-language spice localizer, and Smart Pantry cooking.
          </p>

          <div className="space-y-4 max-w-md">
            <button
              type="button"
              onClick={signInWithGoogle}
              disabled={authBusy}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white font-medium text-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
                />
              </svg>
              <span>{authBusy ? 'Connecting with Google...' : 'Continue with Google'}</span>
            </button>

            <button
              type="button"
              onClick={enterGuestMode}
              disabled={authBusy}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>Explore as Guest</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {authError && (
              <div
                role="alert"
                className="flex items-start gap-2.5 p-3.5 rounded-xl border border-red-300 dark:border-red-900/70 bg-red-50/90 dark:bg-red-950/50 text-red-800 dark:text-red-200 text-xs leading-relaxed"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p>{authError}</p>
                  <button
                    type="button"
                    onClick={clearAuthError}
                    className="mt-1 underline font-medium cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 grid grid-cols-3 gap-4 text-xs text-stone-600 dark:text-stone-400">
            <div>
              <p className="font-mono-tabular text-base font-semibold text-stone-900 dark:text-stone-100">14-Point</p>
              <p className="mt-0.5">Standardized schema</p>
            </div>
            <div>
              <p className="font-mono-tabular text-base font-semibold text-stone-900 dark:text-stone-100">8+ Languages</p>
              <p className="mt-0.5">Regional spice matrix</p>
            </div>
            <div>
              <p className="font-mono-tabular text-base font-semibold text-stone-900 dark:text-stone-100">Cloud Vault</p>
              <p className="mt-0.5">Synced saved recipes</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex">
          <div className="relative w-full min-h-[340px] lg:min-h-[520px] rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-900">
            {!imgFailed ? (
              <img
                src="/src/assets/images/hero_culinary_table_1795185870251.jpg"
                alt="Artisanal culinary workbench with brass mortar, whole spices, saffron threads, and cast-iron skillet"
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-800 to-amber-950 text-amber-100 p-8 text-center">
                <UtensilsCrossed className="w-12 h-12 mb-3 opacity-80" />
                <p className="font-display text-2xl font-medium">Rasoi &amp; Realm Kitchen Workbench</p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="flex items-center gap-2 text-xs text-amber-200 mb-1.5">
                <ChefHat className="w-4 h-4" />
                <span>Sign in with Google to save custom &amp; pantry recipes to your personal vault</span>
              </div>
              <p className="font-display text-lg font-medium">
                From Awadhi Dum Biryani &amp; Madras Kaapi to Roman Carbonara &amp; Tokyo Shoyu Ramen
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-xs text-stone-500 dark:text-stone-400 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
        <span>Sign-in secured via Firebase Authentication</span>
        <span>Exact metrics · Regional localizer · Hands-free kitchen timers</span>
      </footer>
    </div>
  );
}
