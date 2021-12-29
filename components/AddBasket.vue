<template>
  <v-card-actions>
    <v-btn color="deep-purple lighten-2" text @click="addBasket(product)">
      Sepete Ekle
    </v-btn>
  </v-card-actions>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["addBasket"]),
  },
};
</script>
