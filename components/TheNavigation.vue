<template>
  <nav class="fixed top-0 left-0 right-0 bg-neutral-950 border-b border-white/10 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-white font-nordic">
          <span class="text-primary">Sovn</span>Garde
        </NuxtLink>
        
        <!-- Main Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/discover" class="text-white/80 hover:text-primary">Discover</NuxtLink>
          <NuxtLink to="/livestreams" class="text-white/80 hover:text-primary">Live Streams</NuxtLink>
          <NuxtLink to="/community" class="text-white/80 hover:text-primary">Community</NuxtLink>
        </div>
        
        <!-- User Actions -->
        <div class="flex items-center space-x-4">
          <template v-if="authStore.isAuthenticated">
            <div class="relative group">
              <button class="flex items-center space-x-2">
                <span class="text-white/80">{{ authStore.username }}</span>
                <span class="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center">
                  <span class="text-sm">{{ getInitials(authStore.username) }}</span>
                </span>
              </button>
              
              <!-- Dropdown Menu -->
              <div class="absolute right-0 top-full mt-2 w-48 bg-neutral-850 rounded-md border border-white/10 shadow-lg hidden group-hover:block">
                <div class="py-1">
                  <NuxtLink to="/dashboard" class="block px-4 py-2 text-white/80 hover:bg-neutral-800">Dashboard</NuxtLink>
                  <NuxtLink to="/profile" class="block px-4 py-2 text-white/80 hover:bg-neutral-800">Profile</NuxtLink>
                  <hr class="border-white/10 my-1">
                  <button @click="logout" class="block w-full text-left px-4 py-2 text-white/80 hover:bg-neutral-800">Log out</button>
                </div>
              </div>
            </div>
          </template>
          
          <template v-else>
            <NuxtLink to="/login" class="btn btn-outline">Log in</NuxtLink>
            <NuxtLink to="/signup" class="btn btn-primary">Sign up</NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

const getInitials = (name: string): string => {
  if (!name) return '';
  return name.charAt(0).toUpperCase();
};

const logout = async () => {
  await authStore.logout();
  navigateTo('/');
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

/* Custom class for the Nordic-inspired font */
.font-nordic {
  font-family: 'Cinzel', serif;
  letter-spacing: 0.05em;
  font-weight: 700;
  text-transform: uppercase;
}
</style>
