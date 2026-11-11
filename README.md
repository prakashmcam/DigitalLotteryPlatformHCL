# Northstar Lottery — frontend demo

A fictional, frontend-only lottery experience built with React, TypeScript, Vite, and Fluent UI v9. The app has no backend, sign-in, persistence, real purchases, Azure services, or deployment configuration.

## Run locally

- `npm install`
- `npm run dev`
- `npm run build`
- `npm test`

## Pages

- `/` — active draws
- `/draws/:drawId` — draw rules and an interactive, non-transactional number-selection preview
- `/results` — recent sample outcomes and the archive empty state
- `/tickets` — sample ticket wallet

## Structure

- `src/domain` — entities, value objects, and selection rules
- `src/application` — repository ports and use cases
- `src/infrastructure/in-memory` — deterministic sample repositories
- `src/api` — typed client interface backed exclusively by the local mock API in `src/api/mockClient.ts`; there is no live API or Azure adapter
- `src/presentation` — Fluent UI routes, components, theme, and styles
- `src/tests` — Vitest coverage for selection rules, use cases, and fixture records

In development, the fixed corner state switcher exercises data, loading, empty, and error states. The equivalent URL override is `?previewState=data|loading|empty|error`. Theme preference is stored as `app-theme` (`light`, `dark`, or `system`); demo selections are not persisted.
