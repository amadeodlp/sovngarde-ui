<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-3xl font-bold text-white font-nordic">
          <span class="text-primary">Sovn</span>Garde
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-bold text-white">Recover your password</h2>
        <p class="mt-2 text-white/70">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      
      <div class="card p-8">
        <form @submit.prevent="recoverPassword">
          <div v-if="successMessage" class="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-sm">
            {{ successMessage }}
          </div>
          
          <div v-if="error" class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
            {{ error }}
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
                Sending...
              </span>
              <span v-else>Send Recovery Link</span>
            </button>
          </div>
          
          <div class="mt-6 text-center">
            <NuxtLink to="/login" class="text-primary hover:text-primary/80">
              Return to login
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Form data
const email = ref('');
const isLoading = ref(false);
const error = ref('');
const successMessage = ref('');

// Handle password recovery
const recoverPassword = async () => {
  isLoading.value = true;
  error.value = '';
  successMessage.value = '';
  
  try {
    // For demo purposes, simulate API call with a timeout
    setTimeout(() => {
      // In a real app, this would call a password recovery service
      
      // Show success message
      successMessage.value = 'Recovery instructions have been sent to your email address.';
      email.value = '';
      isLoading.value = false;
    }, 1500);
  } catch (err) {
    console.error('Password recovery error:', err);
    error.value = 'An error occurred. Please try again.';
    isLoading.value = false;
  }
};
</script>
