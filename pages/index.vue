<template>
  <div>
    <!-- Hero Section -->
    <section class="relative py-20 bg-neutral-950">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-5xl font-bold text-white mt-6 mb-6">
            <span class="text-primary">Build</span> Games, <span class="text-primary">Grow</span> Community
          </h1>
          <p class="text-xl text-white/80 mb-8">
            SovnGarde connects indie developers with players and fellow creators. Showcase your projects, stream development, and build your audience.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/signup" class="btn btn-primary px-8 py-3 text-lg">Start Creating</NuxtLink>
            <NuxtLink to="/discover" class="btn btn-outline px-8 py-3 text-lg">Discover Games</NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Featured Projects -->
    <section class="py-16 bg-neutral-900">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-10">
          <h2 class="text-3xl font-bold text-white">Featured Projects</h2>
          <NuxtLink to="/discover" class="text-primary">View all →</NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i" class="card overflow-hidden group">
            <!-- Project thumbnail -->
            <div class="aspect-video bg-neutral-800 relative overflow-hidden">
              <img 
                :src="`https://picsum.photos/seed/game${i}/600/340`" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Game thumbnail"
              />
              <div class="absolute top-2 right-2 bg-primary/90 text-white text-xs px-2 py-1 rounded">
                {{ ['In Development', 'Beta', 'Released'][i-1] }}
              </div>
            </div>
            
            <!-- Project info -->
            <div class="p-5">
              <h3 class="text-xl font-semibold text-white mb-2">
                {{ ['Nebula Frontier', 'Pixel Knights', 'Dragon Realm'][i-1] }}
              </h3>
              <p class="text-white/70 line-clamp-2 mb-4">
                {{ ['A space exploration RPG with procedurally generated planets', 'Retro-style action adventure with modern mechanics', 'Open world fantasy with deep crafting system'][i-1] }}
              </p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="bg-neutral-800 text-white/70 px-2 py-1 rounded-md text-xs">
                  {{ ['Space', 'Pixel Art', 'Fantasy'][i-1] }}
                </span>
                <span class="bg-neutral-800 text-white/70 px-2 py-1 rounded-md text-xs">
                  {{ ['RPG', 'Adventure', 'Open World'][i-1] }}
                </span>
              </div>
              
              <div class="flex justify-between items-center">
                <div class="text-sm text-white/60">
                  <span>By {{ ['CosmicGames', 'RetroStudios', 'DragonDev'][i-1] }}</span>
                </div>
                <NuxtLink :to="`/projects/${i}`" class="text-primary">View Project</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="py-16 bg-neutral-950">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-white text-center mb-14">Why Game Developers Choose SovnGarde</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="text-center">
            <div class="h-16 w-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Showcase Your Games</h3>
            <p class="text-white/70">Create beautiful project pages with screenshots, videos, and details to showcase your games.</p>
          </div>
          
          <div class="text-center">
            <div class="h-16 w-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Build Your Community</h3>
            <p class="text-white/70">Connect with players, get feedback, and build a loyal community around your games.</p>
          </div>
          
          <div class="text-center">
            <div class="h-16 w-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Live Stream Development</h3>
            <p class="text-white/70">Stream your game development process, share knowledge, and grow your audience.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-primary/80 to-secondary/80">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold text-white mb-6">Ready to showcase your game?</h2>
        <p class="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Join thousands of game developers already building their games and growing their audience on SovnGarde.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink to="/signup" class="btn bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg">Get Started</NuxtLink>
          <NuxtLink to="/discover" class="btn border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg">Explore Projects</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
