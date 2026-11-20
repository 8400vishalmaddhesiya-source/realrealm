import React, { useState } from 'react';
import { Bookmark, Clock, Utensils } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  isSaved: boolean;
  onSelect: (recipe: Recipe) => void;
  onToggleSave: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, isSaved, onSelect, onToggleSave }: RecipeCardProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article className="group flex flex-col rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/85 overflow-hidden transition-transform duration-200 hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200 dark:bg-stone-800">
        {recipe.imageUrl && !imgFailed ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.titleEnglish}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-800 via-stone-900 to-amber-950 text-amber-100 p-6 text-center">
            <Utensils className="w-8 h-8 mb-2 opacity-80" />
            <span className="font-display text-base font-medium line-clamp-2">{recipe.titleEnglish}</span>
          </div>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(recipe);
          }}
          aria-label={isSaved ? `Remove ${recipe.titleEnglish} from Saved Vault` : `Save ${recipe.titleEnglish} to Saved Vault`}
          className={`absolute top-3 right-3 p-2.5 rounded-lg backdrop-blur-md border transition-colors cursor-pointer ${
            isSaved
              ? 'bg-amber-700 border-amber-600 text-white'
              : 'bg-stone-950/60 border-white/20 text-white hover:bg-stone-950/80'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => onSelect(recipe)}
        className="flex-1 flex flex-col text-left p-5 cursor-pointer"
      >
        {/* Zero-pill unboxed metadata kicker */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-2">
          <span className="font-medium text-amber-800 dark:text-amber-400">{recipe.region}</span>
          <span aria-hidden="true">·</span>
          <span>{recipe.course}</span>
          <span aria-hidden="true">·</span>
          <span>{recipe.skillLevel}</span>
        </div>

        <h3
          className="font-display text-lg font-semibold text-stone-900 dark:text-stone-50 leading-snug mb-1 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors"
          style={{ textWrap: 'balance' }}
        >
          {recipe.titleEnglish}
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-3 truncate">
          {recipe.titleNative}
        </p>

        <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2 mb-4 flex-1">
          {recipe.summary}
        </p>

        <div className="pt-3.5 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between text-xs font-mono-tabular text-stone-600 dark:text-stone-400">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            {recipe.timings.totalTimeText}
          </span>
          <span>{recipe.nutrition.calories} kcal</span>
          <span>{recipe.costCategory}</span>
        </div>
      </button>
    </article>
  );
}
