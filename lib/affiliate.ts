/**
 * Affiliate Link Utility
 * Wraps product URLs with affiliate tags for monetization
 */

// Affiliate partner IDs - can be configured via environment variables
const AMAZON_AFFILIATE_TAG =
  process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || "wishii-20";

/**
 * Check if a URL is from Amazon
 */
function isAmazonUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes("amazon.");
  } catch {
    return false;
  }
}

/**
 * Add Amazon affiliate tag to URL
 */
function addAmazonAffiliateTag(url: string): string {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set("tag", AMAZON_AFFILIATE_TAG);
    return urlObj.toString();
  } catch {
    return url;
  }
}

/**
 * Convert a product URL to an affiliate URL
 * Currently supports:
 * - Amazon (various country domains)
 *
 * For unsupported retailers, returns the original URL
 *
 * @param originalUrl - The original product URL
 * @returns The affiliate-tagged URL
 */
export function getAffiliateUrl(
  originalUrl: string | undefined
): string | undefined {
  if (!originalUrl) {
    return undefined;
  }

  // Ensure URL has protocol
  let url = originalUrl;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  // Amazon affiliate links
  if (isAmazonUrl(url)) {
    return addAmazonAffiliateTag(url);
  }

  // For other retailers, return original URL
  // TODO: Add support for other affiliate programs (eBay, Target, etc.)
  return url;
}

/**
 * Extract a display-friendly domain name from a URL
 * Used to show "Shop at Amazon" instead of showing the full URL
 */
export function getStoreName(url: string | undefined): string {
  if (!url) {
    return "Shop";
  }

  try {
    // Ensure URL has protocol
    let fullUrl = url;
    if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
      fullUrl = "https://" + fullUrl;
    }

    const urlObj = new URL(fullUrl);
    const hostname = urlObj.hostname.toLowerCase();

    // Map common domains to friendly names
    if (hostname.includes("amazon.")) return "Amazon";
    if (hostname.includes("ebay.")) return "eBay";
    if (hostname.includes("walmart.")) return "Walmart";
    if (hostname.includes("target.")) return "Target";
    if (hostname.includes("bestbuy.")) return "Best Buy";
    if (hostname.includes("apple.")) return "Apple";
    if (hostname.includes("etsy.")) return "Etsy";
    if (hostname.includes("ikea.")) return "IKEA";
    if (hostname.includes("wayfair.")) return "Wayfair";
    if (hostname.includes("costco.")) return "Costco";
    if (hostname.includes("homedepot.")) return "Home Depot";
    if (hostname.includes("lowes.")) return "Lowe's";
    if (hostname.includes("nordstrom.")) return "Nordstrom";
    if (hostname.includes("macys.")) return "Macy's";
    if (hostname.includes("zappos.")) return "Zappos";
    if (hostname.includes("nike.")) return "Nike";
    if (hostname.includes("adidas.")) return "Adidas";
    if (hostname.includes("zara.")) return "Zara";
    if (hostname.includes("hm.") || hostname.includes("h&m.")) return "H&M";
    if (hostname.includes("mediamarkt.")) return "MediaMarkt";
    if (hostname.includes("saturn.")) return "Saturn";
    if (hostname.includes("otto.")) return "Otto";
    if (hostname.includes("zalando.")) return "Zalando";
    if (hostname.includes("aboutyou.")) return "About You";

    // For unknown stores, extract domain name
    const parts = hostname.replace("www.", "").split(".");
    if (parts.length > 0) {
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    }

    return "Shop";
  } catch {
    return "Shop";
  }
}
