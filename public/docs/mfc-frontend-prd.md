# MFC Book Sales & Affiliate Frontend PRD

**Status:** Frontend product requirements  
**Version:** 2.2
**Scope:** Customer book sales and Family Health Promoter registration/workspace

## 1. Summary

Build an MFC-branded book sales and promoter experience with a **₦30,000 standard digital book price**, a **₦25,000 promoter-referral price**, and a separate **₦5,000 one-time promoter program fee**. Preserve referral attribution through purchase and give promoters analytics, rank/leaderboard, network counts by level, sales totals, commission records, resources, and payouts.

MFC owns the customer-facing website and content. Affiliate operations can be powered by GoAffPro or another confirmed system, and digital-book delivery can be handled by Selar or another confirmed fulfillment provider. The customer should experience one coherent MFC brand while the frontend keeps payment/fulfillment and promoter attribution responsibilities separated behind the scenes.

## 2. Source product model

The linked MFC Affiliate Program conversation describes the following target model:

- A standard customer buys the MFC digital book on the MFC website for **₦30,000**. A customer arriving through a promoter link sees the **₦25,000 promoter price**. The MFC Vision presentation says “30,000 when we sell / 25,000 when you sell”; the linked affiliate conversation uses ₦25,000 as the qualifying promoter sale amount for commission examples. Payment is processed and the digital book is delivered by the chosen fulfillment service (the conversation names Selar). The fulfillment service does not need promoter-tree knowledge.
- A person who wants to promote the book registers separately as a Family Health Promoter for **₦5,000**. This fee buys promoter program access/status, not the book.
- Registration creates official promoter status, a unique promoter ID, personal referral link, dashboard, training, sales scripts/WhatsApp messages, posters/videos, and product FAQs.
- A qualifying ₦25,000 book sale uses a four-level unilevel commission structure: L1 direct 20% = ₦5,000; L2 10% = ₦2,500; L3 5% = ₦1,250; L4 5% = ₦1,250. Maximum distributed commission is ₦10,000 per sale; MFC retains ₦15,000 before fees and operating expenses.
- Sponsor attribution is set when a promoter registers. Promoters cannot select or change their sponsor; corrections require an administrator-approved process.
- Commission calculation is weekly and includes an MFC administrative review/approval step before payout. Refunds/adjustments and net payable amount must be accounted for.
- GoAffPro is an affiliate-operations provider, not the entire MFC website. The architecture in the conversation separates MFC customer-facing sales, promoter registration/referral/network operations, payment processing, and digital fulfillment.
- The user's handwritten product note requests a promoter dashboard with analytics, rank, platform-sourced figures, total sales, network counts by levels, and month filtering. It also reiterates the separate normal book purchase and affiliate registration paths.

## 3. Goals

1. Help a customer understand the book, price, digital format, and delivery before purchasing.
2. Keep customer purchase separate from promoter enrollment.
3. Explain the ₦5,000 promoter fee, program benefits, referral attribution, and commission structure before registration.
4. Let an active promoter copy/share a unique referral link and understand sales/commission status.
5. Provide clear, trustworthy views of four-level network relationships, weekly commission statements, adjustments, and payout history.
6. Establish an MFC-branded frontend that can integrate with payment, digital fulfillment, and affiliate systems.

## 4. Non-goals

- Building a payment processor, eBook delivery platform, or affiliate engine in the frontend.
- Calculating or approving authoritative commissions client-side.
- Promising income, sales, team growth, leadership rewards, health outcomes, or payout timing beyond approved program rules.
- Mixing promoter earnings into customer health education or requiring promoter enrollment to buy the book.
- Enabling promoters to edit sponsor attribution or network placement themselves.

## 5. Users

### Book customer

Wants to know whether the book is useful for their family situation, what the digital book contains, the exact price, and how they will receive it.

### Prospective promoter

Wants to understand the program fee, included tools, referral mechanics, and commissions before joining.

### Active promoter

Wants a unique promoter ID/link, current sales and commission status, network visibility, payout records, and ready-to-use materials.

### MFC administrator

Needs to review promoter registration/attribution exceptions, reconcile eligible sales, inspect commission runs and adjustments, approve weekly runs, and resolve payout/account issues.

## 6. Information architecture

### Public MFC surface

- MFC mission/story landing page
- Book storefront
- Book details / chapters / FAQs
- Checkout handoff and order confirmation
- Health Promoter program explainer
- Promoter registration and sign-in

### Promoter workspace

- Overview
- My referral link / promoter ID
- Sales activity
- My network (L1–L4)
- Earnings and payout statements
- Promoter resources and training
- Profile, payout settings, help, and terms

### Admin surface (separately permissioned)

- Promoter search and status
- Sponsor-attribution corrections with audit trail
- Weekly commission run preview and approval
- Exceptions/refunds/duplicates/fraud flags
- Payout export/status and reporting

