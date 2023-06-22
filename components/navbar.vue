<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <nav class="flex justify-between items-center p-8 md:p-10 w-full">
    <NuxtLink class="btn btn-ghost" to="/">
      <img
        class="object-contain w-16 h-16"
        alt="Pokéfav"
        src="/images/pokefav-logo.png" />
    </NuxtLink>
    <div>
      <NuxtLink active-class="nav-link-active" class="nav-link" to="/list">
        PokéList
      </NuxtLink>

      <NuxtLink active-class="nav-link-active" class="nav-link" to="/minigames">
        PokéMinigames
      </NuxtLink>

      <NuxtLink active-class="nav-link-active" class="nav-link" to="/trainers">
        PokéTrainers
      </NuxtLink>

      <div v-if="user" class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="/images/avatar-placeholder.png" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <NuxtLink active-class="" to="/profile">Profile</NuxtLink>
          </li>
          <li><a>Logout</a></li>
        </ul>
      </div>
      <div v-else>
        <NuxtLink class="nav-link" to="/auth/register"> Register </NuxtLink>
        <NuxtLink class="nav-link" to="/auth/login"> Login </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.nav-link {
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.5rem 0.75rem;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  letter-spacing: 0.06em;
  background: none;
  color: inherit;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    @apply bg-main-blue;
    position: absolute;
    border-radius: 5px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0;
    -webkit-transform: scale3d(0.7, 1, 1);
    transform: scale3d(0.7, 1, 1);
    -webkit-transition: -webkit-transform 0.4s, opacity 0.4s;
    transition: transform 0.4s, opacity 0.4s;
    transition-timing-function: ease, ease;
    -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  }

  &:hover,
  &:active {
    @apply text-main-yellow;
  }

  &:hover::before,
  &:active::before {
    opacity: 0.5;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  &.nav-link-active {
    @apply border-main-yellow;
    border-bottom: 1px solid;
    border-radius: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-weight: 600;

    &:hover::before,
    &:active::before {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
</style>

