/**
 * Formats a price value to currency format
 * @param {number|string} price - The price to format
 * @returns {string} Formatted price string (e.g., "$12.99")
 */
export function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}

/**
 * Calculates the total price for an item based on quantity
 * @param {number|string} price - The unit price
 * @param {number} quantity - The quantity
 * @returns {string} Formatted total price string
 */
export function calculateItemTotal(price, quantity) {
  return `$${(parseFloat(price) * quantity).toFixed(2)}`;
}