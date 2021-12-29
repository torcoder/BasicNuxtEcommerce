<template>
  <div>
    <v-list-item-group color="primary">
      <v-list-item-title class="text-center">Kategoriler</v-list-item-title>
      <div>
        <button @click="filteredProduct('')">RESET</button>
      </div>
      <v-list-item v-for="item in categories" :key="item.id">
        <v-list-item-content>
          <v-list-item-title @click="filteredProduct">{{
            item
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      filteredProducts: [],
    };
  },
  computed: {
    ...mapGetters(["categories"]),
    ...mapGetters(["products"]),
    categoryFilter() {
      return Array.from(new Set(this.products.map((e) => e.category)));
    },
  },
  methods: {
    ...mapActions(["fetchAllCategories"]),
    filteredProduct(event) {
      if (event === "") {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter((e) => {
          return e.category === event.target.innerText;
        });
      }
    },
  },
  created() {
    this.fetchAllCategories();
  },
  async mounted() {
    this.filteredProducts = this.products;
  },
};
</script>

<style lang="scss" scoped></style>
