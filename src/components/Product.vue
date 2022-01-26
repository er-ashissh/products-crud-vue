<template>
  <div v-if="currentProduct" class="edit-form">
    <h4>-: Edit Product Details :-</h4>
    <br />
    <form>
      <div class="form-group">
        <label for="title">Name:</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentProduct.name"
        />
      </div>
      <br />

      <div class="form-group">
        <label for="price">Price:</label>
        <input
          type="text"
          class="form-control"
          id="price"
          v-model="currentProduct.price"
        />
      </div>
      <br />

      <div class="form-group">
        <label for="description">Quantity:</label>
        <input
          type="text"
          class="form-control"
          id="quantity"
          v-model="currentProduct.quantity"
        />
      </div>
      <br /><br />
    </form>

    <button
      type="submit"
      class="btn btn-warning"
      style="margin: 10px"
      @click="updateProduct"
    >
      Update
    </button>

    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Click on product's to view details..</p>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "product",
  data() {
    return {
      currentProduct: null,
      message: "",
    };
  },
  methods: {
    getProduct(id) {
      ProductDataService.get(id)
        .then((response) => {
          this.currentProduct = response.data.results[0];
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentProduct.id,
        name: this.currentProduct.name,
        price: this.currentProduct.price,
        quantity: this.currentProduct.quantity,
        published: status,
      };

      ProductDataService.update(this.currentProduct.id, data)
        .then((response) => {
          this.currentProduct.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateProduct() {
      ProductDataService.update(this.currentProduct.id, this.currentProduct)
        .then((response) => {
          console.log(response.data);
          this.message = "The product was updated successfully.";
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getProduct(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
