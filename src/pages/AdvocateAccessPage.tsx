import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { phoneCountries } from "../data/phoneCountries";
import { mfcApiUrl, requestJson } from "../lib/api";
import "./AdvocateAccessPage.css";

type Mode = "join" | "login";
type AuthResponse = {
  token?: string;
  data?: { name?: string; email?: string; phone_no?: string };
};

export default function AdvocateAccessPage({ mode }: { mode: Mode }) {
  const isJoin = mode === "join";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sponsorCode = searchParams.get("ref")?.trim() || "";
  const paymentReference = searchParams.get("payment_reference")?.trim() || "";
  const hasVerifiedPayment = Boolean(paymentReference && sessionStorage.getItem("mfc_advocate_paid_reference") === paymentReference);
  const [pendingDetails] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("mfc_promoter_pending") || "{}") as { name?: string; email?: string; phone?: string; countryCode?: string }; }
    catch { return {}; }
  });
  const [countryCode, setCountryCode] = useState(pendingDetails.countryCode || "NG");
  const [form, setForm] = useState({ name: pendingDetails.name || "", email: pendingDetails.email || "", phone: pendingDetails.phone || "", password: "", passwordConfirmation: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const selectedCountry = useMemo(() => phoneCountries.find((country) => country.cca2 === countryCode) ?? phoneCountries[0], [countryCode]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (isJoin && form.password !== form.passwordConfirmation) {
      setError("Your passwords don’t match.");
      return;
    }
    if (pendingDetails.email && form.email.trim().toLowerCase() !== pendingDetails.email.trim().toLowerCase()) {
      setError("Use the same email address you used for Paystack so MFC can match your payment.");
      return;
    }
    const dialDigits = selectedCountry.dialCode.replace(/\D/g, "");
    let phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.startsWith(dialDigits)) phoneDigits = phoneDigits.slice(dialDigits.length);
    phoneDigits = phoneDigits.replace(/^0+/, "");
    const phone = `${selectedCountry.dialCode}${phoneDigits}`;

    setBusy(true);
    try {
      const data = await requestJson<AuthResponse>(mfcApiUrl(`/auth/${isJoin ? "register" : "login"}`), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(isJoin
          ? { name: form.name.trim(), email: form.email.trim(), phone_no: phone, password: form.password, password_confirmation: form.passwordConfirmation }
          : { email: form.email.trim(), password: form.password }),
      });
      if (typeof data.token !== "string" || !data.token) throw new Error("MFC did not return an account session. Please contact support.");
      const account = data.data || {};
      sessionStorage.setItem("mfc_advocate_session", JSON.stringify({
        token: data.token,
        name: account.name || form.name.trim(),
        email: account.email || form.email.trim(),
        phone: account.phone_no || (isJoin ? phone : pendingDetails.phone || ""),
      }));
      if (!isJoin) {
        navigate("/AffiliateExperience", { replace: true });
      } else if (hasVerifiedPayment) {
        setCompleted(true);
      } else {
        const query = new URLSearchParams({ product: "promoter" });
        if (sponsorCode) query.set("ref", sponsorCode);
        navigate(`/checkout?${query.toString()}`, { replace: true });
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "We couldn’t reach MFC. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (isJoin && !hasVerifiedPayment) return <Navigate to="/checkout?product=promoter" replace />;

  if (completed) return <main className="advocate-access">
    <header className="access-header"><Link to="/landing" className="checkout-brand"><span className="checkout-mark">MFC</span><span><b>My Family Companion</b><small>HEALTH ADVOCATE PROGRAM</small></span></Link><span>STEP 2 OF 2 <i>·</i> ACCOUNT</span></header>
    <section className="access-card access-complete"><span className="checkout-success-icon">✓</span><span className="checkout-eyebrow">ACCOUNT {isJoin ? "CREATED" : "SIGNED IN"}</span><h1>You’re almost ready, {form.name.split(" ")[0] || "advocate"}.</h1><p className="access-intro">Your ₦5,000 payment is confirmed and your MFC account is ready. MFC will finish setting up advocate access. Keep this payment reference if you need support.</p><div className="access-reference"><span>PAYMENT REFERENCE</span><b>{paymentReference}</b></div><Link className="checkout-submit" to="/AffiliateExperience">Open promoter hub <span aria-hidden="true">→</span></Link></section>
    <footer className="access-footer">My Family Companion <span>·</span> Clear health knowledge for every family</footer>
  </main>;

  return <main className="advocate-access">
    <header className="access-header"><Link to="/landing" className="checkout-brand"><span className="checkout-mark">MFC</span><span><b>My Family Companion</b><small>HEALTH ADVOCATE PROGRAM</small></span></Link><span>STEP 2 OF 2 <i>·</i> ACCOUNT</span></header>
    <section className="access-card">
      <Link to="/landing" className="access-back">← &nbsp;Back to MFC</Link>
      <span className="checkout-eyebrow">{isJoin ? "START YOUR ADVOCATE JOURNEY" : "WELCOME BACK"}</span>
      <h1>{isJoin ? "Create your MFC account." : "Sign in to continue."}</h1>
      <p className="access-intro">{isJoin ? "Your ₦5,000 advocate registration is paid. Create your MFC account to continue setting up advocate access. The fee does not include the book." : "Sign in to your MFC account to open the promoter hub. Returning advocates do not need to pay the registration fee again."}</p>
      {sponsorCode && <p className="access-sponsor">Sponsor code captured: <b>{sponsorCode}</b></p>}
      <form className="access-form" onSubmit={submit}>
        {isJoin && <label>Full name<input required autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label>}
        <label>Email address<input type="email" required autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label>
        {isJoin && <label>Phone number<div className="access-phone"><select aria-label="Country calling code" value={countryCode} onChange={(event) => setCountryCode(event.target.value)}>{phoneCountries.map((country) => <option key={country.cca2} value={country.cca2}>{country.flag} {country.dialCode} · {country.name}</option>)}</select><input type="tel" required autoComplete="tel-national" inputMode="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Phone number" /></div></label>}
        <label>Password<input type="password" required minLength={8} autoComplete={isJoin ? "new-password" : "current-password"} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder={isJoin ? "At least 8 characters" : "Your password"} /></label>
        {isJoin && <label>Confirm password<input type="password" required minLength={8} autoComplete="new-password" value={form.passwordConfirmation} onChange={(event) => setForm({ ...form, passwordConfirmation: event.target.value })} placeholder="Enter your password again" /></label>}
        {error && <p className="access-error" role="alert">{error}</p>}
        <button className="checkout-submit" disabled={busy}>{busy ? "Connecting to MFC…" : isJoin ? "Create account & continue" : "Sign in & continue"}<span aria-hidden="true">→</span></button>
      </form>
      <p className="access-switch">{isJoin ? "Already have an MFC account?" : "New to MFC?"} <Link to={`${isJoin ? "/advocate/login" : "/advocate/join"}${sponsorCode ? `?ref=${encodeURIComponent(sponsorCode)}` : ""}`}>{isJoin ? "Sign in" : "Create an account"}</Link></p>
      {paymentReference && <p className="access-next">Payment reference: {paymentReference}. Your MFC account and book purchase are separate.</p>}
    </section>
    <footer className="access-footer">My Family Companion <span>·</span> Clear health knowledge for every family</footer>
  </main>;
}
