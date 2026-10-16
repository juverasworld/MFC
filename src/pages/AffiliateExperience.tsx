import { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, BookOpen,
  CalendarDays, Check, ChevronDown, CircleHelp, Copy,
  ExternalLink, Gift, Link2, Menu, MoreHorizontal, Network, Play,
  Search, ShieldCheck, ShoppingBag, Sparkles, Trophy, UsersRound, Wallet, X,
} from "lucide-react";
import "./AffiliateExperience.css";

type Section = "Overview" | "Book store" | "My network" | "Leaderboard" | "Resources" | "Payouts";

const levels = [
  { level: "L1", label: "Direct sales", rate: "20%", amount: "₦5,000", color: "level-one", people: "12 promoters", count: 12 },
  { level: "L2", label: "Level two", rate: "10%", amount: "₦2,500", color: "level-two", people: "38 promoters", count: 38 },
  { level: "L3", label: "Level three", rate: "5%", amount: "₦1,250", color: "level-three", people: "104 promoters", count: 104 },
  { level: "L4", label: "Level four", rate: "5%", amount: "₦1,250", color: "level-four", people: "286 promoters", count: 286 },
];

const recentSales = [
  { initials: "CO", name: "Chidinma O.", detail: "Direct referral · Digital book", date: "Today, 10:42 AM", level: "L1", amount: "+₦5,000", status: "Approved" },
  { initials: "MA", name: "Michael A.", detail: "Team referral · Digital book", date: "Today, 9:18 AM", level: "L2", amount: "+₦2,500", status: "Pending" },
  { initials: "TN", name: "Temi N.", detail: "Team referral · Digital book", date: "Yesterday", level: "L3", amount: "+₦1,250", status: "Approved" },
];
const previousMonthSales = [
  { initials: "AO", name: "Ada O.", detail: "Direct referral · Digital book", date: "Sep 28, 2:16 PM", level: "L1", amount: "+₦5,000", status: "Approved" },
  { initials: "BK", name: "Bola K.", detail: "Team referral · Digital book", date: "Sep 21, 11:04 AM", level: "L2", amount: "+₦2,500", status: "Approved" },
  { initials: "TN", name: "Temi N.", detail: "Team referral · Digital book", date: "Sep 12, 3:40 PM", level: "L3", amount: "+₦1,250", status: "Approved" },
];
const leaderboardByPeriod = {
  "This month": [
    { rank: "01", initials: "AO", name: "Ada Okafor", sales: "126 books", medal: "gold" },
    { rank: "02", initials: "JK", name: "John Kalu", sales: "98 books", medal: "silver" },
    { rank: "03", initials: "TN", name: "Temi Nwosu", sales: "84 books", medal: "bronze" },
    { rank: "04", initials: "BN", name: "Bola Nwosu", sales: "72 books", medal: "" },
    { rank: "05", initials: "AM", name: "Ada Madu", sales: "64 books", medal: "" },
    { rank: "06", initials: "JO", name: "John Obi", sales: "59 books", medal: "" },
    { rank: "07", initials: "CO", name: "Chika Okeke", sales: "52 books", medal: "" },
    { rank: "08", initials: "OV", name: "You · Vera", sales: "48 books", medal: "you" },
  ],
  "Last month": [
    { rank: "01", initials: "JK", name: "John Kalu", sales: "112 books", medal: "gold" },
    { rank: "02", initials: "AO", name: "Ada Okafor", sales: "94 books", medal: "silver" },
    { rank: "03", initials: "BN", name: "Bola Nwosu", sales: "73 books", medal: "bronze" },
    { rank: "04", initials: "AM", name: "Ada Madu", sales: "62 books", medal: "" },
    { rank: "05", initials: "JO", name: "John Obi", sales: "58 books", medal: "" },
    { rank: "06", initials: "CO", name: "Chika Okeke", sales: "51 books", medal: "" },
    { rank: "07", initials: "TN", name: "Temi Nwosu", sales: "44 books", medal: "" },
    { rank: "09", initials: "OV", name: "You · Vera", sales: "36 books", medal: "you" },
  ],
  "All time": [
    { rank: "01", initials: "AO", name: "Ada Okafor", sales: "840 books", medal: "gold" },
    { rank: "02", initials: "TN", name: "Temi Nwosu", sales: "716 books", medal: "silver" },
    { rank: "03", initials: "JK", name: "John Kalu", sales: "602 books", medal: "bronze" },
    { rank: "04", initials: "BN", name: "Bola Nwosu", sales: "510 books", medal: "" },
    { rank: "05", initials: "AM", name: "Ada Madu", sales: "424 books", medal: "" },
    { rank: "06", initials: "OV", name: "You · Vera", sales: "312 books", medal: "you" },
  ],
};
const periodTotals = {
  "This month": { earnings: "₦120,000", platformSales: "2,480" },
  "Last month": { earnings: "₦96,000", platformSales: "2,106" },
  "All time": { earnings: "₦240,000", platformSales: "18,420" },
};

