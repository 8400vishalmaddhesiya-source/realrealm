import { Recipe } from '../types/recipe';

export const PRESET_RECIPES: Recipe[] = [
  {
    id: 'roman-spaghetti-carbonara',
    titleNative: 'Spaghetti alla Carbonara (रोमन कार्बोनारा)',
    titleEnglish: 'Authentic Roman Spaghetti alla Carbonara',
    category: 'Global Cuisines',
    region: 'Italy · Lazio (Rome)',
    course: 'Main Course (Primi Piatti)',
    skillLevel: 'Intermediate',
    techniques: ['Cold-Pan Fat Rendering', 'Off-Heat Mantecatura Emulsification', 'Dry Peppercorn Toasting'],
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    dietaryTags: ['High-Protein', 'Zero Cream'],
    timings: {
      activePrepMins: 12,
      cookBrewMins: 15,
      advancePrepText: 'None required',
      totalTimeText: '27 mins',
      servings: 2,
      yieldLabel: '2 generous plates'
    },
    costCategory: 'Mid-Range',
    estimatedCostPerServing: '₹320–₹440 ($3.80–$5.20)',
    nutrition: {
      calories: 645,
      proteinG: 29,
      carbsG: 71,
      fiberG: 3,
      sugarG: 2,
      fatsG: 27,
      saturatedFatG: 11,
      micronutrients: ['Calcium', 'Vitamin B12', 'Selenium', 'Phosphorus']
    },
    equipment: ['Heavy Stainless Skillet (28 cm)', 'Tall Pasta Pot (4 L)', 'Mortar & Pestle', 'Heatproof Mixing Bowl', 'Kitchen Tongs'],
    ingredientGroups: [
      {
        groupTitle: 'For Pasta & Cured Pork Base',
        items: [
          { name: 'Bronze-die Spaghetti (high protein, 13%+)', amount: '200 g', numericAmount: 200, unit: 'g' },
          { name: 'Guanciale (or thick-cut Pancetta), cut into 8 mm lardons', amount: '110 g', numericAmount: 110, unit: 'g', notes: 'Cut pork cheek with fat-to-lean ratio ~60:40' },
          { name: 'Kosher / Sea Salt (for pasta water)', amount: '12 g', numericAmount: 12, unit: 'g', notes: 'Use half normal salt because Pecorino and guanciale are intensely savory' }
        ]
      },
      {
        groupTitle: 'For the Egg & Cheese Crema',
        items: [
          { name: 'Pasteurized Large Egg Yolks', amount: '3 yolks', numericAmount: 3, unit: 'yolks' },
          { name: 'Whole Large Egg', amount: '1 whole', numericAmount: 1, unit: 'whole' },
          { name: 'Pecorino Romano D.O.P., finely microplaned', amount: '70 g', numericAmount: 70, unit: 'g' },
          { name: 'Whole Black Peppercorns, coarsely cracked', amount: '1.5 tsp', numericAmount: 1.5, unit: 'tsp', lexiconKey: 'black_pepper' }
        ]
      }
    ],
    substitutes: [
      {
        original: 'Guanciale (cured pork cheek)',
        substitute: 'Smoked turkey bacon + 15 ml extra virgin olive oil OR crispy oyster mushrooms (vegetarian)',
        dietaryType: 'Halal / Vegetarian',
        sensoryNote: 'Add 1/4 tsp smoked paprika if using mushrooms for savory depth'
      },
      {
        original: '100% Pecorino Romano D.O.P.',
        substitute: '50% Pecorino Romano + 50% aged Parmigiano-Reggiano (or vegetarian rennet hard cheese)',
        dietaryType: 'Milder Salt Profile',
        sensoryNote: 'Softens sharp sheep-milk tang while preserving emulsifying casein'
      },
      {
        original: 'Bronze-die wheat spaghetti',
        substitute: '100% brown-rice & corn artisanal gluten-free spaghetti',
        dietaryType: 'Gluten-Free',
        sensoryNote: 'Boil in slightly less water (2 L) so starch concentrates for glossy emulsion'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Build the Pecorino-Egg Paste',
        instruction: 'In a wide heatproof bowl, whisk 3 egg yolks, 1 whole egg, and 70 g microplaned Pecorino Romano into a thick, uniform golden paste. Dry-toast 1.5 tsp coarsely cracked black pepper in the cold skillet over medium-low heat for 60 seconds until fragrant and floral, then transfer half into the egg bowl.',
        timerMinutes: 2,
        visualCue: 'Paste should feel stiff like thick mayonnaise and hold soft peaks on the whisk.',
        temperatureOrFlame: 'Medium-low dry skillet (~140°C / 285°F)'
      },
      {
        stepNumber: 2,
        title: 'Cold-Pan Render the Guanciale',
        instruction: 'Place 110 g guanciale lardons in the empty skillet with zero oil. Turn heat to medium-low and render slowly for 7 minutes, swirling occasionally so fat melts evenly without scorching.',
        timerMinutes: 7,
        visualCue: 'Fat turns crystal clear and pools ~3 tbsp liquid gold; edges turn deep mahogany-crisp while centers stay chewy.',
        temperatureOrFlame: 'Medium-low flame (150°C / 300°F fat bath)'
      },
      {
        stepNumber: 3,
        title: 'Boil Pasta in Low-Volume Salted Water',
        instruction: 'Bring 2.2 L water + 12 g salt to a rolling boil. Drop 200 g spaghetti and cook 2 minutes shy of package instructions (around 8 minutes). Before draining, scoop out 180 ml of cloudy, starch-rich pasta water and keep the skillet OFF the heat.',
        timerMinutes: 8,
        visualCue: 'Snap a strand: outer 80% is translucent and pliable while a pin-thin opaque core remains strictly al dente.',
        temperatureOrFlame: 'Rolling boil (100°C / 212°F)'
      },
      {
        stepNumber: 4,
        title: 'Off-Heat Mantecatura Emulsification',
        instruction: 'Using tongs, transfer hot pasta directly into the off-heat guanciale skillet with 60 ml pasta water; toss vigorously for 30 seconds until skillet drops below 70°C (158°F). Pour in the egg-Pecorino paste and toss continuously, adding 1 tbsp pasta water at a time until a glossy, velvety crema coats every strand.',
        timerMinutes: 2,
        visualCue: 'Zero scrambled curds; sauce flows smoothly like heavy satin custard and clings to pasta without pooling.',
        temperatureOrFlame: 'Strictly OFF heat (65°C–70°C / 149°F–158°F residual warmth)'
      }
    ],
    sidePairings: ['Bitter chicory & puntarelle salad with lemon-anchovy dressing', 'Crisp Roman carciofi alla giudia'],
    beveragePairings: ['Chilled Frascati Superiore dry white wine', 'Sparkling blood orange & rosemary zero-proof spritz'],
    chefTips: [
      'Critical Pitfall: Never add heavy cream, garlic, or onion—real Carbonara gets 100% of its creaminess from emulsified egg yolks, Pecorino casein, and starch water.',
      'Critical Pitfall: Never pour egg mixture into a skillet sitting over an active flame; temperatures above 74°C (165°F) instantly scramble the yolks.',
      'Use a smaller pot of water (2.2 L instead of 5 L) so the released wheat starch is concentrated enough to bind the fat and cheese.'
    ],
    storageAdvice: {
      fridgeShelfLife: 'Best eaten immediately; refrigerated leftovers keep up to 24 hours in an airtight container.',
      freezerSuitability: 'Not recommended—egg-cheese emulsion separates upon thawing.',
      reheatingInstructions: 'Place in a heatproof bowl set over a pot of barely simmering water (bain-marie) with 2 tbsp water, tossing gently until glossy.'
    },
    videoSearchQuery: 'Authentic Roman Spaghetti alla Carbonara Luciano Monosilio technique',
    summary: 'Zero-cream Roman classic driven by slow-rendered guanciale fat, toasted black pepper, Pecorino Romano D.O.P., and gentle off-heat starchy mantecatura.',
    imageUrl: '/src/assets/images/global_artisan_dishes_1795185872399.jpg'
  },
  {
    id: 'tokyo-shoyu-ramen',
    titleNative: '東京醤油ラーメン (Tokyo Shoyu Ramen)',
    titleEnglish: 'Tokyo Shoyu Ramen with Chashu & Ajitsuke Tamago',
    category: 'Global Cuisines',
    region: 'Japan · Tokyo',
    course: 'Main Course (Noodle Soup)',
    skillLevel: 'Pro Chef',
    techniques: ['Sub-80°C Kombu Dashi Extraction', 'Shoyu Tare Reduction', '6m30s Ice-Shock Jammy Egg'],
    allergens: ['Soy', 'Gluten', 'Eggs', 'Sesame'],
    dietaryTags: ['High-Protein', 'Dairy-Free'],
    timings: {
      activePrepMins: 35,
      cookBrewMins: 55,
      advancePrepText: '4–12 hrs egg & chashu brine marinade',
      totalTimeText: '1 hr 30 mins (+ marination)',
      servings: 2,
      yieldLabel: '2 deep ramen bowls'
    },
    costCategory: 'Gourmet Premium',
    estimatedCostPerServing: '₹420–₹580 ($5.00–$6.80)',
    nutrition: {
      calories: 690,
      proteinG: 36,
      carbsG: 68,
      fiberG: 4,
      sugarG: 7,
      fatsG: 29,
      saturatedFatG: 9,
      micronutrients: ['Iodine', 'Vitamin A', 'Iron', 'Niacin']
    },
    equipment: ['Digital Kitchen Thermometer', '2 Heavy Stockpots', 'Fine Mesh Strainer (Chinois)', 'Ramen Noodle Basket / Strainer', 'Deep Ceramic Bowls'],
    ingredientGroups: [
      {
        groupTitle: 'For Chintan Broth & Kombu Dashi',
        items: [
          { name: 'Filtered Cold Water', amount: '1200 ml', numericAmount: 1200, unit: 'ml' },
          { name: 'Rishiri or Hidaka Kombu Kelp (wiped, never washed)', amount: '12 g', numericAmount: 12, unit: 'g' },
          { name: 'Katsuobushi (Shaved Bonito Flakes) or Dried Shiitake (vegan)', amount: '15 g', numericAmount: 15, unit: 'g' },
          { name: 'Chicken Stock (unsalted clear chintan) or Roasted Veg Stock', amount: '600 ml', numericAmount: 600, unit: 'ml' },
          { name: 'Fresh Ginger Slices & Scallion Whites', amount: '30 g', numericAmount: 30, unit: 'g' }
        ]
      },
      {
        groupTitle: 'For Shoyu Tare & Toppings',
        items: [
          { name: 'Aged Japanese Usukuchi & Koikuchi Soy Sauce', amount: '80 ml', numericAmount: 80, unit: 'ml' },
          { name: 'Hon-Mirin (Sweet Rice Wine)', amount: '40 ml', numericAmount: 40, unit: 'ml' },
          { name: 'Large Cold Eggs (for Ajitsuke Tamago)', amount: '2 eggs', numericAmount: 2, unit: 'eggs' },
          { name: 'Fresh Alkaline Ramen Noodles (Kansui)', amount: '260 g', numericAmount: 260, unit: 'g' },
          { name: 'Seared Pork Belly Chashu (or Crispy Glazed Tofu)', amount: '160 g', numericAmount: 160, unit: 'g' },
          { name: 'Toasted Sesame Oil & Nori Sheets', amount: '10 ml', numericAmount: 10, unit: 'ml' }
        ]
      }
    ],
    substitutes: [
      {
        original: 'Katsuobushi & Chicken Chintan',
        substitute: '4 dried shiitake mushrooms + charred onion + roasted kombu vegetable dashi',
        dietaryType: 'Vegan / Vegetarian',
        sensoryNote: 'Provides deep guanylate-glutamate synergy without fish or poultry'
      },
      {
        original: 'Soy Sauce (wheat-fermented)',
        substitute: 'Organic Gluten-Free Tamari',
        dietaryType: 'Gluten-Free',
        sensoryNote: 'Richer, slightly less sharp salinity; pair with gluten-free millet/rice ramen'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: '6m30s Jammy Ajitsuke Tamago',
        instruction: 'Bring 1.5 L water to a gentle boil. Lower cold fridge-temperature eggs with a slotted spoon and simmer exactly 6 minutes 30 seconds. Plunge immediately into an ice-water bath for 10 minutes, peel under water, and marinate in 30 ml soy sauce + 20 ml mirin + 40 ml water.',
        timerMinutes: 7,
        visualCue: 'Whites are firm and bouncy; yolks stay custard-thick, amber-orange, and jammy without runny wateriness.',
        temperatureOrFlame: 'Gentle simmer (96°C / 205°F) -> 0°C Ice Shock'
      },
      {
        stepNumber: 2,
        title: 'Sub-80°C Kombu Dashi Extraction',
        instruction: 'Soak 12 g kombu in 1200 ml cold water for 30 minutes. Heat slowly on low until thermometer reads 75°C–78°C (167°F–172°F) with tiny pearls along the pot rim—never boil. Remove kombu, raise to 85°C (185°F), kill heat, steep katsuobushi/shiitake for 4 minutes, and strain cleanly.',
        timerMinutes: 12,
        visualCue: 'Clear pale-amber tea-like liquor with clean oceanic umami and zero sliminess.',
        temperatureOrFlame: 'Strict cap at 78°C (172°F) for kombu'
      },
      {
        stepNumber: 3,
        title: 'Simmer Shoyu Tare & Assemble Soup',
        instruction: 'Combine 80 ml soy sauce, 40 ml hon-mirin, ginger, and scallion whites; simmer 4 minutes to burn off harsh alcohol, then cool. Blend finished dashi with 600 ml clear stock and hold at 90°C (194°F). Pre-warm ceramic bowls with hot water, wipe dry, and ladle 35 ml Tare + 5 ml sesame oil into each bowl.',
        timerMinutes: 5,
        visualCue: 'Tare glosses the spoon and smells rounded, malty, and savory without raw soy sting.',
        temperatureOrFlame: 'Low simmer (90°C / 194°F)'
      },
      {
        stepNumber: 4,
        title: 'Flash-Boil Alkaline Noodles & Plate',
        instruction: 'Boil 260 g fresh kansui noodles in unsalted vigorously boiling water for 90 seconds, shake dry violently in strainer 5 times so excess starch never clouds broth. Ladle 420 ml piping-hot broth over the tare, fold noodles neatly into a central wave, and crown with seared chashu, halved jammy egg, scallion curls, and crisp nori.',
        timerMinutes: 2,
        visualCue: 'Noodles hold a taut springy snap with translucent sheen; broth stays crystal-clear mahogany.',
        temperatureOrFlame: 'Rapid rolling boil (100°C / 212°F)'
      }
    ],
    sidePairings: ['Pan-fried crispy gyoza dumplings', 'Smashed cucumber goma-ae salad'],
    beveragePairings: ['Ceremonial Uji Matcha & Yuzu Tonic', 'Roasted barley tea (Mugicha) or dry Junmai sake'],
    chefTips: [
      'Critical Pitfall: Never boil kombu kelp above 80°C (176°F)—excess heat extracts bitter alginates and turns the delicate dashi slimy.',
      'Critical Pitfall: Always drain noodles aggressively before dropping them into the bowl; watery noodles dilute the concentrated shoyu tare.',
      'Pre-warming the ceramic ramen bowls guarantees the broth remains above 75°C until the final spoonful.'
    ],
    storageAdvice: {
      fridgeShelfLife: 'Tare keeps 3 weeks refrigerated; broth keeps 4 days; marinated eggs peak within 48 hours.',
      freezerSuitability: 'Broth and chashu freeze cleanly up to 2 months; never freeze boiled noodles or eggs.',
      reheatingInstructions: 'Bring broth back to 90°C on stovetop; drop fresh noodles straight into boiling water when ready to serve.'
    },
    videoSearchQuery: 'Tokyo Shoyu Ramen Chintan Broth and Tare Ivan Orkin Way of Ramen',
    summary: 'Precision Tokyo noodle soup anchored by sub-80°C kombu-bonito dashi, balanced aged shoyu tare, springy kansui noodles, and 6m30s jammy marinated eggs.',
    imageUrl: '/src/assets/images/global_artisan_dishes_1795185872399.jpg'
  },
  {
    id: 'awadhi-paneer-dum-biryani',
    titleNative: 'अवधी पनीर दम बिरयानी (Awadhi Paneer Dum Biryani)',
    titleEnglish: 'Awadhi Royal Paneer & Saffron Dum Biryani',
    category: 'Indian Regional',
    region: 'North India · Lucknow (Awadh)',
    course: 'Main Course (Festive Rice)',
    skillLevel: 'Intermediate',
    techniques: ['Birista Onion Caramelization', '75% Par-Boil Rice Tempering', 'Atta-Sealed Dum Slow Steaming'],
    allergens: ['Dairy', 'Tree Nuts'],
    dietaryTags: ['Vegetarian', 'Gluten-Free', 'Festive'],
    timings: {
      activePrepMins: 30,
      cookBrewMins: 40,
      advancePrepText: '30 mins aged basmati soak + 25 mins paneer marinade',
      totalTimeText: '1 hr 35 mins',
      servings: 4,
      yieldLabel: '4 generous handi portions'
    },
    costCategory: 'Mid-Range',
    estimatedCostPerServing: '₹145–₹195 ($1.75–$2.35)',
    nutrition: {
      calories: 560,
      proteinG: 21,
      carbsG: 64,
      fiberG: 5,
      sugarG: 6,
      fatsG: 24,
      saturatedFatG: 11,
      micronutrients: ['Calcium', 'Vitamin A', 'Iron', 'Manganese']
    },
    equipment: ['Heavy-Bottomed Copper or Cast-Iron Handi with Tight Lid', 'Flat Iron Tawa (for indirect dum)', 'Fine Sieve', 'Mortar & Pestle'],
    ingredientGroups: [
      {
        groupTitle: 'For Aged Basmati & Saffron Infusion',
        items: [
          { name: 'Aged Extra-Long Grain Basmati Rice (soaked 30 mins)', amount: '350 g', numericAmount: 350, unit: 'g' },
          { name: 'Kashmiri Saffron Strands (soaked in 45 ml warm milk)', amount: '0.5 tsp', numericAmount: 0.5, unit: 'tsp', lexiconKey: 'saffron' },
          { name: 'Green Cardamom Pods, bruised', amount: '5 pods', numericAmount: 5, unit: 'pods', lexiconKey: 'green_cardamom' },
          { name: 'Cloves & Shahi Jeera (Royal Cumin)', amount: '4 cloves', numericAmount: 4, unit: 'cloves', lexiconKey: 'cloves' },
          { name: 'Kewra Water (Screwpine essence)', amount: '1 tsp', numericAmount: 1, unit: 'tsp' }
        ]
      },
      {
        groupTitle: 'For Paneer Yakhni & Birista',
        items: [
          { name: 'Fresh Malai Paneer, cut into 2.5 cm cubes', amount: '320 g', numericAmount: 320, unit: 'g' },
          { name: 'Thick Hung Curd / Yogurt, whisked smooth', amount: '140 g', numericAmount: 140, unit: 'g', lexiconKey: 'curd' },
          { name: 'Red Onions, paper-thinly sliced evenly', amount: '250 g', numericAmount: 250, unit: 'g' },
          { name: 'Pure Cow Ghee', amount: '45 ml', numericAmount: 45, unit: 'ml', lexiconKey: 'ghee' },
          { name: 'Fresh Mint & Cilantro Leaves', amount: '40 g', numericAmount: 40, unit: 'g' },
          { name: 'Fried Cashews & Golden Raisins', amount: '30 g', numericAmount: 30, unit: 'g' }
        ]
      }
    ],
    substitutes: [
      {
        original: 'Malai Paneer & Hung Curd',
        substitute: 'Extra-firm organic tofu + thick unsweetened cashew yogurt + cold-pressed coconut oil',
        dietaryType: 'Vegan / Dairy-Free',
        sensoryNote: 'Pan-sear tofu cubes lightly first so they absorb saffron-spice marinade cleanly'
      },
      {
        original: 'Red Onions & Garlic-Ginger Paste',
        substitute: 'Charred fennel bulb ribbons + 1/4 tsp Asafoetida (Hing) + fresh ginger-green chili paste',
        dietaryType: 'Jain Satvik',
        sensoryNote: 'Preserves sweet caramel backbone and aromatic depth without onion or garlic'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Fry Crisp Mahogany Birista & Bloom Saffron',
        instruction: 'Crush 0.5 tsp saffron in a warm mortar and steep in 45 ml 60°C milk. Fry 250 g evenly sliced onions in ghee + neutral oil over medium heat for 12 minutes, stirring constantly once edges pale so they caramelize uniformly without burning. Drain onto paper towels immediately when light golden-amber (carryover heat finishes them).',
        timerMinutes: 12,
        visualCue: 'Onions crisp as they cool into sweet, dry, reddish-gold ribbons with zero bitter black specks.',
        temperatureOrFlame: 'Medium flame (165°C / 330°F oil)'
      },
      {
        stepNumber: 2,
        title: 'Par-Cook Yakhni & Marinate Paneer',
        instruction: 'Toss paneer cubes gently with whisked curd, ginger-garlic paste, Kashmiri chili, green cardamom powder, crushed birista, and mint. Simmer in the heavy handi on low flame for 5 minutes until oil beads rise around the edges and paneer stays cushion-soft.',
        timerMinutes: 5,
        visualCue: 'Gravy thickens to coat the paneer; tiny ghee droplets separate along the pan perimeter.',
        temperatureOrFlame: 'Low flame (95°C / 203°F)'
      },
      {
        stepNumber: 3,
        title: 'Boil Rice Strictly to 75% Al Dente',
        instruction: 'Boil 2.2 L water salted like mild soup (18 g salt) with whole green cardamom, cloves, and bay leaf. Drop drained basmati and boil briskly for 5–6 minutes until grains elongate and bend without snapping, yet still hold a firm chalky center.',
        timerMinutes: 6,
        visualCue: 'Press a grain between thumb and forefinger: outer 75% is tender while a fine white core resists.',
        temperatureOrFlame: 'High rolling boil (100°C / 212°F)'
      },
      {
        stepNumber: 4,
        title: 'Layer & Indirect Tawa Dum Steam',
        instruction: 'Spread par-boiled rice evenly over the yakhni. Drizzle saffron milk, remaining ghee, kewra water, birista, mint, and toasted cashews. Seal lid tightly (with damp kitchen cloth or atta dough). Rest handi directly on a preheated heavy iron tawa over lowest flame for 18 minutes, then let rest unopened for 10 minutes.',
        timerMinutes: 18,
        visualCue: 'Fragrant steam billows when seal breaks; every grain stands separate, airy, and marbled gold-and-ivory.',
        temperatureOrFlame: 'Lowest flame over preheated iron tawa (~95°C / 203°F indirect steam)'
      }
    ],
    sidePairings: ['Burhani smoked-garlic raita', 'Mirchi ka salan (peanut-sesame Hyderabadi chili curry)'],
    beveragePairings: ['Kashmiri Saffron Kahwa', 'Mint & roasted cumin Chaas (spiced buttermilk)'],
    chefTips: [
      'Critical Pitfall: Never stir a layered biryani with a sharp spoon—slip a flat perforated ladle gently from the rim downward to preserve unbroken 2 cm rice grains.',
      'Critical Pitfall: Pull fried birista onions from oil 1 shade lighter than finished mahogany; carryover heat burns them in 15 seconds.',
      'Soaking aged basmati for a full 30 minutes before boiling prevents the outer starch from bursting during the dum steam.'
    ],
    storageAdvice: {
      fridgeShelfLife: 'Up to 3 days in an airtight glass container.',
      freezerSuitability: 'Freezes well up to 1 month if cooled rapidly before sealing.',
      reheatingInstructions: 'Sprinkle 2 tbsp water over chilled biryani, cover tightly, and steam on low heat for 6 minutes until heated through.'
    },
    videoSearchQuery: 'Lucknowi Awadhi Dum Biryani Ranveer Brar authentic technique',
    summary: 'Fragrant Lucknowi layered rice built on slow-caramelized birista, hung-curd paneer yakhni, 75% par-boiled aged basmati, and indirect tawa dum.',
    imageUrl: '/src/assets/images/indian_regional_feast_1795185872220.jpg'
  },
  {
    id: 'south-indian-filter-coffee',
    titleNative: 'दक्षिण भारतीय फ़िल्टर कॉफ़ी / மெட்ராஸ் பில்டர் காபி',
    titleEnglish: 'Authentic South Indian Degree Filter Coffee (Madras Kaapi)',
    category: 'Global & Regional Beverages',
    region: 'South India · Tamil Nadu & Karnataka',
    course: 'Morning / Evening Beverage',
    skillLevel: 'Beginner-Friendly',
    techniques: ['Brass Gravity Drip Decoction', 'Aeration Foam Stretching (Davara-Tumbler)'],
    allergens: ['Dairy'],
    dietaryTags: ['Vegetarian', 'Gluten-Free', 'Zero-Refined Sugar Option'],
    timings: {
      activePrepMins: 4,
      cookBrewMins: 16,
      advancePrepText: '15 mins gravity drip decoction steep',
      totalTimeText: '20 mins',
      servings: 2,
      yieldLabel: '2 brass tumbler servings (180 ml each)'
    },
    costCategory: 'Budget-Friendly',
    estimatedCostPerServing: '₹22–₹35 ($0.30–$0.45)',
    nutrition: {
      calories: 118,
      proteinG: 4.5,
      carbsG: 11,
      fiberG: 0,
      sugarG: 10,
      fatsG: 6,
      saturatedFatG: 3.8,
      micronutrients: ['Calcium', 'Riboflavin (B2)', 'Potassium', 'Antioxidant Polyphenols']
    },
    equipment: ['Traditional Two-Tier Brass or Stainless South Indian Coffee Filter', 'Davara & Tumbler Set', 'Heavy Milk Saucepan'],
    ingredientGroups: [
      {
        groupTitle: 'For First-Press Thick Decoction',
        items: [
          { name: 'Chikmagalur 80% Peaberry Arabica + 20% Roasted Chicory Blend (medium-fine grind)', amount: '24 g', numericAmount: 24, unit: 'g', notes: '3 heaped tbsp' },
          { name: 'Freshly Boiled Filtered Water (93°C / 200°F)', amount: '130 ml', numericAmount: 130, unit: 'ml' },
          { name: 'Raw Cane Sugar (tiny pinch on top of grounds to slow extraction)', amount: '1 g', numericAmount: 1, unit: 'g' }
        ]
      },
      {
        groupTitle: 'For Frothy Degree Milk Finish',
        items: [
          { name: 'Full-Cream Whole Cow or Buffalo Milk ("Degree Milk", un-diluted)', amount: '240 ml', numericAmount: 240, unit: 'ml' },
          { name: 'Unrefined Cane Sugar or Palm Jaggery', amount: '12 g', numericAmount: 12, unit: 'g', lexiconKey: 'jaggery' }
        ]
      }
    ],
    substitutes: [
      {
        original: 'Full-Cream Degree Milk',
        substitute: 'Barista-grade oat milk or fresh thick almond-cashew milk heated to 70°C',
        dietaryType: 'Vegan / Dairy-Free',
        sensoryNote: 'Oat milk stretches cleanly into velvety micro-foam without splitting'
      },
      {
        original: '80:20 Coffee-Chicory Blend',
        substitute: '100% single-estate dark-roast Arabica (for zero chicory)',
        dietaryType: 'Pure Arabica Preference',
        sensoryNote: 'Brighter acidity and lighter body; reduce water to 115 ml for syrupy concentration'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pack & Tamp the Brass Filter Chamber',
        instruction: 'Add 24 g of 80:20 coffee-chicory powder into the perforated upper chamber. Tap the sides lightly to level, press down gently (never forcefully) with the plunger disc, and leave the plunger resting inside.',
        timerMinutes: 1,
        visualCue: 'Coffee bed sits flat and evenly compacted like damp beach sand; not rock-hard.',
        temperatureOrFlame: 'Room temperature dry setup'
      },
      {
        stepNumber: 2,
        title: '15-Minute Gravity Drip Decoction',
        instruction: 'Pour 130 ml water just off the boil (93°C / 200°F) over the plunger in a gentle spiral. Cover immediately with the lid and let gravity drip undisturbed for 15 minutes until ~85 ml of thick, syrupy "First Press" decoction collects below.',
        timerMinutes: 15,
        visualCue: 'Decoction coats the spoon in opaque espresso-black gloss with bitter-chocolate aroma.',
        temperatureOrFlame: 'Off-boil steep (93°C / 200°F)'
      },
      {
        stepNumber: 3,
        title: 'Scald Degree Milk & Stretch Foam',
        instruction: 'Bring 240 ml whole milk just to a rolling crest in a saucepan and kill the flame immediately so milk never scorches. In each tumbler, combine 35 ml hot decoction and 6 g sugar, then pour 120 ml scalded milk.',
        timerMinutes: 3,
        visualCue: 'Milk swells with fine micro-bubbles at the rim without forming a thick boiled skin.',
        temperatureOrFlame: 'Scalding crest (95°C / 203°F)'
      },
      {
        stepNumber: 4,
        title: 'Aerate via Davara-Tumbler Pull',
        instruction: 'Pour the hot coffee back and forth from height (25–30 cm) between the tumbler and wide davara saucer 4–5 times until a 2 cm crown of dense, creamy hazelnut froth tops the tumbler.',
        timerMinutes: 1,
        visualCue: 'A velvety, uniform caramel-tan foam cap crowns the brass rim at drinking temperature (~68°C).',
        temperatureOrFlame: 'Serving temperature ~68°C (154°F)'
      }
    ],
    sidePairings: ['Hot crispy Medu Vada with coconut chutney', 'Ghee Masala Dosa or Maddur Vada'],
    beveragePairings: ['Served solo as morning ritual or post-tiffin digestif'],
    chefTips: [
      'Critical Pitfall: Never pack the coffee powder too tightly with the plunger or the boiling water will choke and fail to drip through.',
      'Critical Pitfall: Never use the watery "Second Press" decoction for guests—always brew First Press decoction for peak body and caramel sweetness.',
      'Warming the brass filter chamber with hot water beforehand ensures optimal extraction temperature.'
    ],
    storageAdvice: {
      fridgeShelfLife: 'Extra First Press decoction keeps up to 48 hours refrigerated in a sealed glass jar.',
      freezerSuitability: 'Do not freeze brewed decoction.',
      reheatingInstructions: 'Never boil decoction directly on stove; instead, pour cold decoction straight into scalding-hot fresh milk.'
    },
    videoSearchQuery: 'Authentic South Indian Filter Coffee Brass Filter Davara Tumbler step by step',
    summary: 'Slow gravity-dripped 80:20 Arabica-chicory first-press decoction stretched from height with scalded whole degree milk in a brass davara-tumbler.',
    imageUrl: '/src/assets/images/craft_beverages_tray_1795185872087.jpg'
  },
  {
    id: 'tacos-al-pastor',
    titleNative: 'Tacos al Pastor (ताकोस अल पास्तोर)',
    titleEnglish: 'Authentic Mexico City Street Tacos al Pastor',
    category: 'Global Cuisines',
    region: 'Mexico · Puebla & CDMX',
    course: 'Main Course (Street Classic)',
    skillLevel: 'Intermediate',
    techniques: ['Dry Comal Guajillo Toasting', 'Achiote Citrus Adobo Emulsion', 'High-Heat Cast-Iron Char'],
    allergens: ['None (Naturally Gluten-Free & Dairy-Free)'],
    dietaryTags: ['Gluten-Free', 'Dairy-Free', 'High-Protein'],
    timings: {
      activePrepMins: 25,
      cookBrewMins: 16,
      advancePrepText: '3 hrs cold adobo marinade',
      totalTimeText: '41 mins (+ marination)',
      servings: 3,
      yieldLabel: '9 street tacos (3 per person)'
    },
    costCategory: 'Mid-Range',
    estimatedCostPerServing: '₹260–₹340 ($3.10–$4.10)',
    nutrition: {
      calories: 510,
      proteinG: 31,
      carbsG: 48,
      fiberG: 6,
      sugarG: 9,
      fatsG: 21,
      saturatedFatG: 6.5,
      micronutrients: ['Vitamin C', 'Vitamin A', 'Iron', 'Bromelain']
    },
    equipment: ['Cast-Iron Comal or Heavy Skillet', 'High-Speed Blender', 'Chef Knife & Tongs'],
    ingredientGroups: [
      {
        groupTitle: 'For Dried Chile & Achiote Adobo',
        items: [
          { name: 'Whole Dried Guajillo Chiles (stemmed & seeded)', amount: '3 chiles', numericAmount: 3, unit: 'chiles' },
          { name: 'Achiote Paste (Annatto)', amount: '25 g', numericAmount: 25, unit: 'g' },
          { name: 'Fresh Pineapple Juice + Apple Cider Vinegar', amount: '60 ml', numericAmount: 60, unit: 'ml' },
          { name: 'Mexican Oregano & Cumin Seeds', amount: '1 tsp', numericAmount: 1, unit: 'tsp', lexiconKey: 'cumin' },
          { name: 'Garlic Cloves & Clove Bud', amount: '3 cloves', numericAmount: 3, unit: 'cloves', lexiconKey: 'cloves' }
        ]
      },
      {
        groupTitle: 'For Searing & Street Garnish',
        items: [
          { name: 'Thinly Sliced Pork Shoulder (or Oyster Mushroom / Chicken Thigh)', amount: '450 g', numericAmount: 450, unit: 'g' },
          { name: 'Fresh Ripe Pineapple Spears', amount: '150 g', numericAmount: 150, unit: 'g' },
          { name: 'Nixtamalized 100% Corn Tortillas (12 cm)', amount: '9 tortillas', numericAmount: 9, unit: 'tortillas' },
          { name: 'Finely Diced White Onion, Fresh Cilantro & Lime Wedges', amount: '100 g', numericAmount: 100, unit: 'g' }
        ]
      }
    ],
    substitutes: [
      {
        original: 'Pork Shoulder',
        substitute: 'Thick torn King Oyster Mushroom planks or boneless skinless chicken thighs',
        dietaryType: 'Vegan / Halal',
        sensoryNote: 'Score oyster mushrooms in crosshatch pattern so crimson adobo chars deeply on edges'
      },
      {
        original: 'Guajillo Chiles',
        substitute: '4 whole Kashmiri red chiles (deseeded)',
        dietaryType: 'Regional Spice Swap',
        sensoryNote: 'Matches vibrant ruby color and gentle fruity heat cleanly'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Comal-Toast & Rehydrate Guajillo Chiles',
        instruction: 'Press seeded guajillo chiles flat onto a dry cast-iron skillet over medium heat for 15 seconds per side until pliable and nutty—never let them smoke or blacken. Steep in hot water for 12 minutes until completely soft.',
        timerMinutes: 12,
        visualCue: 'Skins turn glossy brick-red and smell faintly of dried figs and cocoa.',
        temperatureOrFlame: 'Medium dry skillet (~175°C / 345°F)'
      },
      {
        stepNumber: 2,
        title: 'Blend Silky Adobo & Marinate',
        instruction: 'Blend softened chiles, 25 g achiote paste, pineapple juice, vinegar, garlic, oregano, cumin, clove, and 8 g salt for 90 seconds until velvety smooth. Coat 450 g thin protein slices evenly and chill 3 hours (do not exceed 6 hours with raw pineapple juice).',
        timerMinutes: 3,
        visualCue: 'Deep vermilion emulsion coats meat like lacquer without grainy chile flecks.',
        temperatureOrFlame: 'Cold refrigerator marinade (4°C / 39°F)'
      },
      {
        stepNumber: 3,
        title: 'High-Heat Cast-Iron Char & Pineapple Caramelization',
        instruction: 'Heat cast-iron skillet to smoking hot (235°C / 455°F). Sear marinated slices in single uncrowded batches for 3 minutes per side until edges blister dark crimson-charred. Sear pineapple spears alongside for 2 minutes until caramelized, then chop both into bite-sized slivers.',
        timerMinutes: 8,
        visualCue: 'Dark leopard-spotted charred edges contrast with juicy, tender interior.',
        temperatureOrFlame: 'High sear (235°C / 455°F)'
      },
      {
        stepNumber: 4,
        title: 'Double-Tortilla Comal Warm & Serve',
        instruction: 'Warm corn tortillas on the dry comal for 25 seconds per side until puffed and supple; wrap in a clean kitchen towel. Stack two warm tortillas per taco, fill with charred al pastor & caramelized pineapple, and top with white onion, cilantro, and fresh lime.',
        timerMinutes: 2,
        visualCue: 'Tortillas bend easily without cracking at the fold.',
        temperatureOrFlame: 'Medium-high dry comal (205°C / 400°F)'
      }
    ],
    sidePairings: ['Charred Salsa Verde (tomatillo-serrano)', 'Pickled red onions with habanero & lime'],
    beveragePairings: ['Agua Fresca de Jamaica (hibiscus iced cooler)', 'Crisp Mexican lager with lime & sea salt'],
    chefTips: [
      'Critical Pitfall: Never marinate meat in fresh pineapple juice longer than 4–6 hours; active bromelain enzymes turn meat mushy.',
      'Critical Pitfall: Never overcrowd the skillet when searing—crowding steams the adobo instead of charring the sugars.'
    ],
    storageAdvice: {
      fridgeShelfLife: 'Seared al pastor keeps 3 days refrigerated.',
      freezerSuitability: 'Raw marinated meat freezes cleanly up to 2 months.',
      reheatingInstructions: 'Flash-sear chilled meat in a dry hot cast-iron pan for 90 seconds to restore crispy edges.'
    },
    videoSearchQuery: 'Authentic Tacos al Pastor at home Rick Bayless Diana Kennedy',
    summary: 'Whole toasted guajillo chiles and earthy achiote-pineapple adobo seared hard in cast iron and piled onto warm nixtamalized corn tortillas.',
    imageUrl: '/src/assets/images/hero_culinary_table_1795185870251.jpg'
  },
  {
    id: 'bangkok-street-pad-thai',
    titleNative: 'ผัดไทยกุ้งสด (Bangkok Street Pad Thai)',
    titleEnglish: 'Bangkok Street-Style Tamarind Pad Thai',
    category: 'Global Cuisines',
    region: 'Thailand · Bangkok',
    course: 'Main Course (Wok Stir-Fry)',
    skillLevel: 'Intermediate',
    techniques: ['Lukewarm Noodle Hydration', 'Tamarind-Palm Sugar Reduction', 'High-Flame Wok Tossing'],
    allergens: ['Shellfish', 'Eggs', 'Peanuts', 'Soy'],
    dietaryTags: ['Gluten-Free', 'Dairy-Free'],
    timings: {
      activePrepMins: 15,
      cookBrewMins: 10,
      advancePrepText: '30 mins lukewarm noodle soak',
      totalTimeText: '55 mins',
      servings: 2,
      yieldLabel: '2 wok-seared plates'
    },
    costCategory: 'Mid-Range',
    estimatedCostPerServing: '₹240–₹320 ($2.90–$3.85)',
    nutrition: {
      calories: 575,
      proteinG: 26,
      carbsG: 72,
      fiberG: 4.5,
      sugarG: 16,
      fatsG: 20,
      saturatedFatG: 3.5,
      micronutrients: ['Vitamin E', 'Iron', 'Magnesium', 'Manganese']
    },
    equipment: ['Seasoned Carbon-Steel Wok (or Large Skillet)', 'Metal Wok Spatula', 'Fine Mesh Strainer'],
    ingredientGroups: [
      {
        groupTitle: 'For Authentic Tamarind Sauce (Zero Ketchup)',
        items: [
          { name: 'Pure Seedless Tamarind Pulp (soaked in 60 ml warm water & strained)', amount: '35 g', numericAmount: 35, unit: 'g', lexiconKey: 'tamarind' },
          { name: 'Thai Palm Sugar (finely shaved) or Cane Jaggery', amount: '40 g', numericAmount: 40, unit: 'g', lexiconKey: 'jaggery' },
          { name: 'Thai Fish Sauce (or Light Soy + Kelp Broth for vegan)', amount: '35 ml', numericAmount: 35, unit: 'ml' }
        ]
      },
      {
        groupTitle: 'For Wok Stir-Fry & Fresh Crunch',
        items: [
          { name: 'Dried Medium Flat Rice Noodles (Sen Lek, 4–5 mm)', amount: '160 g', numericAmount: 160, unit: 'g' },
          { name: 'Pressed Extra-Firm Tofu, cut into 1 cm batons', amount: '100 g', numericAmount: 100, unit: 'g' },
          { name: 'Peeled Tiger Prawns (or King Oyster Mushrooms)', amount: '180 g', numericAmount: 180, unit: 'g' },
          { name: 'Sweet Preserved Radish (Chai Po), finely minced', amount: '20 g', numericAmount: 20, unit: 'g' },
          { name: 'Large Eggs, Shallots & Dried Shrimp (optional)', amount: '2 eggs', numericAmount: 2, unit: 'eggs' },
          { name: 'Fresh Bean Sprouts, Chinese Garlic Chives & Crushed Roasted Peanuts', amount: '120 g', numericAmount: 120, unit: 'g' }
        ]
      }
    ],
    substitutes: [
      {
        original: 'Fish Sauce & Dried Shrimp + Prawns',
        substitute: 'Gluten-free light soy sauce + vegan mushroom oyster sauce + extra golden tofu',
        dietaryType: 'Vegan / Vegetarian',
        sensoryNote: 'Maintains salty-umami counterpoint against sweet palm sugar and bright tamarind'
      },
      {
        original: 'Crushed Roasted Peanuts',
        substitute: 'Toasted crushed sunflower seeds or cashews',
        dietaryType: 'Peanut-Free',
        sensoryNote: 'Preserves nutty crunch contrast at table service'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Lukewarm Hydrate Rice Noodles',
        instruction: 'Soak 160 g dried Sen Lek rice noodles in lukewarm water (35°C / 95°F) for 25–30 minutes—NEVER boil them. Drain thoroughly when noodles wrap cleanly around your finger without snapping yet remain opaque and slightly firm.',
        timerMinutes: 30,
        visualCue: 'Noodles are pliable like leather straps but NOT soft or translucent.',
        temperatureOrFlame: 'Lukewarm soak (35°C / 95°F)'
      },
      {
        stepNumber: 2,
        title: 'Reduce Pure Tamarind-Palm Sugar Sauce',
        instruction: 'Simmer strained tamarind water, 40 g shaved palm sugar, and 35 ml fish sauce over medium-low heat for 3 minutes until palm sugar dissolves into a glossy amber syrup. Taste: it should strike an electric sweet-sour-salty balance.',
        timerMinutes: 3,
        visualCue: 'Syrupy glaze coats the back of a spoon without crystallization.',
        temperatureOrFlame: 'Gentle simmer (95°C / 203°F)'
      },
      {
        stepNumber: 3,
        title: 'High-Flame Sear Tofu, Prawns & Noodles',
        instruction: 'Heat 2 tbsp high-smoke-point oil in carbon-steel wok over high flame until wisps of smoke appear. Sear prawns 60 seconds and set aside. Crisp tofu cubes, minced shallots, and preserved radish for 90 seconds. Add drained noodles + all tamarind sauce; toss continuously 2 minutes until noodles drink up sauce and turn tender-chewy.',
        timerMinutes: 4,
        visualCue: 'Noodles turn glossy copper-brown and pull completely clean from wok with zero gummy puddle.',
        temperatureOrFlame: 'High wok flame (~230°C / 445°F)'
      },
      {
        stepNumber: 4,
        title: 'Fold Egg Ribbons & Fresh Herb Finish',
        instruction: 'Push noodles to one side, crack 2 eggs onto oiled bare wok, break yolks and let set 25 seconds before folding noodles over them. Kill flame, return prawns, fold in fresh bean sprouts and 4 cm garlic chive batons for 10 seconds using residual heat only. Plate with crushed peanuts, chili flakes, and fresh lime.',
        timerMinutes: 2,
        visualCue: 'Bean sprouts remain crisp-snappy and garlic chives stay emerald green.',
        temperatureOrFlame: 'Residual wok heat'
      }
    ],
    sidePairings: ['Green papaya salad (Som Tum)', 'Crispy Thai tofu triangles with sweet chili-peanut dip'],
    beveragePairings: ['Thai iced tea with star anise & condensed milk (or oat milk)', 'Chilled lemongrass-lime soda'],
    chefTips: [
      'Critical Pitfall: Never pre-boil Pad Thai rice noodles in hot water—pre-boiled noodles turn gummy and snap in the wok.',
      'Critical Pitfall: Never substitute ketchup or vinegar for real tamarind pulp and palm sugar; authentic Pad Thai gets its smoky tang exclusively from tamarind.'
    ],
    storageAdvice: {
      fridgeShelfLife: 'Tamarind sauce keeps 3 weeks refrigerated; cooked Pad Thai is best within 24 hours.',
      freezerSuitability: 'Sauce freezes well; cooked rice noodles turn brittle when frozen.',
      reheatingInstructions: 'Flash-toss chilled leftovers in a hot skillet with 1 tbsp water for 60 seconds.'
    },
    videoSearchQuery: 'Authentic Bangkok Street Pad Thai Hot Thai Kitchen Pailin',
    summary: 'Street-cart Bangkok Pad Thai using lukewarm-soaked Chantaburi rice noodles, pure tamarind-palm sugar glaze, sweet preserved radish, and crisp garlic chives.',
    imageUrl: '/src/assets/images/global_artisan_dishes_1795185872399.jpg'
  },
  {
    id: 'soupe-a-loignon-gratinee',
    titleNative: 'Soupe à l’Oignon Gratinée (French Onion Soup)',
    titleEnglish: 'Classic Parisian Caramelized Onion Soup Gratinée',
    category: 'Global Cuisines',
    region: 'France · Paris & Lyon',
    course: 'Soup / Bistro Main',
    skillLevel: 'Intermediate',
    techniques: ['40-Minute Maillard Onion Caramelization', 'Fond Deglazing', 'Oven Broiler Gruyère Gratin'],
    allergens: ['Dairy', 'Gluten'],
    dietaryTags: ['Vegetarian Adaptable'],
    timings: {
      activePrepMins: 20,
      cookBrewMins: 65,
      advancePrepText: 'None required',
      totalTimeText: '1 hr 25 mins',
      servings: 4,
      yieldLabel: '4 ovenproof crocks'
    },
    costCategory: 'Mid-Range',
    estimatedCostPerServing: '₹280–₹370 ($3.40–$4.45)',
    nutrition: {
      calories: 445,
      proteinG: 20,
      carbsG: 36,
      fiberG: 4.5,
      sugarG: 13,
      fatsG: 22,
      saturatedFatG: 12,
      micronutrients: ['Calcium', 'Vitamin B6', 'Potassium', 'Zinc']
    },
    equipment: ['Heavy Enameled Dutch Oven (5 L)', '4 Ovenproof Lion-Head Soup Crocks', 'Mandoline or Sharp Chef Knife', 'Baking Sheet'],
    ingredientGroups: [
      {
        groupTitle: 'For 40-Minute Caramelized Onion Base',
        items: [
          { name: 'Sweet Yellow Onions, sliced pole-to-pole (3 mm)', amount: '1200 g', numericAmount: 1200, unit: 'g' },
          { name: 'Unsalted Cultured French Butter + Olive Oil', amount: '45 g', numericAmount: 45, unit: 'g' },
          { name: 'Dry White Wine (Sauvignon Blanc or Dry Vermouth)', amount: '120 ml', numericAmount: 120, unit: 'ml' },
          { name: 'Rich Dark Beef Consommé or Roasted Mushroom Stock', amount: '1200 ml', numericAmount: 1200, unit: 'ml' },
          { name: 'Bouquet Garni (3 thyme sprigs, 2 bay leaves, black peppercorns)', amount: '1 bundle', numericAmount: 1, unit: 'bundle' }
        ]
      },
      {
        groupTitle: 'For the Baguette & Gruyère Gratin Crust',
        items: [
          { name: 'Artisanal Sourdough Baguette, cut into 2 cm bias slices', amount: '8 slices', numericAmount: 8, unit: 'slices' },
          { name: 'Cave-Aged Gruyère AOP Cheese, coarsely grated', amount: '180 g', numericAmount: 180, unit: 'g' },
          { name: 'Raw Garlic Clove (for rubbing toasted bread)', amount: '1 clove', numericAmount: 1, unit: 'clove' }
        ]
      }
    ],
    substitutes: [
      {
        original: 'Dark Beef Stock',
        substitute: 'Slow-roasted cremini mushroom, kombu, and charred-onion dark vegetable stock',
        dietaryType: 'Vegetarian',
        sensoryNote: 'Matcha-deep roasted mushroom umami rivals traditional beef consommé'
      },
      {
        original: 'Dry White Wine',
        substitute: '100 ml stock + 15 ml sherry vinegar or dry apple cider',
        dietaryType: 'Alcohol-Free',
        sensoryNote: 'Provides essential bright acidity to cut sweet caramelized onions'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: '40-Minute Slow Maillard Caramelization',
        instruction: 'Melt 30 g butter + 15 ml olive oil in Dutch oven over medium heat. Toss 1.2 kg sliced onions with 6 g salt, cover for 8 minutes until wilted, then uncover and cook over medium-low heat for 35–40 minutes, stirring every 4 minutes and scraping browned fond whenever it sticks.',
        timerMinutes: 40,
        visualCue: 'Onions shrink by 75% into deep espresso-mahogany jammy ribbons—never scorched charcoal.',
        temperatureOrFlame: 'Medium-low flame (135°C / 275°F)'
      },
      {
        stepNumber: 2,
        title: 'Deglaze Fond & Simmer Bouquet Garni Broth',
        instruction: 'Pour 120 ml dry white wine into the mahogany onions and scrape every bit of caramelized fond from the pot base until wine nearly evaporates (3 mins). Add 1200 ml warm stock and bouquet garni; simmer gently uncovered for 20 minutes.',
        timerMinutes: 20,
        visualCue: 'Broth turns clear amber-chestnut and tastes deeply savory-sweet; adjust with freshly cracked black pepper.',
        temperatureOrFlame: 'Gentle simmer (93°C / 200°F)'
      },
      {
        stepNumber: 3,
        title: 'Crisp Garlic Croûtes',
        instruction: 'Bake baguette slices at 190°C (375°F) for 8 minutes until dry and crisp like croutons so they float instead of turning soggy. Rub one side lightly with a halved raw garlic clove.',
        timerMinutes: 8,
        visualCue: 'Pale golden and crisp all the way through with zero doughy center.',
        temperatureOrFlame: 'Oven 190°C / 375°F'
      },
      {
        stepNumber: 4,
        title: 'Broil Bubbling Gruyère Crust',
        instruction: 'Set oven broiler to high (260°C / 500°F). Ladle hot soup into 4 crocks set on a rimmed baking sheet. Float 2 garlic croûtes atop each crock and mound generously with 45 g grated Gruyère right to the ceramic rims. Broil 3–4 minutes until bubbling and blistered golden brown.',
        timerMinutes: 4,
        visualCue: 'Cheese melts over the crock rims into blistered amber lace; soup bubbles around the crust.',
        temperatureOrFlame: 'High Broiler (260°C / 500°F)'
      }
    ],
    sidePairings: ['Crisp frisée salad with Dijon-shallot vinaigrette', 'Steamed green beans with toasted almonds'],
    beveragePairings: ['Dry Beaujolais or Côtes du Rhône red', 'Sparkling dry Normandy apple cider (alcohol-free option)'],
    chefTips: [
      'Critical Pitfall: Never add sugar to rush onion caramelization—true Maillard sweetness takes 35–40 minutes of patient moisture evaporation.',
      'Critical Pitfall: Toast baguette slices completely dry before floating them; untoasted bread disintegrates into paste under broth.'
    ],
    storageAdvice: {
      fridgeShelfLife: 'Onion soup base keeps 4 days refrigerated (flavors actually deepen overnight).',
      freezerSuitability: 'Base freezes superbly up to 3 months without bread or cheese.',
      reheatingInstructions: 'Reheat soup base on stovetop to a gentle simmer, then top with fresh croûtes and broiled Gruyère.'
    },
    videoSearchQuery: 'Classic French Onion Soup Soupe a l Oignon Gratinee Jacques Pepin',
    summary: 'Bistro masterpiece built from 1.2 kg yellow onions caramelized 40 minutes to mahogany jam, dry wine deglaze, aromatic stock, and broiled cave-aged Gruyère.',
    imageUrl: '/src/assets/images/hero_culinary_table_1795185870251.jpg'
  },
  {
    id: 'chettinad-milagu-roast',
    titleNative: 'செட்டிநாடு மிளகு வறுவல் (Chettinad Milagu Roast)',
    titleEnglish: 'Chettinad Black Pepper & Stone-Flower Roast',
    category: 'Indian Regional',
    region: 'South India · Karaikudi (Chettinad)',
    course: 'Dry Main / Starter',
    skillLevel: 'Intermediate',
    techniques: ['Whole-Spice Dry Roasting', 'Stone-Flower Tempering', 'High-Heat Shallow Reduction'],
    allergens: ['None (Naturally Gluten-Free & Dairy-Free)'],
    dietaryTags: ['Gluten-Free', 'Dairy-Free', 'Vegan Adaptable', 'High-Protein'],
    timings: {
      activePrepMins: 20,
      cookBrewMins: 25,
      advancePrepText: '15 mins turmeric-pepper rub',
      totalTimeText: '45 mins',
      servings: 3,
      yieldLabel: '3 generous portions'
    },
    costCategory: 'Budget-Friendly',
    estimatedCostPerServing: '₹95–₹145 ($1.15–$1.75)',
    nutrition: {
      calories: 320,
      proteinG: 24,
      carbsG: 12,
      fiberG: 3.8,
      sugarG: 3,
      fatsG: 19,
      saturatedFatG: 3.5,
      micronutrients: ['Iron', 'Vitamin C', 'Manganese', 'Piperine']
    },
    equipment: ['Heavy Cast-Iron Kadai or Uruli', 'Spice Grinder / Mortar & Pestle'],
    ingredientGroups: [
      {
        groupTitle: 'For Fresh Chettinad Roast Masala',
        items: [
          { name: 'Whole Black Peppercorns (Tellicherry)', amount: '12 g', numericAmount: 12, unit: 'g', lexiconKey: 'black_pepper' },
          { name: 'Fennel Seeds & Cumin Seeds', amount: '10 g', numericAmount: 10, unit: 'g', lexiconKey: 'fennel_seeds' },
          { name: 'Coriander Seeds', amount: '12 g', numericAmount: 12, unit: 'g', lexiconKey: 'coriander_seeds' },
          { name: 'Star Anise & Black Stone Flower (Kalpasi)', amount: '4 g', numericAmount: 4, unit: 'g', lexiconKey: 'kalpasi' },
          { name: 'Guntur Dried Red Chiles', amount: '4 chiles', numericAmount: 4, unit: 'chiles' }
        ]
      },
      {
        groupTitle: 'For the Roast & Curry Leaf Tadka',
        items: [
          { name: 'Button Mushrooms (quartered) OR Chicken Thigh Cubes', amount: '450 g', numericAmount: 450, unit: 'g' },
          { name: 'Madras Shallots (Sambar Onions), thinly sliced', amount: '150 g', numericAmount: 150, unit: 'g' },
          { name: 'Cold-Pressed Gingelly (Sesame) Oil', amount: '35 ml', numericAmount: 35, unit: 'ml' },
          { name: 'Fresh Curry Leaves (2 generous sprigs)', amount: '15 g', numericAmount: 15, unit: 'g', lexiconKey: 'curry_leaves' },
          { name: 'Turmeric Powder & Sea Salt', amount: '5 g', numericAmount: 5, unit: 'g', lexiconKey: 'turmeric' }
        ]
      }
    ],
    substitutes: [
      {
        original: 'Button Mushrooms / Chicken',
        substitute: 'Par-boiled baby potatoes or firm soy-free jackfruit chunks',
        dietaryType: 'Vegan / Allergen-Free',
        sensoryNote: 'Maintains hearty texture capable of holding crisp black-pepper glaze'
      },
      {
        original: 'Madras Shallots',
        substitute: '120 g red onion + 1/4 tsp Asafoetida (Hing) for no-onion Jain prep',
        dietaryType: 'Jain Adaptable',
        sensoryNote: 'Shallots bring authentic sweetness; Hing restores savory aroma if omitting onions'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Dry-Roast & Grind Whole Chettinad Spices',
        instruction: 'In a dry heavy pan over low flame, toast coriander seeds, fennel, cumin, red chiles, star anise, and black peppercorns for 3 minutes until aromatic and smoking lightly; toss in kalpasi (stone flower) for final 20 seconds. Cool completely and grind to a coarse, sandy powder.',
        timerMinutes: 4,
        visualCue: 'Spices release a warm anise-pepper perfume without scorching; powder feels coarse like semolina.',
        temperatureOrFlame: 'Low dry pan (~130°C / 265°F)'
      },
      {
        stepNumber: 2,
        title: 'Caramelize Madras Shallots in Gingelly Oil',
        instruction: 'Heat 35 ml gingelly oil in cast-iron kadai over medium heat. Pop 1/2 tsp mustard seeds, add torn fresh curry leaves and 150 g sliced shallots. Sauté 7 minutes until shallots shrink and turn deep glossy bronze.',
        timerMinutes: 7,
        visualCue: 'Shallots turn caramelized amber and curry leaves crisp dark emerald.',
        temperatureOrFlame: 'Medium flame (170°C / 338°F)'
      },
      {
        stepNumber: 3,
        title: 'Sear & Glaze with Freshly Ground Pepper Masala',
        instruction: 'Add ginger-garlic paste, turmeric, and main ingredient (mushrooms or chicken). Toss on medium-high heat for 8 minutes until moisture evaporates, then fold in freshly ground Chettinad masala and roast 5 more minutes until dark-coated and glistening.',
        timerMinutes: 13,
        visualCue: 'Spice paste clings tightly in a dry, dark-mahogany lacquer with zero watery liquid left at the bottom.',
        temperatureOrFlame: 'Medium-high cast-iron sear (200°C / 390°F)'
      }
    ],
    sidePairings: ['Flaky South Indian Parotta', 'Steamed Ponni rice with Ghee & Dal Rasam'],
    beveragePairings: ['Chilled Kokum Sol Kadhi', 'Hot South Indian Degree Filter Coffee'],
    chefTips: [
      'Critical Pitfall: Never omit Black Stone Flower (Kalpasi)—it provides the signature woodsy, smoky depth of authentic Karaikudi Chettinad cooking.',
      'Critical Pitfall: Do not use pre-ground supermarket black pepper; freshly toasted whole Tellicherry peppercorns provide bright floral heat instead of dusty harshness.'
    ],
    storageAdvice: {
      fridgeShelfLife: '3 days refrigerated; flavor deepens noticeably on Day 2.',
      freezerSuitability: 'Freezes well for 1 month (best for chicken or soy-chunk versions; avoid freezing mushrooms).',
      reheatingInstructions: 'Flash-reheat in a dry skillet over medium flame for 3 minutes with 1 tsp gingelly oil.'
    },
    videoSearchQuery: 'Karaikudi Chettinad Pepper Roast Milagu Varuval Chef Damu',
    summary: 'Aromatic Karaikudi dry roast anchored by freshly toasted Tellicherry peppercorns, fennel, star anise, kalpasi stone flower, and crisp curry leaves.',
    imageUrl: '/src/assets/images/indian_regional_feast_1795185872220.jpg'
  },
  {
    id: 'kashmiri-saffron-kahwa',
    titleNative: 'कश्मीरी केसर कहवा (Kashmiri Kesar Kahwa)',
    titleEnglish: 'Traditional Kashmiri Saffron & Almond Kahwa Tea',
    category: 'Global & Regional Beverages',
    region: 'North India · Kashmir Valley',
    course: 'Warm Herbal Infusion',
    skillLevel: 'Beginner-Friendly',
    techniques: ['Whole-Spice Decoction', '85°C Delicate Green Tea Steep', 'Saffron Blooming'],
    allergens: ['Tree Nuts (Almonds)'],
    dietaryTags: ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Calorie'],
    timings: {
      activePrepMins: 5,
      cookBrewMins: 10,
      advancePrepText: 'None required',
      totalTimeText: '15 mins',
      servings: 2,
      yieldLabel: '2 traditional cups (180 ml each)'
    },
    costCategory: 'Mid-Range',
    estimatedCostPerServing: '₹45–₹70 ($0.55–$0.85)',
    nutrition: {
      calories: 58,
      proteinG: 1.4,
      carbsG: 8.5,
      fiberG: 0.7,
      sugarG: 6.5,
      fatsG: 2.2,
      saturatedFatG: 0.2,
      micronutrients: ['Vitamin E', 'Manganese', 'Catechins', 'Crocin']
    },
    equipment: ['Heavy Saucepan or Brass Samovar', 'Mortar & Pestle', 'Fine Tea Strainer'],
    ingredientGroups: [
      {
        groupTitle: 'For Spiced Decoction & Saffron',
        items: [
          { name: 'Filtered Spring Water', amount: '420 ml', numericAmount: 420, unit: 'ml' },
          { name: 'Pampore Kashmiri Saffron Strands', amount: '12 strands', numericAmount: 12, unit: 'strands', lexiconKey: 'saffron' },
          { name: 'Green Cardamom Pods (bruised)', amount: '3 pods', numericAmount: 3, unit: 'pods', lexiconKey: 'green_cardamom' },
          { name: 'True Ceylon Cinnamon Quill & Clove', amount: '1 quill', numericAmount: 1, unit: 'quill', lexiconKey: 'cloves' }
        ]
      },
      {
        groupTitle: 'For Tea Leaves & Garnish',
        items: [
          { name: 'Loose Kashmiri Kahwa Green Tea Leaves (or Chun Mee)', amount: '2.5 g', numericAmount: 2.5, unit: 'g' },
          { name: 'Blanched Slivered Almonds', amount: '12 g', numericAmount: 12, unit: 'g' },
          { name: 'Raw Honey or Sugar (optional)', amount: '10 g', numericAmount: 10, unit: 'g' }
        ]
      }
    ],
    substitutes: [
      {
        original: 'Blanched Slivered Almonds',
        substitute: 'Toasted melon seeds (magaj) or omit for nut-free infusion',
        dietaryType: 'Tree-Nut Free',
        sensoryNote: 'Keeps subtle nutty crunch while eliminating tree-nut allergens'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Simmer Whole-Spice Decoction',
        instruction: 'Combine 420 ml water, bruised cardamom pods, cinnamon quill, and 1 clove in a saucepan. Bring to a boil, then lower flame and simmer covered for 5 minutes until water turns pale straw-gold and fragrant.',
        timerMinutes: 5,
        visualCue: 'Kitchen fills with sweet cardamom-cinnamon steam; spices sink.',
        temperatureOrFlame: 'Gentle covered simmer (96°C / 205°F)'
      },
      {
        stepNumber: 2,
        title: 'Sub-85°C Green Tea & Saffron Steep',
        instruction: 'Turn OFF the heat and wait 30 seconds until water drops to ~85°C (185°F). Stir in 2.5 g loose green tea leaves and 12 crushed saffron strands, cover tightly, and steep exactly 3 minutes—never boil tea leaves.',
        timerMinutes: 3,
        visualCue: 'Liquor glows luminous sunset-gold without cloudy bitterness.',
        temperatureOrFlame: 'Off-heat steep (85°C / 185°F)'
      },
      {
        stepNumber: 3,
        title: 'Strain Over Blanched Almonds',
        instruction: 'Place slivered almonds and honey/sugar into pre-warmed cups. Strain saffron-spiced kahwa through a fine mesh strainer directly over the almonds and serve piping hot.',
        timerMinutes: 1,
        visualCue: 'Golden saffron strands and almond slivers float gently across clear amber tea.',
        temperatureOrFlame: 'Serving temperature ~75°C (167°F)'
      }
    ],
    sidePairings: ['Warm Kashmiri Sheermal or flaky Bakarkhani', 'Pistachio-cardamom shortbread'],
    beveragePairings: ['Self-contained soothing digestive & winter warmer'],
    chefTips: [
      'Critical Pitfall: Never boil green tea leaves actively on the stove—temperatures above 88°C release harsh tannins that mask the delicate floral saffron.',
      'Use true Ceylon cinnamon (thin papery quills) rather than woody cassia bark for sweet, delicate spice warmth.'
    ],
    storageAdvice: {
      fridgeShelfLife: 'Best brewed fresh; spice water base (without tea leaves) keeps 2 days refrigerated.',
      freezerSuitability: 'Not recommended.',
      reheatingInstructions: 'Do not reboil steeped tea; warm spice decoction first and steep fresh green tea leaves.'
    },
    videoSearchQuery: 'Authentic Kashmiri Saffron Kahwa Recipe Samovar style',
    summary: 'Luminous Pampore saffron and crushed green cardamom infused with Ceylon cinnamon and delicately steeped green tea over blanched almonds.',
    imageUrl: '/src/assets/images/craft_beverages_tray_1795185872087.jpg'
  },
  {
    id: 'konkani-kokum-sol-kadhi',
    titleNative: 'कोकण सोलकढी (Konkani Kokum Sol Kadhi)',
    titleEnglish: 'Goan & Konkani Chilled Kokum Coconut Sol Kadhi',
    category: 'Global & Regional Beverages',
    region: 'West India · Konkan & Goa',
    course: 'Cooling Digestive Beverage',
    skillLevel: 'Beginner-Friendly',
    techniques: ['Warm Kokum Pigment Steep', 'Zero-Heat Raw Coconut Emulsion'],
    allergens: ['Coconut'],
    dietaryTags: ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Jain Adaptable', 'Diabetes-Friendly'],
    timings: {
      activePrepMins: 10,
      cookBrewMins: 0,
      advancePrepText: '30 mins kokum petal steep + 30 mins chill',
      totalTimeText: '1 hr 10 mins',
      servings: 3,
      yieldLabel: '3 chilled glasses (200 ml each)'
    },
    costCategory: 'Budget-Friendly',
    estimatedCostPerServing: '₹35–₹55 ($0.45–$0.65)',
    nutrition: {
      calories: 145,
      proteinG: 2,
      carbsG: 6,
      fiberG: 1.5,
      sugarG: 2.5,
      fatsG: 13,
      saturatedFatG: 11,
      micronutrients: ['Manganese', 'Iron', 'Hydroxycitric Acid (HCA)', 'Potassium']
    },
    equipment: ['Blender', 'Fine Strainer / Cheesecloth', 'Glass Pitcher'],
    ingredientGroups: [
      {
        groupTitle: 'For Ruby Kokum Infusion',
        items: [
          { name: 'Sun-Dried Moist Black Kokum Petals (Amsul)', amount: '12 petals', numericAmount: 12, unit: 'petals', lexiconKey: 'kokum' },
          { name: 'Warm Filtered Water (60°C)', amount: '180 ml', numericAmount: 180, unit: 'ml' }
        ]
      },
      {
        groupTitle: 'For Fresh Coconut Milk & Aromatics',
        items: [
          { name: 'Fresh Grated Coconut (or thick first-press coconut milk)', amount: '160 g', numericAmount: 160, unit: 'g' },
          { name: 'Raw Garlic Clove & Green Chili (slit)', amount: '1 clove', numericAmount: 1, unit: 'clove' },
          { name: 'Roasted Cumin Powder & Pinch of Asafoetida (Hing)', amount: '0.5 tsp', numericAmount: 0.5, unit: 'tsp', lexiconKey: 'asafoetida' },
          { name: 'Fresh Cilantro Leaves & Sea Salt', amount: '15 g', numericAmount: 15, unit: 'g' }
        ]
      }
    ],
    substitutes: [
      {
        original: 'Raw Garlic Clove',
        substitute: '1/4 tsp Asafoetida (Hing) + 1/2 tsp fresh grated ginger',
        dietaryType: 'Jain Satvik',
        sensoryNote: 'Maintains bright digestive zing without garlic'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Steep Ruby Kokum Extract',
        instruction: 'Rinse 12 kokum petals briefly under cold water to remove surface grit, then soak in 180 ml warm water (60°C) for 30 minutes. Squeeze petals firmly by hand and strain through a fine mesh to capture intense ruby-magenta extract.',
        timerMinutes: 30,
        visualCue: 'Liquid turns opaque deep cranberry-magenta with sharp fruity tang.',
        temperatureOrFlame: 'Warm steep (60°C / 140°F) — no stove cooking'
      },
      {
        stepNumber: 2,
        title: 'Extract Fresh Coconut Milk with Garlic & Chili',
        instruction: 'Blend 160 g fresh grated coconut with 250 ml lukewarm water, 1 raw garlic clove, and 1 green chili for 45 seconds. Squeeze through muslin cloth to obtain silky first-press coconut milk.',
        timerMinutes: 3,
        visualCue: 'Velvety snow-white coconut milk carries a clean aroma of fresh garlic and green chili.',
        temperatureOrFlame: 'Room temperature extraction'
      },
      {
        stepNumber: 3,
        title: 'Blend Pink Sol Kadhi & Chill',
        instruction: 'Gradually whisk ruby kokum extract into the coconut milk (taste as you pour to calibrate tanginess). Season with sea salt, roasted cumin powder, and a pinch of hing. Chill 30 minutes and garnish with finely chopped cilantro.',
        timerMinutes: 2,
        visualCue: 'Uniform pastel rose-pink emulsion with zero curdling or separated oil.',
        temperatureOrFlame: 'Chilled (4°C–6°C / 40°F)'
      }
    ],
    sidePairings: ['Coastal Bombil / Paneer Rava Fry', 'Steamed Indrayani rice with Malvani curry'],
    beveragePairings: ['Served chilled alongside spicy coastal meals or as a post-meal digestive'],
    chefTips: [
      'Critical Pitfall: NEVER heat or boil Sol Kadhi once kokum and coconut milk are combined—heat instantly curdles coconut proteins and destroys the pastel pink emulsion.',
      'Use moist, dark-purple Konkani kokum petals rather than dried gray salted rinds for clean ruby hue.'
    ],
    storageAdvice: {
      fridgeShelfLife: 'Keep chilled in glass bottle up to 24 hours; stir gently before pouring.',
      freezerSuitability: 'Do not freeze—coconut milk separates completely.',
      reheatingInstructions: 'Always serve chilled; never heat.'
    },
    videoSearchQuery: 'Authentic Malvani Goan Sol Kadhi recipe fresh coconut kokum',
    summary: 'Vibrant coastal Konkani elixir combining steep-extracted ruby kokum, fresh first-press coconut milk, raw garlic, green chili, and roasted cumin—served ice-cold.',
    imageUrl: '/src/assets/images/craft_beverages_tray_1795185872087.jpg'
  },
  {
    id: 'bengali-shorshe-bhapa-paneer',
    titleNative: 'সরষে ভাপা পনির (Bengali Shorshe Bhapa Paneer)',
    titleEnglish: 'Bengali Steamed Mustard & Poppy-Seed Paneer',
    category: 'Indian Regional',
    region: 'East India · Kolkata (Bengal)',
    course: 'Main Course',
    skillLevel: 'Beginner-Friendly',
    techniques: ['Bitter-Free Mustard Seed Emulsion', 'Tiffin-Box Water-Bath Steaming', 'Raw Kachi Ghani Mustard Oil Finish'],
    allergens: ['Dairy', 'Mustard'],
    dietaryTags: ['Vegetarian', 'Gluten-Free', 'Jain Adaptable', 'High-Protein'],
    timings: {
      activePrepMins: 15,
      cookBrewMins: 16,
      advancePrepText: '15 mins mustard-poppy seed soak',
      totalTimeText: '46 mins',
      servings: 3,
      yieldLabel: '3 steamed portions'
    },
    costCategory: 'Budget-Friendly',
    estimatedCostPerServing: '₹90–₹130 ($1.10–$1.55)',
    nutrition: {
      calories: 385,
      proteinG: 19,
      carbsG: 9,
      fiberG: 2.5,
      sugarG: 3,
      fatsG: 31,
      saturatedFatG: 12,
      micronutrients: ['Calcium', 'Omega-3 (ALA)', 'Selenium', 'Phosphorus']
    },
    equipment: ['Stainless Steel Tight-Lidded Tiffin Box (or Heatproof Bowl + Foil)', 'Deep Steamer Pot', 'Spice Grinder'],
    ingredientGroups: [
      {
        groupTitle: 'For the Bitter-Free Shorshe Posto Paste',
        items: [
          { name: 'Yellow Mustard Seeds + Black Mustard Seeds (2:1 ratio)', amount: '24 g', numericAmount: 24, unit: 'g', lexiconKey: 'mustard_seeds' },
          { name: 'White Poppy Seeds (Posto) or Cashews', amount: '15 g', numericAmount: 15, unit: 'g' },
          { name: 'Green Chilies (2 for paste, 2 slit for top)', amount: '4 chilies', numericAmount: 4, unit: 'chilies' },
          { name: 'Sea Salt (ground directly with seeds to prevent bitterness)', amount: '4 g', numericAmount: 4, unit: 'g' }
        ]
      },
      {
        groupTitle: 'For Steaming & Raw Mustard Oil Finish',
        items: [
          { name: 'Fresh Soft Paneer, cut into 3 cm squares', amount: '300 g', numericAmount: 300, unit: 'g' },
          { name: 'Whisked Hung Curd / Yogurt', amount: '60 g', numericAmount: 60, unit: 'g', lexiconKey: 'curd' },
          { name: 'Cold-Pressed Kachi Ghani Mustard Oil', amount: '30 ml', numericAmount: 30, unit: 'ml' },
          { name: 'Turmeric Powder & Grated Fresh Coconut', amount: '20 g', numericAmount: 20, unit: 'g', lexiconKey: 'turmeric' }
        ]
      }
    ],
    substitutes: [
      {
        original: 'Fresh Paneer & Hung Curd',
        substitute: 'Silken-firm tofu slabs + 60 g unsweetened coconut yogurt',
        dietaryType: 'Vegan / Dairy-Free',
        sensoryNote: 'Steaming keeps tofu custard-tender while mustard oil lends pungent warmth'
      },
      {
        original: 'White Poppy Seeds (Posto)',
        substitute: '15 g soaked blanched almonds or white sesame seeds',
        dietaryType: 'Posto-Free Region',
        sensoryNote: 'Maintains nutty creamy body that mellows sharp mustard punch'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Grind Bitter-Free Shorshe Paste with Salt & Chili',
        instruction: 'Soak yellow/black mustard seeds and poppy seeds in lukewarm water for 15 minutes. Drain and grind with 2 green chilies, 4 g salt, and 3 tbsp cold water into a silky paste—never grind dry mustard without salt and chili, which locks in bitter enzymes.',
        timerMinutes: 3,
        visualCue: 'Smooth canary-yellow cream with pungent wasabi-like nasal lift and zero bitter aftertaste.',
        temperatureOrFlame: 'Cold grinding'
      },
      {
        stepNumber: 2,
        title: 'Coat Paneer & Seal in Tiffin Box',
        instruction: 'Inside the steel tiffin box, whisk mustard-poppy paste with 60 g curd, turmeric, grated coconut, and 20 ml raw mustard oil. Fold in paneer squares gently so they are enveloped, top with slit green chilies and final 10 ml raw mustard oil, and clamp lid tight.',
        timerMinutes: 4,
        visualCue: 'Saffron-yellow creamy emulsion covers paneer completely.',
        temperatureOrFlame: 'Room temperature assembly'
      },
      {
        stepNumber: 3,
        title: '15-Minute Water-Bath Steam',
        instruction: 'Place sealed tiffin box on a wire rack inside a deep pot filled with water reaching halfway up the tiffin sides. Cover pot tightly and steam over medium-low heat for 15 minutes. Rest 5 minutes before unclasping.',
        timerMinutes: 15,
        visualCue: 'Paneer turns pillow-soft; shimmering golden mustard oil floats along the velvety gravy perimeter.',
        temperatureOrFlame: 'Gentle boiling water bath (100°C / 212°F)'
      }
    ],
    sidePairings: ['Steamed Gobindobhog or Basmati Rice', 'Crispy Beguni (battered eggplant slices)'],
    beveragePairings: ['Aam Pora Shorbot (charred raw mango cooler)', 'First-flush Darjeeling black tea'],
    chefTips: [
      'Critical Pitfall: Always grind mustard seeds together with salt and green chili—grinding mustard seeds alone with warm water activates bitter myrosinase compounds.',
      'Never cook off the raw kachi ghani mustard oil completely; its volatile pungency is the soul of Bhapa dishes.'
    ],
    storageAdvice: {
      fridgeShelfLife: '2 days refrigerated in glass container.',
      freezerSuitability: 'Do not freeze—curd and mustard emulsion splits.',
      reheatingInstructions: 'Re-steam covered over hot water for 5 minutes rather than microwaving on high.'
    },
    videoSearchQuery: 'Authentic Bengali Shorshe Bhapa Paneer Bong Eats technique',
    summary: 'Silky Kolkata-style steamed paneer bathed in bitter-free yellow-black mustard paste, poppy seeds, curd, green chili, and raw kachi ghani mustard oil.',
    imageUrl: '/src/assets/images/indian_regional_feast_1795185872220.jpg'
  }
];
