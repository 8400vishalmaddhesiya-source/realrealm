import React, { useState } from 'react';
import { LogOut, Moon, Plus, Sun, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export type NavTab = 'explore' | 'pantry' | 'lexicon' | 'saved';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenGenerator: () => void;
}

export function Navbar({ activeTab, onSelectTab, onOpenGenerator }: NavbarProps) {
  const { user, savedRecipes, signInWithGoogle, signOutUser, exitGuestMode, authBusy } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'explore', label: 'Explore' },
    { id: 'pantry', label: 'Smart Pantry' },
    { id: 'lexicon', label: 'Spice Lexicon' },
    { id: 'saved', label: user ? `Saved (${savedRecipes.length})` : 'Saved Vault' },
  ];

  const initials = (user?.displayName || user?.email || 'Chef')
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/90 dark:border-stone-800/90 bg-[#faf8f4]/90 dark:bg-[#0d0b0a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('explore')}
          className="font-display text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 whitespace-nowrap shrink-0 cursor-pointer"
        >
          Rasoi &amp; Realm
        </button>

        {/* Zone 2: Single-line Nav Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`py-1.5 text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                  active
                    ? 'border-amber-700 dark:border-amber-400 text-stone-900 dark:text-stone-50'
                    : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Compact Utilities */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-700" />}
          </button>

          <button
            type="button"
            onClick={onOpenGenerator}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Recipe</span>
          </button>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Account menu"
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
              >
                {user.photoURL && !avatarFailed ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User avatar'}
                    referrerPolicy="no-referrer"
                    onError={() => setAvatarFailed(true)}
                    className="w-7 h-7 rounded-md object-cover"
                  />
                ) : (
                  <span className="w-7 h-7 rounded-md bg-amber-700 text-white text-xs font-semibold flex items-center justify-center">
                    {initials}
                  </span>
                )}
                <span className="hidden lg:inline text-xs font-medium text-stone-800 dark:text-stone-200 max-w-[110px] truncate">
                  {user.displayName || user.email}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-lg p-2 z-50">
                  <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-800">
                    <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                      {user.displayName || 'Kitchen Member'}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      void signOutUser();
                    }}
                    className="w-full mt-1 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                void signInWithGoogle();
              }}
              disabled={authBusy}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Compact Mobile Navigation Strip */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden flex items-center justify-between px-4 py-2 border-t border-stone-200/70 dark:border-stone-800/70 overflow-x-auto gap-4"
      >
        {navItems.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`text-xs font-medium whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                active
                  ? 'border-amber-700 dark:border-amber-400 text-stone-900 dark:text-stone-50'
                  : 'border-transparent text-stone-600 dark:text-stone-400'
              }`}
            >
              {item.label}
            </button>
          );
        })}
        {!user && (
          <button
            type="button"
            onClick={exitGuestMode}
            className="text-xs font-medium text-amber-800 dark:text-amber-400 whitespace-nowrap shrink-0 py-1 cursor-pointer"
          >
            Login Gate
          </button>
        )}
      </nav>
    </header>
  );
}
