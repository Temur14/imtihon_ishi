<template>
  <section class="vh-100 gradient-custom">
    <AppModal v-model="dialog">
      <select v-model="select">
        <option value="" hidden>Choose role</option>
        <option value="admin">admin</option>
        <option value="superadmin">superadmin</option>
      </select>
      <Button :title="'success'" @click="Choose"> Save </Button>
    </AppModal>
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">
                  Please enter your login and password!
                </p>
                <Form @submit="save" id="auth">
                  <div class="form-outline form-white mb-4">
                    <Field
                      rules="required"
                      :modelValue="info.username"
                      v-slot="{ errors }"
                      name="Email"
                    >
                      <input
                        class="form-control form-control-lg"
                        placeholder="Username"
                        v-model="info.username"
                      />
                      <p class="text-danger" v-if="errors && errors.length">
                        {{ errors[0] }}
                      </p>
                    </Field>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <Field
                      rules="required"
                      :modelValue="info.password"
                      v-slot="{ errors }"
                      name="Password"
                    >
                      <input
                        type="password"
                        class="form-control form-control-lg"
                        placeholder="Password"
                        v-model="info.password"
                      />
                      <p class="text-danger" v-if="errors && errors.length">
                        {{ errors[0] }}
                      </p>
                    </Field>
                  </div>

                  <p class="small mb-5 pb-lg-2">
                    <a class="text-white-50" href="#!">Forgot password?</a>
                  </p>

                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    @click="save"
                  >
                    Login
                  </button>
                </Form>
                <div
                  class="d-flex justify-content-center text-center mt-4 pt-1"
                >
                  <a href="#!" class="text-white"
                    ><i class="fab fa-facebook-f fa-lg"></i
                  ></a>
                  <a href="#!" class="text-white"
                    ><i class="fab fa-twitter fa-lg mx-4 px-2"></i
                  ></a>
                  <a href="#!" class="text-white"
                    ><i class="fab fa-google fa-lg"></i
                  ></a>
                </div>
              </div>

              <div>
                <p class="mb-0">
                  Don't have an account?
                  <a href="#!" class="text-white-50 fw-bold">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/ui/Btn.vue";
import { Form, Field } from "vee-validate";
import http from "../components/plugins/axios";
import AppModal from "../components/ui/app-modal.vue";
const dialog = ref(false);
const select = ref();
const info = ref({
  username: "",
  password: "",
});
const router = useRouter();
const Choose = () => {
  if (select.value === "admin") {
    router.push({ name: "admin" });
  } else if (select.value === "superadmin") {
    router.push({ name: "superadmin" });
  }
};
const save = () => {
  http
    .post("/api/admins/login", {
      username: info.value.username,
      password: info.value.password,
    })
    .then((res) => {
      console.log(res.data.roles);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.roles[1] == "superadmin") {
          dialog.value = true;
        } else if (res.data.roles[0] == "admin") {
          console.log(res.data.roles[1]);
          dialog.value = true;
          router.push({ name: "admin" });
        } else {
          alert("Wrong Name or Password");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style lang="scss" scoped>
.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.login-link {
  display: inline-block;
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.login-link:hover {
  background-color: #0056b3;
  cursor: pointer;
}
.container {
  height: 100vh;
}
select {
  width: 70%;
  height: 40px;
  margin: 10px 0;
  padding: 5px;
}
.gradient-custom {
  /* fallback for old browsers */
  background: #6a11cb;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgba(106, 17, 203, 1),
    rgba(37, 117, 252, 1)
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(
    to right,
    rgba(106, 17, 203, 1),
    rgba(37, 117, 252, 1)
  );
}
</style>
