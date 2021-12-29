import axios from "axios";
let url = "https://fakestoreapi.com/products";
export const state = () => ({
  basket: [],
  categories: [],
  products: [],
});

export const mutations = {
  setProducts(state, payload) {
    state.products = payload;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  addBasket(state, item) {
    if (state.basket.length == 0) {
      state.basket.push({
        id: item.id,
        img: item.image,
        title: item.title,
        price: item.price,
        quantity: 1,
      });
      localStorage.setItem("basket", JSON.stringify(state.basket));
    } else {
      let repeatItem = false;
      let productItem;

      for (productItem in state.basket) {
        if (state.basket[productItem].id === item.id) {
          state.basket[productItem].quantity += 1;
          repeatItem = true;
        }
      }
      if (!repeatItem) {
        state.basket.push({
          id: item.id,
          img: item.image,
          title: item.title,
          price: item.price,
          quantity: 1,
        });
        localStorage.setItem("basket", JSON.stringify(state.basket));
      }
    }
  },
  deleteItem(state, item) {
    state.basket = state.basket.filter((t) => t !== item);
  },
  incrementItem(state, item) {
    let pItem;

    for (pItem in state.basket) {
      if (state.basket[pItem].id === item.id) {
        state.basket[pItem].quantity += 1;
      }
    }
  },
  decrementItem(state, item) {
    let pItem;
    for (pItem in state.basket) {
      if (state.basket[pItem].id === item.id) {
        state.basket[pItem].quantity -= 1;
      }
      if (state.basket[pItem].quantity === 0) {
        state.basket.splice(pItem, 1);
      }
    }
  },
};
export const actions = {
  async nuxtServerInit({ commit }) {
    const response = await axios.get(url);
    const data = response.data;
    commit("setProducts", data);
  },
  async fetchAllCategories(context) {
    this.categories = await fetch(
      "https://fakestoreapi.com/products/categories"
    )
      .then((response) => response.json())
      .then((data) => {
        context.commit("setCategories", data);
      })
      .catch((err) => console.log(err));
  },
};
export const getters = {
  getProductById: (state) => (id) => {
    return state.products.find((product) => product.id == id);
  },
  products(state) {
    return state.products;
  },
  basket(state) {
    return state.basket;
  },
  categories(state) {
    return state.categories;
  },
};
