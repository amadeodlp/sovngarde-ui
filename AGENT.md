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

- `pages/community.vue` — entirely hardcoded mock data (categories, posts, stats). `useCommunityStore()` exists with full Supabase actions but is NOT used anywhere in the page. The store has `fetchCategories`, `fetchPosts`, `fetchPopularPosts` — none are called
- `pages/community.vue` — "New Post" button and search input have no handlers wired
- `pages/community.vue` — "Join Community" button does nothing
- `pages/community.vue` — pagination buttons are static with no logic
- `pages/livestreams.vue` — "Notify Me" email input/button has no submit handler
- `pages/dashboard.vue` — loads mock projects via `setTimeout` instead of calling `projectsStore.fetchProjects()`
- `pages/dashboard.vue` — delete confirmation uses native `confirm()` dialog, `showDeleteModal` ref is set but modal UI doesn't exist
- `pages/discover.vue` — loads mock projects via `setTimeout` instead of calling `projectsStore.fetchProjects()`
- `components/GameStreamPlayer.vue` — player UI likely exists but play/pause controls may not call `usePlayerStore()` actions
- `pages/projects/[id].vue` — detail page exists but follow/like buttons may not be wired to store actions
