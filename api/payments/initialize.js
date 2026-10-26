import { randomUUID } from "node:crypto";
import { expectedPaymentAmountMinor, PAYMENT_CURRENCY, PAYMENT_PRODUCTS } from "../../shared/paymentCatalog.js";

function send(res, status, payload) {
  return res.status(status).json(payload);
}

export default async function initializePayment(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed." });
  if (!process.env.PAYSTACK_SECRET_KEY || !process.env.APP_BASE_URL) {
    return send(res, 503, { error: "Secure checkout is not configured yet. Please contact MFC to complete your purchase." });
  }
  const { product, name, email, phone, city, referralCode, country, countryCode } = req.body || {};
  const offer = PAYMENT_PRODUCTS[product];
  if (!offer) return send(res, 400, { error: "Choose a valid MFC product." });
  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.includes("@") || typeof phone !== "string" || !phone.trim()) {
    return send(res, 400, { error: "Enter your name, a valid email address and phone number." });
  }
  if (product === "book" && (typeof city !== "string" || !city.trim())) {
    return send(res, 400, { error: "Enter your city for delivery." });
  }
  if (product === "book" && (!process.env.MFC_API_BASE_URL || !process.env.MFC_FULFILLMENT_TOKEN)) {
    return send(res, 503, { error: "Book order fulfillment is not configured yet. Please contact MFC before paying." });
  }
  if (product === "book" && referralCode && (typeof referralCode !== "string" || !/^[A-Za-z0-9_-]{2,80}$/.test(referralCode))) {
    return send(res, 400, { error: "This advocate referral code is not valid." });
  }

  const baseUrl = process.env.APP_BASE_URL.replace(/\/$/, "");
  const reference = `MFC-${Date.now()}-${randomUUID().replaceAll("-", "").slice(0, 10)}`;
  const amount = expectedPaymentAmountMinor(product, Boolean(referralCode));
  const metadata = {
    product,
    customer_name: name.trim(),
    phone: phone.trim(),
    country: typeof country === "string" ? country : "",
    country_code: typeof countryCode === "string" ? countryCode : "",
    ...(product === "book" ? { city: city.trim(), no_of_copies: 1, ...(referralCode ? { referral_code: referralCode.trim() } : {}) } : {}),
    ...(product === "promoter" && typeof referralCode === "string" && referralCode.trim() ? { referral_code: referralCode.trim() } : {}),
  };

  try {
    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(), amount, currency: PAYMENT_CURRENCY, reference,
        callback_url: `${baseUrl}/checkout?product=${product}${referralCode ? `&ref=${encodeURIComponent(referralCode)}` : ""}`,
        metadata,
      }),
    });
    const result = await paystackResponse.json();
    if (!paystackResponse.ok || !result.status || !result.data?.authorization_url) {
      return send(res, 502, { error: "Paystack could not start checkout. Please try again." });
    }
    return send(res, 200, { authorizationUrl: result.data.authorization_url, reference });
  } catch {
    return send(res, 502, { error: "We could not connect to secure checkout. Please try again." });
  }
};
