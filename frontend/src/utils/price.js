// @ts-check

import { PERCENT_TAX, PRICE_PER_VIEW_PER_STAR } from "../constants/price";

/**
 * @param {number} stars
 * @param {number} views
 * @returns {number}
 */
export function calculatePrice(stars, views) {
  return PRICE_PER_VIEW_PER_STAR * (stars || 1) * views;
}

/**
 * @param {number} stars
 * @param {number} views
 * @returns {number}
 */
export function calculateTax(stars, views) {
  return calculatePrice(stars, views) * PERCENT_TAX;
}
