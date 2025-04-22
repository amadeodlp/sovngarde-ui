<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-white mb-6">Developer Dashboard</h1>
    
    <!-- Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card p-6">
        <h3 class="text-lg font-medium text-white mb-2">My Projects</h3>
        <div class="flex items-end justify-between">
          <div class="text-3xl font-bold text-white">{{ projectsCount }}</div>
          <NuxtLink to="/projects/new" class="text-primary hover:text-primary/80">Add New</NuxtLink>
        </div>
      </div>
      
      <div class="card p-6">
        <h3 class="text-lg font-medium text-white mb-2">Total Views</h3>
        <div class="flex items-end justify-between">
          <div class="text-3xl font-bold text-white">{{ totalViews.toLocaleString() }}</div>
          <div class="text-green-500 flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            8.2%
          </div>
        </div>
      </div>
      
      <div class="card p-6">
        <h3 class="text-lg font-medium text-white mb-2">Followers</h3>
        <div class="flex items-end justify-between">
          <div class="text-3xl font-bold text-white">{{ totalFollowers.toLocaleString() }}</div>
          <div class="text-green-500 flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            12.5%
          </div>
        </div>
      </div>
    </div>
    
    <!-- Projects List -->
    <div class="card p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-white">My Projects</h2>
        <NuxtLink to="/projects/new" class="btn btn-primary">New Project</NuxtLink>
      </div>
      
      <div v-if="isLoading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
      
      <div v-else-if="error" class="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-500">
        {{ error }}
      </div>
      
      <div v-else-if="projects.length === 0" class="py-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <h3 class="text-xl font-semibold text-white mb-2">No projects yet</h3>
        <p class="text-white/70 mb-6">Start by creating your first game project</p>
        <NuxtLink to="/projects/new" class="btn btn-primary">Create Project</NuxtLink>
      </div>
      
      <div v-else>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-left text-white/60 border-b border-white/10">
                <th class="pb-3 font-medium">Project</th>
                <th class="pb-3 font-medium">Status</th>
                <th class="pb-3 font-medium">Views</th>
                <th class="pb-3 font-medium">Likes</th>
                <th class="pb-3 font-medium">Last Updated</th>
                <th class="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in projects" :key="project.id" class="border-b border-white/5 hover:bg-white/5">
                <td class="py-4">
                  <div class="flex items-center space-x-3">
                    <div class="h-10 w-16 bg-neutral-800 rounded overflow-hidden">
                      <img 
                        v-if="project.thumbnailUrl" 
                        :src="project.thumbnailUrl" 
                        :alt="project.title" 
                        class="h-full w-full object-cover"
                      />
                    </div>
                    <div class="font-medium text-white">{{ project.title }}</div>
                  </div>
                </td>
                <td class="py-4">
                  <span 
                    class="px-2 py-1 rounded text-xs font-medium"
                    :class="{
                      'bg-blue-500/20 text-blue-500': project.status === 'concept',
                      'bg-yellow-500/20 text-yellow-500': project.status === 'in-development',
                      'bg-purple-500/20 text-purple-500': project.status === 'beta',
                      'bg-green-500/20 text-green-500': project.status === 'released'
                    }"
                  >
                    {{ project.status }}
                  </span>
                </td>
                <td class="py-4 text-white/80">{{ project.metrics?.views.toLocaleString() || 0 }}</td>
                <td class="py-4 text-white/80">{{ project.metrics?.likes.toLocaleString() || 0 }}</td>
                <td class="py-4 text-white/80">{{ formatDate(project.updatedAt) }}</td>
                <td class="py-4">
                  <div class="flex space-x-2 justify-end">
                    <NuxtLink :to="`/projects/${project.id}`" class="text-white/60 hover:text-white p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </NuxtLink>
                    <NuxtLink :to="`/projects/${project.id}/edit`" class="text-white/60 hover:text-white p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </NuxtLink>
                    <button @click="confirmDelete(project)" class="text-white/60 hover:text-red-500 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Recent Activity -->
    <div class="card p-6">
      <h2 class="text-xl font-bold text-white mb-6">Recent Activity</h2>
      
      <div class="space-y-4">
        <div v-for="(activity, index) in recentActivity" :key="index" class="flex items-start space-x-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
          <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <svg v-if="activity.type === 'view'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg v-else-if="activity.type === 'like'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <svg v-else-if="activity.type === 'follow'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          
          <div class="flex-1">
            <div class="flex justify-between items-start">
              <p class="text-white/80">
                <span class="font-medium text-white">{{ activity.user }}</span>
                {{ activity.action }}
                <span class="font-medium text-white">{{ activity.project }}</span>
              </p>
              <span class="text-white/60 text-sm">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useProjectsStore, type GameProject } from '~/stores/projects';

