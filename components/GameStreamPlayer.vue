<template>
  <div class="fixed bottom-0 left-0 right-0 bg-neutral-850 border-t border-white/10 z-40 shadow-lg">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Stream Info -->
        <div class="flex items-center space-x-4">
          <!-- Thumbnail -->
          <div class="relative h-12 w-20 rounded overflow-hidden bg-neutral-900">
            <img 
              v-if="playerStore.currentStream?.thumbnailUrl" 
              :src="playerStore.currentStream.thumbnailUrl" 
              class="h-full w-full object-cover"
              alt="Stream thumbnail" 
            />
            <div v-else class="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <!-- Live indicator -->
            <div v-if="playerStore.currentStream?.isLive" class="absolute top-1 left-1 bg-red-600 text-white text-xs px-1 rounded">
              LIVE
            </div>
          </div>
          
          <!-- Stream details -->
          <div>
            <h4 class="font-medium text-white">
              {{ playerStore.currentStream?.title || 'No stream selected' }}
            </h4>
            <p class="text-sm text-white/60">
              {{ playerStore.currentStream?.streamerName || 'Select a stream to start watching' }}
            </p>
          </div>
        </div>
        
        <!-- Controls -->
        <div class="flex items-center space-x-6">
          <!-- Play/Pause -->
          <button @click="playerStore.togglePlayPause" class="text-white/80 hover:text-white">
            <svg v-if="playerStore.isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          <!-- Volume -->
          <div class="flex items-center space-x-2 w-32">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <input 
              type="range" 
              min="0" 
              max="100" 
              v-model="volume" 
              @input="playerStore.setVolume(parseInt(volume))" 
              class="w-full"
            />
          </div>
          
          <!-- Close -->
          <button @click="playerStore.closePlayer" class="text-white/80 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePlayerStore } from '~/stores/player';

const playerStore = usePlayerStore();
const volume = ref(playerStore.volume);

onMounted(() => {
  volume.value = playerStore.volume;
});
</script>
