import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);

function createGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const RECIPE_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    titleNative: { type: Type.STRING },
    titleEnglish: { type: Type.STRING },
    category: { type: Type.STRING },
    region: { type: Type.STRING },
    course: { type: Type.STRING },
    skillLevel: { type: Type.STRING },
    techniques: { type: Type.ARRAY, items: { type: Type.STRING } },
    allergens: { type: Type.ARRAY, items: { type: Type.STRING } },
    dietaryTags: { type: Type.ARRAY, items: { type: Type.STRING } },
    timings: {
      type: Type.OBJECT,
      properties: {
        activePrepMins: { type: Type.INTEGER },
        cookBrewMins: { type: Type.INTEGER },
        advancePrepText: { type: Type.STRING },
        totalTimeText: { type: Type.STRING },
        servings: { type: Type.INTEGER },
        yieldLabel: { type: Type.STRING },
      },
      required: ['activePrepMins', 'cookBrewMins', 'advancePrepText', 'totalTimeText', 'servings', 'yieldLabel'],
    },
    costCategory: { type: Type.STRING },
    estimatedCostPerServing: { type: Type.STRING },
    nutrition: {
      type: Type.OBJECT,
      properties: {
        calories: { type: Type.INTEGER },
        proteinG: { type: Type.NUMBER },
        carbsG: { type: Type.NUMBER },
        fiberG: { type: Type.NUMBER },
        sugarG: { type: Type.NUMBER },
        fatsG: { type: Type.NUMBER },
        saturatedFatG: { type: Type.NUMBER },
        micronutrients: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['calories', 'proteinG', 'carbsG', 'fiberG', 'sugarG', 'fatsG', 'saturatedFatG', 'micronutrients'],
    },
    equipment: { type: Type.ARRAY, items: { type: Type.STRING } },
    ingredientGroups: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          groupTitle: { type: Type.STRING },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                amount: { type: Type.STRING },
                numericAmount: { type: Type.NUMBER },
                unit: { type: Type.STRING },
                notes: { type: Type.STRING },
                lexiconKey: { type: Type.STRING },
                pantryRole: { type: Type.STRING },
              },
              required: ['name', 'amount'],
            },
          },
        },
        required: ['groupTitle', 'items'],
      },
    },
    substitutes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          original: { type: Type.STRING },
          substitute: { type: Type.STRING },
          dietaryType: { type: Type.STRING },
          sensoryNote: { type: Type.STRING },
        },
        required: ['original', 'substitute', 'dietaryType', 'sensoryNote'],
      },
    },
    steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          stepNumber: { type: Type.INTEGER },
          title: { type: Type.STRING },
          instruction: { type: Type.STRING },
          timerMinutes: { type: Type.INTEGER },
          visualCue: { type: Type.STRING },
          temperatureOrFlame: { type: Type.STRING },
        },
        required: ['stepNumber', 'title', 'instruction', 'visualCue'],
      },
    },
    sidePairings: { type: Type.ARRAY, items: { type: Type.STRING } },
    beveragePairings: { type: Type.ARRAY, items: { type: Type.STRING } },
    chefTips: { type: Type.ARRAY, items: { type: Type.STRING } },
    storageAdvice: {
      type: Type.OBJECT,
      properties: {
        fridgeShelfLife: { type: Type.STRING },
        freezerSuitability: { type: Type.STRING },
        reheatingInstructions: { type: Type.STRING },
      },
      required: ['fridgeShelfLife', 'freezerSuitability', 'reheatingInstructions'],
    },
    videoSearchQuery: { type: Type.STRING },
    summary: { type: Type.STRING },
    pantryMatchSummary: {
      type: Type.OBJECT,
      properties: {
        primaryUsed: { type: Type.ARRAY, items: { type: Type.STRING } },
        pantryStaplesAssumed: { type: Type.ARRAY, items: { type: Type.STRING } },
        optionalAddons: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
  },
  required: [
    'id',
    'titleNative',
    'titleEnglish',
    'category',
    'region',
    'course',
    'skillLevel',
    'techniques',
    'allergens',
    'dietaryTags',
    'timings',
    'costCategory',
    'estimatedCostPerServing',
    'nutrition',
    'equipment',
    'ingredientGroups',
    'substitutes',
    'steps',
    'sidePairings',
    'beveragePairings',
    'chefTips',
    'storageAdvice',
    'videoSearchQuery',
    'summary',
  ],
};

