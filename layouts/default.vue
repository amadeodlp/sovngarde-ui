<template>
  <div class="min-h-screen flex flex-col bg-neutral-950 text-white">
    <!-- Navigation -->
    <TheNavigation />
    
    <!-- Main content -->
    <main class="flex-grow">
      <slot />
    </main>
    
    <!-- Footer -->
    <TheFooter />
  </div>
</template>
