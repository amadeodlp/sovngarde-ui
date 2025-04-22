<template>
  <div class="container mx-auto px-4 py-16">
    <div class="max-w-3xl mx-auto text-center">
      <!-- Header -->
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 mt-12">Live Streams</h1>
      
      <!-- Icon -->
      <div class="relative mx-auto w-32 h-32 mb-8">
        <div class="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"></div>
        <div class="relative flex items-center justify-center h-full w-full bg-primary/30 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      
      <!-- Coming Soon Message -->
      <h2 class="text-3xl font-bold text-white mb-4">Coming Soon</h2>
      <p class="text-xl text-white/80 mb-8">
        We're working hard to bring you live game development streams.
        Soon you'll be able to watch creators build their games in real-time,
        learn from their process, and interact directly with developers.
      </p>
      
      <!-- Features Preview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
        <div class="card p-6">
          <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Watch Game Dev Live</h3>
          <p class="text-white/70">
            See real-time game development from talented creators across all genres and skill levels.
          </p>
        </div>
        
        <div class="card p-6">
          <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Chat & Interact</h3>
          <p class="text-white/70">
            Ask questions, provide feedback, and interact directly with developers as they work.
          </p>
        </div>
        
        <div class="card p-6">
          <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Stream Your Process</h3>
          <p class="text-white/70">
            Share your own development journey with the community and build an audience for your games.
          </p>
        </div>
      </div>
      
      <!-- Notification Signup -->
      <div class="card p-8 max-w-xl mx-auto">
        <h3 class="text-xl font-semibold text-white mb-4">Get Notified When Streaming Launches</h3>
        <p class="text-white/70 mb-4">
          Be among the first to know when our streaming platform goes live.
          We'll send you an email as soon as it's ready.
        </p>
        
        <div class="flex gap-3">
          <input 
            type="email" 
            placeholder="Your email address" 
            class="input flex-1"
          />
          <button class="btn btn-primary whitespace-nowrap">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
