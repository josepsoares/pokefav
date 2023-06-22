<template>
  <main
    style="grid-template-rows: auto 1fr auto"
    class="mx-auto grid min-h-screen bg-stone-900">
    <Navbar />
    <div class="mx-auto w-11/12 md:w-10/12 xl:w-3/4 xxl:w-[1366px]">
      <slot />
    </div>
    <Footer />
  </main>
</template>