const CULINARY_SYSTEM_INSTRUCTION = `You are the AI core engine for Rasoi & Realm, a premier global culinary and beverage platform specializing in regional Indian dishes, global cuisines, and authentic craft beverages.

STRICT ZERO-VAGUENESS MANDATE:
1. NEVER write vague phrases like "cook until done", "simmer for a while", "season to taste", or "make the sauce".
2. Every preparation step MUST include concrete visual, tactile, or physical doneness cues (e.g., "edges blister with charred leopard spots", "sauce coats the back of a spoon in nappe consistency", "onions shrink 75% into deep mahogany jam") AND explicit temperatures in both °C and °F or stove flame intensities.
3. Enforce authentic cultural culinary rules (e.g., Roman Carbonara uses zero cream and emulsifies off-heat with starchy pasta water; Japanese kombu dashi never boils above 80°C/176°F; Pad Thai uses lukewarm-soaked rice noodles and real tamarind pulp, never ketchup; Indian tadka blooms spices at proper fat temperatures; Jain dishes strictly omit onion, garlic, and root vegetables).
4. All ingredient quantities must provide exact grams/ml/spoons AND numericAmount + unit so serving scaling works cleanly.
5. Map key Indian spices to one of these exact lexiconKey strings when applicable: asafoetida, turmeric, mustard_seeds, curry_leaves, cumin, coriander_seeds, fenugreek_seeds, kasuri_methi, green_cardamom, cloves, fennel_seeds, black_pepper, star_anise, kalpasi, tamarind, kokum, saffron, nigella_seeds, carom_seeds, amchur, jaggery, ghee, curd, gram_flour.
6. Set category strictly to one of: "Global Cuisines", "Indian Regional", or "Global & Regional Beverages".
7. Set skillLevel strictly to one of: "Beginner-Friendly", "Intermediate", or "Pro Chef".
8. Set costCategory strictly to one of: "Budget-Friendly", "Mid-Range", or "Gourmet Premium".
9. Include "Critical Pitfall:" prefixes on at least 1–2 chefTips warning against common amateur errors.
10. When generating in a non-English language (e.g. Hindi, Tamil, Bengali, Marathi, Telugu, Kannada, Malayalam, Gujarati, Punjabi), maintain dual naming for clarity (e.g. "मटर पनीर / Matar Paneer") in titleNative, group titles, and key ingredients.`;

