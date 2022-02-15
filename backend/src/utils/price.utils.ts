export const PRICE_PER_VIEW_PER_STAR = 0.00002;
export const PERCENT_TAX = 0.15;

export function getPriceForStars(stars: number | string): number {
  return (Number(stars) || 1) * PRICE_PER_VIEW_PER_STAR;
  // const tax = price * PERCENT_TAX;
  // return price + tax;
}