const authStore = useAuthStore();
const projectsStore = useProjectsStore();

// Check authentication
if (!authStore.isAuthenticated) {
  navigateTo('/login?redirect=/dashboard');
}

// State
const isLoading = ref(true);
const error = ref<string | null>(null);
const projects = ref<GameProject[]>([]);
const projectToDelete = ref<GameProject | null>(null);
const showDeleteModal = ref(false);

// Sample data for activity
const recentActivity = ref([
  {
    type: 'view',
    user: 'GameLover42',
    action: 'viewed your project',
    project: 'Pixel Knights',
    time: '5 minutes ago'
  },
  {
    type: 'like',
    user: 'DevFriend',
    action: 'liked your project',
    project: 'Nebula Frontier',
    time: '30 minutes ago'
  },
  {
    type: 'comment',
    user: 'RPGFan',
    action: 'commented on your project',
    project: 'Dragon Realm',
    time: '2 hours ago'
  },
  {
    type: 'follow',
    user: 'GameCollector',
    action: 'followed your project',
    project: 'Pixel Knights',
    time: '5 hours ago'
  },
  {
    type: 'view',
    user: 'AdventureSeeker',
    action: 'viewed your project',
    project: 'Dragon Realm',
    time: '1 day ago'
  }
]);

// Computed values
const projectsCount = computed(() => projects.value.length);
const totalViews = computed(() => 
  projects.value.reduce((sum, project) => sum + (project.metrics?.views || 0), 0)
);
const totalFollowers = computed(() => 
  projects.value.reduce((sum, project) => sum + (project.metrics?.followers || 0), 0)
);

// Methods
const loadProjects = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // For demo, create mock projects
    setTimeout(() => {
      projects.value = Array.from({ length: 5 }, (_, i) => ({
        id: `project-${i+1}`,
        title: ['Pixel Knights', 'Nebula Frontier', 'Dragon Realm', 'Space Explorer', 'Dungeon Crawler'][i],
        description: `This is project ${i+1} description.`,
        thumbnailUrl: `https://picsum.photos/seed/project${i+1}/200/120`,
        creatorId: authStore.username,
        creatorName: authStore.username,
        status: ['concept', 'in-development', 'beta', 'released'][i % 4],
        genre: ['RPG', 'Adventure', 'Strategy', 'Puzzle', 'Platformer'][i].split(','),
        platforms: ['PC', 'Mac', 'Mobile'][i % 3].split(','),
        engine: ['Unity', 'Unreal', 'Godot', 'Custom'][i % 4],
        teamSize: (i % 5) + 1,
        createdAt: new Date(Date.now() - (30 - i) * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
        metrics: {
          views: 1000 + i * 200,
          likes: 100 + i * 50,
          followers: 20 + i * 10
        }
      }));
      
      isLoading.value = false;
    }, 1000);
  } catch (err) {
    console.error('Error loading projects:', err);
    error.value = 'Failed to load your projects';
    isLoading.value = false;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

const confirmDelete = (project: GameProject) => {
  projectToDelete.value = project;
  showDeleteModal.value = true;
  // In a real app, you'd show a confirmation modal here
  if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
    deleteProject(project.id);
  }
};

const deleteProject = async (projectId: string) => {
  try {
    // In a real app, this would call the API
    projects.value = projects.value.filter(p => p.id !== projectId);
  } catch (err) {
    console.error('Error deleting project:', err);
    error.value = 'Failed to delete project';
  }
};

// Load data on mount
onMounted(() => {
  loadProjects();
});
</script>
