<script setup>
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import HeroSection from '@/components/hero/HeroSection.vue'
import WorkSection from '@/components/work/WorkSection.vue'
</script>

<template>
  <div class="bg-surface text-primary flex flex-col min-h-screen font-sans selection:bg-primary selection:text-white">
    <NavBar />

    <main class="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20 sm:space-y-28">
      <HeroSection />
      <WorkSection />
    </main>

    <Footer />
  </div>
</template>
