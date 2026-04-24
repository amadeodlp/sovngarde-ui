import { defineStore } from 'pinia'

export interface GameProjectMetrics {
  views: number
  likes: number
  followers: number
}

export interface GameProject {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  creatorId: string
  creatorName: string
  status: 'concept' | 'in-development' | 'beta' | 'released'
  genre: string[]
  platforms: string[]
  engine: string
  teamSize: number
  metrics: GameProjectMetrics
  createdAt: string
  updatedAt: string
}

export interface ProjectsState {
  projects: GameProject[]
  currentProject: GameProject | null
  isLoading: boolean
  error: string | null
}

function mapRow(row: Record<string, any>): GameProject {
  return {
    id:          row.id,
    title:       row.title,
    description: row.description,
    thumbnailUrl: row.thumbnail_url ?? '',
    creatorId:   row.creator_id,
    creatorName: row.creator_name,
    status:      row.status,
    genre:       row.genre ?? [],
    platforms:   row.platforms ?? [],
    engine:      row.engine ?? '',
    teamSize:    row.team_size ?? 1,
    metrics: {
      views:     row.views     ?? 0,
      likes:     row.likes     ?? 0,
      followers: row.followers ?? 0,
    },
    createdAt: row.created_at,
    updatedAt: row.updated_at ?? row.created_at,
  }
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
        this.projects = (data || []).map(mapRow)
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
        this.currentProject = mapRow(data)
        this.error = null
      } catch (err: any) {
        this.error = 'Failed to fetch project'
      } finally {
        this.isLoading = false
      }
    },

    async createProject(project: Omit<GameProject, 'id' | 'createdAt' | 'updatedAt'>) {
      const { $supabase } = useNuxtApp()
      this.isLoading = true
      try {
        const { data, error } = await ($supabase as any)
          .from('game_projects')
          .insert({
            title:         project.title,
            description:   project.description,
            thumbnail_url: project.thumbnailUrl,
            creator_id:    project.creatorId,
            creator_name:  project.creatorName,
            status:        project.status,
            genre:         project.genre,
            platforms:     project.platforms,
            engine:        project.engine,
            team_size:     project.teamSize,
            views:         project.metrics.views,
            likes:         project.metrics.likes,
            followers:     project.metrics.followers,
          })
          .select()
          .single()
        if (error) throw error
        const mapped = mapRow(data)
        this.projects.unshift(mapped)
        return { success: true, project: mapped }
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
        const patch: Record<string, any> = {}
        if (updates.title         !== undefined) patch.title         = updates.title
        if (updates.description   !== undefined) patch.description   = updates.description
        if (updates.thumbnailUrl  !== undefined) patch.thumbnail_url = updates.thumbnailUrl
        if (updates.creatorId     !== undefined) patch.creator_id    = updates.creatorId
        if (updates.creatorName   !== undefined) patch.creator_name  = updates.creatorName
        if (updates.status        !== undefined) patch.status        = updates.status
        if (updates.genre         !== undefined) patch.genre         = updates.genre
        if (updates.platforms     !== undefined) patch.platforms     = updates.platforms
        if (updates.engine        !== undefined) patch.engine        = updates.engine
        if (updates.teamSize      !== undefined) patch.team_size     = updates.teamSize
        if (updates.metrics) {
          if (updates.metrics.views     !== undefined) patch.views     = updates.metrics.views
          if (updates.metrics.likes     !== undefined) patch.likes     = updates.metrics.likes
          if (updates.metrics.followers !== undefined) patch.followers = updates.metrics.followers
        }
        const { data, error } = await ($supabase as any)
          .from('game_projects')
          .update(patch)
          .eq('id', id)
          .select()
          .single()
        if (error) throw error
        const mapped = mapRow(data)
        const idx = this.projects.findIndex(p => p.id === id)
        if (idx !== -1) this.projects[idx] = mapped
        if (this.currentProject?.id === id) this.currentProject = mapped
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
