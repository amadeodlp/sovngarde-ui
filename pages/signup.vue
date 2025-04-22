<template>
  <div class="min-h-screen flex items-center justify-center py-12 mt-12 px-4">
    <div class="max-w-xl w-full">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-2xl font-bold text-white font-nordic">
          <span class="text-primary">Sovn</span>Garde
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-bold text-white">Create your account</h2>
        <p class="mt-2 text-white/70">
          Already have an account? <NuxtLink to="/login" class="text-primary hover:text-primary/80">Sign in</NuxtLink>
        </p>
      </div>
      
      <div class="card p-8">
        <form @submit.prevent="signup">
          <div v-if="error" class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
            {{ error }}
          </div>
          
          <!-- User Type Selection -->
          <div class="mb-6">
            <label class="block text-white font-medium mb-2">I am a:</label>
            <div class="grid grid-cols-2 gap-4">
              <button
                type="button"
                @click="userType = 'developer'"
                class="border rounded-md p-4 text-center transition-colors"
                :class="userType === 'developer' 
                  ? 'border-primary text-primary bg-primary/10' 
                  : 'border-white/20 text-white/70 hover:border-white/40'"
              >
                <div class="flex justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div class="font-medium">Game Developer</div>
              </button>
              
              <button
                type="button"
                @click="userType = 'gamer'"
                class="border rounded-md p-4 text-center transition-colors"
                :class="userType === 'gamer' 
                  ? 'border-primary text-primary bg-primary/10' 
                  : 'border-white/20 text-white/70 hover:border-white/40'"
              >
                <div class="flex justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <div class="font-medium">Gamer / Player</div>
              </button>
            </div>
          </div>
          
          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="first_name" class="block text-white font-medium mb-2">First Name</label>
              <input 
                id="first_name" 
                v-model="firstName" 
                type="text" 
                class="input w-full" 
                required
              />
            </div>
            
            <div>
              <label for="last_name" class="block text-white font-medium mb-2">Last Name</label>
              <input 
                id="last_name" 
                v-model="lastName" 
                type="text" 
                class="input w-full" 
                required
              />
            </div>
          </div>
          
          <div class="mb-6">
            <label for="email" class="block text-white font-medium mb-2">Email Address</label>
            <input 
              id="email" 
              v-model="email" 
              type="email" 
              class="input w-full" 
              required
            />
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
            <p class="mt-1 text-sm text-white/60">This will be your public display name</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="password" class="block text-white font-medium mb-2">Password</label>
              <input 
                id="password" 
                v-model="password" 
                type="password" 
                class="input w-full" 
                required
              />
            </div>
            
            <div>
              <label for="password_confirm" class="block text-white font-medium mb-2">Confirm Password</label>
              <input 
                id="password_confirm" 
                v-model="passwordConfirm" 
                type="password" 
                class="input w-full" 
                required
              />
            </div>
          </div>
          
          <!-- Additional fields for developers -->
          <div v-if="userType === 'developer'" class="mb-6 border-t border-white/10 pt-6">
            <h3 class="text-xl font-bold text-white mb-4">Developer Profile</h3>
            
            <div class="mb-6">
              <label for="studio_name" class="block text-white font-medium mb-2">Studio Name (Optional)</label>
              <input 
                id="studio_name" 
                v-model="studioName" 
                type="text" 
                class="input w-full" 
              />
            </div>
            
            <div class="mb-6">
              <label class="block text-white font-medium mb-2">Developer Type</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="devType" 
                    value="indie" 
                    class="h-4 w-4 text-primary rounded-full border-white/30 bg-neutral-800 focus:ring-primary"
                  />
                  <span class="ml-2 text-white/80">Indie Developer</span>
                </label>
                
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="devType" 
                    value="studio" 
                    class="h-4 w-4 text-primary rounded-full border-white/30 bg-neutral-800 focus:ring-primary"
                  />
                  <span class="ml-2 text-white/80">Game Studio</span>
                </label>
                
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="devType" 
                    value="hobbyist" 
                    class="h-4 w-4 text-primary rounded-full border-white/30 bg-neutral-800 focus:ring-primary"
                  />
                  <span class="ml-2 text-white/80">Hobbyist</span>
                </label>
              </div>
            </div>
            
            <div class="mb-6">
              <label class="block text-white font-medium mb-2">Primary Skills (Select all that apply)</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="skills" 
                    value="programming" 
                    class="h-4 w-4 text-primary rounded border-white/30 bg-neutral-800 focus:ring-primary"
                  />
                  <span class="ml-2 text-white/80">Programming</span>
                </label>
                
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="skills" 
                    value="art" 
                    class="h-4 w-4 text-primary rounded border-white/30 bg-neutral-800 focus:ring-primary"
                  />
                  <span class="ml-2 text-white/80">Art & Animation</span>
                </label>
                
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="skills" 
                    value="design" 
                    class="h-4 w-4 text-primary rounded border-white/30 bg-neutral-800 focus:ring-primary"
                  />
                  <span class="ml-2 text-white/80">Game Design</span>
                </label>
                
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="skills" 
                    value="audio" 
                    class="h-4 w-4 text-primary rounded border-white/30 bg-neutral-800 focus:ring-primary"
                  />
                  <span class="ml-2 text-white/80">Audio & Music</span>
                </label>
                
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="skills" 
                    value="writing" 
                    class="h-4 w-4 text-primary rounded border-white/30 bg-neutral-800 focus:ring-primary"
                  />
                  <span class="ml-2 text-white/80">Narrative & Writing</span>
                </label>
                
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="skills" 
                    value="production" 
                    class="h-4 w-4 text-primary rounded border-white/30 bg-neutral-800 focus:ring-primary"
                  />
                  <span class="ml-2 text-white/80">Production & Management</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- Terms and Privacy -->
          <div class="mb-8">
            <label class="flex items-start cursor-pointer">
              <input 
                type="checkbox" 
                v-model="agreeToTerms" 
                class="h-4 w-4 mt-1 text-primary rounded border-white/30 bg-neutral-800 focus:ring-primary"
                required
              />
              <span class="ml-2 text-white/80">
                I agree to the <NuxtLink to="/terms" class="text-primary hover:text-primary/80">Terms of Service</NuxtLink> and 
                <NuxtLink to="/privacy" class="text-primary hover:text-primary/80">Privacy Policy</NuxtLink>
              </span>
            </label>
          </div>
          
          <div>
            <button 
              type="submit" 
              class="btn btn-primary w-full py-3"
              :disabled="isLoading || !agreeToTerms"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
              <span v-else>Create Account</span>
            </button>
          </div>
        </form>
        
        <div class="mt-8 pt-6 border-t border-white/10">
          <div class="text-white/60 text-center mb-4">Or sign up with</div>
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
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// Form data
const userType = ref('developer');
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const username = ref('');
const password = ref('');
const passwordConfirm = ref('');
const studioName = ref('');
const devType = ref('indie');
const skills = ref<string[]>([]);
const agreeToTerms = ref(false);
const isLoading = ref(false);
const error = ref('');

// Handle signup submission
const signup = async () => {
  // Validate passwords match
  if (password.value !== passwordConfirm.value) {
    error.value = 'Passwords do not match';
    return;
  }
  
  isLoading.value = true;
  error.value = '';
  
  try {
    // For demo purposes, simulate API call with a timeout
    setTimeout(() => {
      // In a real app, this would call a signup action in the auth store
      
      // Redirect to confirmation page
      router.push('/dashboard');
      
      isLoading.value = false;
    }, 1500);
  } catch (err) {
    console.error('Signup error:', err);
    error.value = 'An error occurred during signup. Please try again.';
    isLoading.value = false;
  }
};
</script>
