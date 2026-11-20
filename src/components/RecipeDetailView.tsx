import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Bookmark,
  CheckSquare,
  Clock,
  ExternalLink,
  Flame,
  Globe2,
  Minus,
  Pause,
  Play,
  Plus,
  RotateCcw,
  ShieldAlert,
  Square,
  Timer,
  UtensilsCrossed,
} from 'lucide-react';
import { SPICE_BY_KEY, SPICE_LEXICON } from '../data/spiceLexicon';
import { Recipe, SpiceLexiconEntry } from '../types/recipe';
import { formatCountdown, formatScaledQuantity, getYoutubeSearchUrl } from '../utils/formatters';
import { playTimerChime } from '../utils/audio';
import { CookingModeModal } from './CookingModeModal';
import { SpiceLexiconView } from './SpiceLexiconModal';

interface RecipeDetailViewProps {
  recipe: Recipe;
  isSaved: boolean;
  onBack: () => void;
  onToggleSave: (recipe: Recipe) => void;
}

function StepTimerWidget({ minutes }: { minutes: number }) {
  const total = minutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(total);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setSecondsLeft(minutes * 60);
    setRunning(false);
  }, [minutes]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          playTimerChime();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  return (
    <div className="mt-3 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-amber-300/80 dark:border-amber-800/70 bg-amber-50/70 dark:bg-amber-950/30 text-xs">
      <Timer className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400" />
      <span className="font-mono-tabular font-semibold text-stone-900 dark:text-stone-100">
        {formatCountdown(secondsLeft)}
      </span>
      <button
        type="button"
        onClick={() => setRunning((r) => !r)}
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-700 hover:bg-amber-800 text-white font-medium cursor-pointer"
      >
        {running ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        <span>{running ? 'Pause' : secondsLeft === 0 ? 'Done' : 'Start'}</span>
      </button>
      <button
        type="button"
        onClick={() => {
          setRunning(false);
          setSecondsLeft(total);
        }}
        aria-label="Reset step timer"
        className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
      >
        <RotateCcw className="w-3 h-3" />
      </button>
    </div>
  );
}

function findLexiconMatch(name: string, explicitKey?: string): SpiceLexiconEntry | undefined {
  if (explicitKey && SPICE_BY_KEY[explicitKey]) {
    return SPICE_BY_KEY[explicitKey];
  }
  const lower = name.toLowerCase();
  return SPICE_LEXICON.find(
    (entry) =>
      lower.includes(entry.english.toLowerCase()) ||
      lower.includes(entry.key.replace('_', ' '))
  );
}

