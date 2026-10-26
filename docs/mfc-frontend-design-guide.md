# MFC Book Sales & Promoter Hub: Frontend Design Guide

**Purpose:** Design direction for the customer book storefront and Family Health Promoter experience.  
**Product identity:** My Family Companion (MFC)  
**Audience:** Families buying the book, prospective promoters, active promoters, and MFC administrators.

## Product character

The MFC site remains the branded, customer-facing home for the book and promoter program. It should make the value of the book easy to understand, make purchase and promoter registration distinct, and give active promoters a practical workspace for sharing the book and following sales. The product should feel like MFC's warm, credible health-education brand, not a generic affiliate SaaS dashboard.

Use the MFC story-led voice and visual identity while making money and referral mechanics unusually clear. Do not promise health outcomes or promoter income. Keep the customer purchase journey and promoter workspace visibly separate.

## Existing MFC identity

The current MFC dashboard establishes a soft green canvas, forest-green surfaces, green actions, and restrained warm accents. Carry those recognizable choices into the customer experience, with founder-led storytelling and compact, purposeful layouts.

### Color tokens

| Token | Value | Use |
| --- | --- | --- |
| `mfc-ink` | `#1F2D3D` | Brand, headings, navigation |
| `mfc-forest` | `#193B32` | Editorial hero panels, book imagery, premium surface |
| `mfc-green` | `#059669` | Main action, active state, positive indicators |
| `mfc-green-deep` | `#047857` | Pressed action and emphasized green text |
| `mfc-green-pale` | `#F0FFF4` | Success and subtle supporting backgrounds |
| `mfc-orange` | `#ED8936` | Warm detail, highlights, small status cues |
| `canvas` | `#F8FAF8` | App workspace background |
| `surface` | `#FFFFFF` | Cards, forms, tables |
| `text` | `#1A202C` | Body copy |
| `muted` | `#718078` | Metadata and secondary information |
| `line` | `#E2E8F0` | Dividers, outlines, table rules |
| `error` | `#B91C1C` | Payment, validation, or account errors |

Green identifies MFC actions and verified positive states. Orange is a restrained accent. Do not use green to imply that earnings are guaranteed. Show commission rates and amounts in plain text, independent of color. Keep the storefront book photography/illustration warm and editorial; keep the promoter workspace light, structured, and data-readable.

### Type and layout

- Use **Bricolage Grotesque** for headings and display text. Use **Poppins** for body copy, labels, navigation, and forms. Keep body copy comfortable to read and avoid reducing paragraph text to dashboard-sized metadata.
- Body text: 14–16px on desktop and at least 14px on mobile; metadata should remain readable at 12px or larger for key financial details.
- Use a 4px spacing base, with 8/12/16/24/32px as the main rhythm. Cards use 10–14px corner radii and subtle borders before shadows.
- Keep promoter dashboard content within a 1160px maximum width. Use a persistent sidebar on desktop and a slide-in navigation on mobile.
- Use responsive tables with horizontal overflow only for secondary data; collapse sales records into compact rows/cards on narrow screens.
- All monetary values use NGN/Naira and consistent thousands separators. Distinguish ₦30,000 standard book price, ₦25,000 promoter-referral book price, and ₦5,000 promoter enrollment fee.

## Information architecture

### Customer-facing MFC website

- Mission landing page introducing the story, family-health journey, book, current community work, and long-term vision
- Book landing page / product information
- Book purchase and secure payment handoff
- Confirmation and digital-delivery guidance
- Promoter program explainer and registration entry point
- Sign-in / account access

### Active promoter workspace

- Overview: sales, community/network, pending/approved commission, current level, and next step
- My referral link and promoter ID
- Sales activity with status and attributable level
- Network / downline by four levels
- Earnings and payout history
- Promoter training, product information, scripts, posters, and promotional videos
- Profile, payout settings, support, and program terms

Keep the promoter portal under MFC branding. GoAffPro may power affiliate operations, but should not become the whole MFC website or replace the branded customer storefront.

## Core screen guidance

### MFC mission landing page

- Keep the public `/landing` page concise: one editorial hero, two clear offer choices, one founder story, a compact six-stage book journey, and a final action. Avoid stacking generic feature cards or repeating the same CTA after every section.
- Open with a clear family-health purpose and show both next steps near the top: buy the book for **₦30,000**, or register as an MFC Health Advocate for **₦5,000**. Keep the prices and separate purchases explicit.
- Tell Dr. OVO's story with care and attribution. Use “I survived. My sister didn’t.” as a brief, attributed quote, then connect the story to making useful health knowledge easier for families to reach.
- Use the six-stage book outline—before pregnancy, pregnancy, birth and early weeks, baby and child, postpartum, and partner support—as a compact progression. Do not claim it replaces clinical care.
- Present current offerings and future roadmap items with distinct availability labels. Mark the one-million-families-per-year figure as an MFC vision target, not a measured outcome.
- Keep the established MFC dashboard canvas (`#F8FAF8`), forest-green editorial surfaces (`#193B32`), green actions, and restrained warm accent. Use supplied author/book imagery and asymmetrical editorial composition rather than repeating generic service cards.
- Give direct paths to explore the book and promoter program, and include a clear educational-information disclaimer near relevant health content.

### Checkout and payment return

