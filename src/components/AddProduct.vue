<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <h3>-: Product Details :-</h3>
      <br />

      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="product.name"
          name="name"
        />
      </div>
      <br />

      <div class="form-group">
        <label for="price">Price:</label>
        <input
          type="number"
          class="form-control"
          id="price"
          required
          v-model="product.price"
          name="price"
        />
      </div>
      <br />

      <div class="form-group">
        <label for="quantity">Quantity:</label>
        <input
          class="form-control"
          id="quantity"
          required
          v-model="product.quantity"
          name="quantity"
        />
      </div>
      <br />

      <br />
      <button @click="saveProduct" class="btn btn-primary">Submit</button>
    </div>

    <div v-else>
      <br /><br /><br />
      <h5>Product added successfully :)</h5>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "add-product",
  data() {
    return {
      product: {
        id: null,
        name: "",
        price: "",
        quantity: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveProduct() {
      var data = {
        name: this.product.name,
        price: this.product.price,
        quantity: this.product.quantity,
      };

      ProductDataService.create(data)
        .then((response) => {
          this.product.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newProduct() {
      this.submitted = false;
      this.product = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
