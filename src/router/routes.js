
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),

    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: { auth: true },
      },
      {
        path: "/post/:id",
        component: () => import("pages/SinglePage.vue"),
        meta: { auth: true },
      },
      {
        path: "user-list",
        component: () => import("pages/UserList.vue"),
        meta: { auth: false },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes
