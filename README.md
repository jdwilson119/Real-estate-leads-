# Harbor Leasing Dashboard

A leasing dashboard for a real estate agent managing a rental portfolio: property status, a lead pipeline, and scheduled showings.

## Features

- **Overview** — occupancy rate, vacant units, active leads, rent roll, upcoming lease expirations, a lead funnel chart, and a "needs attention" list (long-vacant units, expiring leases).
- **Properties** — filterable/searchable table of units with rent, status, availability, and days on market. Status is editable inline.
- **Leads** — pipeline table (new → contacted → touring → application → approved → leased/lost) with budget, move-in date, and source. Stage is editable inline.
- **Showings** — scheduled/completed/cancelled/no-show tour log.
- Light/dark theme toggle.

Data is seeded with realistic mock properties, leads, and showings, and edits persist to `localStorage` — no backend required.

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # typecheck + production build
npm run lint     # oxlint
```
