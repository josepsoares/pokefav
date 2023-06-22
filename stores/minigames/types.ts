import { defineStore } from "pinia";

interface IMinigameTypesStoreState {}

export const useMinigameTypesStore = defineStore({
  id: "minigame-types-store",
  state: () => {
    return {
      filtersList: ["youtube", "twitch"],
    };
  },
  actions: {
    addValueToFilterList(value: string) {
      this.filtersList.push(value);
    },
  },
  getters: {
    filtersList: (state) => state.filtersList,
  },
});
