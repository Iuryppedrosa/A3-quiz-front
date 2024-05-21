const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PerguntaComponent.vue") }, // Sua página inicial
      {
        path: "/gerenciar-quiz",
        component: () => import("pages/GerenciarQuiz.vue"),
      }, // Página para gerenciar o quiz
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
