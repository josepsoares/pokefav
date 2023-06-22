<script setup lang="ts">
  const minigames = [
    {
      title: 'PokéTrivia',
      link: '/minigames/pokemon-trivia',
      icon: FaGraduationCap,
      img: 'img/pokelist-smaller.jpg',
      description: 'a trivia of 10 questions to test your pokémon knowledge'
    },
    {
      title: 'PokéGuess',
      link: '/minigames/pokemon-guess',
      icon: GiMineExplosion,
      img: 'img/pokelist-smaller.jpg',
      description: 'a "who is this pokémon" experience'
    }
  ];

  /* <SEO
        title="PokéMinigames"
        description="A set of minigames for you to challenge your pokémon knowledge"
      /> */
</script>
<template>






      <h1 fontSize="5xl" pb={8}>
        PokéMinigames
      </h1>
      <h2 as="h2" pb={8}>
        Let's get started with your PokéFav experience by exploring one of the
        options bellow! <FaRegHandPointDown />
      </h2>

      <div class="grid gap-8 pt-10 pb-20 grid-cols-1 md:grid-cols-2" >
          <NuxtLink
          v-for="minigame in minigames"
            key={index}
            to={{
              pathname: item.link,
              state: { prevPath: location.pathname }
            }}
          >
            <div
            class="minigame-card p-8 flex flex-col justify-center items-center text-center w-full relative rounded bg-transparent shadow-md transition-all"
            background-image: `url(./${item.img})`,
            
              _hover={{
                top: '-2',
                bg: 'yellow.200',
                color: 'red.400'
              }}
              _active={{
                top: '-2',
                bg: 'yellow.200',
                color: 'red.400'
              }}
              
            >
              <h3 class="z-10">
                {{minigame.title}}
              </h3>
              <p class="z-10">{{minigame.description}}</p>
            </div>
          </NuxtLink>

        </div>

</template>

<style lang="scss">
.minigame-card {
  &:before {

                border-radius: 4px;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                content: '';
                position: 'absolute';
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                height: 100%;
                width: 100%;
                opacity: 0.2;
                z-index: 0;
                &:hover {
                  opacity: 1;
                }
            
  }
}
</style>