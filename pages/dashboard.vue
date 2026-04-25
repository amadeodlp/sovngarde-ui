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
                        v-if="project.thumbnail_url"
                        :src="project.thumbnail_url"
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
                <td class="py-4 text-white/80">{{ (project.views || 0).toLocaleString() }}</td>
                <td class="py-4 text-white/80">{{ (project.likes || 0).toLocaleString() }}</td>
                <td class="py-4 text-white/80">{{ formatDate(project.created_at) }}</td>
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
      <p class="text-white/40 text-sm text-center py-4">Activity feed coming soon.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { type GameProject } from '~/stores/projects';

const authStore = useAuthStore();

if (!authStore.isAuthenticated) {
  navigateTo('/login?redirect=/dashboard');
}

const isLoading = ref(true);
const error = ref<string | null>(null);
const projects = ref<GameProject[]>([]);

const projectsCount = computed(() => projects.value.length);
const totalViews = computed(() => projects.value.reduce((sum, p) => sum + (p.views || 0), 0));
const totalFollowers = computed(() => projects.value.reduce((sum, p) => sum + (p.followers || 0), 0));

const loadProjects = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const { $supabase } = useNuxtApp();
    const { data, error: err } = await ($supabase as any)
      .from('game_projects')
      .select('*')
      .eq('creator_id', authStore.userId)
      .order('created_at', { ascending: false });
    if (err) throw err;
    projects.value = data || [];
  } catch (err) {
    error.value = 'Failed to load your projects';
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return '—';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateString));
};

const confirmDelete = async (project: GameProject) => {
  if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return;
  try {
    const { $supabase } = useNuxtApp();
    const { error: err } = await ($supabase as any).from('game_projects').delete().eq('id', project.id);
    if (err) throw err;
    projects.value = projects.value.filter(p => p.id !== project.id);
  } catch (err) {
    error.value = 'Failed to delete project';
  }
};

onMounted(() => {
  loadProjects();
});
</script>
