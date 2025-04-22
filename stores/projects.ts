import { defineStore } from 'pinia';
import axios from 'axios';

export interface GameProject {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  creatorId: string;
  creatorName: string;
  status: 'concept' | 'in-development' | 'beta' | 'released';
  genre: string[];
  platforms: string[];
  engine: string;
  teamSize: number;
  metrics?: {
    views: number;
    likes: number;
    followers: number;
  };
}

export interface ProjectsState {
  projects: GameProject[];
  currentProject: GameProject | null;
  isLoading: boolean;
  error: string | null;
}

export const useProjectsStore = defineStore('projects', {
  state: (): ProjectsState => ({
    projects: [],
    currentProject: null,
    isLoading: false,
    error: null
  }),
  
  actions: {
    async fetchProjects() {
      this.isLoading = true;
      try {
        const response = await axios.get('/api/projects');
        this.projects = response.data;
        this.error = null;
      } catch (error) {
        this.error = 'Failed to fetch projects';
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchProjectById(id: string) {
      this.isLoading = true;
      try {
        const response = await axios.get(`/api/projects/${id}`);
        this.currentProject = response.data;
        this.error = null;
      } catch (error) {
        this.error = 'Failed to fetch project details';
      } finally {
        this.isLoading = false;
      }
    },
    
    async createProject(project: Omit<GameProject, 'id'>) {
      this.isLoading = true;
      try {
        const response = await axios.post('/api/projects', project);
        this.projects.push(response.data);
        return { success: true, project: response.data };
      } catch (error) {
        this.error = 'Failed to create project';
        return { success: false, error: this.error };
      } finally {
        this.isLoading = false;
      }
    },
    
    async updateProject(id: string, updates: Partial<GameProject>) {
      this.isLoading = true;
      try {
        const response = await axios.patch(`/api/projects/${id}`, updates);
        
        // Update in projects list
        const index = this.projects.findIndex(p => p.id === id);
        if (index !== -1) {
          this.projects[index] = response.data;
        }
        
        // Update current project if it's the same one
        if (this.currentProject && this.currentProject.id === id) {
          this.currentProject = response.data;
        }
        
        return { success: true };
      } catch (error) {
        this.error = 'Failed to update project';
        return { success: false, error: this.error };
      } finally {
        this.isLoading = false;
      }
    },
    
    clearError() {
      this.error = null;
    }
  }
});
