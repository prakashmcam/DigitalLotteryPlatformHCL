# Project Plan

**Status**: Completed (mock-only)
**Created**: 2026-11-09
**Mode**: NEW

---

## 1. Project Overview

**Goal**: Build a polished, frontend-only React digital lottery experience with discoverable draws, draw details and number selection, published results, and a sample ticket wallet. Organize it using Clean Architecture boundaries so domain rules, application use cases, infrastructure adapters, and React presentation are independently testable. This is a local web app only: no backend, sign-in, persistence, Azure services, or deployment are in scope. The requested architecture reference is [react-clean-architecture-template architecture guide](https://github.com/NastMz/react-clean-architecture-template/blob/main/packages/template/docs/architecture.md).

**App Type**: SPA only (frontend-only)

**API Login**: No

**Mode**: NEW

**Deployment Plan**: No deployment plan found; Azure hosting and deployment are explicitly out of scope

---

## 2. Frontend — Web App

| Component | Technology |
|-----------|-----------|
| **Language** | TypeScript |
| **Framework** | React + Vite |
| **Package Manager** | npm |
| **Test Runner** | vitest |
| **Mocking Library** | vi.mock |
| **Test Command** | npm test |

The UI calls application use cases rather than repositories directly. Domain entities and rules stay framework-independent; application use cases depend on repository ports; infrastructure provides deterministic in-memory demo adapters; presentation contains React routes, components, and view models. Dependencies point inward, with interface adapters at the boundaries. Demo selections may live in in-memory application state and reset on reload; there are no purchase transactions or durable records.

---

## 3. Services Required

| Azure Service | Role in App | Environment Variable | Default Value (Local) | Classification |
|---------------|------------|---------------------|----------------------|----------------|
| — | No Azure services requested; run the React app locally with Vite | — | `npm run dev` | Not applicable |

No datastore is required. Lottery data and example tickets are provided by in-memory mock adapters for the frontend demonstration only.

---

## 4. Prerequisites

### Run

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Node.js | frontend | ✅ | v22.19.0 |
| npm | frontend | ✅ | 10.9.3 |

### Debug

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| VS Code JavaScript Debugger (built-in) | frontend | ❓ | Not confirmed; VS Code CLI unavailable during scan |

Double-check that any tool marked ❓ is available before proceeding. No container runtime or Azure tooling is required for this frontend-only local project.

---

## 5. Design System & UI

**Component Library**: Fluent UI v9
**Style Direction**: A confident, premium lottery dashboard with midnight-blue navigation, warm gold draw highlights, generous whitespace, and clear action hierarchy. Use restrained shadows, accessible contrast, and calm status colors so draw amounts and deadlines are easy to scan without a casino-like visual overload.
**Typography**: Inter, system-ui, Segoe UI Variable

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#17365D` | Lottery brand navigation, primary buttons, and selected draw controls |
| `accent` | `#D6A63A` | Jackpot amounts, highlighted draw deadlines, and selected-number emphasis |
| `surface` | `#F5F7FA` | Main app canvas behind draw and ticket panels |
| `text` | `#17243A` | Draw names, ticket details, and primary reading content |
| `muted` | `#617087` | Draw schedules, captions, and secondary ticket metadata |
| `border` | `#DCE3EC` | Draw cards, number-picker boundaries, and table dividers |

### Pages

| Page | Route | Purpose | Layout |
|------|-------|---------|--------|
| Draws | `/` | Discover active draws, jackpot amounts, and upcoming deadlines; begin a demo ticket selection. | `header, nav, hero, grid(card-list), footer` |
| Draw Detail | `/draws/:drawId` | Review a selected draw and choose numbers in a non-persistent demo flow. | `header, nav, main, two-column(card-list+form), action-bar` |
| Results | `/results` | Browse recent draw outcomes and winning numbers. | `header, nav, main, tabs, table, footer` |
| My Tickets | `/tickets` | Review representative sample tickets and their draw/status details. | `header, nav, main, card-list, actions, footer` |

### Sample Content

Draws — active draw:
| Draw | Jackpot | Draw time | Status |
| Grand Jackpot | $18.4M | Tonight · 9:00 PM | Closes in 02:14:36 |
| Daily Six | $640K | Today · 7:30 PM | Open |
| Weekend Millions | $5.2M | Saturday · 8:00 PM | Open |

Draw Detail — number selection:
| Draw | Main numbers | Bonus number | Ticket price |
| Grand Jackpot | 5 of 48 | 1 of 18 | $2.00 |
| Daily Six | 6 of 42 | None | $1.00 |
| Weekend Millions | 5 of 50 | 1 of 20 | $3.00 |

Results — published outcomes:
| Draw | Date | Winning numbers | Bonus | Status |
| Daily Six | Nov 08, 2026 | 04 · 11 · 19 · 26 · 33 · 40 | — | Published |
| Grand Jackpot | Nov 07, 2026 | 07 · 16 · 22 · 31 · 39 | 12 | Published |
| Weekend Millions | Nov 01, 2026 | 03 · 14 · 27 · 35 · 46 | 08 | Published |

My Tickets — sample ticket:
| Ticket | Draw | Numbers | Status |
| TK-2048 | Grand Jackpot · Nov 10 | 07 · 16 · 22 · 31 · 39 + 12 | Upcoming |
| TK-2031 | Daily Six · Nov 08 | 04 · 11 · 19 · 26 · 33 · 40 | Drawn |
| TK-1994 | Weekend Millions · Nov 01 | 03 · 14 · 27 · 35 · 46 + 08 | No prize |

---

## 6. Project Structure

```text
project-root/
├── .azure/
│   └── project-plan.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
└── src/
    ├── domain/
    │   ├── entities/              # Draw, Ticket, and result entities
    │   ├── value-objects/         # DrawId, Money, LotteryNumbers
    │   └── rules/                 # Number-selection and draw validation
    ├── application/
    │   ├── ports/                 # DrawRepository, TicketRepository contracts
    │   └── use-cases/             # ListDraws, GetDraw, SelectNumbers, ListResults, ListTickets
    ├── infrastructure/
    │   └── in-memory/             # Deterministic demo repository adapters
    ├── presentation/
    │   ├── app/                   # React composition root and route setup
    │   ├── components/            # Fluent UI wrappers and shared UI
    │   ├── pages/                 # Draws, Draw Detail, Results, My Tickets
    │   └── view-models/           # UI-facing state and formatting
    └── tests/
        ├── domain/
        ├── application/
        ├── infrastructure/
        └── presentation/
```

---

## 7. Route Definitions

These are client-side SPA routes; the app exposes no HTTP API.

| # | Method | Path | Description | Request Body | Response Body | Status Codes |
|---|--------|------|-------------|-------------|--------------|-------------|
| 1 | CLIENT | `/` | Discover active draws | — | Draws page with in-memory sample draws | — |
| 2 | CLIENT | `/draws/:drawId` | View draw and select demo numbers | Local selection state | Draw detail and selected-number summary | — |
| 3 | CLIENT | `/results` | Browse recent results | — | Results page with sample outcomes | — |
| 4 | CLIENT | `/tickets` | Browse sample ticket wallet | — | Ticket cards from in-memory demo adapter | — |

---

## 8. Next Steps

1. The local-only plan is approved and scaffolded; all app data is served by the in-memory mock API.
2. Run the frontend test suite and local app with the npm scripts in the project README.
3. Backend integration, Azure debugging, and deployment are out of scope. Revisit only if those requirements change.