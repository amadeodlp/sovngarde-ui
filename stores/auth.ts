import { defineStore } from 'pinia'

export interface AuthState {
  isAuthenticated: boolean
  userId: string
  username: string
  displayName: string
  avatarUrl: string
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    userId: '',
    username: '',
    displayName: '',
    avatarUrl: '',
    error: null,
  }),

  actions: {
    async login(credentials: { email: string; password: string }) {
      const { $supabase } = useNuxtApp()
      this.error = null
      try {
        const { data, error } = await ($supabase as any).auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        })
        if (error) throw error
        await this._loadProfile(data.user.id)
      } catch (err: any) {
        this.error = err.message || 'Invalid credentials'
      }
    },

    async signup(payload: { email: string; password: string; username: string }) {
      const { $supabase } = useNuxtApp()
      this.error = null
      try {
        const { data, error } = await ($supabase as any).auth.signUp({
          email: payload.email,
          password: payload.password,
          options: {
            data: { username: payload.username },
            emailRedirectTo: 'https://sovngarde.social',
          },
        })
        if (error) throw error
        await ($supabase as any).from('profiles').update({
          display_name: payload.username,
        }).eq('id', data.user.id)
        await this._loadProfile(data.user.id)
      } catch (err: any) {
        this.error = err.message || 'Signup failed'
      }
    },

    async logout() {
      const { $supabase } = useNuxtApp()
      await ($supabase as any).auth.signOut()
      this.$reset()
    },

    async restoreSession() {
      const { $supabase } = useNuxtApp()
      const { data } = await ($supabase as any).auth.getSession()
      if (data.session?.user) {
        await this._loadProfile(data.session.user.id)
      }
    },

    async _loadProfile(userId: string) {
      const { $supabase } = useNuxtApp()
      const { data: profile } = await ($supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (profile) {
        this.isAuthenticated = true
        this.userId      = userId
        this.username    = profile.username     || ''
        this.displayName = profile.display_name || profile.username || ''
        this.avatarUrl   = profile.avatar_url   || ''
      }
    },

    clearError() {
      this.error = null
    },
  },
})
