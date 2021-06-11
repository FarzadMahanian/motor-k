import Vue from "vue";
import Vuex from "vuex";
import { fetchItems } from "../api/motor.api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favoriteItems: JSON.parse(localStorage.getItem("favoriteItems")) || [],
    items: null,
  },
  getters: {
    // Get all items
    getAllItems: (state) => {
      return state.items;
    },
    // Get filtered items
    getFilteredItems: (state) => (searchValue) => {
      return state.items.filter(
        (item) =>
          item.make.toLowerCase().includes(searchValue) ||
          item.model.toLowerCase().includes(searchValue) ||
          (item.version && item.version.toLowerCase().includes(searchValue))
      );
    },
  },
  mutations: {
    // Save items in store
    setItems(state, items) {
      state.items = items;
    },

    // When user click on favorite icon
    onFavoriteClick(state, itemId) {
      const clickedItem = state.items.filter(
        (item) => item.id === parseInt(itemId)
      );

      // Remove item from favorite list if it's exist
      if (state.favoriteItems.includes(itemId)) {
        state.favoriteItems.splice(state.favoriteItems.indexOf(itemId), 1);
      } else {
        // Add item to the favorite list if not exist and its status is FREE
        if (clickedItem[0].status === "FREE") {
          state.favoriteItems.push(itemId);
        }
      }
      // Save favorite list to the local storage
      localStorage.setItem(
        "favoriteItems",
        JSON.stringify(state.favoriteItems)
      );
    },
  },
  actions: {
    // Get items from api and set it to store
    async getItems({ commit }) {
      const response = await fetchItems();
      commit("setItems", await response);
    },
  },
  modules: {},
});
