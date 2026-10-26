import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const BookSales = lazy(() => import("./pages/BookSales"));
const AffiliateExperience = lazy(() => import("./pages/AffiliateExperience"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const AdvocateAccessPage = lazy(() => import("./pages/AdvocateAccessPage"));

function CompanionRoute() {
  const location = useLocation();
  const referral = new URLSearchParams(location.search).get("ref")?.trim();

  if (referral) {
    return <Navigate replace to={`/landing?ref=${encodeURIComponent(referral)}`} />;
  }

  return <AffiliateExperience />;
}

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <p>404 · PAGE NOT FOUND</p>
      <h1>We couldn’t find that page.</h1>
      <Link to="/landing">Return to My Family Companion</Link>
    </main>
  );
}

function AppContent() {
  return (
    <Suspense fallback={<div className="route-loading" role="status" aria-live="polite">Loading My Family Companion…</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/advocate/join" element={<AdvocateAccessPage mode="join" />} />
        <Route path="/advocate/login" element={<AdvocateAccessPage mode="login" />} />
        <Route path="/companion" element={<CompanionRoute />} />
        <Route path="/AffiliateExperience" element={<AffiliateExperience />} />
        <Route path="/book" element={<BookSales />} />
        <Route path="/blog" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
