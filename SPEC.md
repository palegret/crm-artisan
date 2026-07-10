# CRM for Independent Artisans — MVP Spec

## User Profile
Single-user account: an independent artisan (plumber, electrician, carpenter) who works solo or with a small crew. Not tech-savvy by default — needs a simple, fast tool usable between jobs, often on mobile. No multi-tenant/team features needed for MVP.

## Main Features

| # | Feature | Purpose |
|---|---|---|
| 1 | **Client management** | Store contact info for people/businesses the artisan works for |
| 2 | **Job site management** | Track physical locations where work happens (a client may have multiple sites) |
| 3 | **Quotes** | Create, send, and track price estimates for work at a site |
| 4 | **Dashboard/list views** | See all clients, sites, and quotes at a glance, with quote status |

## Data per Feature

**Client**
- Name (person or company)
- Phone, email
- Notes (free text)
- Linked job sites (1-to-many)

**Job Site**
- Address
- Linked client
- Access notes (e.g. gate code, parking)
- Site-specific notes

**Quote**
- Linked client + job site
- Line items (description, quantity, unit price)
- Total (auto-calculated)
- Status: Draft → Sent → Accepted / Rejected
- Date created, date sent
- Optional expiry date

## User Flow

1. **Add a client** → enter name/contact info
2. **Add a job site** under that client → enter address/access notes
3. **Create a quote** for that client + site → add line items → total auto-calculates
4. **Review draft** → mark as **Sent**
5. Later, update status to **Accepted** or **Rejected** based on client response
6. From the dashboard, artisan can see: recent clients, all job sites, and all quotes filtered by status (e.g. "pending" quotes needing follow-up)

## Explicitly Out of Scope for MVP
Invoicing/payments, scheduling/calendar, multi-user teams, PDF export/email sending, photo attachments — these are natural v2 candidates but add complexity not needed to validate the core workflow.