export function RecipeDetailView({ recipe, isSaved, onBack, onToggleSave }: RecipeDetailViewProps) {
  const [targetServings, setTargetServings] = useState(recipe.timings.servings || 2);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [activeSpiceFilter, setActiveSpiceFilter] = useState<string | null>(null);
  const [cookingModeOpen, setCookingModeOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setTargetServings(recipe.timings.servings || 2);
    setCheckedIngredients(new Set());
  }, [recipe.id, recipe.timings.servings]);

  const scaleFactor = targetServings / (recipe.timings.servings || 1);

  const toggleIngredient = (key: string) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onToggleSave(recipe)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
              isSaved
                ? 'bg-amber-700 border-amber-700 text-white'
                : 'border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved in Vault' : 'Save Recipe'}</span>
          </button>

          <button
            type="button"
            onClick={() => setCookingModeOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Start Cooking Mode</span>
          </button>
        </div>
      </div>

      {/* Points 1, 2, 3, 4: Editorial Header & Photo */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Zero-pill metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 dark:text-stone-400 mb-3">
            <span className="font-semibold text-amber-800 dark:text-amber-400">{recipe.category}</span>
            <span aria-hidden="true">·</span>
            <span>{recipe.region}</span>
            <span aria-hidden="true">·</span>
            <span>{recipe.course}</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-stone-800 dark:text-stone-200">{recipe.skillLevel}</span>
          </div>

          <h1
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 dark:text-stone-50 leading-[1.12] mb-2"
            style={{ textWrap: 'balance' }}
          >
            {recipe.titleEnglish}
          </h1>
          <p className="text-base sm:text-lg text-amber-900 dark:text-amber-300 font-medium mb-4">
            {recipe.titleNative}
          </p>

          <p className="text-base text-stone-600 dark:text-stone-300 leading-relaxed mb-6 max-w-2xl">
            {recipe.summary}
          </p>

          {/* Culinary Techniques, Allergens & Dietary */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-stone-200 dark:border-stone-800 text-xs">
            <div>
              <dt className="text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
                Culinary Techniques
              </dt>
              <dd className="text-stone-900 dark:text-stone-100 font-medium leading-relaxed">
                {recipe.techniques.join(' · ')}
              </dd>
            </div>
            <div>
              <dt className="text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
                Dietary Profile
              </dt>
              <dd className="text-stone-900 dark:text-stone-100 font-medium leading-relaxed">
                {recipe.dietaryTags.join(' · ')}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>Safety &amp; Allergen Advisory</span>
              </dt>
              <dd className="text-stone-900 dark:text-stone-100 font-medium">
                {recipe.allergens.length > 0 ? recipe.allergens.join(' · ') : 'No major top-9 allergens'}
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-5 flex">
          <div className="w-full min-h-[260px] lg:min-h-[340px] rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-800">
            {recipe.imageUrl && !imgFailed ? (
              <img
                src={recipe.imageUrl}
                alt={recipe.titleEnglish}
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-800 to-amber-950 text-amber-100 p-8 text-center">
                <UtensilsCrossed className="w-10 h-10 mb-3 opacity-80" />
                <p className="font-display text-xl font-medium">{recipe.titleEnglish}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Points 5 & 6: Timings, Dynamic Servings Scaler & Cost Strip */}
      <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/85 p-5 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 items-center">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400">Active Prep</p>
            <p className="font-mono-tabular text-lg font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              {recipe.timings.activePrepMins} mins
            </p>
          </div>
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400">Cook / Brew</p>
            <p className="font-mono-tabular text-lg font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              {recipe.timings.cookBrewMins} mins
            </p>
          </div>
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400">Advance Prep</p>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mt-0.5">
              {recipe.timings.advancePrepText}
            </p>
          </div>
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>Total Time</span>
            </p>
            <p className="font-mono-tabular text-lg font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              {recipe.timings.totalTimeText}
            </p>
          </div>
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400">Budget ({recipe.costCategory})</p>
            <p className="font-mono-tabular text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              {recipe.estimatedCostPerServing}
            </p>
          </div>
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Servings Scaler</p>
            <div className="inline-flex items-center gap-2 rounded-lg border border-stone-300 dark:border-stone-700 px-2 py-1 bg-stone-50 dark:bg-stone-950">
              <button
                type="button"
                onClick={() => setTargetServings((s) => Math.max(1, s - 1))}
                aria-label="Decrease servings"
                className="p-1 text-stone-600 dark:text-stone-300 hover:text-stone-900 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono-tabular text-sm font-semibold min-w-[2.5rem] text-center">
                {targetServings}x
              </span>
              <button
                type="button"
                onClick={() => setTargetServings((s) => Math.min(20, s + 1))}
                aria-label="Increase servings"
                className="p-1 text-stone-600 dark:text-stone-300 hover:text-stone-900 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Pantry Categorization Banner (when generated via Smart Pantry) */}
      {recipe.pantryMatchSummary && (
        <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/85 p-6">
          <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50 mb-4">
            Smart Pantry Utilization Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                Primary Used (From Kitchen)
              </p>
              <ul className="space-y-1 text-stone-700 dark:text-stone-200">
                {recipe.pantryMatchSummary.primaryUsed.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                Pantry Staples Assumed
              </p>
              <ul className="space-y-1 text-stone-700 dark:text-stone-200">
                {recipe.pantryMatchSummary.pantryStaplesAssumed.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                Optional Add-Ons
              </p>
              <ul className="space-y-1 text-stone-700 dark:text-stone-200">
                {recipe.pantryMatchSummary.optionalAddons.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Main 2-Column Editorial Layout: Ingredients & Nutrition | Steps & Technique */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5/12): Ingredients, Equipment, Nutrition */}
        <aside className="lg:col-span-5 space-y-6">
          {/* Point 9: Ingredients & Multi-Regional Localizer */}
          <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/85 p-6 space-y-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-50">
                Ingredients
              </h2>
              <span className="text-xs font-mono-tabular text-stone-500 dark:text-stone-400">
                Scaled for {targetServings} {targetServings === 1 ? 'serving' : 'servings'}
              </span>
            </div>

            {recipe.ingredientGroups.map((group) => (
              <div key={group.groupTitle} className="space-y-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400 border-b border-stone-200 dark:border-stone-800 pb-1.5">
                  {group.groupTitle}
                </h3>
                <ul className="divide-y divide-stone-100 dark:divide-stone-800/70">
                  {group.items.map((item, idx) => {
                    const checkKey = `${group.groupTitle}-${idx}`;
                    const checked = checkedIngredients.has(checkKey);
                    const spiceMatch = findLexiconMatch(item.name, item.lexiconKey);

                    return (
                      <li key={checkKey} className="py-2.5 flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => toggleIngredient(checkKey)}
                          aria-label={`Check off ${item.name}`}
                          className="mt-0.5 text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 cursor-pointer shrink-0"
                        >
                          {checked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                        <div className={`flex-1 min-w-0 ${checked ? 'opacity-50 line-through' : ''}`}>
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                              {item.name}
                            </span>
                            <span className="font-mono-tabular text-xs font-semibold text-stone-700 dark:text-stone-300 shrink-0">
                              {formatScaledQuantity(item, scaleFactor)}
                            </span>
                          </div>
                          {item.notes && (
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                              {item.notes}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-3 mt-1">
                            {item.pantryRole && (
                              <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                                {item.pantryRole === 'primary'
                                  ? 'Primary Used'
                                  : item.pantryRole === 'staple'
                                  ? 'Pantry Staple'
                                  : 'Optional Add-on'}
                              </span>
                            )}
                            {spiceMatch && (
                              <button
                                type="button"
                                onClick={() => setActiveSpiceFilter(spiceMatch.english)}
                                className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 dark:text-amber-400 hover:underline cursor-pointer"
                              >
                                <Globe2 className="w-3 h-3" />
                                <span>
                                  {spiceMatch.hindi.split(' ')[0]} · {spiceMatch.tamil.split(' ')[0]} · View 8 languages
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </section>

          {/* Point 8: Equipment */}
          <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/85 p-6">
            <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50 mb-3">
              Required Equipment &amp; Utensils
            </h2>
            <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
              {recipe.equipment.map((tool) => (
                <li key={tool} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 dark:bg-amber-400 shrink-0" />
                  <span>{tool}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Point 7: Nutrition Breakdown */}
          <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/85 p-6">
            <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50 mb-1">
              Nutritional Breakdown
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">Per single serving</p>

            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div className="p-3 rounded-xl bg-stone-100/80 dark:bg-stone-800/70">
                <p className="text-xs text-stone-500 dark:text-stone-400">Calories</p>
                <p className="font-mono-tabular text-lg font-semibold text-stone-900 dark:text-stone-50">
                  {recipe.nutrition.calories} kcal
                </p>
              </div>
              <div className="p-3 rounded-xl bg-stone-100/80 dark:bg-stone-800/70">
                <p className="text-xs text-stone-500 dark:text-stone-400">Protein</p>
                <p className="font-mono-tabular text-lg font-semibold text-stone-900 dark:text-stone-50">
                  {recipe.nutrition.proteinG} g
                </p>
              </div>
              <div className="p-3 rounded-xl bg-stone-100/80 dark:bg-stone-800/70">
                <p className="text-xs text-stone-500 dark:text-stone-400">Carbohydrates</p>
                <p className="font-mono-tabular text-base font-semibold text-stone-900 dark:text-stone-50">
                  {recipe.nutrition.carbsG} g
                </p>
                <p className="text-[11px] font-mono-tabular text-stone-500 dark:text-stone-400">
                  Fiber {recipe.nutrition.fiberG} g · Sugar {recipe.nutrition.sugarG} g
                </p>
              </div>
              <div className="p-3 rounded-xl bg-stone-100/80 dark:bg-stone-800/70">
                <p className="text-xs text-stone-500 dark:text-stone-400">Total Fats</p>
                <p className="font-mono-tabular text-base font-semibold text-stone-900 dark:text-stone-50">
                  {recipe.nutrition.fatsG} g
                </p>
                <p className="text-[11px] font-mono-tabular text-stone-500 dark:text-stone-400">
                  Saturated {recipe.nutrition.saturatedFatG} g
                </p>
              </div>
            </div>

            <div className="text-xs text-stone-600 dark:text-stone-300">
              <span className="font-semibold text-stone-800 dark:text-stone-200">Micronutrients: </span>
              {recipe.nutrition.micronutrients.join(' · ')}
            </div>
          </section>
        </aside>

        {/* Right Column (7/12): Steps, Substitutes, Pairings, Chef Tips, Video */}
        <div className="lg:col-span-7 space-y-6">
          {/* Point 11: Step-by-Step Preparation */}
          <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/85 p-6 sm:p-7 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-50">
                Step-by-Step Preparation
              </h2>
              <button
                type="button"
                onClick={() => setCookingModeOpen(true)}
                className="text-xs font-medium text-amber-800 dark:text-amber-400 hover:underline cursor-pointer"
              >
                Open Full-Screen Focus Mode
              </button>
            </div>

            <ol className="space-y-6">
              {recipe.steps.map((step) => (
                <li
                  key={step.stepNumber}
                  className="pb-6 border-b last:border-b-0 last:pb-0 border-stone-200/80 dark:border-stone-800"
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono-tabular text-sm font-semibold text-amber-800 dark:text-amber-400">
                      0{step.stepNumber}.
                    </span>
                    <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-[15px] text-stone-700 dark:text-stone-200 leading-relaxed mb-3">
                    {step.instruction}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-stone-100/80 dark:bg-stone-800/60 p-3">
                      <span className="block text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-0.5">
                        Doneness Visual Cue
                      </span>
                      <span className="text-stone-800 dark:text-stone-200 font-medium">
                        {step.visualCue}
                      </span>
                    </div>
                    {step.temperatureOrFlame && (
                      <div className="rounded-xl bg-stone-100/80 dark:bg-stone-800/60 p-3">
                        <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-0.5 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                          <span>Heat / Temperature</span>
                        </span>
                        <span className="font-mono-tabular text-stone-800 dark:text-stone-200 font-medium">
                          {step.temperatureOrFlame}
                        </span>
                      </div>
                    )}
                  </div>

                  {step.timerMinutes && step.timerMinutes > 0 && (
                    <StepTimerWidget minutes={step.timerMinutes} />
                  )}
                </li>
              ))}
            </ol>
          </section>

          {/* Point 10: Dietary & Common Substitutes */}
          {recipe.substitutes.length > 0 && (
            <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/85 p-6">
              <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50 mb-4">
                Dietary &amp; Pantry Substitutes
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-xs">
                      <th className="py-2 pr-3 font-medium">Original</th>
                      <th className="py-2 pr-3 font-medium">Substitute</th>
                      <th className="py-2 pr-3 font-medium">Dietary</th>
                      <th className="py-2 font-medium">Sensory Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
                    {recipe.substitutes.map((sub, i) => (
                      <tr key={i}>
                        <td className="py-3 pr-3 font-medium text-stone-900 dark:text-stone-100">
                          {sub.original}
                        </td>
                        <td className="py-3 pr-3 text-stone-700 dark:text-stone-200">
                          {sub.substitute}
                        </td>
                        <td className="py-3 pr-3 text-amber-800 dark:text-amber-400 font-medium">
                          {sub.dietaryType}
                        </td>
                        <td className="py-3 text-stone-600 dark:text-stone-300">
                          {sub.sensoryNote}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Point 12: Serving Suggestions & Pairings */}
          <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/85 p-6">
            <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50 mb-4">
              Serving Suggestions &amp; Pairings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                  Ideal Sides, Breads &amp; Grains
                </p>
                <ul className="space-y-1.5 text-stone-700 dark:text-stone-200">
                  {recipe.sidePairings.map((side) => (
                    <li key={side}>· {side}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                  Complementary Beverages
                </p>
                <ul className="space-y-1.5 text-stone-700 dark:text-stone-200">
                  {recipe.beveragePairings.map((bev) => (
                    <li key={bev}>· {bev}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Point 13: Chef's Tips & Storage / Meal Prep */}
          <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/85 p-6 space-y-5">
            <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50">
              Chef&apos;s Nuances &amp; Storage Advice
            </h2>

            <ul className="space-y-3">
              {recipe.chefTips.map((tip, idx) => {
                const isPitfall = tip.toLowerCase().startsWith('critical pitfall');
                return (
                  <li
                    key={idx}
                    className={`rounded-xl p-3.5 text-sm leading-relaxed border ${
                      isPitfall
                        ? 'border-amber-300 dark:border-amber-800/80 bg-amber-50/80 dark:bg-amber-950/35 text-stone-900 dark:text-stone-100'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/50 text-stone-700 dark:text-stone-200'
                    }`}
                  >
                    {isPitfall ? (
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ) : (
                      <span>{tip}</span>
                    )}
                  </li>
                );
              })}
            </ul>

            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs">
              <div>
                <dt className="font-semibold text-stone-800 dark:text-stone-200 mb-1">Refrigerator Shelf Life</dt>
                <dd className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  {recipe.storageAdvice.fridgeShelfLife}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-stone-800 dark:text-stone-200 mb-1">Freezer Suitability</dt>
                <dd className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  {recipe.storageAdvice.freezerSuitability}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-stone-800 dark:text-stone-200 mb-1">Reheating Method</dt>
                <dd className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  {recipe.storageAdvice.reheatingInstructions}
                </dd>
              </div>
            </dl>
          </section>

          {/* Point 14: Video Search Suggestion */}
          <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/85 p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Recommended Video Reference Query
              </p>
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mt-0.5">
                &ldquo;{recipe.videoSearchQuery}&rdquo;
              </p>
            </div>
            <a
              href={getYoutubeSearchUrl(recipe.videoSearchQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <span>Search Video Guide</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </section>
        </div>
      </div>

      {activeSpiceFilter && (
        <SpiceLexiconView
          initialFilter={activeSpiceFilter}
          isModal
          onClose={() => setActiveSpiceFilter(null)}
        />
      )}

      {cookingModeOpen && (
        <CookingModeModal
          recipe={recipe}
          onClose={() => setCookingModeOpen(false)}
        />
      )}
    </article>
  );
}