const resources = [
  { icon: Play, category: "START HERE", title: "Your first 7 days as a promoter", detail: "A quick welcome and setup guide", tint: "green" },
  { icon: BookOpen, category: "PRODUCT GUIDE", title: "Inside My Family Companion", detail: "Chapters, reader questions and FAQs", tint: "peach" },
  { icon: Sparkles, category: "PROMOTION KIT", title: "Ready-to-share social pack", detail: "Stories, captions and short videos", tint: "lilac" },
];

export default function AffiliateExperience() {
  const referralPrice = new URLSearchParams(window.location.search).has("ref");
  const [section, setSection] = useState<Section>(referralPrice ? "Book store" : "Overview");
  const [copied, setCopied] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [promoterInfoOpen, setPromoterInfoOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [showAllSales, setShowAllSales] = useState(false);
  const [period, setPeriod] = useState("This month");
  const [checkoutPrice, setCheckoutPrice] = useState(referralPrice ? 25000 : 30000);

  useEffect(() => {
    document.title = "MFC | Book Sales & Promoter Hub";
  }, []);

  const copyReferral = async () => {
    try {
      await navigator.clipboard.writeText("https://myfamilycompanion.org/companion?ref=OVO123");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const navItems: { label: Section; icon: typeof BookOpen }[] = [
    { label: "Overview", icon: Network },
    { label: "Book store", icon: ShoppingBag },
    { label: "My network", icon: UsersRound },
    { label: "Leaderboard", icon: Trophy },
    { label: "Resources", icon: BookOpen },
    { label: "Payouts", icon: Wallet },
  ];
  const salesForPeriod = period === "Last month" ? previousMonthSales : period === "All time" ? [...recentSales, ...previousMonthSales] : recentSales;
  const leaderboardRows = leaderboardByPeriod[period as keyof typeof leaderboardByPeriod];
  const totals = periodTotals[period as keyof typeof periodTotals];

  return (
    <div className="affiliate-app">
      <aside className={`affiliate-sidebar ${mobileNav ? "open" : ""}`}>
        <a className="affiliate-brand" href="/companion" aria-label="MFC Promoter Hub">
          <span className="affiliate-brand-mark"><BookOpen size={18} /></span>
          <span className="affiliate-brand-name"><b>my family</b><small>COMPANION</small></span>
        </a>
        <div className="hub-badge"><span /> PROMOTER HUB</div>
        <div className="affiliate-nav-label">WORKSPACE</div>
        <nav className="affiliate-nav" aria-label="Promoter navigation">
          {navItems.map(({ label, icon: Icon }) => <button key={label} className={section === label ? "active" : ""} onClick={() => { setSection(label); setMobileNav(false); }}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{label === "Payouts" && <span className="nav-count">2</span>}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-book-card"><div className="sidebar-book-cover"><span>MFC</span><i>My Family<br />Companion</i><b>OVO</b></div><div><small>YOUR FEATURED BOOK</small><strong>My Family Companion</strong><button onClick={() => setSection("Book store")}>View book <ArrowRight size={13} /></button></div></div>
          <button className="affiliate-profile"><span className="profile-initials">OV</span><span><b>Obasi Vera</b><small>Promoter · MFC-OVO123</small></span><MoreHorizontal size={18} /></button>
        </div>
      </aside>
      {mobileNav && <button className="affiliate-scrim" aria-label="Close menu" onClick={() => setMobileNav(false)} />}

      <main className="affiliate-main">
        <header className="affiliate-topbar">
          <div className="topbar-left"><button className="affiliate-menu-toggle" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={20} /></button><div className="affiliate-breadcrumb">Promoter hub <span>/</span> <b>{section}</b></div></div>
          <div className="affiliate-top-actions"><span className="demo-data">DEMO DATA</span><button className="help-button"><CircleHelp size={16} /><span>Help centre</span></button><button className="top-divider"><CalendarDays size={16} /><span>Oct 2026</span><ChevronDown size={13} /></button><button className="top-profile" aria-label="Open profile">OV</button></div>
        </header>

        {section === "Book store" ? <BookStore referralPrice={referralPrice} onBuy={(price) => { setCheckoutPrice(price); setOrderDone(false); setCheckoutOpen(true); }} onPromote={() => setPromoterInfoOpen(true)} /> : section === "Overview" ? (
          <div className="affiliate-content">
            <section className="affiliate-welcome"><div><div className="affiliate-eyebrow"><span>✳</span> YOUR IMPACT, IN MOTION</div><h1>Good morning, Vera</h1><p>Every book you share puts practical family health knowledge within reach.</p></div><label className="period-select"><CalendarDays size={15} /><select value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Filter dashboard period"><option>This month</option><option>Last month</option><option>All time</option></select><ChevronDown size={14} /></label></section>

            <section className="earnings-banner"><div className="earnings-copy"><span className="earnings-kicker"><span className="live-dot" /> YOUR PROMOTER SNAPSHOT</span><h2>Your work is making<br />a <em>real difference.</em></h2><p>Here’s how your book sales and community are growing {period.toLowerCase()}.</p><button className="earnings-link" onClick={() => setSection("Payouts")}>View earnings <ArrowRight size={15} /></button></div><div className="earnings-total"><span>TOTAL COMMISSION · {period.toUpperCase()}</span><strong>{totals.earnings}</strong><small>Pending + approved for this period</small></div><div className="banner-stamp"><span>FAMILY<br />HEALTH<br /><b>✳</b></span></div><div className="banner-scribble" aria-hidden="true">✳</div></section>

            <div className="platform-sync"><span><span className="sync-dot" /> SYNCED FROM GOAFFPRO</span><small>Updated 9:41 AM · Demo figures</small></div>
            <section className="stats-grid" aria-label="Promoter performance">
              <Metric icon={ShoppingBag} label="YOUR BOOK SALES" value={period === "This month" ? "48" : period === "Last month" ? "36" : "312"} change={`${period} · qualifying sales`} positive />
              <Metric icon={ArrowUpRight} label="PLATFORM BOOK SALES" value={totals.platformSales} change={`${period} · all promoters`} positive />
              <Metric icon={UsersRound} label="NETWORK PROMOTERS" value="440" change="12 · 38 · 104 · 286 by level" positive />
              <Metric icon={Wallet} label="PENDING COMMISSION" value={period === "This month" ? "₦37,500" : period === "Last month" ? "₦29,000" : "₦37,500"} change="Next review · Friday" />
              <Metric icon={BadgeCheck} label="PROMOTER RANK" value="#8" change="Level 2 · 14 sales to Level 3" />
            </section>

            <section className="affiliate-row">
              <div className="commission-panel">
                <div className="panel-heading"><div><span className="panel-eyebrow">HOW EARNINGS WORK</span><h2>Commission by level</h2></div><button className="panel-more" aria-label="Commission details"><MoreHorizontal size={20} /></button></div>
                <p className="panel-description">Earn when your community buys the MFC digital book.</p>
                <div className="level-list">{levels.map((item) => <div className="level-row" key={item.level}><div className={`level-tag ${item.color}`}>{item.level}</div><div className="level-label"><b>{item.label}</b><small>{item.people}</small></div><div className="level-rate"><b>{item.rate}</b><small>per book</small></div><div className="level-value"><b>{item.amount}</b><small>on ₦25,000 sale</small></div></div>)}</div>
                <div className="commission-foot"><span><ShieldCheck size={15} /> Transparent, four-level structure</span><button onClick={() => setSection("Payouts")}>See commission details <ArrowRight size={14} /></button></div>
              </div>
              <div className="referral-panel"><div className="referral-heading"><span className="referral-icon"><Link2 size={17} /></span><button aria-label="More referral options"><MoreHorizontal size={19} /></button></div><span className="panel-eyebrow">YOUR PERSONAL REFERRAL LINK</span><h2>Share good<br />things forward.</h2><p>Customers who come through your referral link see the ₦25,000 promoter price.</p><div className="referral-link-box"><span>myfamilycompanion.org/companion?ref=OVO123</span><button onClick={copyReferral} aria-label="Copy referral link">{copied ? <Check size={15} /> : <Copy size={15} />}</button></div><div className={`copy-feedback ${copied ? "visible" : ""}`}>{copied ? "Link copied — ready to share" : "Your unique promoter link"}</div><button className="share-button" onClick={copyReferral}>{copied ? "Copied to clipboard" : "Copy my link"}<ArrowRight size={15} /></button><button className="open-store-link" onClick={() => setSection("Book store")}>Preview the customer book page <ExternalLink size={13} /></button></div>
            </section>

            <section className="insights-grid"><div className="network-analytics"><div className="panel-heading"><div><span className="panel-eyebrow">YOUR COMMUNITY AT A GLANCE</span><h2>Network by level</h2></div><span className="analytics-total">440 current</span></div><p>Current promoter count in your referral network. Counts are a live snapshot, independent of the activity filter.</p><div className="network-bars">{levels.map((level)=><div className="network-bar-row" key={level.level}><span className={`level-tag ${level.color}`}>{level.level}</span><div className="bar-track"><i style={{width:`${Math.max(8,(level.count/286)*100)}%`}} /></div><b>{level.count}</b></div>)}</div><button className="activity-link" onClick={() => setSection("My network")}>Explore your network <ArrowRight size={14}/></button></div><div className="leaderboard-panel"><div className="panel-heading"><div><span className="panel-eyebrow">A LITTLE FRIENDLY MOMENTUM</span><h2>Promoter leaderboard</h2></div><span className="trophy-icon">✦</span></div><p>Ranked by qualifying book sales · {period.toLowerCase()}</p><div className="leaderboard-list">{leaderboardRows.map((row)=><LeaderboardRow key={row.rank} {...row}/>)}</div><small className="leaderboard-note">Demo figures · source: GoAffPro · refreshed 9:41 AM. Ranking excludes refunded or ineligible sales.</small></div></section>

            <section className="lower-grid"><div className="sales-panel"><div className="panel-heading"><div><span className="panel-eyebrow">{period.toUpperCase()} ACTIVITY</span><h2>Book sales</h2></div><button className="see-all" onClick={() => setShowAllSales(!showAllSales)}>{showAllSales ? "Show less" : "See all"}<ArrowRight size={14} /></button></div><div className="sales-table"><div className="sales-head"><span>CUSTOMER</span><span>REFERRAL</span><span>COMMISSION</span></div>{(showAllSales ? [...salesForPeriod, ...salesForPeriod] : salesForPeriod).map((sale, index) => <div className="sale-row" key={`${sale.name}-${index}`}><span className="customer-cell"><i className={`customer-avatar avatar-${index % 3}`}>{sale.initials}</i><span><b>{sale.name}</b><small>{sale.detail}</small></span></span><span className="referral-cell"><b className={`sale-level level-text-${sale.level.toLowerCase()}`}>{sale.level}</b><small>{sale.date}</small></span><span className="commission-cell"><b>{sale.amount}</b><small className={sale.status === "Pending" ? "pending-status" : "approved-status"}>{sale.status}</small></span></div>)}</div><button className="activity-link" onClick={() => setSection("Payouts")}>View all sales activity <ArrowRight size={14} /></button></div>
              <div className="next-step-panel"><div className="next-step-art"><div className="next-sun" /><span className="next-book">MFC<br /><i>My Family<br />Companion</i></span><span className="next-spark">✳</span></div><div className="next-step-content"><span className="panel-eyebrow">A GOOD NEXT STEP</span><h2>Help more families<br />find their guide.</h2><p>Explore your ready-to-share sales tools and product stories.</p><button onClick={() => setSection("Resources")}>Open promoter resources <ArrowRight size={14} /></button></div></div></section>

            <section className="promoter-callout"><span className="callout-icon"><Gift size={18} /></span><div><b>Know someone who'd make a great promoter?</b><p>Invite them to join the MFC Health Promoter community for a one-time ₦5,000 registration.</p></div><button onClick={copyReferral}>Share promoter invite <ArrowRight size={14} /></button><span className="callout-flower">✳</span></section>
            <footer className="affiliate-footer"><span>© 2026 My Family Companion</span><span><ShieldCheck size={13} /> Your promoter account is protected</span><button>Promoter terms & help</button></footer>
          </div>
        ) : section === "My network" ? <NetworkView /> : section === "Leaderboard" ? <LeaderboardView period={period} setPeriod={setPeriod} /> : section === "Resources" ? <ResourcesView /> : <PayoutsView />}
      </main>

      {checkoutOpen && <CheckoutModal price={checkoutPrice} done={orderDone} onClose={() => setCheckoutOpen(false)} onComplete={() => setOrderDone(true)} />}
      {promoterInfoOpen && <PromoterInfoModal onClose={() => setPromoterInfoOpen(false)} onContinue={() => { setPromoterInfoOpen(false); setSection("Overview"); }} />}
    </div>
  );
}

function Metric({ icon: Icon, label, value, change, positive = false }: { icon: typeof Wallet; label: string; value: string; change: string; positive?: boolean }) {
  return <article className="metric-card"><div className="metric-top"><span>{label}</span><i><Icon size={16} /></i></div><strong>{value}</strong><small className={positive ? "metric-positive" : ""}>{positive && <ArrowUpRight size={12} />}{change}</small></article>;
}

function LeaderboardRow({ rank, initials, name, sales, medal }: { rank: string; initials: string; name: string; sales: string; medal: string }) {
  return <div className={`leaderboard-row ${medal === "you" ? "your-rank" : ""}`}><span className={`rank-number ${medal}`}>{rank}</span><span className={`leader-avatar ${medal}`}>{initials}</span><b>{name}</b><small>{sales}</small></div>;
}

function BookStore({ onBuy, onPromote, referralPrice }: { onBuy: (price: number) => void; onPromote: () => void; referralPrice: boolean }) {
  const price = referralPrice ? 25000 : 30000;
  return <div className="store-content"><div className="store-breadcrumb">MFC <span>/</span> The book</div><section className="store-hero"><div className="store-copy"><span className="store-kicker"><span /> A PRACTICAL GUIDE FOR REAL FAMILY LIFE</span><h1>Knowledge for<br />the <em>whole journey.</em></h1><p>From choosing a partner with health in mind to caring for your baby and yourself after birth — find clear, relatable guidance for every chapter of family life.</p><div className={`store-price ${referralPrice ? "referral-price" : ""}`}>{referralPrice && <span className="promoter-price-label">PROMOTER LINK PRICE</span>}<strong>₦{price.toLocaleString("en-NG")}</strong>{referralPrice && <del>₦30,000</del>}<small>one-time purchase · digital edition</small></div><button className="store-buy-button" onClick={() => onBuy(price)}>Get the digital book <ArrowRight size={17} /></button><small className="store-delivery"><ShieldCheck size={14} /> Secure checkout · Delivered digitally</small></div><div className="book-scene"><div className="book-orbit orbit-a" /><div className="book-orbit orbit-b" /><div className="book-cover"><div className="cover-top">A FAMILY HEALTH GUIDE</div><div className="cover-leaves">❋</div><div className="cover-title">MY FAMILY<br /><b>COMPANION</b></div><div className="cover-bottom">DR. OVO</div></div><div className="book-shadow" /><div className="book-scene-note">A trusted voice through<br />every stage of family life</div></div></section>
    <section className="book-details"><div className="book-includes"><span className="panel-eyebrow">A BOOK TO KEEP CLOSE</span><h2>Understand more.<br />Feel more prepared.</h2><p>Story-led health information, explained in everyday language for families and the people who care for them.</p><div className="include-list"><span><Check size={15} /> 21 chapters across six life stages</span><span><Check size={15} /> Pregnancy, newborn and infant care</span><span><Check size={15} /> Postpartum wellbeing and family support</span><span><Check size={15} /> Digital access after purchase</span></div></div><div className="book-stages">{["Before marriage", "Pregnancy", "Birth to six weeks", "Baby & infant", "After delivery", "A word to your partner"].map((label, i) => <div key={label}><i>0{i + 1}</i><span>{label}</span><ArrowRight size={14} /></div>)}</div></section>
    <section className="store-affiliate-card"><span className="affiliate-gift"><Gift size={20} /></span><div><span className="panel-eyebrow">SHARE THE KNOWLEDGE</span><h3>Want to help more families find this book?</h3><p>Join the MFC Health Promoter Program. Get a unique referral link and earn commissions on qualifying sales.</p></div><button onClick={onPromote}>Explore the promoter program <ArrowRight size={15} /></button></section><footer className="store-footer">My Family Companion <span>·</span> A clearer start for every family</footer></div>;
}

function NetworkView() {
  return <div className="workspace-content"><div className="workspace-heading"><div><span className="panel-eyebrow">YOUR COMMUNITY</span><h1>My network</h1><p>See the community growing around the book and your referral link.</p></div><button className="outline-action"><UsersRound size={15} /> Invite a promoter</button></div><div className="network-summary"><div><span>COMMUNITY PROMOTERS</span><b>440</b><small>Across four referral levels</small></div><div className="network-chart"><span style={{height:"24%"}} /><span style={{height:"36%"}} /><span style={{height:"55%"}} /><span style={{height:"88%"}} /></div><div className="network-level-list">{levels.map((level) => <div key={level.level}><i className={`level-tag ${level.color}`}>{level.level}</i><span>{level.label}</span><b>{level.count}</b></div>)}</div></div><div className="network-table-panel"><div className="panel-heading"><div><span className="panel-eyebrow">PROMOTER DIRECTORY</span><h2>People in your network</h2></div><label className="network-search"><Search size={15} /><input placeholder="Search promoters" /></label></div><div className="network-table"><div><span>PROMOTER</span><span>LEVEL</span><span>BOOK SALES</span><span>JOINED</span></div>{[["JO","John O.","L1","14","Oct 02, 2026"],["AM","Ada M.","L1","9","Sep 28, 2026"],["BK","Bola K.","L2","5","Sep 19, 2026"],["TN","Tunde N.","L3","3","Sep 14, 2026"]].map((row) => <div className="network-person" key={row[1]}><span className="customer-cell"><i className="customer-avatar avatar-1">{row[0]}</i><b>{row[1]}</b></span><span><b className={`sale-level level-text-${row[2].toLowerCase()}`}>{row[2]}</b></span><span>{row[3]}</span><span>{row[4]}</span></div>)}</div></div><p className="network-note"><ShieldCheck size={15} /> Sponsor relationships are assigned when a promoter registers and cannot be changed by the promoter. Contact MFC support for an admin-approved correction.</p></div>;
}

function LeaderboardView({ period, setPeriod }: { period: string; setPeriod: (value: string) => void }) {
  const rows = leaderboardByPeriod[period as keyof typeof leaderboardByPeriod];
  return <div className="workspace-content"><div className="workspace-heading"><div><span className="panel-eyebrow">PROMOTER RECOGNITION</span><h1>Leaderboard</h1><p>See how promoters rank by qualifying book sales for the selected period.</p></div><label className="period-select"><CalendarDays size={15}/><select value={period} onChange={(event)=>setPeriod(event.target.value)} aria-label="Filter leaderboard period"><option>This month</option><option>Last month</option><option>All time</option></select><ChevronDown size={14}/></label></div><section className="leaderboard-full-panel"><div className="leaderboard-full-head"><span>RANK</span><span>PROMOTER</span><span>QUALIFYING BOOK SALES</span></div>{rows.map((row)=><div className={`leaderboard-full-row ${row.medal === "you" ? "your-rank" : ""}`} key={row.rank}><span className={`rank-number ${row.medal}`}>{row.rank}</span><span className="leaderboard-full-person"><i className={`leader-avatar ${row.medal}`}>{row.initials}</i><b>{row.name}</b>{row.medal === "you" && <small>YOUR POSITION</small>}</span><strong>{row.sales}</strong></div>)}<p className="leaderboard-note">Demo figures · source: GoAffPro · refreshed 9:41 AM. Rankings use eligible sales after refund and cancellation checks; production rules and privacy settings require MFC approval.</p></section></div>;
}

function ResourcesView() {
  return <div className="workspace-content"><div className="workspace-heading"><div><span className="panel-eyebrow">TOOLS FOR YOUR NEXT STEP</span><h1>Promoter resources</h1><p>Helpful, ready-to-share materials to help you talk about the book with confidence.</p></div><button className="outline-action"><Search size={15} /> Search resources</button></div><div className="resource-feature"><div className="resource-feature-art"><div className="resource-sun" /><span>SHARE<br />WITH<br /><b>CARE</b></span><i>✳</i></div><div><span className="panel-eyebrow">YOUR PROMOTER TOOLKIT</span><h2>Good conversations<br />start with good tools.</h2><p>Use these resources to explain what's inside MFC and help families decide if the book is right for them.</p><button className="share-button">Browse all resources <ArrowRight size={15} /></button></div></div><div className="resource-grid">{resources.map(({icon:Icon,category,title,detail,tint})=><article className="resource-card" key={title}><span className={`resource-icon ${tint}`}><Icon size={19}/></span><span className="panel-eyebrow">{category}</span><h3>{title}</h3><p>{detail}</p><button>Open resource <ArrowRight size={14}/></button></article>)}</div><section className="share-documents"><span className="panel-eyebrow">MFC PRODUCT DOCUMENTS</span><h2>Share the product plan</h2><p>Open the designed documents to review, print, or save as PDF for collaborators.</p><div><a href="/docs/mfc-frontend-prd.html">Open frontend PRD <ArrowRight size={14}/></a><a href="/docs/mfc-frontend-design-guide.html">Open design guide <ArrowRight size={14}/></a></div></section><div className="resource-tip"><Sparkles size={17}/><span><b>Keep it human.</b> Share your experience and accurate book details. Avoid making medical promises or income guarantees.</span></div></div>;
}

function PayoutsView() {
  return <div className="workspace-content"><div className="workspace-heading"><div><span className="panel-eyebrow">YOUR COMMISSION ACTIVITY</span><h1>Earnings & payouts</h1><p>Understand how book sales turn into commission and track approved payments.</p></div><button className="period-button"><CalendarDays size={15}/> This month <ChevronDown size={14}/></button></div><div className="payout-summary"><div><span>APPROVED COMMISSION</span><b>₦82,500</b><small>Ready for next payout cycle</small></div><div><span>PENDING COMMISSION</span><b>₦37,500</b><small>Being reviewed · Friday</small></div><div><span>TOTAL PAID</span><b>₦240,000</b><small>All time</small></div><div className="payout-action"><Wallet size={22}/><button>View payout settings <ArrowRight size={14}/></button></div></div><div className="commission-breakdown"><div className="panel-heading"><div><span className="panel-eyebrow">TRANSPARENT BY DESIGN</span><h2>What one book sale can generate</h2></div><span className="book-price-tag">₦25,000 DIGITAL BOOK</span></div><div className="commission-calculation">{levels.map((level,i)=><div key={level.level}><span className={`level-tag ${level.color}`}>{level.level}</span><span>{level.label}</span><b>{level.rate}</b><strong>{level.amount}</strong><small>{i===0?"Your direct sale":"When a sale happens in this level"}</small></div>)}</div><div className="commission-total"><span>Maximum commission distributed across four levels</span><b>₦10,000 <small>· MFC retains ₦15,000 before payment costs and operating expenses</small></b></div><p className="payout-disclaimer">Commissions shown are illustrative and subject to eligible sales, refunds, weekly review, and the approved MFC promoter terms. Leadership rewards are calculated separately.</p></div><div className="payout-footer-note"><ShieldCheck size={17}/><span><b>Weekly review, clear records.</b> Commission runs include level breakdowns, refunds/adjustments, and an admin approval checkpoint before payout.</span></div></div>;
}

function CheckoutModal({ price, done, onClose, onComplete }: { price: number; done: boolean; onClose: () => void; onComplete: () => void }) {
  const amount = `₦${price.toLocaleString("en-NG")}`;
  return <div className="checkout-overlay" role="presentation" onClick={onClose}><section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title" onClick={(event) => event.stopPropagation()}><button className="checkout-close" onClick={onClose} aria-label="Close checkout"><X size={18}/></button>{done ? <div className="checkout-success"><span><Check size={24}/></span><h2>You're one step closer.</h2><p>This demo stops before payment. In the live flow, secure checkout takes over and Selar delivers the digital book after payment.</p><button className="share-button" onClick={onClose}>Back to the book page <ArrowRight size={15}/></button></div> : <><span className="panel-eyebrow">SECURE DIGITAL CHECKOUT</span><h2 id="checkout-title">Get My Family Companion</h2><p className="checkout-description">A practical guide for every stage of family life.</p><div className="checkout-line"><div className="mini-book">MFC</div><span><b>My Family Companion</b><small>Digital edition · instant delivery</small></span><strong>{amount}</strong></div><div className="checkout-total"><span>Total</span><b>{amount}</b></div><button className="checkout-pay" onClick={onComplete}>Continue to secure payment <ArrowRight size={16}/></button><small className="checkout-note"><ShieldCheck size={13}/> Payment processed securely. Digital delivery by Selar.</small></>}</section></div>;
}

function PromoterInfoModal({ onClose, onContinue }: { onClose: () => void; onContinue: () => void }) {
  return <div className="checkout-overlay" role="presentation" onClick={onClose}><section className="checkout-modal promoter-info-modal" role="dialog" aria-modal="true" aria-labelledby="promoter-info-title" onClick={(event) => event.stopPropagation()}><button className="checkout-close" onClick={onClose} aria-label="Close program details"><X size={18}/></button><span className="panel-eyebrow">FAMILY HEALTH PROMOTER PROGRAM</span><h2 id="promoter-info-title">Share the book. Grow the reach.</h2><p className="checkout-description">A one-time ₦5,000 registration gives you access to the MFC promoter program. It does not include the book.</p><div className="promoter-benefits"><span><Check size={14}/> Official promoter status and unique ID</span><span><Check size={14}/> Personal referral link and sales dashboard</span><span><Check size={14}/> Training, scripts, posters and videos</span><span><Check size={14}/> Four-level commission reporting</span></div><div className="program-rate-row">{levels.map((level)=><div key={level.level}><b>{level.level} · {level.rate}</b><span>{level.amount}</span></div>)}</div><p className="program-disclosure">Commission examples are based on an eligible ₦25,000 promoter-referral book sale. Earnings are not guaranteed.</p><button className="checkout-pay" onClick={onContinue}>Preview promoter dashboard <ArrowRight size={16}/></button><small className="checkout-note"><ShieldCheck size={13}/> Book: ₦30,000 normally or ₦25,000 through a promoter link.</small></section></div>;
}
