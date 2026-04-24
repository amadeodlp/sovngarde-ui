import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export interface ForumPost {
  id: string
  title: string
  content: string
  author_id: string
  author_name: string
  author_avatar?: string
  created_at: string
  updated_at: string
  category_id: string
  tags: string[]
  likes: number
  comment_count: number
  is_pinned: boolean
  is_locked: boolean
  is_announcement: boolean
}

export interface ForumComment {
  id: string
  content: string
  author_id: string
  author_name: string
  author_avatar?: string
  created_at: string
  post_id: string
  parent_comment_id?: string
  likes: number
  is_edited: boolean
}

export interface ForumCategory {
  id: string
  name: string
  description: string
  icon?: string
  color?: string
  parent_category_id?: string
  post_count: number
  last_activity?: string
}

export interface CommunityState {
  posts: ForumPost[]
  popularPosts: ForumPost[]
  currentPost: ForumPost | null
  postComments: ForumComment[]
  categories: ForumCategory[]
  isLoading: boolean
  error: string | null
}

export const useCommunityStore = defineStore('community', {
  state: (): CommunityState => ({
    posts: [],
    popularPosts: [],
    currentPost: null,
    postComments: [],
    categories: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    announcementPosts: (state) => state.posts.filter(p => p.is_announcement),
    pinnedPosts:       (state) => state.posts.filter(p => p.is_pinned && !p.is_announcement),
    regularPosts:      (state) => state.posts.filter(p => !p.is_pinned && !p.is_announcement),
  },

  actions: {
    async fetchCategories() {
      const { $supabase } = useNuxtApp()
      this.isLoading = true
      try {
        const { data, error } = await ($supabase as any)
          .from('forum_categories')
          .select('*')
          .order('name')
        if (error) throw error
        this.categories = data || []
      } catch (err: any) {
        this.error = 'Failed to fetch categories'
      } finally {
        this.isLoading = false
      }
    },

    async fetchPosts(categoryId?: string) {
      const { $supabase } = useNuxtApp()
      this.isLoading = true
      try {
        let query = ($supabase as any)
          .from('forum_posts')
          .select('*')
          .order('is_pinned', { ascending: false })
          .order('created_at', { ascending: false })
        if (categoryId) query = query.eq('category_id', categoryId)
        const { data, error } = await query
        if (error) throw error
        this.posts = data || []
      } catch (err: any) {
        this.error = 'Failed to fetch posts'
      } finally {
        this.isLoading = false
      }
    },

    async fetchPopularPosts() {
      const { $supabase } = useNuxtApp()
      this.isLoading = true
      try {
        const { data, error } = await ($supabase as any)
          .from('forum_posts')
          .select('*')
          .order('likes', { ascending: false })
          .limit(10)
        if (error) throw error
        this.popularPosts = data || []
      } catch (err: any) {
        this.error = 'Failed to fetch popular posts'
      } finally {
        this.isLoading = false
      }
    },

    async fetchPostDetails(postId: string) {
      const { $supabase } = useNuxtApp()
      this.isLoading = true
      try {
        const { data, error } = await ($supabase as any)
          .from('forum_posts')
          .select('*')
          .eq('id', postId)
          .single()
        if (error) throw error
        this.currentPost = data
      } catch (err: any) {
        this.error = 'Failed to fetch post'
      } finally {
        this.isLoading = false
      }
    },

    async fetchPostComments(postId: string) {
      const { $supabase } = useNuxtApp()
      this.isLoading = true
      try {
        const { data, error } = await ($supabase as any)
          .from('forum_comments')
          .select('*')
          .eq('post_id', postId)
          .order('created_at', { ascending: true })
        if (error) throw error
        this.postComments = data || []
      } catch (err: any) {
        this.error = 'Failed to fetch comments'
      } finally {
        this.isLoading = false
      }
    },

    async createPost(post: { title: string; content: string; category_id: string; tags?: string[] }) {
      const { $supabase } = useNuxtApp()
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) return { success: false, error: 'Not authenticated' }
      try {
        const { data, error } = await ($supabase as any)
          .from('forum_posts')
          .insert({ ...post, author_id: authStore.userId, author_name: authStore.displayName })
          .select()
          .single()
        if (error) throw error
        this.posts.unshift(data)
        return { success: true, postId: data.id }
      } catch (err: any) {
        this.error = 'Failed to create post'
        return { success: false, error: this.error }
      }
    },

    async createComment(comment: { content: string; post_id: string; parent_comment_id?: string }) {
      const { $supabase } = useNuxtApp()
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) return { success: false, error: 'Not authenticated' }
      try {
        const { data, error } = await ($supabase as any)
          .from('forum_comments')
          .insert({ ...comment, author_id: authStore.userId, author_name: authStore.displayName })
          .select()
          .single()
        if (error) throw error
        this.postComments.push(data)
        if (this.currentPost?.id === comment.post_id) {
          this.currentPost = { ...this.currentPost, comment_count: this.currentPost.comment_count + 1 }
        }
        return { success: true, commentId: data.id }
      } catch (err: any) {
        this.error = 'Failed to create comment'
        return { success: false, error: this.error }
      }
    },

    async likePost(postId: string) {
      const { $supabase } = useNuxtApp()
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) return { success: false }
      await ($supabase as any).from('interactions').insert({
        user_id: authStore.userId, target_id: postId,
        target_type: 'post', interaction_type: 'like',
      })
      await ($supabase as any).from('forum_posts').update({ likes: (this.currentPost?.likes || 0) + 1 }).eq('id', postId)
      if (this.currentPost?.id === postId) this.currentPost = { ...this.currentPost, likes: this.currentPost.likes + 1 }
      return { success: true }
    },

    async searchPosts(query: string) {
      const { $supabase } = useNuxtApp()
      try {
        const { data, error } = await ($supabase as any)
          .from('forum_posts')
          .select('*')
          .ilike('title', `%${query}%`)
          .order('created_at', { ascending: false })
        if (error) throw error
        return { success: true, posts: data || [] }
      } catch {
        return { success: false, posts: [] }
      }
    },

    clearError() {
      this.error = null
    },
  },
})
