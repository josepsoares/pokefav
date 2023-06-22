<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const threshold = ref(false);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

onMounted(() => {
  window.addEventListener(
    "scroll",
    () => (threshold.value = window.scrollY >= 850 ? true : false)
  );
});

onUnmounted(() => {
  window.removeEventListener(
    "scroll",
    () => (threshold.value = window.scrollY >= 850 ? true : false)
  );
});
</script>

<template>
  <button
    :class="[threshold ? 'opacity-100' : 'opacity-0']"
    class="border-lightPurple bg-stone-950 group fixed top-[90%] left-[82.5%] flex h-10 w-10 items-center justify-center border-2 shadow-lg transition-all sm:left-[88%] md:left-[92.5%] lg:top-[90%] lg:left-[94%] shadow-cyan-800/20"
    :disabled="!threshold"
    @click="scrollToTop">
    up
  </button>
</template>

