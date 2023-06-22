<script setup lang="ts">
const { name, number } = defineProps<{
  name: string;
  number: number;
}>();
</script>

<template>
  <div class="relative">
    <img
      class="object-scale-down h-28 w-36"
      objectFit="scale-down"
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/${number}.png`"
      :alt="name" />
    <Icon
      as="{CgPokemon}"
      boxSize="10rem"
      position="absolute"
      top="39%"
      left="50%"
      opacity="0.5"
      transform="translate(-50%, -50%)"
      zIndex="-1" />
    <p class="pt-6">{{ name }}</p>
  </div>
</template>

