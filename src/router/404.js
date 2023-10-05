import notFount from "@/views/404.vue";

export const notFound = {
  path: "/:catchAll(.*)",
  name: "not Found",
  component: notFount,
};
