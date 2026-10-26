import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import bookPhoto from "../assets/WhatsApp Image 2025-07-09 at 08.47.50_9462555c.jpg";
import { phoneCountries } from "../data/phoneCountries";
import "./CheckoutPage.css";

type Product = "book" | "promoter";
type PaymentState = "idle" | "loading" | "verifying" | "success" | "error";
type AdvocateSession = { token: string; name?: string; email?: string; phone?: string };
const offers = {
  book: { title: "My Family Companion", detail: "Book purchase", amount: 30000, button: "Continue to secure payment" },
  promoter: { title: "MFC Health Advocate", detail: "One-time program registration", amount: 5000, button: "Continue to secure payment" },
};

async function readApiResponse(response: Response) {
  try {
    return await response.json();
  } catch {
    throw new Error("Secure checkout isn't connected in this preview yet. Contact MFC to complete payment.");
  }
}

function readAdvocateSession(): AdvocateSession | null {
  try {
    const session = JSON.parse(sessionStorage.getItem("mfc_advocate_session") || "null");
    return session?.token ? session as AdvocateSession : null;
  } catch {
    return null;
  }
}

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const product: Product = searchParams.get("product") === "promoter" ? "promoter" : "book";
  const referralId = searchParams.get("ref")?.trim() || "";
  const advocateSession = product === "promoter" ? readAdvocateSession() : null;
  const offer = product === "book" && referralId ? { ...offers.book, amount: 25000, detail: "MFC advocate referral price" } : offers[product];
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const [paymentState, setPaymentState] = useState<PaymentState>(reference ? "verifying" : "idle");
  const [confirmedProduct, setConfirmedProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState("");
  const [countryCode, setCountryCode] = useState("NG");
  const [form, setForm] = useState(() => ({ name: product === "promoter" ? advocateSession?.name || "" : "", email: product === "promoter" ? advocateSession?.email || "" : "", phone: product === "promoter" ? advocateSession?.phone || "" : "", city: "", referralCode: product === "promoter" ? referralId : "" }));
  const isPromoter = (paymentState === "success" && confirmedProduct ? confirmedProduct : product) === "promoter";
  const selectedCountry = phoneCountries.find((country) => country.cca2 === countryCode) ?? phoneCountries[0];

  const formattedAmount = useMemo(() => `₦${offer.amount.toLocaleString("en-NG")}`, [offer.amount]);

  useEffect(() => {
    if (!reference) return;
    let cancelled = false;
    const verify = async () => {
      try {
        const response = await fetch("/api/payments/verify", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reference }),
        });
        const data = await readApiResponse(response);
        if (cancelled) return;
        if (!response.ok || !data.success) throw new Error(data.error || "We couldn't confirm this payment yet. Contact MFC support with your payment reference.");
        if (data.product === "book" || data.product === "promoter") setConfirmedProduct(data.product);
        if (data.product === "promoter") sessionStorage.setItem("mfc_advocate_paid_reference", reference);
        setPaymentState("success");
      } catch (error) {
        if (cancelled) return;
        setMessage(error instanceof Error ? error.message : "We couldn't verify your payment.");
        setPaymentState("error");
      }
    };
    void verify();
    return () => { cancelled = true; };
  }, [reference]);

  const startPayment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPaymentState("loading"); setMessage("");
    const callingCode = selectedCountry.dialCode.replace(/\D/g, "");
    let phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.startsWith(callingCode)) phoneDigits = phoneDigits.slice(callingCode.length);
    phoneDigits = phoneDigits.replace(/^0+/, "");
    const internationalPhone = `${selectedCountry.dialCode}${phoneDigits}`;
    try {
      const response = await fetch("/api/payments/initialize", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
          ...form,
          product,
          phone: internationalPhone,
          country: selectedCountry.name,
          countryCode: selectedCountry.cca2,
          referralCode: product === "book" ? referralId : form.referralCode,
        }),
      });
      const data = await readApiResponse(response);
      if (!response.ok || !data.authorizationUrl) throw new Error(data.error || "Secure checkout is not available right now. Please try again later.");
      if (product === "promoter") sessionStorage.setItem("mfc_promoter_pending", JSON.stringify({ name: form.name, email: form.email, phone: internationalPhone, country: selectedCountry.name, countryCode: selectedCountry.cca2, referralCode: form.referralCode }));
      window.location.assign(data.authorizationUrl);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We couldn't start checkout. Please try again.");
      setPaymentState("error");
    }
  };

  return (
    <main className="mfc-checkout">
      <header className="checkout-header"><Link to="/landing" className="checkout-brand"><span className="checkout-mark">MFC</span><span><b>My Family Companion</b><small>SECURE CHECKOUT</small></span></Link><span className="checkout-secure">◈ &nbsp;Secure payment by Paystack</span></header>
      <div className="checkout-layout">
        <section className="checkout-form-panel">
          <Link to="/landing" className="checkout-back">← &nbsp;Back to MFC</Link>
          {paymentState === "verifying" ? (
            <div className="checkout-result"><span className="checkout-spinner" /><span className="checkout-eyebrow">PAYMENT STATUS</span><h1>Confirming your payment</h1><p>We’re checking the transaction securely and will update your order once it’s verified.</p></div>
          ) : paymentState === "success" ? (
            <div className="checkout-result"><span className="checkout-success-icon">✓</span><span className="checkout-eyebrow">PAYMENT CONFIRMED</span><h1>{isPromoter ? "Your ₦5,000 payment is confirmed." : "Your order is confirmed."}</h1><p>{isPromoter ? "Next, create an MFC account or sign in. MFC will match your payment reference and finish setting up advocate access." : "Your book order is recorded. MFC will send your order and delivery details to your email."}</p>{isPromoter ? <><Link className="checkout-submit" to={`/advocate/join?payment_reference=${encodeURIComponent(reference || "")}${referralId ? `&ref=${encodeURIComponent(referralId)}` : ""}`}>Create your MFC account <span aria-hidden="true">→</span></Link><Link className="checkout-auth-switch" to={`/advocate/login?payment_reference=${encodeURIComponent(reference || "")}${referralId ? `&ref=${encodeURIComponent(referralId)}` : ""}`}>Already have an account? Sign in</Link></> : <Link className="checkout-submit" to="/landing">Return to MFC</Link>}</div>
          ) : (
            <>
              <span className="checkout-eyebrow">{isPromoter ? "JOIN THE COMMUNITY" : "GET YOUR COPY"}</span>
              <h1>{isPromoter ? "Become an MFC Health Advocate." : "Bring the guide home."}</h1>
              <p className="checkout-intro">{isPromoter ? "An MFC Health Advocate introduces families to the book, shares approved MFC resources and earns commission on eligible referred sales. It is a referral role, not a clinical role." : referralId ? "You came through an MFC advocate. This book is ₦25,000 with the referral; direct MFC purchases are ₦30,000." : "A practical guide for the questions families carry through pregnancy, birth and the early years. Buy directly from MFC for ₦30,000."}</p>
              {isPromoter && <div className="advocate-explainer">
                <div><b>What the ₦5,000 registration includes</b><span>Official advocate status and ID · your personal referral link · training and approved sharing resources · sales and commission dashboard</span></div>
                <details><summary>How commissions work</summary><p>Illustrative rates on eligible ₦25,000 advocate-referred book sales: direct (L1) 20%, L2 10%, L3 5%, L4 5%. Commissions depend on approved program rules and eligible sales; income is not guaranteed.</p></details>
                <small>The registration fee is a one-time program fee. It does not include the book, which can be purchased separately.</small>
              </div>}
              <form className="checkout-form" onSubmit={startPayment}>
                <label>Full name<input required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
                <div className="checkout-field-row">
                  <label>Email address<input type="email" required autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
                  <label>Phone number
                    <div className="checkout-phone-field">
                      <select aria-label="Country calling code" value={countryCode} onChange={(event) => setCountryCode(event.target.value)}>
                        {phoneCountries.map((country) => <option key={country.cca2} value={country.cca2}>{country.flag} {country.dialCode} · {country.name}</option>)}
                      </select>
                      <input className="checkout-phone-number" type="tel" required autoComplete="tel-national" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" />
                    </div>
                    <small className="phone-hint">We’ll add {selectedCountry.dialCode} to your number.</small>
                  </label>
                </div>
                {!isPromoter && <label>City for delivery<input required autoComplete="address-level2" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Your city" /></label>}
                {isPromoter && <label>Referral / sponsor code <span className="optional-label">optional</span><input value={form.referralCode} onChange={(e) => setForm({ ...form, referralCode: e.target.value })} placeholder="Enter a code if you were referred" /></label>}
                {message && <p className="checkout-error" role="alert">{message}</p>}
                <button className="checkout-submit" disabled={paymentState === "loading"}>{paymentState === "loading" ? "Preparing secure checkout…" : <>{offer.button}<span aria-hidden="true">→</span></>}</button>
                <p className="checkout-terms">By continuing, you’ll be redirected to Paystack. Payment is confirmed securely before MFC records your order.</p>
              </form>
            </>
          )}
        </section>
        <aside className="checkout-summary">
          <span className="checkout-summary-label">YOUR SELECTION</span>
          {!isPromoter && <img src={bookPhoto} alt="My Family Companion book" />}
          <h2>{offer.title}</h2><p>{offer.detail}</p>
          <div className="checkout-total"><span>Total due</span><b>{formattedAmount}</b></div>
          <div className="checkout-summary-note"><span>✓</span><p>{isPromoter ? "The ₦5,000 registration is separate from the book purchase. You can buy the book separately at the applicable price." : referralId ? "Advocate referral price: ₦25,000. Your referral code will be included with this order." : "Direct MFC price: ₦30,000. You can join the advocate program separately at any time."}</p></div>
        </aside>
      </div>
      <footer className="checkout-footer">My Family Companion · Educational information does not replace care from your clinician.</footer>
    </main>
  );
}
