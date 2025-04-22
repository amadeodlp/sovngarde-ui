<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-3xl font-bold text-white">
          Game<span class="text-primary">Hub</span>
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-bold text-white">Sign in to your account</h2>
        <p class="mt-2 text-white/70">
          Or <NuxtLink to="/signup" class="text-primary hover:text-primary/80">create a new account</NuxtLink>
        </p>
      </div>
      
      <div class="card p-8">
        <form @submit.prevent="login">
          <div v-if="error" class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
            {{ error }}
          </div>
          
          <div class="mb-6">
            <label for="username" class="block text-white font-medium mb-2">Username</label>
            <input 
              id="username" 
              v-model="username" 
              type="text" 
              class="input w-full" 
              required
            />
          </div>
          
          <div class="mb-8">
            <label for="password" class="block text-white font-medium mb-2">Password</label>
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              class="input w-full" 
              required
            />
            <div class="mt-2 flex justify-end">
              <NuxtLink to="/forgot-password" class="text-sm text-primary hover:text-primary/80">
                Forgot your password?
              </NuxtLink>
            </div>
          </div>
          
          <div class="mb-6">
            <label class="flex items-center">
              <input 
                v-model="rememberMe" 
                type="checkbox" 
                class="h-4 w-4 text-primary rounded border-white/30 bg-neutral-800 focus:ring-primary"
              />
              <span class="ml-2 text-white/80">Remember me</span>
            </label>
          </div>
          
          <div>
            <button 
              type="submit" 
              class="btn btn-primary w-full py-3"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>
        
        <div class="mt-8 pt-6 border-t border-white/10">
          <div class="text-white/60 text-center mb-4">Or sign in with</div>
          <div class="grid grid-cols-3 gap-3">
            <button class="btn btn-outline py-2">
              <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </button>
            <button class="btn btn-outline py-2">
              <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            <button class="btn btn-outline py-2">
              <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// Form data
const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const isLoading = ref(false);
const error = ref('');

// Handle login submission
const login = async () => {
  isLoading.value = true;
  error.value = '';
  
  try {
    // In a real app, this would call the login action from the store
    // For demo, we'll simulate a login
    setTimeout(async () => {
      // Simulate successful login
      authStore.isAuthenticated = true;
      authStore.username = username.value;
      authStore.userType = Math.random() > 0.5 ? 'developer' : 'gamer';
      
      // Redirect to intended destination or dashboard
      const redirectPath = route.query.redirect as string || '/dashboard';
      await router.push(redirectPath);
      
      isLoading.value = false;
    }, 1000);
  } catch (err) {
    console.error('Login error:', err);
    error.value = 'Invalid username or password';
    isLoading.value = false;
  }
};
</script>
