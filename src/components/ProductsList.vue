<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by name"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchProductName"
          >
            Search
          </button>

          <a
            href="/add"
            class="btn btn-primary"
            style="margin-left: 32px"
            role="button"
          >
            + Add</a
          >
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <br />
      <h4>Products List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(product, index) in products"
          :key="index"
          @click="setActiveProduct(product, index)"
        >
          {{ product.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentProduct">
        <br /><br />
        <h4>Product Details:</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentProduct.name }}
        </div>
        <div>
          <label><strong>Price:</strong></label> {{ currentProduct.price }}
        </div>
        <div>
          <label><strong>Quantity:</strong></label>
          {{ currentProduct.quantity }}
        </div>

        <br />
        <router-link :to="'/products/' + currentProduct.id" class="btn btn-info"
          >Edit</router-link
        >

        <button
          class="btn btn-danger"
          style="margin: 10px"
          @click="deleteProduct"
        >
          Delete
        </button>
      </div>
      <div v-else>
        <br />
        <p>Click on product's to view details..</p>
      </div>

      <div v-if="isProductDeleted">
        <br />
        <p>Product deleted successfully.</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "products-list",
  data() {
    return {
      products: [],
      currentProduct: null,
      isProductDeleted: null,
      currentIndex: -1,
      name: "",
    };
  },
  methods: {
    retrieveProducts() {
      ProductDataService.getAll()
        .then((response) => {
          this.products = response.data.results;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProducts();
      this.currentProduct = null;
      this.currentIndex = -1;
      this.isProductDeleted = null;
    },

    setActiveProduct(product, index) {
      this.currentProduct = product;
      this.currentIndex = index;
    },

    deleteProduct() {
      ProductDataService.delete(this.currentProduct.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "products" });
          this.retrieveProducts();
          this.currentProduct = null;
          this.currentIndex = -1;
          this.isProductDeleted = 1;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchProductName() {
      ProductDataService.findByTitle(this.title)
        .then((response) => {
          this.products = response.data.results;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveProducts();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
