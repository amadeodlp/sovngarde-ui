import { defineStore } from 'pinia'

export interface GameProject {
  id: string
  title: string
  description: string
  thumbnail_url: string
  creator_id: string
  creator_name: string
  status: 'concept' | 'in-development' | 'beta' | 'released'
  genre: string[]
  platforms: string[]
  engine: string
  team_size: number
  views: number
  likes: number
  followers: number
  created_at: string
}

export interface ProjectsState {
  projects: GameProject[]
  currentProject: GameProject | null
  isLoading: boolean
  error: string | null
}

export const useProjectsStore = defineStore('projects', {
  state: (): ProjectsState => ({
    projects: [],
    currentProject: null,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchProjects() {
      const { $supabase } = useNuxtApp()
      this.isLoading = true
      try {
        const { data, error } = await ($supabase as any)
          .from('game_projects')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw error
        this.projects = data || []
        this.error = null
      } catch (err: any) {
        this.error = 'Failed to fetch projects'
      } finally {
        this.isLoading = false
      }
    },

    async fetchProjectById(id: string) {
      const { $supabase } = useNuxtApp()
      this.isLoading = true
      try {
        const { data, error } = await ($supabase as any)
          .from('game_projects')
          .select('*')
          .eq('id', id)
          .single()
        if (error) throw error
        this.currentProject = data
        this.error = null
      } catch (err: any) {
        this.error = 'Failed to fetch project'
      } finally {
        this.isLoading = false
      }
    },

    async createProject(project: Omit<GameProject, 'id' | 'created_at'>) {
      const { $supabase } = useNuxtApp()
      this.isLoading = true
      try {
        const { data, error } = await ($supabase as any)
          .from('game_projects')
          .insert(project)
          .select()
          .single()
        if (error) throw error
        this.projects.unshift(data)
        return { success: true, project: data }
      } catch (err: any) {
        this.error = 'Failed to create project'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async updateProject(id: string, updates: Partial<GameProject>) {
      const { $supabase } = useNuxtApp()
      this.isLoading = true
      try {
        const { data, error } = await ($supabase as any)
          .from('game_projects')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        if (error) throw error
        const idx = this.projects.findIndex(p => p.id === id)
        if (idx !== -1) this.projects[idx] = data
        if (this.currentProject?.id === id) this.currentProject = data
        return { success: true }
      } catch (err: any) {
        this.error = 'Failed to update project'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    clearError() {
      this.error = null
    },
  },
})
