<template>
  <AppModal v-model="dialog">
    <h1>Create Product</h1>
    <form action="">
      <input
        type="text"
        v-model="forms.name"
        class="form-control my-2"
        placeholder="Name"
      />
      <input
        type="text"
        v-model="forms.brand"
        class="form-control my-2"
        placeholder="Brand"
      />
      <input
        type="text"
        v-model="forms.group"
        class="form-control my-2"
        placeholder="Group"
      />
      <input
        type="number"
        v-model="forms.price"
        class="form-control my-2"
        placeholder="Price"
      />
      <input
        type="number"
        v-model="forms.arrival_price"
        class="form-control my-2"
        placeholder="Arival price"
      />

      <input
        type="number"
        v-model="forms.selling_price"
        class="form-control my-2"
        placeholder="Selling price"
      />

      <textarea
        v-model="forms.description"
        cols="30"
        rows="10"
        class="form-control my-2"
        placeholder="Description"
      ></textarea>
      <button class="btn btn-success" @click="save_form">Save</button>
    </form>
  </AppModal>
</template>

<script setup>
import AppModal from "../ui/app-modal.vue";
import { ref, watch } from "vue";
import natification from "../plugins/Notification";
const dialog = ref(false);
import http from "../plugins/axios";
const forms = ref({
  name: "",
  brand: "",
  group: "",
  price: null,
  arrival_price: null,
  selling_price: null,
  description: "",
});
watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});
const openModal = (value) => {
  if (value) forms.value = { ...value };
  dialog.value = true;
};
const save_form = (e) => {
  console.log(forms.value._id);
  e.preventDefault();
  if (!forms.value._id) {
    http
      .post(`/products/add`, {
        name: forms.value.name,
        brand: forms.value.brand,
        group: forms.value.group,
        price: forms.value.price,
        arrival_price: forms.value.arrival_price,
        selling_price: forms.value.selling_price,
        description: forms.value.description,
      })
      .then((res) => {
        location.reload();

        natification("Product added ", "success");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  } else {
    http
      .patch(`/products/update/${forms.value._id}`, {
        name: forms.value.name,
        brand: forms.value.brand,
        group: forms.value.group,
        price: forms.value.price,
        arrival_price: forms.value.arrival_price,
        selling_price: forms.value.selling_price,
        description: forms.value.description,
      })
      .then((res) => {
        location.reload();
        natification("Product editing", "warning");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }
  dialog.value = false;
  forms.value = {};
};
defineExpose({ openModal });
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  height: 150px;
}
</style>
