<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense to="/">Responder Perguntas</q-btn>
        <q-btn flat dense to="/gerenciar-quiz"
          >Criar perguntas E Respostas</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
};
</script>

<style>
/* Estilos específicos do layout, se necessário */
</style>
