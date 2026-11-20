export type RecipeCategory =
  | 'Global Cuisines'
  | 'Indian Regional'
  | 'Global & Regional Beverages';

export type SkillLevel = 'Beginner-Friendly' | 'Intermediate' | 'Pro Chef';

export type CostCategory = 'Budget-Friendly' | 'Mid-Range' | 'Gourmet Premium';

export type DietaryMode =
  | 'Standard'
  | 'Vegetarian'
  | 'Jain'
  | 'Vegan'
  | 'Gluten-Free'
  | 'High-Protein'
  | 'Keto'
  | 'Diabetes-Friendly';

export type SupportedLanguage =
  | 'English'
  | 'Hindi'
  | 'Tamil'
  | 'Telugu'
  | 'Bengali'
  | 'Marathi'
  | 'Kannada'
  | 'Malayalam'
  | 'Gujarati'
  | 'Punjabi';

export type PantryRole = 'primary' | 'staple' | 'optional';

export interface IngredientItem {
  name: string;
  amount: string;
  numericAmount?: number;
  unit?: string;
  notes?: string;
  lexiconKey?: string;
  pantryRole?: PantryRole;
}

export interface IngredientGroup {
  groupTitle: string;
  items: IngredientItem[];
}

export interface SubstituteOption {
  original: string;
  substitute: string;
  dietaryType: string;
  sensoryNote: string;
}

export interface PreparationStep {
  stepNumber: number;
  title: string;
  instruction: string;
  timerMinutes?: number;
  visualCue: string;
  temperatureOrFlame?: string;
}

export interface NutritionInfo {
  calories: number;
  proteinG: number;
  carbsG: number;
  fiberG: number;
  sugarG: number;
  fatsG: number;
  saturatedFatG: number;
  micronutrients: string[];
}

export interface TimingsInfo {
  activePrepMins: number;
  cookBrewMins: number;
  advancePrepText: string;
  totalTimeText: string;
  servings: number;
  yieldLabel: string;
}

export interface Recipe {
  id: string;
  // 1. Title
  titleNative: string;
  titleEnglish: string;
  // 2. Cuisine & Category
  category: RecipeCategory;
  region: string;
  course: string;
  // 3. Skill Level & Techniques
  skillLevel: SkillLevel;
  techniques: string[];
  // 4. Safety & Allergens + Dietary Tags
  allergens: string[];
  dietaryTags: string[];
  // 5. Key Timings & Meal Prep + Yield
  timings: TimingsInfo;
  // 6. Budget & Cost Estimation
  costCategory: CostCategory;
  estimatedCostPerServing: string;
  // 7. Nutritional Breakdown
  nutrition: NutritionInfo;
  // 8. Required Equipment & Utensils
  equipment: string[];
  // 9. Ingredients, Quantities & Localizer
  ingredientGroups: IngredientGroup[];
  // 10. Dietary & Common Substitutes
  substitutes: SubstituteOption[];
  // 11. Step-by-Step Preparation
  steps: PreparationStep[];
  // 12. Serving Suggestions & Pairings
  sidePairings: string[];
  beveragePairings: string[];
  // 13. Chef's Tips & Storage
  chefTips: string[];
  storageAdvice: {
    fridgeShelfLife: string;
    freezerSuitability: string;
    reheatingInstructions: string;
  };
  // 14. Video / Search Query
  videoSearchQuery: string;
  // Metadata
  summary: string;
  language?: SupportedLanguage;
  isAiGenerated?: boolean;
  isPantryRecipe?: boolean;
  pantryMatchSummary?: {
    primaryUsed: string[];
    pantryStaplesAssumed: string[];
    optionalAddons: string[];
  };
  imageUrl?: string;
}

export interface SpiceLexiconEntry {
  key: string;
  english: string;
  hindi: string;
  tamil: string;
  telugu: string;
  kannada: string;
  malayalam: string;
  marathi: string;
  bengali: string;
  gujarati?: string;
  punjabi?: string;
  category: 'Whole Spice' | 'Ground & Resin' | 'Herb & Leaf' | 'Souring & Sweetener' | 'Dairy & Lentil';
  culinaryNote: string;
}
