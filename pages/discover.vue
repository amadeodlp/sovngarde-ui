<template>
  <div class="container mx-auto px-4 py-12">
    <div class="flex flex-col md:flex-row mt-10 justify-between mb-8">
      <div>
        <h1 class="text-4xl font-bold text-white mb-2">Discover Games</h1>
        <p class="text-white/70">Find amazing games from indie developers around the world</p>
      </div>
      
      <div class="mt-4 md:mt-0">
        <div class="relative">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search games..." 
            class="input pr-10 w-full md:w-80"
            @keyup.enter="searchProjects"
          />
          <button 
            @click="searchProjects" 
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Filters and Results -->
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Filters -->
      <div class="w-full lg:w-64 flex-shrink-0">
        <div class="bg-neutral-850 rounded-xl border border-white/10 p-5">
          <h3 class="text-lg font-semibold text-white mb-4">Filters</h3>
          
          <!-- Status Filter -->
          <div class="mb-6">
            <h4 class="text-white font-medium mb-2">Status</h4>
            <div class="space-y-2">
              <label v-for="status in statusOptions" :key="status.value" class="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  :value="status.value" 
                  v-model="filters.status" 
                  class="h-4 w-4 text-primary rounded border-white/30 bg-neutral-800 focus:ring-primary"
                />
                <span class="ml-2 text-white/80">{{ status.label }}</span>
              </label>
            </div>
          </div>
          
          <!-- Genre Filter -->
          <div class="mb-6">
            <h4 class="text-white font-medium mb-2">Genre</h4>
            <div class="space-y-2">
              <label v-for="genre in genreOptions" :key="genre" class="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  :value="genre" 
                  v-model="filters.genre" 
                  class="h-4 w-4 text-primary rounded border-white/30 bg-neutral-800 focus:ring-primary"
                />
                <span class="ml-2 text-white/80">{{ genre }}</span>
              </label>
            </div>
          </div>
          
          <!-- Sort Option -->
          <div class="mb-6">
            <h4 class="text-white font-medium mb-2">Sort By</h4>
            <select 
              v-model="filters.sort" 
              class="input w-full"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="updated">Recently Updated</option>
            </select>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button 
              @click="applyFilters" 
              class="btn btn-primary flex-grow"
            >
              Apply Filters
            </button>
            <button 
              @click="resetFilters" 
              class="btn btn-outline p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Results -->
      <div class="flex-1">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center py-10">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="bg-neutral-850 rounded-xl border border-white/10 p-6 text-center">
          <p class="text-red-500 mb-4">{{ error }}</p>
          <button @click="applyFilters" class="btn btn-primary">Try Again</button>
        </div>
        
        <!-- Results Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div v-for="(project, index) in projects" :key="index" class="card hover:border-primary/30 transition-colors">
            <div class="relative h-40 overflow-hidden">
              <img 
                :src="project.thumbnailUrl" 
                :alt="project.title" 
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div class="absolute top-2 right-2 bg-neutral-950/80 px-2 py-1 rounded text-sm">
                <span class="uppercase">{{ project.status }}</span>
              </div>
            </div>
            
            <div class="p-5">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-xl font-semibold text-white">{{ project.title }}</h3>
                <div class="flex items-center space-x-1 text-white/60">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{{ project.metrics?.likes || 0 }}</span>
                </div>
              </div>
              
              <p class="text-white/70 mb-4 line-clamp-2">{{ project.description }}</p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="(genre, i) in project.genre.slice(0, 3)" 
                  :key="i" 
                  class="bg-neutral-800 text-white/70 px-2 py-1 rounded-md text-xs"
                >
                  {{ genre }}
                </span>
              </div>
              
              <div class="flex justify-between items-center">
                <div class="text-sm text-white/70">{{ project.creatorName }}</div>
                <NuxtLink :to="`/projects/${project.id}`" class="text-primary hover:text-primary/80">View Project</NuxtLink>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="projects.length === 0 && !isLoading && !error" class="bg-neutral-850 rounded-xl border border-white/10 p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold text-white mb-2">No projects found</h3>
          <p class="text-white/70 mb-4">Try adjusting your filters or search criteria</p>
          <button @click="resetFilters" class="btn btn-primary">Clear Filters</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProjectsStore, type GameProject } from '~/stores/projects';

const projectsStore = useProjectsStore();
const searchQuery = ref('');
const isLoading = ref(false);
const error = ref<string | null>(null);
const projects = ref<GameProject[]>([]);

// Filter options
const statusOptions = [
  { label: 'Concept', value: 'concept' },
  { label: 'In Development', value: 'in-development' },
  { label: 'Beta', value: 'beta' },
  { label: 'Released', value: 'released' }
];

const genreOptions = [
  'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 
  'Puzzle', 'Sports', 'Racing', 'Platformer', 'Shooter'
];

// Active filters
const filters = ref({
  status: [],
  genre: [],
  sort: 'newest',
  search: ''
});

// Methods
const searchProjects = () => {
  filters.value.search = searchQuery.value;
  applyFilters();
};

const applyFilters = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // For demo, simulate API call with mock data
    setTimeout(() => {
      // Generate mock projects
      projects.value = Array.from({ length: 12 }, (_, i) => ({
        id: `project-${i}`,
        title: `Game Project ${i+1}`,
        description: `This is a sample game project description. It includes details about gameplay features and mechanics.`,
        thumbnailUrl: `https://picsum.photos/seed/game${i}/600/400`,
        creatorId: `user-${i % 5}`,
        creatorName: `Developer ${i % 5 + 1}`,
        status: ['concept', 'in-development', 'beta', 'released'][i % 4],
        genre: [genreOptions[i % 10], genreOptions[(i+3) % 10]],
        platforms: ['PC', 'Mac', 'Mobile'][i % 3].split(','),
        engine: ['Unity', 'Unreal', 'Godot', 'Custom'][i % 4],
        teamSize: (i % 5) + 1,
        metrics: {
          views: Math.floor(Math.random() * 1000),
          likes: Math.floor(Math.random() * 200),
          followers: Math.floor(Math.random() * 100)
        }
      }));
      
      // Apply filters
      if (filters.value.status.length > 0) {
        projects.value = projects.value.filter(p => 
          filters.value.status.includes(p.status)
        );
      }
      
      if (filters.value.genre.length > 0) {
        projects.value = projects.value.filter(p => 
          p.genre.some(g => filters.value.genre.includes(g))
        );
      }
      
      if (filters.value.search) {
        const search = filters.value.search.toLowerCase();
        projects.value = projects.value.filter(p => 
          p.title.toLowerCase().includes(search) || 
          p.description.toLowerCase().includes(search)
        );
      }
      
      isLoading.value = false;
    }, 500);
  } catch (err) {
    console.error('Error fetching projects:', err);
    error.value = 'Failed to load projects';
    isLoading.value = false;
  }
};

const resetFilters = () => {
  filters.value = {
    status: [],
    genre: [],
    sort: 'newest',
    search: ''
  };
  searchQuery.value = '';
  applyFilters();
};

// Fetch initial projects
onMounted(() => {
  applyFilters();
});
</script>
