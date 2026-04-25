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
            <button @click="joinCommunity" class="btn btn-primary w-full">
              {{ joinedCommunity ? 'Joined ✓' : 'Join Community' }}
            </button>
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
                v-model="searchQuery"
                type="text" 
                placeholder="Search discussions..." 
                class="input pr-10 w-full md:w-64"
                @keyup.enter="handleSearch"
              />
              <button @click="handleSearch" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            <button @click="openNewPostModal" class="btn btn-primary">New Post</button>
          </div>
        </div>

        <!-- New Post Modal -->
        <div v-if="showNewPostModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div class="card p-8 w-full max-w-lg mx-4">
            <h2 class="text-xl font-bold text-white mb-4">New Post</h2>
            <div v-if="newPostError" class="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {{ newPostError }}
            </div>
            <div class="mb-4">
              <label class="block text-white font-medium mb-1">Title</label>
              <input v-model="newPostTitle" type="text" class="input w-full" placeholder="Post title..." />
            </div>
            <div class="mb-4">
              <label class="block text-white font-medium mb-1">Category</label>
              <select v-model="newPostCategoryId" class="input w-full">
                <option value="" disabled>Select a category</option>
                <option v-for="cat in communityStore.categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>
            <div class="mb-6">
              <label class="block text-white font-medium mb-1">Content</label>
              <textarea v-model="newPostContent" class="input w-full h-32 resize-none" placeholder="Write your post..."></textarea>
            </div>
            <div class="flex justify-end gap-3">
              <button @click="showNewPostModal = false" class="btn btn-outline">Cancel</button>
              <button @click="submitNewPost" class="btn btn-primary" :disabled="newPostLoading">
                {{ newPostLoading ? 'Posting...' : 'Post' }}
              </button>
            </div>
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
            <div v-for="post in paginatedPosts" :key="post.id" class="card p-5 hover:border-primary/30 transition-colors">
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
          <div v-if="totalPages > 1" class="flex justify-center mt-8">
            <div class="flex space-x-1">
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="h-9 w-9 flex items-center justify-center rounded-md border border-white/10 text-white/80 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                class="h-9 w-9 flex items-center justify-center rounded-md border border-white/10 text-white/80 hover:bg-neutral-800"
                :class="{ 'bg-primary text-white border-primary': currentPage === page }"
              >
                {{ page }}
              </button>
              
              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="h-9 w-9 flex items-center justify-center rounded-md border border-white/10 text-white/80 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
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
import { useAuthStore } from '~/stores/auth';

const communityStore = useCommunityStore();
const authStore = useAuthStore();

const activeCategoryId = ref<string | null>(null);
const memberCount = ref(0);
const joinedCommunity = ref(false);
const searchQuery = ref('');
const currentPage = ref(1);
const postsPerPage = 10;

const showNewPostModal = ref(false);
const newPostTitle = ref('');
const newPostContent = ref('');
const newPostCategoryId = ref('');
const newPostLoading = ref(false);
const newPostError = ref('');

const totalPostCount = computed(() =>
  communityStore.categories.reduce((sum, c) => sum + (c.post_count || 0), 0)
);

const filteredRecentPosts = computed(() => {
  let posts = communityStore.regularPosts;
  if (activeCategoryId.value) {
    posts = posts.filter(p => p.category_id === activeCategoryId.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    posts = posts.filter(p => p.title.toLowerCase().includes(q));
  }
  return posts;
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRecentPosts.value.length / postsPerPage)));

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  return filteredRecentPosts.value.slice(start, start + postsPerPage);
});

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
  currentPage.value = 1;
  communityStore.fetchPosts(id);
};

const clearCategoryFilter = () => {
  activeCategoryId.value = null;
  currentPage.value = 1;
  communityStore.fetchPosts();
};

const getCategoryName = (id: string): string => {
  return communityStore.categories.find(c => c.id === id)?.name || '';
};

const handleSearch = () => {
  currentPage.value = 1;
};

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const joinCommunity = () => {
  if (!authStore.isAuthenticated) {
    navigateTo('/login?redirect=/community');
    return;
  }
  joinedCommunity.value = true;
};

const openNewPostModal = () => {
  if (!authStore.isAuthenticated) {
    navigateTo('/login?redirect=/community');
    return;
  }
  newPostTitle.value = '';
  newPostContent.value = '';
  newPostCategoryId.value = activeCategoryId.value || '';
  newPostError.value = '';
  showNewPostModal.value = true;
};

const submitNewPost = async () => {
  if (!newPostTitle.value.trim() || !newPostContent.value.trim() || !newPostCategoryId.value) {
    newPostError.value = 'Please fill in all fields.';
    return;
  }
  newPostLoading.value = true;
  newPostError.value = '';
  const result = await communityStore.createPost({
    title: newPostTitle.value.trim(),
    content: newPostContent.value.trim(),
    category_id: newPostCategoryId.value,
  });
  newPostLoading.value = false;
  if (result.success) {
    showNewPostModal.value = false;
  } else {
    newPostError.value = result.error || 'Failed to create post.';
  }
};

onMounted(async () => {
  await Promise.all([
    communityStore.fetchCategories(),
    communityStore.fetchPosts(),
  ]);
  const { $supabase } = useNuxtApp();
  const { count } = await ($supabase as any)
    .from('profiles')
    .select('id', { count: 'exact', head: true });
  memberCount.value = count || 0;
});
</script>
