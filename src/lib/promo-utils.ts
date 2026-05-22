/**
 * Calculate promo price from original price and discount percentage
 * Supports both static prices and price ranges
 */
export function calculatePromoPrice(originalPrice: string, discountPercent: number): string {
  if (discountPercent === 0 || !originalPrice) return originalPrice;

  // Handle range price (e.g., "Rp 1 - 5 Juta", "1 Juta - 5 Juta", "1-5 Juta")
  const rangeMatch = originalPrice.match(/(\d+(?:[.,]\d{3})*(?:[.,]\d+)?)\s*[-–]\s*(\d+(?:[.,]\d{3})*(?:[.,]\d+)?)/);
  
  if (rangeMatch) {
    const min = parseFloat(rangeMatch[1].replace(/[.,]/g, ''));
    const max = parseFloat(rangeMatch[2].replace(/[.,]/g, ''));
    
    if (!isNaN(min) && !isNaN(max)) {
      const promoMin = min * (1 - discountPercent / 100);
      const promoMax = max * (1 - discountPercent / 100);
      
      return `${formatPriceNumber(promoMin)} - ${formatPriceNumber(promoMax)}`;
    }
  }
  
  // Handle static price (e.g., "Rp 8.000.000", "8 Juta", "8.000.000")
  const numericPrice = originalPrice.replace(/[^\d]/g, '');
  if (numericPrice) {
    const price = parseInt(numericPrice);
    if (!isNaN(price)) {
      const promoPrice = price * (1 - discountPercent / 100);
      return formatPriceNumber(promoPrice);
    }
  }
  
  return originalPrice;
}

/**
 * Format number to Indonesian Rupiah format
 */
function formatPriceNumber(num: number): string {
  if (num >= 1000000) {
    const millions = num / 1000000;
    return millions % 1 === 0 
      ? `${millions} Juta` 
      : `${millions.toFixed(1).replace('.', ',')} Juta`;
  } else if (num >= 1000) {
    const thousands = num / 1000;
    return `${thousands}K`;
  }
  return num.toString();
}