## 7. Core user journeys

### A. Buy the digital book

1. Visitor lands on the MFC book page and sees the value, audience, chapter scope, digital format, and ₦30,000 standard price.
   - If a valid promoter referral is present, show the ₦25,000 referral price and retain the referral identifier through checkout.
2. Visitor chooses “Get the digital book”.
3. Checkout shows the book, quantity/format, exact total, payment terms, and secure payment handoff.
4. On confirmed payment, the customer receives a clear success state and digital delivery instruction/link from the fulfillment service.
5. If payment is pending, cancelled, or failed, the page explains the state and offers a safe retry/support route.
6. Promoter referral attribution is recorded when present, without interrupting the customer checkout flow.

### B. Join the promoter program

1. Visitor opens the Health Promoter explainer and sees that ₦5,000 is for program access/status and does not include the book.
2. Visitor reviews benefits, four commission levels, eligibility/terms, and payout cadence.
3. Visitor follows a promoter invitation or enters a sponsor/referral code/link.
4. Registration creates a promoter ID and locks sponsor attribution; if the sponsor cannot be resolved, the interface clearly explains the next step rather than guessing.
5. After successful payment/activation, the member sees their promoter link, account setup, and starter resources.

### C. Share and track book sales

1. Promoter copies a unique referral URL or promoter code from Overview.
2. Customer follows referral URL to the MFC book page and completes checkout.
3. Sale is matched to referral attribution by the backend/affiliate platform and fulfillment/payment confirmation.
4. Promoter sees the sale in activity as pending until eligibility checks and weekly review are complete.
5. The approved commission statement shows level, rate, gross commission, adjustments, and net payable amount.

### D. Review weekly commission and payout

1. Promoter chooses a commission period and sees each qualifying sale and level breakdown.
2. Statement distinguishes pending, approved, adjusted, and paid amounts.
3. Admin reviews the weekly run, sees flags/adjustments/refunds, and explicitly approves before payout.
4. Promoter sees approval and payout progress, with clear support route for a discrepancy.

### E. Compact public landing and checkout

1. `/landing` tells the MFC purpose in a short editorial story, presents the book and advocate offers with their prices near the top, and links each action to its own checkout selection.
2. `/checkout?product=book` presents the ₦30,000 book order; `/checkout?product=promoter` presents the separate ₦5,000 advocate registration. Each form collects only information needed to complete that order or registration.
3. The MFC server initializes the Paystack transaction with a server-controlled amount and sends the browser to Paystack's authorization URL. The Paystack secret key is never exposed to the browser.
4. Paystack returns the customer to a pending state. MFC verifies transaction status, amount, currency, reference, and product server-side before submitting the idempotent book order or activating advocate registration.
5. If payment initialization or fulfillment is not configured, checkout fails closed with a clear support message. A payment return alone is never treated as a successful order.

## 8. Functional requirements

### P0: Customer storefront and promoter entry

| ID | Requirement | Acceptance criteria |
| --- | --- | --- |
| S-01 | Book information page | Shows book purpose, audience, digital format, scope/chapters, FAQs, ₦30,000 standard price, and primary purchase action. |
| S-02 | Customer checkout handoff | Shows correct MFC digital book and total; hands off to selected payment service; prevents duplicate submission and provides pending/cancelled/failed/success states. |
| S-03 | Digital delivery confirmation | After confirmed payment, explains where/how customer gets the digital book; provides support for missing delivery. |
| S-04 | Promoter program explainer | Clearly separates ₦5,000 program registration from both book prices and states what the registration fee provides. |
| S-05 | Commission explanation | Shows four-level rates and one-sale Naira examples: 20%/₦5,000, 10%/₦2,500, 5%/₦1,250, 5%/₦1,250 on a ₦25,000 qualifying sale; explains totals are conditional on eligible sales and program terms. |
| S-06 | Referral-aware storefront | Valid referral visits show the ₦25,000 promoter price instead of the ₦30,000 standard price. Referral ID/link is preserved and passed to attribution/payment integration without exposing sensitive data or interrupting checkout. |
| S-07 | Mission landing page | `/landing` introduces MFC's family-health mission, founder story, life-stage coverage, book, and roadmap. It uses only approved claims, separates vision goals from measured results, and offers clear book and promoter paths. |
| S-08 | Short landing page | Keeps the public story focused on the purpose, Dr. OVO's attributed origin story, six life stages, and the two priced actions without repeating sections or calls to action. |
| S-09 | Promoter checkout | Collects registration details and an optional referral/sponsor code; shows ₦5,000 as separate from the book; activates the advocate only after verified payment and successful MFC registration. |

### P0: Promoter portal

| ID | Requirement | Acceptance criteria |
| --- | --- | --- |
| P-01 | Promoter activation | Displays official promoter status, unique ID, sponsor attribution, and personal referral URL after confirmed registration. |
| P-02 | Promoter overview | Separately displays personal book sales, total platform sales where permitted, unique promoters in network, pending/approved commission, total paid, promoter level, leaderboard rank, data source/last sync, and period. Each metric has a clear definition. |
| P-03 | Referral link | Promoter can copy/select link, receives copy confirmation, and can preview the customer book page. |
| P-04 | Sales activity | Each sale shows date, product, attribution level, gross commission, and pending/approved/adjusted/paid status. |
| P-05 | Four-level network | Shows promoters by L1–L4 and sponsor relationships according to permitted data; no promoter-side sponsor editing. |
| P-06 | Earnings statement | Shows weekly period, line items per level, adjustments/refunds, net payable, and approval/payment status. Data comes from backend/affiliate system. |
| P-07 | Promoter resources | Offers training, product FAQs, sales scripts/WhatsApp messages, posters, and promotional videos; only approved MFC materials are labeled share-ready. |
| P-08 | Empty/loading/error states | Sales, network, payout, and resource areas each have designed loading, empty, retry, and unavailable states. |
| P-09 | Dashboard analytics | Shows personal qualifying book sales, platform-wide book sales, promoter counts by L1–L4, current rank, and a top-promoter leaderboard with ranking metric and selected period. Values come from the affiliate platform/commission source and are labeled with last-sync time. |
| P-10 | Period filtering | Promoter can filter period-sensitive overview metrics, sales activity, network analytics, and leaderboard by this month, last month, and all time. Cumulative network size is labeled as a current snapshot and does not change with the activity filter. |
| P-11 | Platform-sourced figures | Dashboard identifies the affiliate platform as the source of affiliate sales, rank, and network data and displays when that data was last refreshed. |

### P0: MFC admin controls

| ID | Requirement | Acceptance criteria |
| --- | --- | --- |
| A-01 | Weekly commission run review | Admin can inspect run totals, level breakdowns, refunds/adjustments, flags, and net payable before explicit approval. |
| A-02 | Sponsor correction process | Sponsor changes require an authorized admin action, reason, and audit record; promoters cannot self-serve a change. |
| A-03 | Exceptions | Admin can inspect duplicate transactions, refunds, unusual attribution, and payout failures. |
| A-04 | Role separation | Customer, promoter, and admin routes/data are permissioned; promoter UI never exposes admin approval actions. |

### P1: Follow-on

- Share assets via WhatsApp/social share sheets where supported, with copy-link fallback.
- Downloadable commission statements and payout history.
- Search/filter sales and network by period/status/level.
- Promoter onboarding checklist and completion indicators.
- Top-promoter leaderboard for a selected period with eligibility, tie-break, privacy/display-name, and anti-gaming rules.
- Additional dashboard breakdowns (e.g. daily/weekly sales graph and conversion by referral link) after affiliate-platform data availability is confirmed.
- Localized currency/time/date presentation for approved markets while retaining the NGN launch model.

## 9. Commission and attribution rules for UI

For one eligible **₦25,000 promoter-referral** MFC digital book sale:

| Level | Relationship | Rate | Illustrative commission |
| --- | --- | ---: | ---: |
| L1 | Direct referral | 20% | ₦5,000 |
| L2 | One level below | 10% | ₦2,500 |
| L3 | Two levels below | 5% | ₦1,250 |
| L4 | Three levels below | 5% | ₦1,250 |

The source plan states a maximum of ₦10,000 distributed across the four levels and ₦15,000 retained from the ₦25,000 promoter-referral sale before payment costs/operating expenses. The ₦30,000 standard book price is a separate customer price and must not be used as the affiliate commission basis unless MFC changes the approved rules. Actual earnings vary with qualifying sale attribution, eligibility, refunds, adjustments, and approved program rules. Leadership bonuses are separate and require their own finalized criteria and calculation display.

The frontend displays authoritative commission records from the affiliate/commission system. It must not infer genealogy or payout eligibility from client-side URL parameters alone.

## 10. Integration boundaries

- **MFC frontend:** branded storefront, program explanation, customer/promoter navigation, checkout handoff, promoter portal presentation.
- **Payment service:** authoritative payment status for book orders and registration fees.
- **Digital fulfillment provider (Selar named in shared plan):** digital book delivery after confirmed purchase.
- **Affiliate system (GoAffPro named in shared plan):** unique promoter links/IDs, sponsor relationships, referral attribution, level reporting, and affiliate data.
- **Affiliate analytics:** network counts, qualifying sales, promoter rank/leaderboard inputs, commission status, and timestamps for the last successful sync. Confirm whether GoAffPro exposes every required metric or whether MFC must aggregate approved records.
- **MFC commission/admin workflow:** weekly review, adjustments, approval, payout export/status, and audited correction process as supported by selected integrations.

