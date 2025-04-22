import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';

export interface AuthState {
  isAuthenticated: boolean;
  username: string;
  userType: string; // 'developer' or 'gamer'
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    username: '',
    userType: '',
    error: null
  }),
  
  getters: {
    isDeveloper: (state) => state.userType === 'developer',
    isGamer: (state) => state.userType === 'gamer',
  },
  
  actions: {
    async login(credentials: { username: string; password: string }) {
      try {
        const response = await axios.post('/api/login', credentials);
        if (response.status === 200) {
          this.isAuthenticated = true;
          this.username = credentials.username;
          this.userType = response.data.userType;
          this.error = null;
        }
      } catch (error) {
        this.error = 'Invalid credentials';
      }
    },
    
    async logout() {
      try {
        await axios.post('/api/logout');
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        this.isAuthenticated = false;
        this.username = '';
        this.userType = '';
        Cookies.remove('auth-token');
      }
    },
    
    clearError() {
      this.error = null;
    }
  }
});
