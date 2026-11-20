import React, { useState } from 'react';
import { AlertCircle, Loader2, Sparkles, X } from 'lucide-react';
import { DietaryMode, Recipe, SkillLevel, SupportedLanguage } from '../types/recipe';

interface RecipeGeneratorModalProps {
  onClose: () => void;
  onGenerated: (recipe: Recipe) => void;
}

const EXAMPLE_PROMPTS = [
  'Hyderabadi Mirchi Ka Salan',
  'Authentic Neapolitan Pizza Margherita',
  'Kerala Avial with Coconut Oil',
  'Oaxacan Mole Negro',
  'Banarasi Thandai with Almonds & Saffron',
  'Korean Kimchi Jjigae',
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

const SKILL_LEVELS: SkillLevel[] = ['Beginner-Friendly', 'Intermediate', 'Pro Chef'];

export function RecipeGeneratorModal({ onClose, onGenerated }: RecipeGeneratorModalProps) {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('Authentic Regional / Global');
  const [dietaryMode, setDietaryMode] = useState<DietaryMode>('Standard');
  const [language, setLanguage] = useState<SupportedLanguage>('English');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('Intermediate');
  const [servings, setServings] = useState(2);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrorMsg('Please enter a dish or beverage name to generate.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const resp = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query.trim(),
          cuisine,
          dietaryMode,
          language,
          skillLevel,
          servings,
        }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        setErrorMsg(data.message || 'Unable to generate recipe right now.');
        return;
      }

      if (data.recipe) {
        onGenerated(data.recipe as Recipe);
      }
    } catch {
      setErrorMsg('Network error contacting the culinary server. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Generate a 14-point recipe or beverage"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#faf8f4] dark:bg-[#14110f] p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-amber-800 dark:text-amber-400 mb-1">
              AI Culinary &amp; Beverage Engine
            </p>
            <h2 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-50">
              Generate Standardized 14-Point Guide
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close generator"
            className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="gen-query" className="block text-sm font-medium text-stone-800 dark:text-stone-200 mb-1.5">
              Dish or Beverage Name
            </label>
            <input
              id="gen-query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Dal Makhani, Thai Green Curry, Kashmiri Kahwa, Shahi Paneer..."
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/40"
            />
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {EXAMPLE_PROMPTS.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setQuery(ex)}
                  className="px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/70 text-[11px] font-medium text-stone-600 dark:text-stone-300 hover:border-amber-600/50 cursor-pointer"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="gen-cuisine" className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Region / Tradition
              </label>
              <input
                id="gen-cuisine"
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label htmlFor="gen-language" className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Output Language (Dual Script)
              </label>
              <select
                id="gen-language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="gen-diet" className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Dietary Adaptation
              </label>
              <select
                id="gen-diet"
                value={dietaryMode}
                onChange={(e) => setDietaryMode(e.target.value as DietaryMode)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100"
              >
                {DIETARY_MODES.map((mode) => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="gen-skill" className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Skill Level
                </label>
                <select
                  id="gen-skill"
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100"
                >
                  {SKILL_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="gen-servings" className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Servings
                </label>
                <select
                  id="gen-servings"
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100"
                >
                  {[1, 2, 3, 4, 6, 8].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="flex items-start gap-2.5 p-3.5 rounded-xl border border-red-300 dark:border-red-900/70 bg-red-50/90 dark:bg-red-950/50 text-red-800 dark:text-red-200 text-xs"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-sm font-medium cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Recipe</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
