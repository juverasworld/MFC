export type PaymentProduct = "book" | "promoter";

export const PAYMENT_CURRENCY: "NGN";
export const PAYMENT_PRODUCTS: Readonly<{
  book: Readonly<{ directAmountMinor: number; referralAmountMinor: number }>;
  promoter: Readonly<{ amountMinor: number }>;
}>;

export function expectedPaymentAmountMinor(product: string, hasReferral?: boolean): number | undefined;
export function paymentAmountNgn(product: PaymentProduct, hasReferral?: boolean): number;
