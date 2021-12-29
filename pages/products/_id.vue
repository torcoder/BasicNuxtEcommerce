<template>
  <div v-if="product">
    <v-container>
      <v-row>
        <v-col cols="md-6">
          <v-card class="d-flex justify-center mb-6">
            <img :src="product.image" alt="" width="200" />
          </v-card>
        </v-col>
        <v-col cols="md-6">
          <h1>{{ product.title }}</h1>
          <p>
            {{ product.description }}
          </p>
        </v-col>
        <NuxtLink to="/">Anasayfaya Dön</NuxtLink>
      </v-row>
    </v-container>
  </div>
  <div v-else>
    <p>Böyle bir ürün bulunamadı</p>
  </div>
</template>

<script>
import AddBasket from "@/components/AddBasket";
export default {
  components: {
    AddBasket,
  },
  computed: {
    product() {
      return this.$store.getters.getProductById(this.$route.params.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
