import { DietaryMode, Recipe, SupportedLanguage } from '../types/recipe';

/**
 * Cuisine-aware offline culinary synthesis engine.
 * Used ONLY when the user explicitly opts to synthesize locally after an upstream 503 capacity spike.
 */
export function synthesizePantryRecipe(
  ingredients: string[],
  cuisinePreference: string,
  dietaryMode: DietaryMode,
  language: SupportedLanguage
): Recipe {
  const normalized = ingredients.map((i) => i.trim()).filter(Boolean);
  const lower = normalized.map((i) => i.toLowerCase());
  const has = (kw: string) => lower.some((x) => x.includes(kw));

  const isJain = dietaryMode === 'Jain';
  const isVegan = dietaryMode === 'Vegan';
  const isBeverage = cuisinePreference.toLowerCase().includes('beverage');
  const isItalian = cuisinePreference.toLowerCase().includes('italian') || has('pasta') || has('spaghetti') || has('basil');
  const isAsian = cuisinePreference.toLowerCase().includes('japanese') || cuisinePreference.toLowerCase().includes('thai') || has('tofu') || has('noodle') || has('soy');

  if (isBeverage || has('kokum') || has('tea') || has('coffee') || has('lemon') || has('mint')) {
    return {
      id: `synth-bev-${Date.now().toString(36)}`,
      titleNative: language === 'Hindi' ? 'मसाला मिंट लेमन कूलर / Spiced Citrus Cooler' : 'Artisanal Spiced Citrus & Herb Cooler',
      titleEnglish: 'Pantry Spiced Citrus & Fresh Herb Cooler',
      category: 'Global & Regional Beverages',
      region: 'Global Pantry Infusion',
      course: 'Refreshing Beverage',
      skillLevel: 'Beginner-Friendly',
      techniques: ['Cold Herb Muddling', 'Warm Spice Syrup Steep'],
      allergens: ['None'],
      dietaryTags: [dietaryMode === 'Standard' ? 'Vegan' : dietaryMode, 'Gluten-Free', 'Dairy-Free'],
      timings: {
        activePrepMins: 6,
        cookBrewMins: 4,
        advancePrepText: '10 mins chill',
        totalTimeText: '20 mins',
        servings: 2,
        yieldLabel: '2 tall chilled glasses (250 ml)'
      },
      costCategory: 'Budget-Friendly',
      estimatedCostPerServing: '₹25–₹40 ($0.30–$0.50)',
      nutrition: {
        calories: 64,
        proteinG: 0.5,
        carbsG: 15,
        fiberG: 0.8,
        sugarG: 12,
        fatsG: 0.2,
        saturatedFatG: 0,
        micronutrients: ['Vitamin C', 'Potassium', 'Antioxidants']
      },
      equipment: ['Saucepan', 'Wooden Muddler', 'Fine Strainer', 'Tall Glasses'],
      ingredientGroups: [
        {
          groupTitle: 'Primary Used (From Your Kitchen)',
          items: normalized.map((ing) => ({
            name: ing,
            amount: 'As measured (30–60 g)',
            numericAmount: 45,
            unit: 'g',
            pantryRole: 'primary' as const,
          }))
        },
        {
          groupTitle: 'Pantry Staples Assumed',
          items: [
            { name: 'Chilled Filtered Water or Soda', amount: '450 ml', numericAmount: 450, unit: 'ml', pantryRole: 'staple' },
            { name: 'Sea Salt / Black Salt', amount: '2 g', numericAmount: 2, unit: 'g', pantryRole: 'staple' },
            { name: 'Roasted Cumin Powder', amount: '0.5 tsp', numericAmount: 0.5, unit: 'tsp', lexiconKey: 'cumin', pantryRole: 'staple' },
          ]
        },
        {
          groupTitle: 'Optional Add-ons',
          items: [
            { name: 'Jaggery or Honey', amount: '15 g', numericAmount: 15, unit: 'g', lexiconKey: 'jaggery', pantryRole: 'optional' },
            { name: 'Crushed Ice & Fresh Herb Sprig', amount: '80 g', numericAmount: 80, unit: 'g', pantryRole: 'optional' },
          ]
        }
      ],
      substitutes: [
        {
          original: 'Jaggery / Sugar',
          substitute: 'Stevia leaf infusion or omit completely',
          dietaryType: 'Diabetes-Friendly / Keto',
          sensoryNote: 'Keeps citrus-spice lift bright with zero glycemic spike'
        }
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Bloom Spice & Sweetener Base',
          instruction: 'Simmer roasted cumin, salt, and optional jaggery in 60 ml water for 3 minutes until fully dissolved, then cool completely.',
          timerMinutes: 3,
          visualCue: 'Clear amber syrup with aromatic roasted spice notes.',
          temperatureOrFlame: 'Low simmer (92°C / 198°F)'
        },
        {
          stepNumber: 2,
          title: 'Gently Muddle Fresh Pantry Botanicals',
          instruction: 'Press your fresh citrus or herbs gently in a pitcher 4–5 times—never shred leaves to bitter pulp—then pour in the cooled spice base and 450 ml chilled water.',
          timerMinutes: 2,
          visualCue: 'Essential oils shimmer on the surface and leaves stay bright green.',
          temperatureOrFlame: 'Chilled (4°C / 39°F)'
        }
      ],
      sidePairings: ['Roasted masala makhana', 'Crisp chickpea papad'],
      beveragePairings: ['Self-contained zero-proof refresher'],
      chefTips: [
        'Critical Pitfall: Never muddle mint or citrus pith aggressively; gentle pressing releases aromatic oils without extracting bitter chlorophyll.'
      ],
      storageAdvice: {
        fridgeShelfLife: '24 hours chilled before adding ice or carbonation.',
        freezerSuitability: 'Freeze into ice cubes for quick coolers.',
        reheatingInstructions: 'Serve chilled.'
      },
      videoSearchQuery: 'Homemade Spiced Citrus Cooler Shikanji Mint Cooler',
      summary: `Vibrant pantry beverage built around ${normalized.join(', ')} balanced with roasted cumin and chilled water.`,
      language,
      isPantryRecipe: true,
      pantryMatchSummary: {
        primaryUsed: normalized,
        pantryStaplesAssumed: ['Filtered Water', 'Salt', 'Roasted Cumin Powder'],
        optionalAddons: ['Jaggery', 'Crushed Ice']
      }
    };
  }

  if (isItalian) {
    return {
      id: `synth-ita-${Date.now().toString(36)}`,
      titleNative: 'Padella Rustica all’Aglio e Olio (पैंट्री इटैलियन स्किलेट)',
      titleEnglish: `Pantry Italian ${normalized[0] || 'Skillet'} Emulsion`,
      category: 'Global Cuisines',
      region: 'Italy · Pantry Tradition',
      course: 'Main Course',
      skillLevel: 'Beginner-Friendly',
      techniques: ['Olive Oil Infusion', 'Starchy Water Emulsification'],
      allergens: isVegan ? ['None'] : ['Gluten', 'Dairy (Optional)'],
      dietaryTags: [dietaryMode],
      timings: {
        activePrepMins: 10,
        cookBrewMins: 15,
        advancePrepText: 'None',
        totalTimeText: '25 mins',
        servings: 2,
        yieldLabel: '2 warm plates'
      },
      costCategory: 'Budget-Friendly',
      estimatedCostPerServing: '₹110–₹160 ($1.30–$1.95)',
      nutrition: {
        calories: 480,
        proteinG: 15,
        carbsG: 62,
        fiberG: 5,
        sugarG: 4,
        fatsG: 18,
        saturatedFatG: 3,
        micronutrients: ['Iron', 'Vitamin E', 'Folate']
      },
      equipment: ['Wide Skillet (28 cm)', 'Pasta Pot', 'Tongs'],
      ingredientGroups: [
        {
          groupTitle: 'Primary Used (From Your Kitchen)',
          items: normalized.map((ing) => ({
            name: ing,
            amount: '150 g (prepped evenly)',
            numericAmount: 150,
            unit: 'g',
            pantryRole: 'primary' as const,
          }))
        },
        {
          groupTitle: 'Pantry Staples Assumed',
          items: [
            { name: 'Extra Virgin Olive Oil', amount: '35 ml', numericAmount: 35, unit: 'ml', pantryRole: 'staple' },
            { name: 'Sea Salt & Freshly Cracked Black Pepper', amount: '6 g', numericAmount: 6, unit: 'g', lexiconKey: 'black_pepper', pantryRole: 'staple' },
            { name: 'Cooking Water (or Starchy Pasta Water)', amount: '120 ml', numericAmount: 120, unit: 'ml', pantryRole: 'staple' },
          ]
        },
        {
          groupTitle: 'Optional Add-ons',
          items: [
            { name: 'Red Chili Flakes & Lemon Zest', amount: '1 tsp', numericAmount: 1, unit: 'tsp', pantryRole: 'optional' },
            { name: isVegan ? 'Nutritional Yeast' : 'Grated Aged Hard Cheese', amount: '30 g', numericAmount: 30, unit: 'g', pantryRole: 'optional' },
          ]
        }
      ],
      substitutes: [
        {
          original: 'Wheat Pasta',
          substitute: 'Chickpea or brown-rice pasta',
          dietaryType: 'Gluten-Free',
          sensoryNote: 'Adds protein while preserving starchy emulsion'
        }
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Gently Infuse Oil Without Browning',
          instruction: `Warm 35 ml olive oil over medium-low heat (~140°C / 285°F) and sweat aromatics (${isJain ? 'hing & chili flakes' : 'sliced garlic & chili flakes'}) for 2 minutes until pale gold and fragrant.`,
          timerMinutes: 2,
          visualCue: 'Aromatics shimmer gently in oil with zero dark brown edges.',
          temperatureOrFlame: 'Medium-low flame (140°C / 285°F)'
        },
        {
          stepNumber: 2,
          title: 'Sauté Pantry Produce & Emulsify',
          instruction: `Add ${normalized.join(', ')} and sauté 6 minutes until tender-crisp, then splash in 120 ml starchy cooking water and toss vigorously for 90 seconds until oil and water bind into a silky glaze.`,
          timerMinutes: 8,
          visualCue: 'Liquid turns opaque glossy cream clinging evenly to ingredients.',
          temperatureOrFlame: 'Medium-high toss (175°C / 347°F)'
        }
      ],
      sidePairings: ['Crisp arugula lemon salad', 'Toasted sourdough bruschetta'],
      beveragePairings: ['Sparkling water with crushed rosemary & citrus'],
      chefTips: [
        'Critical Pitfall: Never burn garlic in smoking olive oil—bitter burnt garlic ruins delicate Italian emulsions.'
      ],
      storageAdvice: {
        fridgeShelfLife: '2 days refrigerated.',
        freezerSuitability: 'Not recommended for emulsified pasta.',
        reheatingInstructions: 'Warm gently in a skillet with 2 tbsp water while tossing continuously.'
      },
      videoSearchQuery: 'Authentic Italian Pantry Skillet Emulsion Aglio e Olio technique',
      summary: `Italian skillet preparation highlighting ${normalized.join(', ')} bound in a silky olive-oil and starchy-water emulsion.`,
      language,
      isPantryRecipe: true,
      pantryMatchSummary: {
        primaryUsed: normalized,
        pantryStaplesAssumed: ['Extra Virgin Olive Oil', 'Salt', 'Black Pepper', 'Starchy Water'],
        optionalAddons: ['Chili Flakes', 'Lemon Zest']
      }
    };
  }

  // Indian Regional Pantry Synthesis (Default for potatoes, curd, spinach, garlic, paneer, etc.)
  const useCurd = has('curd') || has('yogurt') || has('dahi');
  const useSpinach = has('spinach') || has('palak');
  const usePotato = has('potato') || has('aloo');

  const dishTitleEn = useSpinach && usePotato
    ? 'Lasooni Palak Aloo with Tempered Curd Kadhi Glaze'
    : useCurd && usePotato
    ? 'Dahi Aloo with Crackle Jeera-Hing Tadka'
    : `Tadka ${normalized.slice(0, 3).join(' & ')} Skillet`;

  return {
    id: `synth-ind-${Date.now().toString(36)}`,
    titleNative: language === 'Hindi' ? `तड़का पैंट्री स्पेशल / ${dishTitleEn}` : `${dishTitleEn} (तड़का पैंट्री व्यंजन)`,
    titleEnglish: dishTitleEn,
    category: 'Indian Regional',
    region: isAsian ? 'Pan-Asian Pantry' : 'North & West Indian Home Kitchen',
    course: 'Main Course',
    skillLevel: 'Beginner-Friendly',
    techniques: ['Whole-Spice Tadka Tempering', 'Low-Heat Curd Stabilization'],
    allergens: useCurd && !isVegan ? ['Dairy'] : ['None'],
    dietaryTags: [dietaryMode === 'Standard' ? 'Vegetarian' : dietaryMode, 'Gluten-Free'],
    timings: {
      activePrepMins: 12,
      cookBrewMins: 18,
      advancePrepText: 'None required',
      totalTimeText: '30 mins',
      servings: 3,
      yieldLabel: '3 homestyle bowls'
    },
    costCategory: 'Budget-Friendly',
    estimatedCostPerServing: '₹45–₹75 ($0.55–$0.90)',
    nutrition: {
      calories: 295,
      proteinG: 11,
      carbsG: 31,
      fiberG: 5.5,
      sugarG: 4,
      fatsG: 14,
      saturatedFatG: 3.5,
      micronutrients: ['Iron', 'Vitamin A', 'Calcium', 'Folate']
    },
    equipment: ['Heavy Kadai or Skillet', 'Small Tadka Pan', 'Whisk'],
    ingredientGroups: [
      {
        groupTitle: 'Primary Used (From Your Kitchen)',
        items: normalized
          .filter((n) => !isJain || (!n.toLowerCase().includes('garlic') && !n.toLowerCase().includes('onion') && !n.toLowerCase().includes('potato')))
          .map((ing) => ({
            name: ing,
            amount: '180 g (evenly diced)',
            numericAmount: 180,
            unit: 'g',
            lexiconKey: ing.toLowerCase().includes('curd') ? 'curd' : undefined,
            pantryRole: 'primary' as const,
          }))
      },
      {
        groupTitle: 'Pantry Staples Assumed',
        items: [
          { name: 'Cold-Pressed Cooking Oil or Ghee', amount: '25 ml', numericAmount: 25, unit: 'ml', lexiconKey: 'ghee', pantryRole: 'staple' },
          { name: 'Cumin Seeds (Jeera)', amount: '1 tsp', numericAmount: 1, unit: 'tsp', lexiconKey: 'cumin', pantryRole: 'staple' },
          { name: 'Asafoetida (Hing)', amount: '0.25 tsp', numericAmount: 0.25, unit: 'tsp', lexiconKey: 'asafoetida', pantryRole: 'staple' },
          { name: 'Turmeric & Kashmiri Chili Powder', amount: '1 tsp', numericAmount: 1, unit: 'tsp', lexiconKey: 'turmeric', pantryRole: 'staple' },
          { name: 'Sea Salt & Warm Water', amount: '150 ml', numericAmount: 150, unit: 'ml', pantryRole: 'staple' },
        ]
      },
      {
        groupTitle: 'Optional Add-ons',
        items: [
          { name: 'Dried Fenugreek Leaves (Kasuri Methi)', amount: '1 tbsp', numericAmount: 1, unit: 'tbsp', lexiconKey: 'kasuri_methi', pantryRole: 'optional' },
          { name: 'Fresh Cilantro & Garam Masala', amount: '10 g', numericAmount: 10, unit: 'g', pantryRole: 'optional' },
        ]
      }
    ],
    substitutes: [
      {
        original: 'Dairy Curd / Ghee',
        substitute: 'Unsweetened soy/cashew yogurt + cold-pressed mustard or sunflower oil',
        dietaryType: 'Vegan / Dairy-Free',
        sensoryNote: 'Whisk smooth with 1 tsp gram flour (besan) so yogurt stays velvety'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pop Whole Cumin & Hing Tadka',
        instruction: `Heat 25 ml oil/ghee in heavy kadai to 175°C (345°F). Add 1 tsp cumin seeds and 0.25 tsp hing; let sizzle 15 seconds until cumin turns walnut-brown and releases nutty aroma. ${isJain ? 'Add finely grated ginger and slit green chili.' : 'Add aromatics/garlic and sauté 90 seconds until edges turn pale gold.'}`,
        timerMinutes: 2,
        visualCue: 'Cumin seeds dance briskly without turning black.',
        temperatureOrFlame: 'Medium flame (175°C / 345°F)'
      },
      {
        stepNumber: 2,
        title: 'Sear Main Pantry Produce with Turmeric',
        instruction: `Toss in your primary produce (${normalized.join(', ')}) along with turmeric, chili powder, and salt. Roast uncovered for 6 minutes until edges blister lightly and excess moisture cooks off.`,
        timerMinutes: 6,
        visualCue: 'Edges turn golden-seared and spices coat every piece cleanly.',
        temperatureOrFlame: 'Medium-high flame (190°C / 375°F)'
      },
      {
        stepNumber: 3,
        title: useCurd ? 'Stabilize Whisked Curd on Low Flame' : 'Simmer & Finish with Kasuri Methi',
        instruction: useCurd
          ? 'Lower flame to minimum (or kill flame 30 seconds). Whisk curd completely smooth with 60 ml water and pour slowly while stirring nonstop for 4 minutes until velvety and oil beads rise.'
          : 'Pour 120 ml warm water, cover, and simmer 6 minutes until fork-tender. Crush kasuri methi between palms and scatter on top.',
        timerMinutes: 5,
        visualCue: 'Silky, unbroken gravy clings evenly with glossy oil droplets around the rim.',
        temperatureOrFlame: 'Lowest flame (88°C / 190°F)'
      }
    ],
    sidePairings: ['Hot whole-wheat Phulka Roti', 'Steamed Jeera Basmati Rice'],
    beveragePairings: ['Roasted cumin Chaas', 'Kashmiri Saffron Kahwa'],
    chefTips: [
      'Critical Pitfall: Never add cold curd to a roaring-hot skillet—always whisk smooth at room temperature and drop heat to low while stirring nonstop so dairy never splits.'
    ],
    storageAdvice: {
      fridgeShelfLife: '2–3 days refrigerated in airtight glass.',
      freezerSuitability: 'Freeze only non-curd portions; curd gravies separate on thawing.',
      reheatingInstructions: 'Warm gently over low heat with 2 tbsp water, stirring slowly.'
    },
    videoSearchQuery: `${dishTitleEn} authentic homestyle recipe`,
    summary: `Homestyle Indian pantry preparation built around ${normalized.join(', ')} anchored by crackled jeera-hing tadka and balanced spices.`,
    language,
    isPantryRecipe: true,
    pantryMatchSummary: {
      primaryUsed: normalized,
      pantryStaplesAssumed: ['Cooking Oil / Ghee', 'Cumin Seeds', 'Asafoetida (Hing)', 'Turmeric', 'Salt'],
      optionalAddons: ['Kasuri Methi', 'Fresh Cilantro']
    }
  };
}
