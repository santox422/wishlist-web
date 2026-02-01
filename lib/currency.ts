/**
 * Currency Service for Web
 * Provides currency conversion based on wishlist owner's country preference
 * Mirrors the logic from the Expo app's currencyService
 */

// Exchange rates API endpoint
const EXCHANGE_RATES_API = "https://api.exchangerate-api.com/v4/latest/USD";

// Currency code to symbol mapping
const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CNY: "¥",
  INR: "₹",
  KRW: "₩",
  BRL: "R$",
  MXN: "$",
  CAD: "$",
  AUD: "$",
  NZD: "$",
  CHF: "CHF",
  SEK: "kr",
  NOK: "kr",
  DKK: "kr",
  PLN: "zł",
  CZK: "Kč",
  HUF: "Ft",
  RON: "lei",
  RUB: "₽",
  TRY: "₺",
  ZAR: "R",
  PHP: "₱",
  THB: "฿",
  IDR: "Rp",
  VND: "₫",
  TWD: "NT$",
  HKD: "$",
  SGD: "$",
  MYR: "RM",
};

// Country to currency mapping
const countryToCurrency: Record<string, string> = {
  us: "USD",
  ca: "CAD",
  mx: "MXN",
  br: "BRL",
  ar: "ARS",
  gb: "GBP",
  de: "EUR",
  fr: "EUR",
  es: "EUR",
  it: "EUR",
  nl: "EUR",
  be: "EUR",
  at: "EUR",
  ch: "CHF",
  pl: "PLN",
  cz: "CZK",
  se: "SEK",
  no: "NOK",
  dk: "DKK",
  fi: "EUR",
  ie: "EUR",
  pt: "EUR",
  gr: "EUR",
  hu: "HUF",
  ro: "RON",
  ru: "RUB",
  tr: "TRY",
  au: "AUD",
  nz: "NZD",
  jp: "JPY",
  kr: "KRW",
  cn: "CNY",
  in: "INR",
  sg: "SGD",
  my: "MYR",
  th: "THB",
  id: "IDR",
  ph: "PHP",
  vn: "VND",
  tw: "TWD",
  hk: "HKD",
  za: "ZAR",
};

// Country to locale mapping for Intl.NumberFormat
const countryToLocale: Record<string, string> = {
  de: "de-DE",
  at: "de-AT",
  ch: "de-CH",
  fr: "fr-FR",
  be: "fr-BE",
  es: "es-ES",
  mx: "es-MX",
  it: "it-IT",
  nl: "nl-NL",
  pt: "pt-PT",
  br: "pt-BR",
  pl: "pl-PL",
  se: "sv-SE",
  no: "nb-NO",
  dk: "da-DK",
  fi: "fi-FI",
  ru: "ru-RU",
  jp: "ja-JP",
  cn: "zh-CN",
  kr: "ko-KR",
  in: "hi-IN",
  us: "en-US",
  gb: "en-GB",
  au: "en-AU",
  ca: "en-CA",
  nz: "en-NZ",
  ie: "en-IE",
};

// Cache for exchange rates
let cachedRates: Record<string, number> | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Fetch exchange rates from API
 */
export async function getExchangeRates(): Promise<Record<string, number>> {
  // Return cached rates if still valid
  if (
    cachedRates &&
    cacheTimestamp &&
    Date.now() - cacheTimestamp < CACHE_DURATION_MS
  ) {
    return cachedRates;
  }

  try {
    const response = await fetch(EXCHANGE_RATES_API);
    const data = await response.json();
    cachedRates = data.rates;
    cacheTimestamp = Date.now();
    return data.rates;
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    return cachedRates || {};
  }
}

/**
 * Get currency code for a country
 */
export function getCurrencyForCountry(country: string): string {
  return countryToCurrency[country.toLowerCase()] || "USD";
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currencyCode: string): string {
  return currencySymbols[currencyCode] || currencyCode;
}

/**
 * Get locale for a country
 */
export function getLocaleForCountry(country: string): string {
  return countryToLocale[country.toLowerCase()] || "en-US";
}

/**
 * Convert a price from USD to target currency
 */
export function convertFromUSD(
  priceInUSD: number,
  targetCurrency: string,
  rates: Record<string, number>,
): number {
  if (targetCurrency === "USD" || !rates[targetCurrency]) {
    return priceInUSD;
  }
  return priceInUSD * rates[targetCurrency];
}

/**
 * Format a USD price for display in user's currency
 */
export function formatPriceInUserCurrency(
  priceInUSD: number,
  targetCurrency: string,
  rates: Record<string, number>,
  locale: string,
): string {
  const convertedPrice = convertFromUSD(priceInUSD, targetCurrency, rates);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: targetCurrency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedPrice);
}

/**
 * Main formatting function - takes a USD price and owner's country,
 * returns the formatted price in the owner's currency
 */
export async function formatPriceForOwner(
  priceInUSD: number,
  ownerCountry: string | null | undefined,
): Promise<string> {
  // Default to USD if no country
  if (!ownerCountry) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(priceInUSD);
  }

  const currency = getCurrencyForCountry(ownerCountry);
  const locale = getLocaleForCountry(ownerCountry);
  const rates = await getExchangeRates();

  return formatPriceInUserCurrency(priceInUSD, currency, rates, locale);
}

/**
 * Synchronous version that takes pre-fetched rates
 */
export function formatPriceForOwnerSync(
  priceInUSD: number,
  ownerCountry: string | null | undefined,
  rates: Record<string, number>,
): string {
  // Default to USD if no country
  if (!ownerCountry) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(priceInUSD);
  }

  const currency = getCurrencyForCountry(ownerCountry);
  const locale = getLocaleForCountry(ownerCountry);

  // If we don't have rates for this currency, fallback to USD
  if (currency !== "USD" && !rates[currency]) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(priceInUSD);
  }

  return formatPriceInUserCurrency(priceInUSD, currency, rates, locale);
}
