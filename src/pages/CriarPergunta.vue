<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Criar Nova Pergunta</div>
      </q-card-section>

      <q-card-section>
        <q-input
          filled
          v-model="textoDaPergunta"
          label="Texto da Pergunta"
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" @click="criarPergunta">Criar Pergunta</q-btn>
      </q-card-actions>
    </q-card>

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
import { ref } from "vue";
import { api } from "boot/axios";

export default {
  setup() {
    const textoDaPergunta = ref("");
    const showFeedback = ref(false);
    const feedbackMessage = ref("");

    const criarPergunta = async () => {
      try {
        await api.post("/perguntas", {
          textoDaPergunta: textoDaPergunta.value,
        });
        feedbackMessage.value = "Pergunta criada com sucesso!";
        textoDaPergunta.value = "";
      } catch (error) {
        feedbackMessage.value = "Erro ao criar pergunta: " + error.message;
      } finally {
        showFeedback.value = true;
      }
    };

    return {
      textoDaPergunta,
      showFeedback,
      feedbackMessage,
      criarPergunta,
    };
  },
};
</script>
