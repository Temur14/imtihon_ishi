<template>
  <div class="container-fluid">
    <create_user ref="createUser" />
    <h1 class="text-center mt-5">Users</h1>
    <div class="row">
      <div class="col-12">
        <AppTable :headers="headers" :body="users">
          <template #body_edit="{ item }">
            <button class="btn btn-warning" @click="editUser(item)">
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
    <button class="btn btn-success" @click="addUser">Add User</button>
  </div>
</template>

<script setup>
import create_user from "@/components/pages/create_user.vue";
import AppTable from "@/components/ui/app-table.vue";
import { ref } from "vue";
import axios from "../../components/plugins/axios";

const users = ref();
const createUser = ref();

const headers = ref([
  // { title: "T/R", value: "id" },
  { title: "Name", value: "name" },
  { title: "Surname", value: "surname" },
  { title: "Age", value: "age" },
  { title: "Has diploma", value: "is_diploma" },
  { title: "Adress", value: "address" },
  { title: "Edit", value: "edit" },
  { title: "Delete", value: "delete" },
]);

const getUsers = () => {
  axios
    .get("/users")
    .then((res) => {
      users.value = res.data.users;
    })
    .catch((error) => {
      console.log(error);
    });
};
const addUser = () => {
  createUser.value.openModal();
};
const editUser = (item) => {
  createUser.value.openModal(item);
  console.log(item._id);
};
const deleteProd = (item) => {
  const index = users.value.indexOf(item);
  if (index !== -1) {
    users.value.splice(index, 1);
  }
};

getUsers();
</script>

<style lang="scss" scoped></style>
