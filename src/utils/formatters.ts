import { IngredientItem } from '../types/recipe';

export function formatScaledQuantity(
  item: IngredientItem,
  scaleFactor: number
): string {
  if (!item.numericAmount || !Number.isFinite(item.numericAmount)) {
    return item.amount;
  }

  const scaled = item.numericAmount * scaleFactor;
  let formattedNum: string;

  if (scaled >= 10) {
    formattedNum = Math.round(scaled).toString();
  } else if (scaled >= 1) {
    const rounded = Math.round(scaled * 4) / 4;
    formattedNum = Number.isInteger(rounded)
      ? rounded.toString()
      : rounded.toFixed(2).replace(/\.?0+$/, '');
  } else {
    const rounded = Math.round(scaled * 8) / 8;
    formattedNum = rounded > 0 ? rounded.toFixed(2).replace(/\.?0+$/, '') : '0.25';
  }

  return item.unit ? `${formattedNum} ${item.unit}` : formattedNum;
}

export function formatCountdown(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getYoutubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