Confirm exact service capabilities, webhooks, fee/payout mechanics, and source-of-truth boundaries before implementation. The storefront should not expose internal provider redirects as the primary brand experience where an API/embedded or well-branded handoff is available.

For the new Paystack handoff, configure `PAYSTACK_SECRET_KEY`, `APP_BASE_URL`, `MFC_API_BASE_URL` for book order creation, `MFC_PROMOTER_REGISTRATION_URL` for advocate activation, and `MFC_FULFILLMENT_TOKEN` for server-to-server requests in the serverless host. Never use a `VITE_` prefix for a secret. Fulfillment endpoints must accept the Paystack reference as an idempotency key so a verification retry cannot create duplicate orders or advocate registrations. Confirm the advocate endpoint and activation contract before enabling the ₦5,000 payment path.

- Confirm how long promoter referral attribution is retained, what happens when a referral is invalid/expired, and which provider validates the referrer before applying the ₦25,000 price.
- Define leaderboard qualification, period boundaries, ties, eligibility, privacy/display names, and treatment of refunds/cancelled sales before publishing rankings.
- Confirm whether network count means unique active promoters, all registered promoters, or another platform-defined measure; label the chosen metric precisely.

## 11. UX, visual, and content requirements

- Follow [MFC Book Sales & Promoter Hub Design Guide](mfc-frontend-design-guide.md).
- Preserve the existing MFC navy/green/orange identity and editorial storytelling while making the promoter workspace scannable and financially transparent.
- The MFC landing page uses a clinician-led editorial narrative: why the work exists, the family health journey, the book as a practical resource, and the broader MFC vision. Health claims require approved sources; vision targets are labeled as aspirations.
- Use separate public customer and signed-in promoter experiences; clearly label the transition to the Promoter Hub.
- Show Naira values with commission percentages and statuses in text, not color alone.
- No health promises, income guarantees, deceptive urgency, or misleading “earnings” screenshots.
- Label prototype/demo records clearly; never display mock numbers as real promoter earnings.
- Target WCAG 2.2 AA, responsive mobile use, keyboard access, screen reader labels, visible focus, reduced motion, and zoom/reflow.

## 12. Success measures

Set baselines and targets with the MFC team after launch. Track privacy-conscious aggregate events:

- Book detail to checkout-start rate; payment completion and payment failure/cancellation rates.
- Successful digital delivery and support requests for missing delivery.
- Promoter explainer to registration-start and confirmed-activation rate.
- Referral-link copy/share use and attributed eligible book-sale conversion.
- Promoter return usage: overview, resource opens, sales activity, commission statement visits.
- Commission discrepancy/support rate and payout exception resolution time.
- Usability task completion on mobile for buying the book, joining as promoter, copying a referral link, and understanding a weekly statement.

Do not treat headline promoter earnings or health outcomes as frontend conversion KPIs.

## 13. Open decisions and dependencies

- Confirm book cover, final product copy, exact digital format, and digital delivery SLA.
- Confirm payment and fulfillment providers, integration method, and post-payment identity/delivery flow.
- Confirm affiliate platform plan/tier and support for four-level genealogy, sponsor locking, commission playground/simulation, weekly reporting, API/webhooks, and payout export.
- Confirm exact registration flow and whether promoter fee is refundable, tax inclusive, or provides any other benefits.
- Finalize qualifying-sale, refund, chargeback, cancellation, and commission reversal rules.
- Define exact weekly cutoff, review/approval roles, payout schedule, payout method, minimum threshold, and exception handling.
- Finalize leadership bonus levels and cumulative qualification rules separately from the four-level commission schedule.
- Confirm visibility/permissions for downline promoter names, sales, and performance data.
- Provide approved affiliate disclosure, terms, privacy notices, customer support, and complaint route.

## 14. Release readiness

- Public buyer can distinguish ₦30,000 standard book price, ₦25,000 promoter-referral book price, and ₦5,000 promoter registration.
- Purchase success is tied to confirmed payment and clear digital fulfillment instructions.
- Referral tracking works across the supported MFC/checkout/fulfillment path and is tested for direct and four-level examples.
- Sponsor attribution is fixed on successful registration and admin corrections are auditable.
- Commission UI reconciles with approved backend/affiliate records, including pending, refund, adjustment, approved, and paid states.
- Dashboard figures, per-level network analytics, ranks, leaderboard, and month filters reconcile with the chosen affiliate-platform source and clearly show the selected reporting period and last sync.
- Weekly run cannot be represented as paid before the required admin approval/payout confirmation.
- Customer, promoter, and admin roles have separate permissions and navigation.
- Mobile, keyboard, screen-reader, contrast, errors, empty states, and payment handoff are reviewed.
