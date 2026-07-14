export interface GeolocationData {
  country: string;
  region: string;
}

// Config mapping for Country + Region
// Key format: "COUNTRY_CODE-REGION_CODE"
export const REGION_GREETINGS: Record<string, string> = {
  "IN-GJ": "કેમ છો?", // India + Gujarat (ISO code)
  "IN-GUJARAT": "કેમ છો?", // India + Gujarat (Full name fallback)
  "IN-PB": "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", // India + Punjab (ISO code)
  "IN-PUNJAB": "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", // India + Punjab (Full name fallback)
};

// Config mapping for Country codes (2-letter uppercase)
export const COUNTRY_GREETINGS: Record<string, string> = {
  IN: "नमस्ते", // India (fallback for other states)
  JP: "こんにちは", // Japan
  CN: "你好", // China
  KR: "안녕하세요", // South Korea
  FR: "Bonjour", // France
  DE: "Hallo", // Germany
  IT: "Ciao", // Italy
  ES: "Hola", // Spain
  PT: "Olá", // Portugal
  BR: "Olá", // Brazil
  AE: "السلام عليكم", // UAE
  SA: "السلام عليكم", // Saudi Arabia
  QA: "السلام عليكم", // Qatar
  KW: "السلام عليكم", // Kuwait
  OM: "السلام عليكم", // Oman
  BH: "السلام عليكم", // Bahrain
  RU: "Привет", // Russia
  TH: "สวัสดี", // Thailand
  VN: "Xin chào", // Vietnam
  TR: "Merhaba", // Turkey
  IL: "שלום", // Israel
  GR: "Γεια σας", // Greece
};

// Config mapping for Browser Language Fallbacks (lowercase)
export const LANGUAGE_GREETINGS: Record<string, string> = {
  ja: "こんにちは",
  fr: "Bonjour",
  de: "Hallo",
  es: "Hola",
  it: "Ciao",
  hi: "नमस्ते",
  gu: "કેમ છો?",
  ar: "السلام عليكم",
  ko: "안녕하세요",
  zh: "你好",
  pa: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", // Punjabi
};

export const DEFAULT_GREETING = "Hello";

/**
 * Resolves the appropriate personalized greeting based on country/region codes.
 *
 * @param country 2-letter country code (upper case)
 * @param region region or state code (upper case)
 * @returns greeting string or empty if not found
 */
export function getGreeting(country?: string, region?: string): string {
  const normCountry = country ? country.toUpperCase().trim() : "";
  let normRegion = region ? region.toUpperCase().trim() : "";

  // Defensive: strip country prefix if region comes in as "IN-GJ" or "US-CA"
  if (normRegion.startsWith(`${normCountry}-`)) {
    normRegion = normRegion.slice(normCountry.length + 1);
  }

  // 1. Try Specific Country + Region Combination
  if (normCountry && normRegion) {
    const regionKey = `${normCountry}-${normRegion}`;
    if (REGION_GREETINGS[regionKey]) {
      return REGION_GREETINGS[regionKey];
    }
  }

  // 2. Try Country level fallback
  if (normCountry && COUNTRY_GREETINGS[normCountry]) {
    return COUNTRY_GREETINGS[normCountry];
  }

  return "";
}

/**
 * Fallback to resolve greeting using browser language locale.
 * @param lang browser language locale string (e.g. 'en-US', 'ja')
 * @returns greeting string
 */
export function getGreetingByLanguage(lang: string): string {
  if (!lang) return DEFAULT_GREETING;
  
  const baseLang = lang.split("-")[0].toLowerCase();
  
  if (LANGUAGE_GREETINGS[lang.toLowerCase()]) {
    return LANGUAGE_GREETINGS[lang.toLowerCase()];
  }
  
  if (LANGUAGE_GREETINGS[baseLang]) {
    return LANGUAGE_GREETINGS[baseLang];
  }
  
  return DEFAULT_GREETING;
}

/**
 * Cleans punctuation and whitespace from a greeting to allow safe duplicate matching.
 */
function normalizeGreeting(greeting: string): string {
  return greeting.trim().replace(/[\?\.,!]/g, "").toLowerCase();
}

/**
 * Generates the full greeting sequence, inserting the personalized greeting
 * at the beginning and removing any duplicate occurrences from the subsequent list.
 *
 * @param firstGreeting The resolved personalized greeting
 * @param originalGreetings The original sequence of greetings
 * @returns The duplicate-free list of greetings
 */
export function generateGreetingSequence(
  firstGreeting: string,
  originalGreetings: string[]
): string[] {
  if (!originalGreetings || originalGreetings.length === 0) {
    return [firstGreeting];
  }

  const welcomeText = originalGreetings[originalGreetings.length - 1]; // "Welcome."
  const coreGreetings = originalGreetings.slice(0, -1); // original greetings except "Welcome."

  const normFirst = normalizeGreeting(firstGreeting);

  // Filter out the firstGreeting from its original place in the sequence to prevent duplication
  const filteredCore = coreGreetings.filter(
    (g) => normalizeGreeting(g) !== normFirst
  );

  return [firstGreeting, ...filteredCore, welcomeText];
}
