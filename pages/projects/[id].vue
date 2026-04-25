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
          :src="project.thumbnail_url"
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
                :src="project.thumbnail_url"
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
                <span>By {{ project.creator_name }}</span>
                <span class="mx-2">•</span>
                <span>Engine: {{ project.engine }}</span>
                <span class="mx-2">•</span>
                <span>Team: {{ project.team_size }} {{ project.team_size === 1 ? 'member' : 'members' }}</span>
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
              
              <div v-else-if="activeTab === 'updates'" class="space-y-6">
                <div class="card p-6">
                  <h2 class="text-2xl font-bold text-white mb-6">Development Updates</h2>
                  <p class="text-white/40 text-sm text-center py-4">No updates posted yet.</p>
                </div>
              </div>
              
              <!-- Comments Tab -->
              <div v-else-if="activeTab === 'comments'" class="space-y-6">
                <div class="card p-6">
                  <h2 class="text-2xl font-bold text-white mb-6">Comments</h2>

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

                  <div v-if="projectComments.length === 0" class="text-center py-8">
                    <p class="text-white/60">No comments yet. Be the first to comment!</p>
                  </div>

                  <div v-else class="space-y-6">
                    <div v-for="comment in projectComments" :key="comment.id" class="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                      <div class="flex items-start space-x-4">
                        <div class="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0">
                          <span class="text-sm font-medium">{{ getInitials(comment.author_name) }}</span>
                        </div>
                        <div class="flex-1">
                          <div class="flex justify-between items-center mb-2">
                            <span class="font-medium text-white">{{ comment.author_name }}</span>
                            <span class="text-white/60 text-sm">{{ formatDate(comment.created_at) }}</span>
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
                <h4 class="font-medium text-white">{{ project.creator_name }}</h4>
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
                  <div class="text-2xl font-semibold text-white">{{ project.views || 0 }}</div>
                  <div class="text-white/60 text-sm">Views</div>
                </div>
                <div>
                  <div class="text-2xl font-semibold text-white">{{ project.likes || 0 }}</div>
                  <div class="text-white/60 text-sm">Likes</div>
                </div>
                <div>
                  <div class="text-2xl font-semibold text-white">{{ project.followers || 0 }}</div>
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

const project = ref<GameProject | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
const activeTab = ref('about');
const isFollowing = ref(false);
const isLiked = ref(false);
const newComment = ref('');

interface ProjectComment {
  id: string
  author_name: string
  content: string
  created_at: string
}
const projectComments = ref<ProjectComment[]>([]);

const tabs = [
  { id: 'about', label: 'About' },
  { id: 'updates', label: 'Updates' },
  { id: 'comments', label: 'Comments' }
];

const loadProject = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    await projectsStore.fetchProjectById(projectId);
    project.value = projectsStore.currentProject;
    if (!project.value) throw new Error('Project not found');

    // load comments from forum_comments linked to this project via post, or a direct table
    const { $supabase } = useNuxtApp();
    const { data } = await ($supabase as any)
      .from('forum_comments')
      .select('id, author_name, content, created_at')
      .eq('post_id', projectId)
      .order('created_at', { ascending: false });
    projectComments.value = data || [];
  } catch (err) {
    error.value = 'Failed to load project details';
  } finally {
    isLoading.value = false;
  }
};

const getInitials = (name: string): string => {
  if (!name) return '';
  const parts = name.split(' ');
  return parts.length === 1
    ? parts[0].charAt(0).toUpperCase()
    : (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateString));
};

const followProject = () => {
  if (!authStore.isAuthenticated) {
    navigateTo('/login?redirect=' + encodeURIComponent(route.fullPath));
    return;
  }
  isFollowing.value = !isFollowing.value;
  if (project.value) {
    project.value = {
      ...project.value,
      followers: (project.value.followers || 0) + (isFollowing.value ? 1 : -1)
    };
  }
};

const likeProject = () => {
  if (!authStore.isAuthenticated) {
    navigateTo('/login?redirect=' + encodeURIComponent(route.fullPath));
    return;
  }
  if (!isLiked.value) {
    isLiked.value = true;
    if (project.value) {
      project.value = { ...project.value, likes: (project.value.likes || 0) + 1 };
    }
  }
};

const submitComment = async () => {
  if (!authStore.isAuthenticated) {
    navigateTo('/login?redirect=' + encodeURIComponent(route.fullPath));
    return;
  }
  if (!newComment.value.trim()) return;

  const { $supabase } = useNuxtApp();
  const { data, error: err } = await ($supabase as any)
    .from('forum_comments')
    .insert({
      post_id: projectId,
      author_id: authStore.userId,
      author_name: authStore.username || 'Anonymous',
      content: newComment.value.trim(),
    })
    .select()
    .single();

  if (!err && data) {
    projectComments.value.unshift(data);
    newComment.value = '';
  }
};

onMounted(() => {
  loadProject();
});
</script>
