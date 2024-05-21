<template>
  <q-page padding>
    <q-list bordered padding>
      <q-item-label header>Lista de Perguntas</q-item-label>
      <q-item v-for="pergunta in perguntas" :key="pergunta.id" clickable>
        <q-item-section>
          <q-item-label>{{ pergunta.textoDaPergunta }}</q-item-label>
          <q-list>
            <q-item v-for="resposta in pergunta.respostas" :key="resposta.id">
              <q-item-section avatar>
                <q-radio
                  :val="resposta.id"
                  v-model="selectedAnswers[pergunta.id]"
                  :label="resposta.textoDaResposta"
                  @click="verificarResposta(pergunta, resposta.id)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-item-section>
      </q-item>
    </q-list>
    <q-dialog v-model="showFeedback">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ feedbackMessage }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Ok" v-close-popup @click="showFeedback = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";

export default {
  setup() {
    const perguntas = ref([]);
    const selectedAnswers = ref({});
    const showFeedback = ref(false);
    const feedbackMessage = ref("");

    const fetchPerguntas = async () => {
      try {
        const response = await api.get("/perguntas");
        perguntas.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
      }
    };

    const verificarResposta = (pergunta, respostaId) => {
      if (pergunta.respostaCorreta.id === respostaId) {
        feedbackMessage.value = "Resposta Correta!";
      } else {
        feedbackMessage.value = "Resposta Errada!";
      }
      showFeedback.value = true;
    };

    onMounted(() => {
      fetchPerguntas();
    });

    return {
      perguntas,
      selectedAnswers,
      showFeedback,
      feedbackMessage,
      verificarResposta,
    };
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
button:hover {
  background-color: #2c7a65;
}
</style>
