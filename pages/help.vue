<template>
  <div class="container mx-auto px-4 py-12">
    <div class="text-center mb-12 mt-12">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Help Center</h1>
      <p class="text-xl text-white/80 max-w-3xl mx-auto">
        Find answers to common questions and learn how to make the most of SovnGarde.
      </p>
      
      <!-- Search bar -->
      <div class="max-w-xl mx-auto mt-8">
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search for help..." 
            class="input pr-10 w-full"
          />
          <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- FAQ Categories -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div class="card p-6 text-center hover:border-primary/30 transition-colors">
        <div class="bg-primary/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Account & Profile</h3>
        <p class="text-white/70 mb-4">Managing your account, profile settings, and login issues.</p>
        <button class="text-primary hover:text-primary/80">View FAQs →</button>
      </div>
      
      <div class="card p-6 text-center hover:border-primary/30 transition-colors">
        <div class="bg-primary/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Projects & Uploads</h3>
        <p class="text-white/70 mb-4">Creating and managing game projects, uploading media, and sharing updates.</p>
        <button class="text-primary hover:text-primary/80">View FAQs →</button>
      </div>
      
      <div class="card p-6 text-center hover:border-primary/30 transition-colors">
        <div class="bg-primary/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Live Streaming</h3>
        <p class="text-white/70 mb-4">Setting up and managing live streams, technical requirements, and best practices.</p>
        <button class="text-primary hover:text-primary/80">View FAQs →</button>
      </div>
    </div>
    
    <!-- Popular FAQs -->
    <div class="card p-8 mb-12">
      <h2 class="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      
      <div class="space-y-4">
        <div class="border-b border-white/10 pb-4">
          <button class="flex justify-between items-center w-full text-left" @click="toggle(1)">
            <h3 class="text-lg font-medium text-white">How do I create a project on SovnGarde?</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/60" :class="{ 'transform rotate-180': activeQuestion === 1 }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div v-show="activeQuestion === 1" class="mt-3 text-white/70">
            <p class="mb-2">To create a project on SovnGarde:</p>
            <ol class="list-decimal pl-5 space-y-1">
              <li>Navigate to your Dashboard</li>
              <li>Click on "New Project" button</li>
              <li>Fill in your project details including title, description, and category</li>
              <li>Upload your game's key images</li>
              <li>Add any additional information like platform availability and development status</li>
              <li>Click "Create Project" to publish</li>
            </ol>
            <p class="mt-2">You can edit your project at any time after creation.</p>
          </div>
        </div>
        
        <div class="border-b border-white/10 pb-4">
          <button class="flex justify-between items-center w-full text-left" @click="toggle(2)">
            <h3 class="text-lg font-medium text-white">What types of media can I upload to my project?</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/60" :class="{ 'transform rotate-180': activeQuestion === 2 }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div v-show="activeQuestion === 2" class="mt-3 text-white/70">
            <p>SovnGarde supports various media types for your projects:</p>
            <ul class="list-disc pl-5 space-y-1 mt-2">
              <li>Images (PNG, JPG, GIF) - up to 10MB each</li>
              <li>Videos (MP4, WebM) - up to 500MB each</li>
              <li>Audio samples (MP3, WAV) - up to 50MB each</li>
              <li>Downloadable files (ZIP, PDF) - up to 1GB each</li>
            </ul>
            <p class="mt-2">We recommend optimizing your media files for web viewing for the best experience.</p>
          </div>
        </div>
        
        <div class="border-b border-white/10 pb-4">
          <button class="flex justify-between items-center w-full text-left" @click="toggle(3)">
            <h3 class="text-lg font-medium text-white">How do I start a live stream?</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/60" :class="{ 'transform rotate-180': activeQuestion === 3 }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div v-show="activeQuestion === 3" class="mt-3 text-white/70">
            <p>To start a live stream on SovnGarde:</p>
            <ol class="list-decimal pl-5 space-y-1 mt-2">
              <li>Go to your Dashboard and click on "Live Streams"</li>
              <li>Click "Start New Stream"</li>
              <li>Configure your stream settings (title, game project, privacy)</li>
              <li>Copy your stream key</li>
              <li>Open your preferred streaming software (OBS, Streamlabs, etc.)</li>
              <li>Enter your stream key and set up your scenes</li>
              <li>Start streaming from your software</li>
            </ol>
            <p class="mt-2">Your stream will automatically appear on your profile and in the Live Streams section once it's active.</p>
          </div>
        </div>
        
        <div class="border-b border-white/10 pb-4">
          <button class="flex justify-between items-center w-full text-left" @click="toggle(4)">
            <h3 class="text-lg font-medium text-white">How do I change my account email or password?</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/60" :class="{ 'transform rotate-180': activeQuestion === 4 }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div v-show="activeQuestion === 4" class="mt-3 text-white/70">
            <p>To update your account information:</p>
            <ol class="list-decimal pl-5 space-y-1 mt-2">
              <li>Click on your profile picture in the top-right corner</li>
              <li>Select "Settings" from the dropdown menu</li>
              <li>In the "Account" tab, you can update your email</li>
              <li>To change password, go to the "Security" tab</li>
              <li>Enter your current password and then your new password</li>
              <li>Click "Save Changes"</li>
            </ol>
            <p class="mt-2">You'll receive confirmation emails when these changes are made for security purposes.</p>
          </div>
        </div>
        
        <div class="border-b border-white/10 pb-4">
          <button class="flex justify-between items-center w-full text-left" @click="toggle(5)">
            <h3 class="text-lg font-medium text-white">What are the requirements for project thumbnails?</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/60" :class="{ 'transform rotate-180': activeQuestion === 5 }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div v-show="activeQuestion === 5" class="mt-3 text-white/70">
            <p>For the best presentation of your project, thumbnails should meet these requirements:</p>
            <ul class="list-disc pl-5 space-y-1 mt-2">
              <li>Dimensions: 16:9 aspect ratio (recommended 1280x720px)</li>
              <li>Format: PNG or JPG</li>
              <li>Maximum size: 5MB</li>
              <li>Content: Should visually represent your game (screenshots, key art, logo)</li>
              <li>Text: Minimal text is recommended for better visibility</li>
            </ul>
            <p class="mt-2">High-quality thumbnails significantly increase the chance of users discovering your project.</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Contact Support -->
    <div class="card p-8">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-white mb-3">Still Need Help?</h2>
        <p class="text-white/70 max-w-2xl mx-auto">
          Can't find what you're looking for? Our support team is ready to assist you with any questions or issues.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="text-center p-6 bg-neutral-900 rounded-xl">
          <div class="bg-primary/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Email Support</h3>
          <p class="text-white/70 mb-4">Send us a detailed message and we'll get back to you within 24 hours.</p>
          <button class="btn btn-primary">Contact via Email</button>
        </div>
        
        <div class="text-center p-6 bg-neutral-900 rounded-xl">
          <div class="bg-primary/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Live Chat</h3>
          <p class="text-white/70 mb-4">Chat with our support team in real-time during business hours.</p>
          <button class="btn btn-primary">Start Live Chat</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeQuestion = ref<number | null>(null);

const toggle = (id: number) => {
  if (activeQuestion.value === id) {
    activeQuestion.value = null;
  } else {
    activeQuestion.value = id;
  }
};
</script>
