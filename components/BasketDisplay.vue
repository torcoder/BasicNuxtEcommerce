<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="indigo" dark v-bind="attrs" v-on="on">
          Sepet {{ basket.length }}
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item v-for="item in basket" :key="item.id">
            <v-list-item-avatar>
              <v-img :src="item.img" alt="" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-title>{{ item.quantity }} Adet</v-list-item-title>
              <v-list-item-subtitle>${{ item.price }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn elevation="2" @click="incrementItem(item)">+</v-btn>
              <v-btn elevation="2" @click="decrementItem(item)">-</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-title v-text="productTotal"></v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-subtitle>Toplam Fiyat</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="menu = false"> Sepete Git </v-btn>
          <v-btn color="primary" text @click="menu = false">
            Siparişi Tamamla
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    menu: false,
  }),
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
