<template>
  <div class="page">
    <h1 class="page__title">{{ title }}</h1>
    <section class="container">
      <section class="container__sider">
        <!-- Sidebar with filters -->
        <Sider @clicked="onUnitFilterClick" :unitValue="this.unitValue" v-model="searchValue" />
      </section>
      <!-- Search page with list of items -->
      <section class="container__main container__main--search">
        <!-- Loading during get list items -->
        <div v-if="isLoading" class="loading">
          <img :src="loadingIcon" />
          <h2>Loading...</h2>
        </div>
        <!-- Display when there is no item in the list -->
        <div v-else-if="!items" class="no-data">
          <img :src="emptyIcon" />
          <h2>No data</h2>
        </div>
        <!-- List of items (Vehicles) -->
        <div v-else class="search__list">
          <div v-for="item in items" :key="item.id" class="list__item">
            <div class="item__card">
              <div class="item__image-container" v-bind:style="{ backgroundImage: 'url(' + item.image + ')' }">
                <div class="item-km">
                  <span v-if="item.km === -1">km0</span>
                  <span v-else>
                    <!-- Convert km to miles and vice versa acccording to the unitValue in filters -->
                    <span v-if="unitValue === 'km'">{{ item.km }} Km</span>
                    <span v-else>{{ (item.km / 1.609).toFixed(2) }} Miles</span>
                  </span>
                </div>
                <img class="item__view-360-icon" :src="view360Icon" />
              </div>
              <div class="item__content-container">
                <h2 class="item__name-model">{{ item.make }} - {{ item.model }}</h2>
                <h3 class="item__version">{{ item.version }}</h3>
                <div class="divider divider--small divider--orange" />
                <div class="item__price-favorite">
                  <div class="item__price">
                    <h4>A partire da</h4>
                    <!-- Vehicle price with appropriate currency format -->
                    <h2>&euro; {{ parseFloat(item.price).toLocaleString('it-IT', {currency: 'EUR',}) }}</h2>
                  </div>
                  <!-- Favorite icon - disable if status is not FREE -->
                  <button
                    class="item__favorite"
                    :disabled="item.status !== 'FREE'"
                    :id="item.id"
                    v-on:click="onFavoriteClick($event)"
                    v-bind:class="{ 'is-favorite': favoriteItems.includes(item.id.toString()) }"
                  >
                    <img :src="heartFilledIcon" v-if="favoriteItems.includes(item.id.toString())" />
                    <img :src="heartIcon" v-else />
                  </button>
                </div>

                <div class="item__more-info">
                  <h3 class="item__energy"> A+ </h3>
                  <div class="more-info__bold-row">
                    <span v-if="item.registrationYear">{{ item.registrationYear }}</span>
                    <span v-if="item.status">{{ item.status.toLowerCase() }}</span>
                    <span v-if="item.classCode">{{ item.classCode.toLowerCase() }}</span>
                  </div>
                  <h3 class="pr-32">
                    <span v-if="item.homologationStandard.wltp.consumption.combined">
                      <span>Cons. Comb. Carburante: </span>
                      <!-- Convert km to miles and vice versa acccording to the unitValue in filters -->
                      <span v-if="unitValue === 'km'">{{ item.homologationStandard.wltp.consumption.combined }} </span>
                      <span v-else>{{ (item.homologationStandard.wltp.consumption.combined * 0.621).toFixed(2) }} </span>
                      <span v-if="unitValue === 'km'">{{ item.homologationStandard.wltp.consumption.unitOfMeasure }} - </span>
                      <span v-else>{{ item.homologationStandard.wltp.consumption.unitOfMeasure.replace("km", "miles") }} - </span>
                    </span>
                    <!-- Convert km to miles and vice versa acccording to the unitValue in filters -->
                    <span v-if="unitValue === 'km'">CO2: {{ item.co2 }} g/Km</span>
                    <span v-else>CO2: {{ (item.co2 * 0.621).toFixed(2) }} g/Miles</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import Sider from './Sider.vue'
import store from '../store'

export default {
  name: 'SearchPage',
  props: {
    title: String
  },
  components: {
    Sider
  },
  mounted() {
    // Get favorite items from store
    this.favoriteItems = store.state.favoriteItems,
    // Fire store getItems action and set items to the state
    // Stop loading
    store.dispatch("getItems").then(() => {
      this.items = store.getters.getAllItems;
      this.isLoading = false;
    })
  },
  methods: {
    // Change unitValue in filters and set it to state
    onUnitFilterClick (value) {
      this.unitValue = value;
    },
    // Send itemId to the favorite click handler
    onFavoriteClick: function(event) {
      store.commit('onFavoriteClick', event.currentTarget.id);
    },
  },
  watch: {
    // Listener for the search input in filters
    searchValue(newSearchValue) {
      this.items = store.getters.getFilteredItems(newSearchValue)
    }
  },
  data() {
    return {
      emptyIcon: require('../assets/icons/empty.svg'),
      loadingIcon: require('../assets/icons/loading.svg'),
      view360Icon: require('../assets/icons/view-360.svg'),
      heartIcon: require('../assets/icons/heart.svg'),
      heartFilledIcon: require('../assets/icons/heart-filled.svg'),
      items: null,
      favoriteItems: null,
      unitValue: 'km',
      searchValue: '',
      isLoading: true,
    }
  }
}
</script>
