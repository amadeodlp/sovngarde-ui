<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[60vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="container mx-auto px-4 py-12 text-center">
      <div class="bg-neutral-850 rounded-xl border border-white/10 p-8 max-w-2xl mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 class="text-2xl font-bold text-white mb-3">Failed to load project</h2>
        <p class="text-white/70 mb-6">{{ error }}</p>
        <div class="flex justify-center space-x-4">
          <button @click="loadProject" class="btn btn-primary">Try Again</button>
          <NuxtLink to="/discover" class="btn btn-outline">Back to Discover</NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Project Details -->
    <div v-else-if="project" class="pb-16">
      <!-- Hero Section -->
      <div class="relative h-[40vh] bg-neutral-900 overflow-hidden">
        <!-- Cover Image -->
        <img 
          :src="project.thumbnailUrl" 
          :alt="project.title" 
          class="w-full h-full object-cover opacity-50"
        />
        
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent"></div>
        
        <!-- Project Info -->
        <div class="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-8">
          <div class="flex flex-col md:flex-row md:items-end gap-6">
            <!-- Thumbnail -->
            <div class="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-4 border-neutral-950 shadow-lg">
              <img 
                :src="project.thumbnailUrl" 
                :alt="project.title" 
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Info -->
            <div class="flex-1">
              <div class="flex flex-wrap gap-2 mb-2">
                <span class="bg-primary/20 text-primary px-2 py-1 rounded-md text-sm font-medium uppercase">{{ project.status }}</span>
                <span 
                  v-for="(platform, index) in project.platforms" 
                  :key="index" 
                  class="bg-neutral-800/70 text-white/90 px-2 py-1 rounded-md text-sm"
                >
                  {{ platform }}
                </span>
              </div>
              
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{{ project.title }}</h1>
              
              <div class="flex items-center text-white/60 text-sm">
                <span>By {{ project.creatorName }}</span>
                <span class="mx-2">•</span>
                <span>Engine: {{ project.engine }}</span>
                <span class="mx-2">•</span>
                <span>Team: {{ project.teamSize }} {{ project.teamSize === 1 ? 'member' : 'members' }}</span>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3 mt-4 md:mt-0">
              <button 
                @click="followProject" 
                class="btn btn-outline px-6"
                :class="{ 'bg-white/10': isFollowing }"
              >
                {{ isFollowing ? 'Following' : 'Follow' }}
              </button>
              
              <button 
                @click="likeProject" 
                class="btn btn-outline !p-3"
                :class="{ 'text-red-500 border-red-500/30': isLiked }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Left Column (Project Details) -->
          <div class="w-full lg:w-2/3">
            <!-- Tabs -->
            <div class="border-b border-white/10 mb-6">
              <div class="flex overflow-x-auto">
                <button 
                  v-for="tab in tabs" 
                  :key="tab.id" 
                  class="px-5 py-3 font-medium whitespace-nowrap border-b-2 transition-colors"
                  :class="activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-white/60 hover:text-white'"
                  @click="activeTab = tab.id"
                >
                  {{ tab.label }}
                </button>
              </div>
            </div>
            
            <!-- Tab Content -->
            <div>
              <!-- About Tab -->
              <div v-if="activeTab === 'about'" class="space-y-8">
                <!-- Description -->
                <div class="card p-6">
                  <h2 class="text-2xl font-bold text-white mb-4">About the Game</h2>
                  <div class="prose prose-invert">
                    <p class="text-white/80 leading-relaxed">{{ project.description }}</p>
                    
                    <!-- Extended description -->
                    <p class="text-white/80 leading-relaxed mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur
                      euismod, nisi nisl consectetur nisi, euismod nisi nisl consectetur nisi.
                    </p>
                  </div>
                </div>
                
                <!-- Screenshots -->
                <div class="card p-6">
                  <h2 class="text-2xl font-bold text-white mb-6">Screenshots</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="i in 4" :key="i" class="aspect-video rounded-lg overflow-hidden bg-neutral-800">
                      <img 
                        :src="`https://picsum.photos/seed/${project.id}-${i}/800/450`" 
                        :alt="`${project.title} screenshot ${i}`" 
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Updates Tab -->
              <div v-else-if="activeTab === 'updates'" class="space-y-6">
                <div class="card p-6">
                  <h2 class="text-2xl font-bold text-white mb-6">Development Updates</h2>
                  
                  <div class="space-y-8">
                    <div v-for="(update, index) in updates" :key="index" class="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                      <div class="flex justify-between items-center mb-3">
                        <h3 class="text-xl font-semibold text-white">{{ update.title }}</h3>
                        <span class="text-white/60 text-sm">{{ update.date }}</span>
                      </div>
                      
                      <p class="text-white/80">{{ update.content }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Comments Tab -->
              <div v-else-if="activeTab === 'comments'" class="space-y-6">
                <div class="card p-6">
                  <h2 class="text-2xl font-bold text-white mb-6">Comments</h2>
                  
                  <!-- Comment Form -->
                  <div class="mb-8">
                    <textarea 
                      v-model="newComment"
                      placeholder="Leave a comment..." 
                      class="input w-full h-24 resize-none mb-3"
                    ></textarea>
                    <div class="flex justify-end">
                      <button 
                        @click="submitComment" 
                        class="btn btn-primary"
                        :disabled="!newComment.trim()"
                      >
                        Submit Comment
                      </button>
                    </div>
                  </div>
                  
                  <!-- Comments List -->
                  <div v-if="comments.length === 0" class="text-center py-8">
                    <p class="text-white/60">No comments yet. Be the first to comment!</p>
                  </div>
                  
                  <div v-else class="space-y-6">
                    <div v-for="(comment, index) in comments" :key="index" class="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                      <div class="flex items-start space-x-4">
                        <div class="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0">
                          <span class="text-sm font-medium">{{ getInitials(comment.author) }}</span>
                        </div>
                        
                        <div class="flex-1">
                          <div class="flex justify-between items-center mb-2">
                            <span class="font-medium text-white">{{ comment.author }}</span>
                            <span class="text-white/60 text-sm">{{ comment.date }}</span>
                          </div>
                          
                          <p class="text-white/80">{{ comment.content }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Column (Sidebar) -->
          <div class="w-full lg:w-1/3 space-y-6">
            <!-- Project Creator -->
            <div class="card p-6">
              <h3 class="text-xl font-semibold text-white mb-4">Project Creator</h3>
              <div class="flex items-center space-x-4">
                <div class="h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  <span class="text-lg font-medium">{{ getInitials(project.creatorName) }}</span>
                </div>
                
                <div>
                  <h4 class="font-medium text-white">{{ project.creatorName }}</h4>
                  <p class="text-white/60 text-sm">Game Developer</p>
                </div>
              </div>
              
              <button class="btn btn-outline w-full mt-4">View Profile</button>
            </div>
            
            <!-- Project Stats -->
            <div class="card p-6">
              <h3 class="text-xl font-semibold text-white mb-4">Project Stats</h3>
              
              <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div class="text-2xl font-semibold text-white">{{ project.metrics?.views || 0 }}</div>
                  <div class="text-white/60 text-sm">Views</div>
                </div>
                <div>
                  <div class="text-2xl font-semibold text-white">{{ project.metrics?.likes || 0 }}</div>
                  <div class="text-white/60 text-sm">Likes</div>
                </div>
                <div>
                  <div class="text-2xl font-semibold text-white">{{ project.metrics?.followers || 0 }}</div>
                  <div class="text-white/60 text-sm">Followers</div>
                </div>
              </div>
            </div>
            
            <!-- Game Details -->
            <div class="card p-6">
              <h3 class="text-xl font-semibold text-white mb-4">Game Details</h3>
              
              <div class="space-y-4">
                <div>
                  <div class="text-white/60 text-sm">Genre</div>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <span 
                      v-for="(genre, index) in project.genre" 
                      :key="index" 
                      class="bg-neutral-800 text-white/80 px-2 py-1 rounded-md text-xs"
                    >
                      {{ genre }}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div class="text-white/60 text-sm">Platforms</div>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <span 
                      v-for="(platform, index) in project.platforms" 
                      :key="index" 
                      class="bg-neutral-800 text-white/80 px-2 py-1 rounded-md text-xs"
                    >
                      {{ platform }}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div class="text-white/60 text-sm">Engine</div>
                  <div class="text-white">{{ project.engine }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectsStore, type GameProject } from '~/stores/projects';
import { useAuthStore } from '~/stores/auth';

const route = useRoute();
const projectId = route.params.id as string;
const projectsStore = useProjectsStore();
const authStore = useAuthStore();

// State
const project = ref<GameProject | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
const activeTab = ref('about');
const isFollowing = ref(false);
const isLiked = ref(false);
const newComment = ref('');

// Tabs
const tabs = [
  { id: 'about', label: 'About' },
  { id: 'updates', label: 'Updates' },
  { id: 'comments', label: 'Comments' }
];

// Sample data
const updates = ref([
  {
    title: 'New Demo Release',
    date: '2 weeks ago',
    content: 'We\'re excited to announce that a playable demo is now available! This build includes the first three levels and showcases the core gameplay mechanics we\'ve been developing.'
  },
  {
    title: 'Character Design Progress',
    date: '1 month ago',
    content: 'Our art team has been working hard on finalizing the character designs. We\'ve reworked the main protagonist\'s appearance based on early feedback and added more customization options.'
  },
  {
    title: 'Engine Upgrade Complete',
    date: '2 months ago',
    content: 'We\'ve successfully completed the upgrade to the latest engine version, which brings significant performance improvements and new rendering features.'
  }
]);

const comments = ref([
  {
    author: 'GameEnthusiast',
    date: '3 days ago',
    content: 'The art style looks amazing! I\'m really excited to see more gameplay footage. Will there be a beta test before the full release?'
  },
  {
    author: 'IndieSupporter',
    date: '1 week ago',
    content: 'Been following this project since the first announcement. The progress you\'ve made is incredible! The new mechanics shown in the latest video are exactly what this genre needs.'
  }
]);

// Methods
const loadProject = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // For demo purposes, create a mock project
    setTimeout(() => {
      project.value = {
        id: projectId,
        title: `Game Project ${projectId}`,
        description: `This is an exciting game project that combines multiple genres into a unique experience. Players will explore vast worlds, solve puzzles, and engage in tactical combat.`,
        thumbnailUrl: `https://picsum.photos/seed/game${projectId}/800/450`,
        creatorId: 'user-1',
        creatorName: 'GameDevStudio',
        status: ['concept', 'in-development', 'beta', 'released'][parseInt(projectId) % 4],
        genre: ['RPG', 'Adventure', 'Strategy'].slice(0, 2),
        platforms: ['PC', 'Mac', 'PlayStation', 'Xbox', 'Switch'].slice(0, 3),
        engine: ['Unity', 'Unreal', 'Godot', 'Custom'][parseInt(projectId) % 4],
        teamSize: (parseInt(projectId) % 5) + 1,
        metrics: {
          views: 1200 + parseInt(projectId) * 100,
          likes: 342 + parseInt(projectId) * 10,
          followers: 78 + parseInt(projectId) * 5
        }
      };
      isLoading.value = false;
    }, 500);
  } catch (err) {
    console.error('Error loading project:', err);
    error.value = 'Failed to load project details';
    isLoading.value = false;
  }
};

const getInitials = (name: string): string => {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const followProject = () => {
  if (!authStore.isAuthenticated) {
    // Redirect to login
    navigateTo('/login?redirect=' + encodeURIComponent(route.fullPath));
    return;
  }
  
  isFollowing.value = !isFollowing.value;
  
  // Update follower count
  if (project.value && project.value.metrics) {
    if (isFollowing.value) {
      project.value.metrics.followers += 1;
    } else {
      project.value.metrics.followers = Math.max(0, project.value.metrics.followers - 1);
    }
  }
};

const likeProject = () => {
  if (!authStore.isAuthenticated) {
    // Redirect to login
    navigateTo('/login?redirect=' + encodeURIComponent(route.fullPath));
    return;
  }
  
  if (!isLiked.value) {
    isLiked.value = true;
    
    // Update like count
    if (project.value && project.value.metrics) {
      project.value.metrics.likes += 1;
    }
  }
};

const submitComment = () => {
  if (!authStore.isAuthenticated) {
    // Redirect to login
    navigateTo('/login?redirect=' + encodeURIComponent(route.fullPath));
    return;
  }
  
  if (!newComment.value.trim()) return;
  
  // Add comment
  comments.value.unshift({
    author: authStore.username || 'Anonymous',
    date: 'Just now',
    content: newComment.value
  });
  
  // Clear input
  newComment.value = '';
};

// Load project data on mount
onMounted(() => {
  loadProject();
});
</script>
