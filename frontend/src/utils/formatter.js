// @ts-check
const moneyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
});

export const formatMoney = (value) => moneyFormatter.format(value);
