import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import bookPhoto from "../assets/WhatsApp Image 2025-07-09 at 08.47.50_9462555c.jpg";
import "./CheckoutPage.css";

type Product = "book" | "promoter";
type PaymentState = "idle" | "loading" | "verifying" | "success" | "error";
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

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const product: Product = searchParams.get("product") === "promoter" ? "promoter" : "book";
  const offer = offers[product];
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const [paymentState, setPaymentState] = useState<PaymentState>(reference ? "verifying" : "idle");
  const [confirmedProduct, setConfirmedProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", referralCode: "" });
  const isPromoter = (paymentState === "success" && confirmedProduct ? confirmedProduct : product) === "promoter";

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
    try {
      const response = await fetch("/api/payments/initialize", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ product, ...form }),
      });
      const data = await readApiResponse(response);
      if (!response.ok || !data.authorizationUrl) throw new Error(data.error || "Secure checkout is not available right now. Please try again later.");
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
            <div className="checkout-result"><span className="checkout-success-icon">✓</span><span className="checkout-eyebrow">PAYMENT CONFIRMED</span><h1>{isPromoter ? "Welcome to the MFC community." : "Your order is confirmed."}</h1><p>{isPromoter ? "Your advocate registration is being activated. Look out for the next-step details from MFC." : "Your book order is recorded. MFC will send your order and delivery details to your email."}</p><Link className="checkout-submit" to="/landing">Return to MFC</Link></div>
          ) : (
            <>
              <span className="checkout-eyebrow">{isPromoter ? "JOIN THE COMMUNITY" : "GET YOUR COPY"}</span>
              <h1>{isPromoter ? "Become an MFC Health Advocate." : "Bring the guide home."}</h1>
              <p className="checkout-intro">{isPromoter ? "Share trusted family health education with your community. Review the program terms before payment." : "A practical guide for the questions families carry through pregnancy, birth and the early years."}</p>
              <form className="checkout-form" onSubmit={startPayment}>
                <label>Full name<input required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
                <div className="checkout-field-row"><label>Email address<input type="email" required autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label><label>Phone number<input type="tel" required autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+234" /></label></div>
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
          <div className="checkout-summary-note"><span>✓</span><p>{isPromoter ? "Registration is separate from the book purchase. The advocate program details will be available before payment." : "This purchase is for the MFC book. You can join the advocate program separately at any time."}</p></div>
        </aside>
      </div>
      <footer className="checkout-footer">My Family Companion · Educational information does not replace care from your clinician.</footer>
    </main>
  );
}
