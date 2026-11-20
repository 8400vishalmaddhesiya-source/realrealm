import React, { useMemo, useState } from 'react';
import { Bookmark, ChefHat, Search, Sparkles } from 'lucide-react';
import { LoginGate } from './components/LoginGate';
import { Navbar, NavTab } from './components/Navbar';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetailView } from './components/RecipeDetailView';
import { RecipeGeneratorModal } from './components/RecipeGeneratorModal';
import { SmartPantryHub } from './components/SmartPantryHub';
import { SpiceLexiconView } from './components/SpiceLexiconModal';
import { useAuth } from './context/AuthContext';
import { PRESET_RECIPES } from './data/presetRecipes';
import { Recipe, RecipeCategory } from './types/recipe';

const PRIMARY_FILTERS: Array<'All' | RecipeCategory> = [
  'All',
  'Indian Regional',
  'Global Cuisines',
  'Global & Regional Beverages',
];

const REGION_CHIPS = [
  'All Regions',
  'Italy',
  'Japan',
  'Mexico',
  'Thailand',
  'France',
  'North India',
  'South India',
  'East India',
  'West India',
];

export default function App() {
  const {
    user,
    authReady,
    isGuest,
    savedRecipes,
    isRecipeSaved,
    toggleSaveRecipe,
    signInWithGoogle,
    authBusy,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<NavTab>('explore');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]);
  const [generatorOpen, setGeneratorOpen] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState<'All' | RecipeCategory>('All');
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [searchQuery, setSearchQuery] = useState('');
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  const catalogRecipes = useMemo(() => {
    const byId = new Map<string, Recipe>();
    for (const r of customRecipes) byId.set(r.id, r);
    for (const r of PRESET_RECIPES) {
      if (!byId.has(r.id)) byId.set(r.id, r);
    }
    return Array.from(byId.values());
  }, [customRecipes]);

  const filteredRecipes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return catalogRecipes.filter((recipe) => {
      if (categoryFilter !== 'All' && recipe.category !== categoryFilter) return false;
      if (
        regionFilter !== 'All Regions' &&
        !recipe.region.toLowerCase().includes(regionFilter.toLowerCase())
      ) {
        return false;
      }
      if (!q) return true;
      return (
        recipe.titleEnglish.toLowerCase().includes(q) ||
        recipe.titleNative.toLowerCase().includes(q) ||
        recipe.region.toLowerCase().includes(q) ||
        recipe.summary.toLowerCase().includes(q) ||
        recipe.techniques.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [catalogRecipes, categoryFilter, regionFilter, searchQuery]);

  const handleOpenGenerated = (recipe: Recipe) => {
    setCustomRecipes((prev) => [recipe, ...prev.filter((r) => r.id !== recipe.id)]);
    setGeneratorOpen(false);
    setSelectedRecipe(recipe);
  };

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <ChefHat className="w-8 h-8 text-amber-700 dark:text-amber-400 mx-auto animate-pulse" />
          <p className="font-display text-lg font-medium text-stone-800 dark:text-stone-200">
            Preparing Rasoi &amp; Realm...
          </p>
        </div>
      </div>
    );
  }

  if (!user && !isGuest) {
    return <LoginGate />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setSelectedRecipe(null);
          setActiveTab(tab);
        }}
        onOpenGenerator={() => setGeneratorOpen(true)}
      />

      <main className="flex-1">
        {selectedRecipe ? (
          <RecipeDetailView
            recipe={selectedRecipe}
            isSaved={isRecipeSaved(selectedRecipe.id)}
            onBack={() => setSelectedRecipe(null)}
            onToggleSave={(r) => {
              void toggleSaveRecipe(r);
            }}
          />
        ) : activeTab === 'pantry' ? (
          <SmartPantryHub onRecipeReady={handleOpenGenerated} />
        ) : activeTab === 'lexicon' ? (
          <SpiceLexiconView />
        ) : activeTab === 'saved' ? (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-amber-800 dark:text-amber-400 mb-1">
                Personal Collection
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 dark:text-stone-50">
                Saved Recipe Vault
              </h1>
            </div>

            {!user ? (
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-10 text-center max-w-xl mx-auto space-y-4">
                <Bookmark className="w-8 h-8 text-amber-700 dark:text-amber-400 mx-auto" />
                <h2 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-50">
                  Sign in with Google to Sync Your Vault
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Your bookmarked global classics, regional Indian recipes, and custom AI creations are safely persisted in Firestore when signed in.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    void signInWithGoogle();
                  }}
                  disabled={authBusy}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium cursor-pointer"
                >
                  <span>Continue with Google</span>
                </button>
              </div>
            ) : savedRecipes.length === 0 ? (
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-10 text-center max-w-xl mx-auto space-y-4">
                <Bookmark className="w-8 h-8 text-stone-400 mx-auto" />
                <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50">
                  Your Saved Vault is Empty
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-300">
                  Bookmark any dish from Explore or generate a custom recipe to keep it ready for the kitchen.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('explore')}
                  className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-amber-600 text-white text-xs font-medium cursor-pointer"
                >
                  Browse Recipes
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isSaved={true}
                    onSelect={setSelectedRecipe}
                    onToggleSave={(r) => {
                      void toggleSaveRecipe(r);
                    }}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
            {/* Editorial Hero */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/85 dark:bg-stone-900/80 overflow-hidden">
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
                <p className="text-xs font-medium tracking-widest uppercase text-amber-800 dark:text-amber-400 mb-3">
                  Culinary &amp; Beverage Intelligence
                </p>
                <h1
                  className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold text-stone-900 dark:text-stone-50 leading-[1.12] mb-4"
                  style={{ textWrap: 'balance' }}
                >
                  Global Traditions &amp; Indian Regional Kitchens, Precision-Guided
                </h1>
                <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl mb-6">
                  Every dish follows a standardized 14-point architecture with exact weights, thermal cues, 8-language spice mappings, and live countdown timers—zero vague instructions.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('pantry')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Open Smart Pantry</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGeneratorOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm font-medium transition-colors cursor-pointer"
                  >
                    <span>Generate Custom Dish</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 min-h-[240px] lg:min-h-[340px] bg-stone-200 dark:bg-stone-800">
                {!heroImgFailed ? (
                  <img
                    src="/src/assets/images/indian_regional_feast_1795185872220.jpg"
                    alt="Copper handi biryani, spiced paneer, and tempered dal served on rustic wood"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgFailed(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-900 to-stone-900 text-amber-100 p-8">
                    <ChefHat className="w-12 h-12 opacity-80" />
                  </div>
                )}
              </div>
            </section>

            {/* Filter & Search Bar */}
            <section className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Interactive Segmented Category Tabs */}
                <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-stone-200/75 dark:bg-stone-800/80 self-start">
                  {PRIMARY_FILTERS.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        categoryFilter === cat
                          ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50 shadow-sm'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Box */}
                <div className="relative w-full lg:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Carbonara, Biryani, Coffee, Ramen..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/90 dark:bg-stone-900/90 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/40"
                  />
                </div>
              </div>

              {/* Region Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {REGION_CHIPS.map((reg) => {
                  const active = regionFilter === reg;
                  return (
                    <button
                      key={reg}
                      type="button"
                      onClick={() => setRegionFilter(reg)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        active
                          ? 'border-amber-700 bg-amber-700 text-white dark:border-amber-500 dark:bg-amber-600'
                          : 'border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 hover:border-amber-600/50'
                      }`}
                    >
                      {reg}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Recipe Grid */}
            <section>
              {filteredRecipes.length === 0 ? (
                <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-12 text-center space-y-3">
                  <p className="font-display text-xl font-medium text-stone-900 dark:text-stone-100">
                    No catalog matches for &ldquo;{searchQuery || regionFilter}&rdquo;
                  </p>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    Generate a bespoke 14-point recipe for any dish or drink worldwide.
                  </p>
                  <button
                    type="button"
                    onClick={() => setGeneratorOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-700 text-white text-xs font-medium cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Custom Recipe</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      isSaved={isRecipeSaved(recipe.id)}
                      onSelect={setSelectedRecipe}
                      onToggleSave={(r) => {
                        void toggleSaveRecipe(r);
                      }}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <footer className="border-t border-stone-200/80 dark:border-stone-800/80 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <span>Rasoi &amp; Realm · Global Culinary &amp; Beverage Platform</span>
          <span>14-Point Standardized Schema · Multi-Regional Indian Localizer</span>
        </div>
      </footer>

      {generatorOpen && (
        <RecipeGeneratorModal
          onClose={() => setGeneratorOpen(false)}
          onGenerated={handleOpenGenerated}
        />
      )}
    </div>
  );
}
