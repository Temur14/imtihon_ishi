<template>
  <div class="container-fluid">
    <create_product ref="createProduct" />
    <h1 class="text-center mt-5">Products</h1>
    <div class="row">
      <div class="col-12">
        <AppTable :headers="headers" :body="products">
          <template #body_edit="{ item }">
            <button class="btn btn-warning" @click="editProduct(item)">
              Edit
            </button>
          </template>
          <template #body_delete="{ item }">
            <button class="btn btn-danger" @click="deleteProd(item)">
              Delete
            </button>
          </template>
        </AppTable>
      </div>
    </div>
    <button class="btn btn-success" @click="addProduct">Add Product</button>
  </div>
</template>

<script setup>
import create_product from "@/components/pages/create_product.vue";
import AppTable from "@/components/ui/app-table.vue";
import { ref } from "vue";
import axios from "../../components/plugins/axios";

const products = ref();
const createProduct = ref();

const headers = ref([
  // { title: "T/R", value: "id" },
  { title: "Name", value: "name" },
  { title: "Brand", value: "brand" },
  { title: "Group", value: "group" },
  { title: "Price", value: "price" },
  { title: "Arival Price", value: "arrival_price" },
  { title: "Selling Price", value: "selling_price" },
  { title: "Description", value: "description" },
  { title: "Edit", value: "edit" },
  { title: "Delete", value: "delete" },
]);

const getProducts = () => {
  axios
    .get("/products")
    .then((res) => {
      products.value = res.data.products;
      console.log(products.value._id);
    })
    .catch((error) => {
      console.log(error);
    });
};
const addProduct = () => {
  createProduct.value.openModal();
};
const editProduct = (item) => {
  createProduct.value.openModal(item);
  console.log(item._id);
};
const deleteProd = (item) => {
  const index = products.value.indexOf(item);
  if (index !== -1) {
    products.value.splice(index, 1);
  }
};

getProducts();
</script>

<style lang="scss" scoped></style>
