// @ts-check
const moneyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
});

export const formatMoney = (value) => moneyFormatter.format(value);

const dateTimeFormat = new Intl.DateTimeFormat();

/**
 *
 * @param {string | Date} value
 * @returns {string}
 */
export function formatDateTime(value) {
  if (typeof value === "string") {
    value = new Date(value);
  }

  return dateTimeFormat.format(value);
}

/**
 *
 * @param {string} url
 * @returns {string}
 */
export function formatGhName(url) {
  return url.replace("https://github.com/", "");
}
