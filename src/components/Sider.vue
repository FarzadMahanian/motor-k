<template>
  <section class="container__filters">
    <div class="filters__title">
      <img class="title__icon" :src="filterIcon" />
      <h2>Filters</h2>
    </div>
    <div class="divider" />
    <label for="serach-input"><h2>Search</h2></label>
    <!-- Filter search input with searchValue binding to update searchValue in parent (Search page) -->
    <input
      autofocus
      id="serach-input"
      type="text"
      placeholder="Search here"
      v-bind:value="searchValue"
      v-on:input="updateSearchValue($event)"
    />
    <div class="divider" />
    <h2 class="mb-12">Unit of measure</h2>
    <!-- Filter unit buttons with click event to change unitValue in parent (Search page) -->
    <!-- Add selectedd class according to unitValue to style buttons -->
    <button class="miles-btn mr-3" v-bind:class="{ 'selected': unitValue === 'miles' }" v-on:click="onUnitFilterClick('miles')">Miles</button>
    <button class="km-btn ml-3" v-bind:class="{ 'selected': unitValue === 'km' }" v-on:click="onUnitFilterClick('km')">Km</button>
  </section>
</template>

<script>
export default {
  name: 'Sider',
  props: {
    unitValue: String,
    searchValue: String
  },
  methods: {
    // Send unitValue to the parent (Search page)
    onUnitFilterClick (value) {
      this.$emit('clicked', value);
    },
    // Send searchValue to the parent (Search page)
    updateSearchValue: function (value) {
      this.$emit('input', value.target.value);
    },
  },
  data() {
    return {
      filterIcon: require('../assets/icons/filter.svg'),
      searchVale: ''
    }
  }
}
</script>
