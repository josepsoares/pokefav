<script setup lang="ts">
import Dashboard from "../components/dashboard.vue";

definePageMeta({
  layout: "default",
});

const user = useSupabaseUser();

const pokeFavFeatures = [
  {
    img: "xy_wallpaper4_1920x1200.jpg",
    title: "create your pokélist, pokéteam and pokécardlist",
    description: "",
  },
  {
    img: "xy05-wallpaper3-1920-en.jpg",
    title: "play a set of challenging minigames",
    description: "",
  },
  {
    img: "xy_wallpaper5_1920x1200.jpg",
    title: "discover your poképersonalities, pokémove and pokétype knowledge",
    description: "",
  },
  {
    img: "xy05-wallpaper4-1920-en.jpg",
    title: "encounter your favorite pokémon cards",
    description: "",
  },
];
</script>

<template>
  <div v-if="user">
    <Dashboard />
  </div>
  <div v-else class="min-h-full">
    <div
      class="relative flex flex-col text-center justify-center items-center min-h-full mb-8"
    >
      <img
        class="object-contain"
        alt="Pokéfav"
        src="/images/pokefav-title-logo.png"
      />
      <div position="relative" h="150px" w="100%">
        <div v-for="item in pokeFavFeatures">
          <h6 class="font-heading">{{ item.title }}</h6>
          <p>{{ item.description }}</p>
        </div>
      </div>

      <div>
        <NuxtLink to="/auth/login">Login now</NuxtLink>
        <NuxtLink to="/auth/register">Register now</NuxtLink>
      </div>
    </div>
  </div>
</template>
