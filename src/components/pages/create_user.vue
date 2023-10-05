<template>
  <AppModal v-model="dialog">
    <h1>Create User</h1>
    <form action="">
      <input
        type="text"
        v-model="forms.name"
        class="form-control my-2"
        placeholder="Name"
      />
      <input
        type="text"
        v-model="forms.surname"
        class="form-control my-2"
        placeholder="Surname"
      />
      <input
        type="number"
        v-model="forms.age"
        class="form-control my-2"
        placeholder="Age"
      />
      <select v-model="forms.is_diploma">
        <option value="yes">yes</option>
        <option value="no">no</option>
      </select>
      <input
        type="text"
        v-model="forms.address"
        class="form-control my-2"
        placeholder="Address"
      />

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
  surname: "",
  age: null,
  is_diploma: false,
  address: "",
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
    console.log(forms.value);
    http
      .post(`/users/add`, {
        name: forms.value.name,
        surname: forms.value.surname,
        age: forms.value.age,
        is_diploma: forms.value.is_diploma == "yes" ? true : false,
        address: forms.value.address,
      })
      .then((res) => {
        location.reload();

        natification("User added ", "success");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  } else {
    http
      .patch(`/users/update/${forms.value._id}`, {
        name: forms.value.name,
        surname: forms.value.surname,
        age: forms.value.age,
        is_diploma: forms.value.is_diploma,
        address: forms.value.address,
      })
      .then((res) => {
        location.reload();
        natification("User editing", "warning");
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
select {
  width: 100%;
  height: 40px;
}
</style>
