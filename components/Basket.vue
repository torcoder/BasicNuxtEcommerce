<template>
  <v-card class="mx-auto" max-width="300" tile>
    <v-list dense>
      <v-subheader
        >SEPET
        <p>{{ basket.length }}</p></v-subheader
      >
      <v-list-item-group color="primary">
        <v-list-item >
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-title v-text="item.quantity"></v-list-item-title>
            <v-list-item-title v-text="item.price"></v-list-item-title>
            <v-list-item-title>
              <v-btn elevation="2" @click="incrementItem(item)">+</v-btn>
            </v-list-item-title>
            <v-list-item-title>
              <v-btn elevation="2" @click="decrementItem(item)">-</v-btn>
              <v-btn elevation="2" @click="deleteItem(item)">Sil</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-title v-text="productTotal"></v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  //   mounted() {
  //     this.checked = JSON.parse(localStorage.getItem("basket")) || [];
  //   },
  computed: {
    productTotal() {
      let total = 0;
      let item;
      for (item in this.basket) {
        total = total + this.basket[item].quantity * this.basket[item].price;
      }
      return Number(total.toFixed(2));
    },
    ...mapGetters(["basket"]),
  },
  methods: {
    ...mapMutations(["deleteItem", "incrementItem", "decrementItem"]),
  },
};
</script>
<style scoped>
.v-subheader {
  display: flex;
  justify-content: space-between;
}
.v-card__actions {
  justify-content: space-between;
  align-items: center;
}
</style>
