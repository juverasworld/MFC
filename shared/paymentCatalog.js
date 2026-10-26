export const PAYMENT_CURRENCY = "NGN";

export const PAYMENT_PRODUCTS = Object.freeze({
  book: Object.freeze({ directAmountMinor: 3_000_000, referralAmountMinor: 2_500_000 }),
  promoter: Object.freeze({ amountMinor: 500_000 }),
});

export function expectedPaymentAmountMinor(product, hasReferral = false) {
  const offer = PAYMENT_PRODUCTS[product];
  if (!offer) return undefined;
  if (product === "book") return hasReferral ? offer.referralAmountMinor : offer.directAmountMinor;
  return offer.amountMinor;
}

export function paymentAmountNgn(product, hasReferral = false) {
  const amountMinor = expectedPaymentAmountMinor(product, hasReferral);
  if (amountMinor === undefined) throw new RangeError(`Unknown payment product: ${product}`);
  return amountMinor / 100;
}
