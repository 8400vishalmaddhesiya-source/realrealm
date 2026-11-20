import React, { useState } from 'react';
import { AlertCircle, ChefHat, Loader2, Plus, Sparkles, X } from 'lucide-react';
import { synthesizePantryRecipe } from '../data/culinarySynthesizer';
import { DietaryMode, Recipe, SupportedLanguage } from '../types/recipe';

interface SmartPantryHubProps {
  onRecipeReady: (recipe: Recipe) => void;
}

const QUICK_INGREDIENTS = [
  'Potatoes',
  'Curd / Yogurt',
  'Spinach',
  'Garlic',
  'Paneer',
  'Tomatoes',
  'Basmati Rice',
  'Chickpeas',
  'Eggs',
  'Coconut Milk',
  'Kokum',
  'Spaghetti / Pasta',
  'Firm Tofu',
  'Lemons',
  'Ginger',
  'Mushrooms',
];

const CUISINE_OPTIONS = [
  'Best Match',
  'Indian Regional',
  'Italian',
  'Japanese',
  'Mexican',
  'Thai',
  'French',
  'Beverages',
];

const DIETARY_MODES: DietaryMode[] = [
  'Standard',
  'Vegetarian',
  'Jain',
  'Vegan',
  'Gluten-Free',
  'High-Protein',
  'Keto',
  'Diabetes-Friendly',
];

const LANGUAGES: SupportedLanguage[] = [
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Bengali',
  'Marathi',
  'Kannada',
  'Malayalam',
  'Gujarati',
  'Punjabi',
];

export function SmartPantryHub({ onRecipeReady }: SmartPantryHubProps) {
  const [selected, setSelected] = useState<string[]>(['Potatoes', 'Curd / Yogurt', 'Spinach', 'Garlic']);
  const [inputValue, setInputValue] = useState('');
  const [cuisinePreference, setCuisinePreference] = useState('Best Match');
  const [dietaryMode, setDietaryMode] = useState<DietaryMode>('Standard');
  const [language, setLanguage] = useState<SupportedLanguage>('English');
  const [servings, setServings] = useState(2);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [canOfflineFallback, setCanOfflineFallback] = useState(false);

  const addIngredientsFromInput = () => {
    const tokens = inputValue
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (tokens.length === 0) return;

    setSelected((prev) => {
      const next = [...prev];
      for (const tok of tokens) {
        if (!next.some((existing) => existing.toLowerCase() === tok.toLowerCase())) {
          next.push(tok);
        }
      }
      return next;
    });
    setInputValue('');
  };

  const toggleChip = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.length === 0) {
      setErrorMsg('Please select or type at least one ingredient from your kitchen.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setCanOfflineFallback(false);

    try {
      const resp = await fetch('/api/recipes/pantry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: selected,
          cuisinePreference,
          dietaryMode,
          language,
          servings,
        }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        setErrorMsg(data.message || 'Unable to generate pantry recipe right now.');
        if (resp.status === 503 && data.code === 'SERVICE_UNAVAILABLE') {
          setCanOfflineFallback(true);
        }
        return;
      }

      if (data.recipe) {
        onRecipeReady(data.recipe as Recipe);
      }
    } catch {
      setErrorMsg('Network error reaching the culinary backend. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const runOfflineSynthesizer = () => {
    const synth = synthesizePantryRecipe(selected, cuisinePreference, dietaryMode, language);
    onRecipeReady(synth);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <p className="text-xs font-medium tracking-widest uppercase text-amber-800 dark:text-amber-400 mb-1.5">
          Smart Pantry Mode
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 dark:text-stone-50">
          Cook with What You Have
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-2 max-w-2xl leading-relaxed">
          Select or type the ingredients currently on your counter. The engine crafts an authentic dish or beverage and segments Primary Used items, Pantry Staples Assumed, and Optional Add-ons.
        </p>
      </div>

      <form
        onSubmit={handleGenerate}
        className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-6 sm:p-8 space-y-6"
      >
        {/* Ingredient Input */}
        <div className="space-y-3">
          <label
            htmlFor="pantry-input"
            className="block text-sm font-semibold text-stone-900 dark:text-stone-100"
          >
            Available Kitchen Ingredients
          </label>
          <div className="flex gap-2">
            <input
              id="pantry-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addIngredientsFromInput();
                }
              }}
              placeholder="Type comma-separated items (e.g., potatoes, curd, spinach, garlic)"
              className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/40"
            />
            <button
              type="button"
              onClick={addIngredientsFromInput}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Active Selection */}
          {selected.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {selected.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleChip(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-700 text-white text-xs font-medium hover:bg-amber-800 cursor-pointer"
                >
                  <span>{item}</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          )}

          {/* Quick-Add Grid */}
          <div className="pt-2">
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">Quick-add kitchen items:</p>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_INGREDIENTS.filter((item) => !selected.includes(item)).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleChip(item)}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/70 text-xs font-medium text-stone-700 dark:text-stone-300 hover:border-amber-600/50 cursor-pointer"
                >
                  + {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-stone-200 dark:border-stone-800">
          <div>
            <label htmlFor="pantry-cuisine" className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1.5">
              Cuisine Direction
            </label>
            <select
              id="pantry-cuisine"
              value={cuisinePreference}
              onChange={(e) => setCuisinePreference(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-sm text-stone-900 dark:text-stone-100"
            >
              {CUISINE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pantry-dietary" className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1.5">
              Dietary Mode
            </label>
            <select
              id="pantry-dietary"
              value={dietaryMode}
              onChange={(e) => setDietaryMode(e.target.value as DietaryMode)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-sm text-stone-900 dark:text-stone-100"
            >
              {DIETARY_MODES.map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pantry-language" className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1.5">
              Output Language
            </label>
            <select
              id="pantry-language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-sm text-stone-900 dark:text-stone-100"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pantry-servings" className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1.5">
              Servings
            </label>
            <select
              id="pantry-servings"
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-sm text-stone-900 dark:text-stone-100"
            >
              {[1, 2, 3, 4, 6].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'serving' : 'servings'}</option>
              ))}
            </select>
          </div>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="rounded-xl border border-red-300 dark:border-red-900/70 bg-red-50/90 dark:bg-red-950/50 p-4 text-xs sm:text-sm text-red-800 dark:text-red-200 space-y-2"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
            {canOfflineFallback && (
              <button
                type="button"
                onClick={runOfflineSynthesizer}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-amber-600 text-white text-xs font-medium cursor-pointer"
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>Use Offline Pantry Synthesizer Instead</span>
              </button>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Zero-vagueness output: exact weights, temperatures (°C/°F), and regional spice mappings included.
          </p>
          <button
            type="submit"
            disabled={loading || selected.length === 0}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Crafting Pantry Recipe...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Create Pantry Recipe</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