- Use one short MFC-branded checkout at `/checkout?product=book` or `/checkout?product=promoter`; each path has a clear title, exact total, short form, and separate purchase explanation.
- Book checkout collects name, email, phone, and delivery city. Advocate checkout collects name, email, phone, and an optional referral/sponsor code. Keep registration distinct from book purchase.
- Send the customer to Paystack's hosted authorization URL after the MFC server initializes the transaction. The browser must never contain the Paystack secret key or set a payment amount.
- On return, show a pending verification state. Only show success after the server verifies the transaction amount, currency, status, and product with Paystack and the MFC order/registration service confirms fulfillment.
- If payment infrastructure or fulfillment is not configured, explain the issue and do not charge. Show recoverable errors and preserve the entered form values.

### Book storefront

- Explain the book's audience and scope: 21 chapters across the family journey, from pre-conception through pregnancy, birth, infant care, postpartum recovery, and partner support.
- Show the standard digital edition price clearly: **₦30,000**. When a customer follows a promoter referral, show the **₦25,000 promoter price** and preserve that attribution through checkout.
- State what is included and how digital delivery works before checkout.
- Show whether the displayed amount is the standard price or promoter-link price; never hide a discount or change the price unexpectedly at checkout.
- Offer a secondary, separate path for visitors interested in becoming a Family Health Promoter.
- Checkout should show order summary, total, payment handoff, and clear completion/error states. Avoid asking for promoter signup during ordinary book checkout.

### Promoter registration

- Show the one-time **₦5,000** fee as promoter-program registration. State clearly that it is for program access/status and does not purchase the book.
- Explain the promoter receives official status, a unique promoter ID, a personal referral link, promoter training, sales/commission dashboard, product FAQs, and approved marketing materials.
- Explain the commission model and attribution in a short, expandable breakdown before registration/payment.
- Confirm registration, account activation, and the next setup action. Sponsor attribution is assigned at registration; promoter cannot self-select or edit sponsor afterward. An admin-approved correction path is the only exception.

### Promoter overview

- Lead with real performance and an actionable link: referral URL and copy action.
- Separate personal book sales, total platform sales where permitted, promoters in network, pending commission, approved commission, paid total, promoter level, and leaderboard rank. Each metric has a definition, period, and source.
- Add analytics for promoter counts across L1–L4, monthly book-sales performance, and a transparent leaderboard with its qualifying metric and reporting period.
- Provide period filters such as this month, last month, and all time; apply them consistently to period-sensitive metrics, sales activity, and leaderboard data. Label cumulative network size as a current snapshot.
- Show current month's context and change from the previous period only where the backend provides reliable data.
- Commission-by-level module must show level, percent, and NGN amount for one qualifying ₦25,000 promoter-referral book sale.
- Recent sales must distinguish pending vs approved and show the referral level and event date.
- Do not display fabricated sample data as real. Prototype/demo data must be labeled clearly.

### Network, earnings, and resources

- Network view shows each promoter's level, sponsor relationship, joined date, and attributable sales, subject to privacy policy and role permissions.
- Earnings show a line-by-line calculation, adjustments/refunds, net amount, weekly period, and review status.
- A weekly commission run has an administrative review/approval checkpoint before payment. Promoter-facing status should say what happens next and when a decision is expected.
- Resources are organized by use: start here, product education, referral sharing, approved promotional assets, scripts, training, and FAQs.
- Sales tools should encourage accurate, respectful explanations of the book; prohibit medical promises and income guarantees in approved copy.

## Interaction, states, and accessibility

- Copy-link action gives immediate confirmation and keeps the full link selectable.
- Payment flows clearly distinguish loading, successful handoff, cancelled, failed, and pending verification states.
- Preserve entered form data after recoverable errors. Explain validation beside the field.
- Commission rows use both labels and status text; never rely on color alone.
- Design empty states for no sales, no promoters, and no payouts yet, with a useful next action.
- Use keyboard-accessible navigation, visible focus, semantic table headers, screen-reader announcements for copied/payment/status events, and at least 44px touch targets.
- Respect reduced motion, support text zoom/reflow, and target WCAG 2.2 AA.

## Content and financial integrity

- Never phrase commissions, team growth, or leadership rewards as guaranteed income.
- Display the two book prices distinctly: **₦30,000 standard** and **₦25,000 through a promoter referral**, as shown in the MFC Vision presentation. The shared affiliate plan uses a ₦25,000 qualifying referral sale for commission examples. At that sale price, the four levels are **20%, 10%, 5%, 5%**, corresponding to **₦5,000, ₦2,500, ₦1,250, and ₦1,250**. Maximum commission distributed across those levels is ₦10,000; MFC retains ₦15,000 before payment costs/operating expenses.
- Commission eligibility, refunds, adjustments, weekly calculation, leadership rewards, and payout terms must come from approved program rules and backend records.
- The ₦5,000 promoter registration is separate from the book purchase. Never present it as the book price or as a purchase required for a customer.
- Clearly identify illustrative examples, pending amounts, approved amounts, and amounts already paid.

## Frontend implementation notes

- Keep product storefront, promoter registration, and signed-in promoter workspace as distinct routes and user states.
- Keep MFC-branded storefront and checkout UI in MFC's frontend. Integrate payment and digital delivery through their approved service; integrate promoter IDs, referral attribution, sponsor genealogy, commission records, and payout status through the chosen affiliate platform/API.
- Do not calculate authoritative commissions in client code. Frontend displays approved backend-calculated values and makes breakdowns understandable.
- Use shared tokens and primitives for buttons, fields, status badges, tables, cards, dialogs, price/commission summaries, and empty/error states.
- Mock data in the prototype is for layout demonstration only; live integration must label and source real records from the systems of record.
- Dashboard sales, network analytics, rankings, and commission amounts must be sourced from the affiliate platform/approved commission records; show last-sync time and apply month filters to the selected figures.
