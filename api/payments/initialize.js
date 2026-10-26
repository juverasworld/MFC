import { randomUUID } from "node:crypto";

const PRODUCTS = {
  book: { amount: 3000000 },
  promoter: { amount: 500000 },
};

function send(res, status, payload) {
  return res.status(status).json(payload);
}

export default async function initializePayment(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed." });
  if (!process.env.PAYSTACK_SECRET_KEY || !process.env.APP_BASE_URL) {
    return send(res, 503, { error: "Secure checkout is not configured yet. Please contact MFC to complete your purchase." });
  }
  if (!process.env.MFC_FULFILLMENT_TOKEN) {
    return send(res, 503, { error: "Secure checkout is not configured yet. Please contact MFC to complete your purchase." });
  }

  const { product, name, email, phone, city, referralCode } = req.body || {};
  const offer = PRODUCTS[product];
  if (!offer) return send(res, 400, { error: "Choose a valid MFC product." });
  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.includes("@") || typeof phone !== "string" || !phone.trim()) {
    return send(res, 400, { error: "Enter your name, a valid email address and phone number." });
  }
  if (product === "book" && (typeof city !== "string" || !city.trim())) {
    return send(res, 400, { error: "Enter your city for delivery." });
  }
  if (product === "book" && !process.env.MFC_API_BASE_URL) {
    return send(res, 503, { error: "Book order fulfillment is not configured yet. Please contact MFC before paying." });
  }
  if (product === "promoter" && !process.env.MFC_PROMOTER_REGISTRATION_URL) {
    return send(res, 503, { error: "Advocate registration is not configured yet. Please contact MFC before paying." });
  }

  const baseUrl = process.env.APP_BASE_URL.replace(/\/$/, "");
  const reference = `MFC-${Date.now()}-${randomUUID().replaceAll("-", "").slice(0, 10)}`;
  const metadata = {
    product,
    customer_name: name.trim(),
    phone: phone.trim(),
    ...(product === "book" ? { city: city.trim(), no_of_copies: 1 } : {}),
    ...(product === "promoter" && typeof referralCode === "string" && referralCode.trim() ? { referral_code: referralCode.trim() } : {}),
  };

  try {
    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(), amount: offer.amount, currency: "NGN", reference,
        callback_url: `${baseUrl}/checkout?product=${product}`,
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
