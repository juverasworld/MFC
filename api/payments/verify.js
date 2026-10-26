const PRODUCTS = {
  book: { directAmount: 3000000, referralAmount: 2500000 },
  promoter: { amount: 500000 },
};

function send(res, status, payload) {
  return res.status(status).json(payload);
}

export default async function verifyPayment(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed." });
  const { reference } = req.body || {};
  if (typeof reference !== "string" || !/^MFC-[a-zA-Z0-9-]{8,80}$/.test(reference)) {
    return send(res, 400, { error: "A valid payment reference is required." });
  }
  if (!process.env.PAYSTACK_SECRET_KEY) return send(res, 503, { error: "Payment verification is temporarily unavailable." });

  try {
    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    const verification = await verifyResponse.json();
    const transaction = verification.data;
    if (!verifyResponse.ok || !verification.status || !transaction) return send(res, 502, { error: "Paystack could not verify this payment yet. Please retry shortly." });
    if (transaction.status !== "success") return send(res, 402, { error: "This payment has not been completed." });

    const metadata = transaction.metadata || {};
    const product = metadata.product;
    const offer = PRODUCTS[product];
    const referralCode = typeof metadata.referral_code === "string" ? metadata.referral_code : "";
    const expectedAmount = product === "book" ? (referralCode ? offer?.referralAmount : offer?.directAmount) : offer?.amount;
    if ((product === "book" && referralCode && !/^[A-Za-z0-9_-]{2,80}$/.test(referralCode)) || !offer || transaction.reference !== reference || transaction.currency !== "NGN" || Number(transaction.amount) !== expectedAmount) {
      return send(res, 400, { error: "The payment details do not match an MFC order. Please contact MFC support." });
    }

    if (product === "promoter") return send(res, 200, { success: true, product, accountSetupRequired: true });
    if (!process.env.MFC_FULFILLMENT_TOKEN) return send(res, 503, { error: "Payment was received, but MFC book fulfillment is not configured. Keep your reference and contact MFC support." });

    let fulfillmentUrl;
    let fulfillmentPayload;
    if (product === "book") {
      if (!process.env.MFC_API_BASE_URL) return send(res, 503, { error: "Payment received, but book order fulfillment needs MFC support. Keep your reference and contact us." });
      fulfillmentUrl = `${process.env.MFC_API_BASE_URL.replace(/\/$/, "")}/orders/local`;
      fulfillmentPayload = {
        firstname: metadata.customer_name,
        email: transaction.customer?.email,
        phone: metadata.phone,
        country: metadata.country,
        countryCode: metadata.country_code,
        city: metadata.city,
        no_of_copies: 1,
        referralCode,
        reference,
      };
    } else {
      if (!process.env.MFC_PROMOTER_REGISTRATION_URL) return send(res, 503, { error: "Payment received, but advocate activation needs MFC support. Keep your reference and contact us." });
      fulfillmentUrl = process.env.MFC_PROMOTER_REGISTRATION_URL;
      fulfillmentPayload = {
        name: metadata.customer_name,
        email: transaction.customer?.email,
        phone: metadata.phone,
        country: metadata.country,
        countryCode: metadata.country_code,
        referralCode: metadata.referral_code || "",
        reference,
        amount: offer.amount,
      };
    }

    const fulfillment = await fetch(fulfillmentUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MFC_FULFILLMENT_TOKEN}`,
        "Content-Type": "application/json",
        "Idempotency-Key": reference,
      },
      body: JSON.stringify(fulfillmentPayload),
    });
    if (!fulfillment.ok) return send(res, 502, { error: "Payment received, but MFC could not finish your order yet. Keep your reference and contact MFC support." });
    return send(res, 200, { success: true, product });
  } catch {
    return send(res, 502, { error: "We could not complete payment verification. Keep your payment reference and retry." });
  }
};
