<template>
  <div class="gerenciar-quiz">
    <div class="pergunta-section">
      <criar-pergunta />
    </div>
    <div class="resposta-section">
      <criar-resposta />
    </div>
  </div>
</template>

<script>
import CriarPergunta from "pages/CriarPergunta.vue";
import CriarResposta from "pages/CriarResposta.vue";

export default {
  components: {
    CriarPergunta,
    CriarResposta,
  },
};
</script>

<style>
/* Estilos para posicionar os componentes */
.pergunta-section {
  /* Estilos para a seção de criar pergunta */
}

.resposta-section {
  /* Estilos para a seção de criar resposta */
}
</style>
