<template>
  <div class="container mx-auto px-4 py-12 mt-12">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-white mb-4">Community</h1>
      <p class="text-xl text-white/80 max-w-3xl">
        Connect with fellow game developers and players, join discussions,
        and be part of the SovnGarde community.
      </p>
    </div>
    
    <!-- Main Content -->
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Left Column (Categories) -->
      <div class="w-full lg:w-1/4">
        <!-- Categories -->
        <div class="card p-6 mb-6">
          <h2 class="text-xl font-bold text-white mb-4">Categories</h2>
          
          <div class="space-y-3">
            <button
              v-for="category in communityStore.categories"
              :key="category.id"
              class="flex items-center w-full p-2 rounded-md text-left hover:bg-neutral-800 transition-colors"
              :class="{ 'bg-neutral-800': activeCategoryId === category.id }"
              @click="selectCategory(category.id)"
            >
              <div
                class="h-8 w-8 rounded-md flex items-center justify-center mr-3"
                :style="{ background: (category.color || '#6366f1') + '33', color: category.color || '#6366f1' }"
              >
                <span class="text-lg">{{ category.icon }}</span>
              </div>
              <div class="flex-1">
                <span class="text-white font-medium">{{ category.name }}</span>
                <div class="text-white/60 text-sm">{{ category.post_count || 0 }} posts</div>
              </div>
            </button>
          </div>
        </div>
        
        <!-- Community Stats -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-white mb-4">Community Stats</h2>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-white">{{ memberCount }}</div>
              <div class="text-white/60 text-sm">Members</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-white">{{ totalPostCount }}</div>
              <div class="text-white/60 text-sm">Posts</div>
            </div>
          </div>
          
          <div class="mt-6">
            <button class="btn btn-primary w-full">Join Community</button>
          </div>
        </div>
      </div>
      
      <!-- Right Column (Forum Content) -->
      <div class="flex-1">
        <!-- Actions Bar -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div class="flex items-center">
            <h2 class="text-2xl font-bold text-white mr-3">
          {{ activeCategoryId ? getCategoryName(activeCategoryId) : 'All Discussions' }}
            </h2>
            <button v-if="activeCategoryId" @click="clearCategoryFilter" class="text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="flex space-x-4 w-full md:w-auto">
            <div class="relative flex-1 md:flex-none">
              <input 
                type="text" 
                placeholder="Search discussions..." 
                class="input pr-10 w-full md:w-64"
              />
              <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            <button class="btn btn-primary">New Post</button>
          </div>
        </div>
        
        <!-- Pinned Posts -->
        <div v-if="!activeCategoryId" class="mb-8">
          <div class="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h3 class="text-xl font-semibold text-white">Pinned Posts</h3>
          </div>
          
          <div class="space-y-4">
            <div v-for="post in communityStore.pinnedPosts" :key="post.id" class="card p-5 hover:border-primary/30 transition-colors">
              <div class="flex items-start">
                <div class="hidden sm:block h-10 w-10 rounded-full bg-neutral-800 flex-shrink-0 mr-4">
                  <div class="h-full w-full flex items-center justify-center">
                    <span class="text-sm font-medium">{{ getInitials(post.author_name) }}</span>
                  </div>
                </div>

                <div class="flex-1">
                  <div class="flex items-center text-yellow-500 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <span class="text-sm font-medium">Pinned</span>
                  </div>

                  <h3 class="text-lg font-medium text-white hover:text-primary mb-1">{{ post.title }}</h3>

                  <div class="flex flex-wrap items-center text-sm text-white/60 gap-x-4 gap-y-2">
                    <span>{{ post.author_name }}</span>
                    <span>{{ formatDate(post.created_at) }}</span>
                    <span class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      {{ post.comment_count || 0 }}
                    </span>
                    <span class="inline-block bg-neutral-800 text-white/80 px-2 py-0.5 rounded-md text-xs">
                      {{ getCategoryName(post.category_id) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Posts List -->
        <div>
          <div class="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <h3 class="text-xl font-semibold text-white">Recent Discussions</h3>
          </div>
          
          <div class="space-y-4">
            <div v-for="post in filteredRecentPosts" :key="post.id" class="card p-5 hover:border-primary/30 transition-colors">
              <div class="flex items-start">
                <div class="hidden sm:block h-10 w-10 rounded-full bg-neutral-800 flex-shrink-0 mr-4">
                  <div class="h-full w-full flex items-center justify-center">
                    <span class="text-sm font-medium">{{ getInitials(post.author_name) }}</span>
                  </div>
                </div>

                <div class="flex-1">
                  <h3 class="text-lg font-medium text-white hover:text-primary mb-1">{{ post.title }}</h3>

                  <div class="flex flex-wrap items-center text-sm text-white/60 gap-x-4 gap-y-2">
                    <span>{{ post.author_name }}</span>
                    <span>{{ formatDate(post.created_at) }}</span>
                    <span class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      {{ post.comment_count || 0 }}
                    </span>
                    <span class="inline-block bg-neutral-800 text-white/80 px-2 py-0.5 rounded-md text-xs">
                      {{ getCategoryName(post.category_id) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div class="flex justify-center mt-8">
            <div class="flex space-x-1">
              <button class="h-9 w-9 flex items-center justify-center rounded-md border border-white/10 text-white/80 hover:bg-neutral-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button class="h-9 w-9 flex items-center justify-center rounded-md border border-white/10 bg-primary text-white">1</button>
              <button class="h-9 w-9 flex items-center justify-center rounded-md border border-white/10 text-white/80 hover:bg-neutral-800">2</button>
              <button class="h-9 w-9 flex items-center justify-center rounded-md border border-white/10 text-white/80 hover:bg-neutral-800">3</button>
              <button class="h-9 w-9 flex items-center justify-center rounded-md border border-white/10 text-white/80 hover:bg-neutral-800">4</button>
              <button class="h-9 w-9 flex items-center justify-center rounded-md border border-white/10 text-white/80 hover:bg-neutral-800">5</button>
              
              <button class="h-9 w-9 flex items-center justify-center rounded-md border border-white/10 text-white/80 hover:bg-neutral-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCommunityStore } from '~/stores/community';

const communityStore = useCommunityStore();
const activeCategoryId = ref<string | null>(null);
const memberCount = ref(0);

const totalPostCount = computed(() =>
  communityStore.categories.reduce((sum, c) => sum + (c.post_count || 0), 0)
);

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

const selectCategory = (id: string) => {
  activeCategoryId.value = id;
  communityStore.fetchPosts(id);
};

const clearCategoryFilter = () => {
  activeCategoryId.value = null;
  communityStore.fetchPosts();
};

const getCategoryName = (id: string): string => {
  return communityStore.categories.find(c => c.id === id)?.name || '';
};

const filteredRecentPosts = computed(() => {
  if (!activeCategoryId.value) return communityStore.regularPosts;
  return communityStore.regularPosts.filter(p => p.category_id === activeCategoryId.value);
});

onMounted(async () => {
  await Promise.all([
    communityStore.fetchCategories(),
    communityStore.fetchPosts(),
  ]);
  // fetch real member count
  const { $supabase } = useNuxtApp();
  const { count } = await ($supabase as any)
    .from('profiles')
    .select('id', { count: 'exact', head: true });
  memberCount.value = count || 0;
});
</script>
