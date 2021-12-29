<template>
  <div>
    <v-app>
      <v-navigation-drawer app>
        <v-list-item-group color="primary">
          <v-list-item-title class="text-center">Kategoriler</v-list-item-title>
          <div>
            <button @click="filteredProduct('')">Tüm Ürünler</button>
          </div>
          <v-list-item v-for="item in categories" :key="item.id">
            <v-list-item-content>
              <v-list-item-title @click="filteredProduct">{{
                item
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-navigation-drawer>
      <!-- <FilteredList /> -->

      <v-app-bar app>
        <BasketDisplay />
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col
              class="col-md-4"
              v-for="product in filteredProducts"
              :key="product.id"
            >
              <v-card class="mx-auto my-12" max-width="374">
                <template slot="progress">
                  <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                  ></v-progress-linear>
                </template>

                <NuxtLink :to="`/products/${product.id}`">
                  <v-img height="250" :src="product.image"></v-img>
                </NuxtLink>

                <v-card-title>{{ product.title }}</v-card-title>
                <v-card-title>{{ product.category }}</v-card-title>
                <v-card-text>
                  <div class="my-4 text-subtitle-1">${{ product.price }}</div>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-actions>
                  <v-btn
                    color="deep-purple lighten-2"
                    text
                    @click="addBasket(product)"
                  >
                    Sepete Ekle
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer app>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import FilteredList from "@/components/FilteredList";
import Basket from "@/components/Basket";
import BasketDisplay from "@/components/BasketDisplay";
import AddBasket from "@/components/AddBasket";

export default {
  data() {
    return {
      filteredProducts: [],
    };
  },
  components: {
    FilteredList,
    Basket,
    BasketDisplay,
    AddBasket,
  },

  computed: {
    ...mapGetters(["categories"]),
    ...mapGetters(["products"]),
    categoryFilter() {
      return Array.from(new Set(this.products.map((e) => e.category)));
    },
  },
  methods: {
    ...mapMutations(["addBasket"]),
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
