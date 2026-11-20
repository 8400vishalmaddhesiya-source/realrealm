import React, { useMemo, useState } from 'react';
import { Search, Volume2, X } from 'lucide-react';
import { SPICE_LEXICON } from '../data/spiceLexicon';
import { SpiceLexiconEntry } from '../types/recipe';
import { speakText } from '../utils/audio';

interface SpiceLexiconViewProps {
  initialFilter?: string;
  isModal?: boolean;
  onClose?: () => void;
}

const CATEGORIES: Array<'All' | SpiceLexiconEntry['category']> = [
  'All',
  'Whole Spice',
  'Ground & Resin',
  'Herb & Leaf',
  'Souring & Sweetener',
  'Dairy & Lentil',
];

export function SpiceLexiconView({ initialFilter = '', isModal = false, onClose }: SpiceLexiconViewProps) {
  const [query, setQuery] = useState(initialFilter);
  const [category, setCategory] = useState<'All' | SpiceLexiconEntry['category']>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SPICE_LEXICON.filter((item) => {
      if (category !== 'All' && item.category !== category) return false;
      if (!q) return true;
      return [
        item.english,
        item.hindi,
        item.tamil,
        item.telugu,
        item.kannada,
        item.malayalam,
        item.marathi,
        item.bengali,
        item.gujarati ?? '',
        item.punjabi ?? '',
        item.key,
      ].some((val) => val.toLowerCase().includes(q));
    });
  }, [query, category]);

  const content = (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-amber-800 dark:text-amber-400 mb-1.5">
            Multi-Regional Indian Ingredient Localizer
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-50">
            Cross-Regional Spice &amp; Produce Dictionary
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-2xl">
            Look up any Indian spice, herb, souring agent, or kitchen staple across 8+ major Indian scripts and transliterations.
          </p>
        </div>
        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close spice lexicon"
            className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search & Category Controls */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search English, Hing, Perungayam, Kadugu, Shorshe..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-stone-200/70 dark:bg-stone-800/80">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                category === cat
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 p-10 text-center">
          <p className="text-sm text-stone-600 dark:text-stone-300">
            No ingredients matched "{query}". Try searching "Asafoetida", "Kokum", or "Tamarind".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((entry) => (
            <div
              key={entry.key}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-5 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-amber-800 dark:text-amber-400 font-medium mb-0.5">
                    {entry.category}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50">
                    {entry.english}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    speakText(`${entry.english}. In Hindi: ${entry.hindi}. In Tamil: ${entry.tamil}`)
                  }
                  aria-label={`Pronounce ${entry.english}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                  <span>Pronounce</span>
                </button>
              </div>

              <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs border-y border-stone-200/80 dark:border-stone-800 py-3.5">
                <div>
                  <dt className="text-stone-500 dark:text-stone-400">Hindi</dt>
                  <dd className="font-medium text-stone-900 dark:text-stone-100 mt-0.5">{entry.hindi}</dd>
                </div>
                <div>
                  <dt className="text-stone-500 dark:text-stone-400">Tamil</dt>
                  <dd className="font-medium text-stone-900 dark:text-stone-100 mt-0.5">{entry.tamil}</dd>
                </div>
                <div>
                  <dt className="text-stone-500 dark:text-stone-400">Telugu</dt>
                  <dd className="font-medium text-stone-900 dark:text-stone-100 mt-0.5">{entry.telugu}</dd>
                </div>
                <div>
                  <dt className="text-stone-500 dark:text-stone-400">Kannada</dt>
                  <dd className="font-medium text-stone-900 dark:text-stone-100 mt-0.5">{entry.kannada}</dd>
                </div>
                <div>
                  <dt className="text-stone-500 dark:text-stone-400">Malayalam</dt>
                  <dd className="font-medium text-stone-900 dark:text-stone-100 mt-0.5">{entry.malayalam}</dd>
                </div>
                <div>
                  <dt className="text-stone-500 dark:text-stone-400">Marathi</dt>
                  <dd className="font-medium text-stone-900 dark:text-stone-100 mt-0.5">{entry.marathi}</dd>
                </div>
                <div>
                  <dt className="text-stone-500 dark:text-stone-400">Bengali</dt>
                  <dd className="font-medium text-stone-900 dark:text-stone-100 mt-0.5">{entry.bengali}</dd>
                </div>
                {(entry.gujarati || entry.punjabi) && (
                  <div>
                    <dt className="text-stone-500 dark:text-stone-400">
                      {entry.gujarati ? 'Gujarati' : 'Punjabi'}
                    </dt>
                    <dd className="font-medium text-stone-900 dark:text-stone-100 mt-0.5">
                      {entry.gujarati || entry.punjabi}
                    </dd>
                  </div>
                )}
              </dl>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {entry.culinaryNote}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <div className="w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#faf8f4] dark:bg-[#14110f] p-6 sm:p-8 shadow-xl">
          {content}
        </div>
      </div>
    );
  }

  return <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{content}</section>;
}
