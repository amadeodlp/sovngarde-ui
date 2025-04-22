import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuthStore } from './auth';

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  categoryName: string;
  tags: string[];
  likes: number;
  commentCount: number;
  isPinned: boolean;
  isLocked: boolean;
  isAnnouncement: boolean;
}

export interface ForumComment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  parentCommentId?: string;
  likes: number;
  isEdited: boolean;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  parentCategoryId?: string;
  postCount: number;
  lastActivity?: string;
}

export interface CommunityState {
  posts: ForumPost[];
  popularPosts: ForumPost[];
  currentPost: ForumPost | null;
  postComments: ForumComment[];
  categories: ForumCategory[];
  isLoading: boolean;
  error: string | null;
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
    categoryMap: (state) => {
      const map: Record<string, ForumCategory> = {};
      state.categories.forEach(category => {
        map[category.id] = category;
      });
      return map;
    },
    
    announcementPosts: (state) => {
      return state.posts.filter(post => post.isAnnouncement);
    },
    
    pinnedPosts: (state) => {
      return state.posts.filter(post => post.isPinned && !post.isAnnouncement);
    },
    
    regularPosts: (state) => {
      return state.posts.filter(post => !post.isPinned && !post.isAnnouncement);
    },
  },
  
  actions: {
    async fetchCategories() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.get(
          `${useRuntimeConfig().public.apiUrl}/forum/categories`
        );
        
        if (response.status === 200) {
          this.categories = response.data.categories;
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch categories';
        console.error('Error fetching categories:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchPosts(categoryId?: string) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const url = categoryId 
          ? `${useRuntimeConfig().public.apiUrl}/forum/categories/${categoryId}/posts`
          : `${useRuntimeConfig().public.apiUrl}/forum/posts`;
          
        const response = await axios.get(url);
        
        if (response.status === 200) {
          this.posts = response.data.posts;
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch posts';
        console.error('Error fetching posts:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchPopularPosts() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.get(
          `${useRuntimeConfig().public.apiUrl}/forum/posts/popular`
        );
        
        if (response.status === 200) {
          this.popularPosts = response.data.posts;
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch popular posts';
        console.error('Error fetching popular posts:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchPostDetails(postId: string) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.get(
          `${useRuntimeConfig().public.apiUrl}/forum/posts/${postId}`
        );
        
        if (response.status === 200) {
          this.currentPost = response.data;
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch post details';
        console.error('Error fetching post details:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchPostComments(postId: string) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.get(
          `${useRuntimeConfig().public.apiUrl}/forum/posts/${postId}/comments`
        );
        
        if (response.status === 200) {
          this.postComments = response.data.comments;
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch comments';
        console.error('Error fetching comments:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    async createPost(post: { title: string; content: string; categoryId: string; tags?: string[] }) {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) return { success: false, error: 'Not authenticated' };
      
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.post(
          `${useRuntimeConfig().public.apiUrl}/forum/posts`,
          post,
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('jwt-token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.status === 201) {
          return { success: true, postId: response.data.id };
        }
        
        throw new Error('Failed to create post');
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to create post';
        console.error('Error creating post:', error);
        return { success: false, error: this.error };
      } finally {
        this.isLoading = false;
      }
    },
    
    async updatePost(postId: string, updates: { title?: string; content?: string; tags?: string[] }) {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) return { success: false, error: 'Not authenticated' };
      
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.patch(
          `${useRuntimeConfig().public.apiUrl}/forum/posts/${postId}`,
          updates,
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('jwt-token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.status === 200) {
          if (this.currentPost && this.currentPost.id === postId) {
            this.currentPost = { ...this.currentPost, ...updates, updatedAt: new Date().toISOString() };
          }
          
          return { success: true };
        }
        
        throw new Error('Failed to update post');
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to update post';
        console.error('Error updating post:', error);
        return { success: false, error: this.error };
      } finally {
        this.isLoading = false;
      }
    },
    
    async deletePost(postId: string) {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) return { success: false, error: 'Not authenticated' };
      
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.delete(
          `${useRuntimeConfig().public.apiUrl}/forum/posts/${postId}`,
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('jwt-token')}`,
            },
          }
        );
        
        if (response.status === 200) {
          this.posts = this.posts.filter(p => p.id !== postId);
          
          if (this.currentPost && this.currentPost.id === postId) {
            this.currentPost = null;
          }
          
          return { success: true };
        }
        
        throw new Error('Failed to delete post');
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to delete post';
        console.error('Error deleting post:', error);
        return { success: false, error: this.error };
      } finally {
        this.isLoading = false;
      }
    },
    
    async createComment(comment: { content: string; postId: string; parentCommentId?: string }) {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) return { success: false, error: 'Not authenticated' };
      
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.post(
          `${useRuntimeConfig().public.apiUrl}/forum/comments`,
          comment,
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('jwt-token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.status === 201) {
          // Update local comment list if we're currently viewing the post
          if (this.currentPost && this.currentPost.id === comment.postId) {
            // Increment comment count
            this.currentPost = {
              ...this.currentPost,
              commentCount: this.currentPost.commentCount + 1
            };
            
            // Add new comment to the list
            this.postComments.push(response.data);
          }
          
          return { success: true, commentId: response.data.id };
        }
        
        throw new Error('Failed to create comment');
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to create comment';
        console.error('Error creating comment:', error);
        return { success: false, error: this.error };
      } finally {
        this.isLoading = false;
      }
    },
    
    async updateComment(commentId: string, content: string) {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) return { success: false, error: 'Not authenticated' };
      
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.patch(
          `${useRuntimeConfig().public.apiUrl}/forum/comments/${commentId}`,
          { content },
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('jwt-token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.status === 200) {
          // Update local comment if it exists in the current list
          const index = this.postComments.findIndex(c => c.id === commentId);
          if (index !== -1) {
            this.postComments[index] = {
              ...this.postComments[index],
              content,
              updatedAt: new Date().toISOString(),
              isEdited: true
            };
          }
          
          return { success: true };
        }
        
        throw new Error('Failed to update comment');
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to update comment';
        console.error('Error updating comment:', error);
        return { success: false, error: this.error };
      } finally {
        this.isLoading = false;
      }
    },
    
    async deleteComment(commentId: string) {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) return { success: false, error: 'Not authenticated' };
      
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.delete(
          `${useRuntimeConfig().public.apiUrl}/forum/comments/${commentId}`,
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('jwt-token')}`,
            },
          }
        );
        
        if (response.status === 200) {
          // Remove the comment from local list
          const index = this.postComments.findIndex(c => c.id === commentId);
          if (index !== -1) {
            // Get the post ID before removing the comment
            const postId = this.postComments[index].postId;
            
            // Remove the comment
            this.postComments.splice(index, 1);
            
            // Update comment count on the current post if relevant
            if (this.currentPost && this.currentPost.id === postId) {
              this.currentPost = {
                ...this.currentPost,
                commentCount: Math.max(0, this.currentPost.commentCount - 1)
              };
            }
          }
          
          return { success: true };
        }
        
        throw new Error('Failed to delete comment');
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to delete comment';
        console.error('Error deleting comment:', error);
        return { success: false, error: this.error };
      } finally {
        this.isLoading = false;
      }
    },
    
    async likePost(postId: string) {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) return { success: false, error: 'Not authenticated' };
      
      try {
        const response = await axios.post(
          `${useRuntimeConfig().public.apiUrl}/forum/posts/${postId}/like`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('jwt-token')}`,
            },
          }
        );
        
        if (response.status === 200) {
          // Update like count in current post if relevant
          if (this.currentPost && this.currentPost.id === postId) {
            this.currentPost = {
              ...this.currentPost,
              likes: this.currentPost.likes + 1
            };
          }
          
          // Also update in the posts list if it exists there
          const index = this.posts.findIndex(p => p.id === postId);
          if (index !== -1) {
            this.posts[index] = {
              ...this.posts[index],
              likes: this.posts[index].likes + 1
            };
          }
          
          return { success: true };
        }
        
        throw new Error('Failed to like post');
      } catch (error: any) {
        console.error('Error liking post:', error);
        return { success: false, error: error.response?.data?.message || 'Failed to like post' };
      }
    },
    
    async likeComment(commentId: string) {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) return { success: false, error: 'Not authenticated' };
      
      try {
        const response = await axios.post(
          `${useRuntimeConfig().public.apiUrl}/forum/comments/${commentId}/like`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('jwt-token')}`,
            },
          }
        );
        
        if (response.status === 200) {
          // Update like count in the comment list if it exists there
          const index = this.postComments.findIndex(c => c.id === commentId);
          if (index !== -1) {
            this.postComments[index] = {
              ...this.postComments[index],
              likes: this.postComments[index].likes + 1
            };
          }
          
          return { success: true };
        }
        
        throw new Error('Failed to like comment');
      } catch (error: any) {
        console.error('Error liking comment:', error);
        return { success: false, error: error.response?.data?.message || 'Failed to like comment' };
      }
    },
    
    async searchPosts(query: string) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.get(
          `${useRuntimeConfig().public.apiUrl}/forum/posts/search`,
          { params: { query } }
        );
        
        if (response.status === 200) {
          return { success: true, posts: response.data.posts };
        }
        
        throw new Error('Failed to search posts');
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to search posts';
        console.error('Error searching posts:', error);
        return { success: false, error: this.error, posts: [] };
      } finally {
        this.isLoading = false;
      }
    },
    
    clearError() {
      this.error = null;
    }
  }
});