const MODELS = ['gemini-4-hydrogen', 'gemini-3.1-flash-lite'] as const;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGeminiWithResilience(
  ai: GoogleGenAI,
  prompt: string
): Promise<Record<string, unknown>> {
  let lastError: unknown = null;

  for (const modelName of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Model ${modelName} timed out after 22s`)), 22000)
        );

        const apiPromise = ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction: CULINARY_SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: RECIPE_RESPONSE_SCHEMA,
          },
        });

        const response = await Promise.race([apiPromise, timeoutPromise]);
        const rawText = (response.text ?? '').trim();
        if (!rawText) {
          throw new Error(`Empty response from ${modelName}`);
        }
        return JSON.parse(rawText) as Record<string, unknown>;
      } catch (err) {
        lastError = err;
        const msg = err instanceof Error ? err.message : String(err);
        const isTransient =
          msg.includes('503') ||
          msg.includes('UNAVAILABLE') ||
          msg.includes('timed out') ||
          msg.includes('429') ||
          msg.includes('RESOURCE_EXHAUSTED');

        if (!isTransient) {
          throw err;
        }
        if (attempt === 0) {
          await sleep(850);
        }
      }
    }
  }

  throw lastError ?? new Error('Upstream Gemini models are currently unavailable.');
}

function formatApiError(err: unknown): { status: number; message: string; code: string } {
  const raw = err instanceof Error ? err.message : String(err);
  if (raw.includes('API_KEY_INVALID') || raw.includes('403') || raw.includes('PERMISSION_DENIED')) {
    return {
      status: 403,
      code: 'API_KEY_ERROR',
      message: 'Gemini API key error. Please check your GEMINI_API_KEY in Settings > Secrets.',
    };
  }
  if (raw.includes('429') || raw.includes('RESOURCE_EXHAUSTED')) {
    return {
      status: 429,
      code: 'QUOTA_EXHAUSTED',
      message: 'Gemini API rate limit reached. Please wait briefly or verify quota in Settings > Secrets.',
    };
  }
  if (raw.includes('503') || raw.includes('UNAVAILABLE') || raw.includes('timed out')) {
    return {
      status: 503,
      code: 'SERVICE_UNAVAILABLE',
      message: 'AI culinary engine is experiencing a temporary capacity spike. Please retry or use the offline synthesizer.',
    };
  }
  return {
    status: 500,
    code: 'GENERATION_FAILED',
    message: raw || 'Unable to generate recipe right now.',
  };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.post('/api/recipes/generate', async (req, res) => {
    const ai = createGeminiClient();
    if (!ai) {
      return res.status(503).json({
        code: 'MISSING_API_KEY',
        message: 'GEMINI_API_KEY is not configured. Please add it in Settings > Secrets.',
      });
    }

    const {
      query,
      cuisine = 'Any Authentic Cuisine',
      dietaryMode = 'Standard',
      language = 'English',
      skillLevel = 'Intermediate',
      servings = 2,
    } = req.body ?? {};

    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ code: 'INVALID_REQUEST', message: 'Please enter a dish or beverage name.' });
    }

    const slugId = `ai-${query.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 42)}-${Date.now().toString(36)}`;

    const prompt = `Generate a complete, authentic 14-point structured recipe or beverage guide for:
Dish / Beverage Request: "${query.trim()}"
Target Cuisine / Region Preference: ${cuisine}
Dietary Variation: ${dietaryMode} (strictly adapt all ingredients, nutrition, budget, and substitutes for ${dietaryMode})
Target Output Language: ${language} (if non-English, use dual naming like Native Script / English Transliteration)
Target Skill Level: ${skillLevel}
Target Servings: ${servings}
Unique ID to use: "${slugId}"

Remember: zero vague instructions, exact temperatures (°C and °F), exact gram/ml weights, timerMinutes on cooking steps where timers apply, and realistic cost estimation per serving in ₹ and $.`;

    try {
      const recipe = await callGeminiWithResilience(ai, prompt);
      recipe.id = typeof recipe.id === 'string' && /^[a-zA-Z0-9_-]+$/.test(recipe.id) ? recipe.id : slugId;
      recipe.isAiGenerated = true;
      recipe.language = language;
      return res.json({ recipe });
    } catch (err) {
      const formatted = formatApiError(err);
      return res.status(formatted.status).json({ code: formatted.code, message: formatted.message });
    }
  });

  app.post('/api/recipes/pantry', async (req, res) => {
    const ai = createGeminiClient();
    if (!ai) {
      return res.status(503).json({
        code: 'MISSING_API_KEY',
        message: 'GEMINI_API_KEY is not configured. Please add it in Settings > Secrets.',
      });
    }

    const {
      ingredients,
      cuisinePreference = 'Best Match',
      dietaryMode = 'Standard',
      language = 'English',
      servings = 2,
    } = req.body ?? {};

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ code: 'INVALID_REQUEST', message: 'Please select or enter at least one kitchen ingredient.' });
    }

    const cleanIngredients = ingredients.map((s) => String(s).trim()).filter(Boolean).slice(0, 20);
    const slugId = `pantry-${Date.now().toString(36)}`;

    const prompt = `SMART PANTRY MODE ("Cook with What You Have"):
User's available kitchen ingredients: ${cleanIngredients.join(', ')}
Cuisine Preference: ${cuisinePreference}
Dietary Variation: ${dietaryMode}
Target Output Language: ${language}
Target Servings: ${servings}
Unique ID to use: "${slugId}"

Requirements:
1. Craft the most authentic, cohesive dish or beverage maximizing the user's listed ingredients.
2. In ingredientGroups, set pantryRole on EVERY ingredient item strictly to one of:
   - "primary": directly from the user's provided ingredient list
   - "staple": common household staple assumed available (water, salt, oil/ghee, turmeric, basic chili powder, black pepper)
   - "optional": optional garnish or flavor enhancer if available
3. Populate pantryMatchSummary accurately with primaryUsed, pantryStaplesAssumed, and optionalAddons string arrays.
4. Enforce the full 14-point zero-vagueness culinary schema.`;

    try {
      const recipe = await callGeminiWithResilience(ai, prompt);
      recipe.id = typeof recipe.id === 'string' && /^[a-zA-Z0-9_-]+$/.test(recipe.id) ? recipe.id : slugId;
      recipe.isAiGenerated = true;
      recipe.isPantryRecipe = true;
      recipe.language = language;
      return res.json({ recipe });
    } catch (err) {
      const formatted = formatApiError(err);
      return res.status(formatted.status).json({ code: formatted.code, message: formatted.message });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rasoi & Realm server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
