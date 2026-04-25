# Agent Context — sovngarde-ui

## What this app is

SovnGarde is a game developer community platform. Users can share game projects, discover other developers' work, participate in a forum, and (eventually) watch live development streams.

## Stack

Nuxt 3, Vue 3 Composition API, TypeScript, Pinia, Supabase, Tailwind CSS, date-fns

## Project structure

- `pages/` — file-based routing. Each page fetches its own data via stores in `onMounted`
- `stores/` — Pinia stores, all async actions call Supabase via `useNuxtApp().$supabase`
- `components/` — presentational components, no direct store access
- `layouts/default.vue` — main shell wrapping all pages, includes TheNavigation and TheFooter
- `plugins/supabase.client.ts` — Supabase singleton injected as `$supabase`
- `assets/css/main.css` — global Tailwind base + custom classes (`card`, `btn`, `input`)

## Key patterns

- Auth state lives in `stores/auth.ts` → `useAuthStore()`. Session restored in `app.vue` via `authStore.restoreSession()`
- Navigation uses `navigateTo()` (Nuxt auto-import), not `useRouter().push()`
- Supabase calls always return `{ data, error }` — always check error before using data
- Store actions set `this.isLoading = true/false` and `this.error`
- Components access stores via `const store = useXStore()` at the top of `<script setup>`
- Pinia stores auto-imported: `defineStore`, `acceptHMRUpdate` (configured in nuxt.config)

## Data models

- `GameProject` (stores/projects.ts): `{ id, title, description, thumbnailUrl, creatorId, creatorName, status, genre[], platforms[], engine, teamSize, createdAt, updatedAt, metrics: { views, likes, followers } }`
- `ForumPost` (stores/community.ts): snake_case from Supabase — `author_id, author_name, created_at, category_id, is_pinned, is_announcement`
- `GameStream` / `GameClip` (stores/player.ts): camelCase — `streamerName, streamerId, thumbnailUrl, streamUrl/clipUrl`
- Auth profile (stores/auth.ts): `{ isAuthenticated, userId, username, displayName, avatarUrl }`

## Known incomplete areas — prioritize these

- `pages/dashboard.vue` — delete confirmation still uses native `confirm()` dialog; a modal UI would be preferable
- `components/GameStreamPlayer.vue` — player UI exists and play/pause calls `usePlayerStore()` actions, but there is no real media element connected to `streamUrl`/`clipUrl`; the player is purely UI state
- `pages/projects/[id].vue` — follow/like state is local only; not persisted to Supabase (optimistic only, no rollback)
- `pages/livestreams.vue` — `stream_notifications` table must exist in Supabase for the notify-me form to work; duplicate emails return a 23505 error which is handled gracefully
- `pages/about.vue` — contact form submits nowhere (no handler on the submit button)
- `pages/help.vue` — "Contact via Email" and "Start Live Chat" buttons have no handlers
