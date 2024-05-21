<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Adicionar Respostas</div>
      </q-card-section>

      <q-card-section>
        <q-select
          filled
          v-model="selectedPergunta"
          :options="perguntas"
          option-label="textoDaPergunta"
          option-value="id"
          label="Selecione a Pergunta"
        />
        <q-input
          filled
          v-model="textoDaResposta"
          label="Texto da Resposta"
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" @click="criarResposta">Adicionar Resposta</q-btn>
      </q-card-actions>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="text-h6">Definir Resposta Correta</div>
      </q-card-section>

      <q-card-section>
        <q-select
          filled
          v-model="selectedResposta"
          :options="respostas"
          option-label="textoDaResposta"
          option-value="id"
          label="Selecione a Resposta Correta"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" @click="definirRespostaCorreta"
          >Definir Resposta Correta</q-btn
        >
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
import { ref, onMounted, watch } from "vue";
import { api } from "boot/axios";

export default {
  setup() {
    const perguntas = ref([]);
    const respostas = ref([]);
    const selectedPergunta = ref(null);
    const selectedResposta = ref(null);
    const textoDaResposta = ref("");
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

    const fetchRespostas = async (perguntaId) => {
      try {
        const response = await api.get("/respostas", {
          params: { perguntaId },
        });
        respostas.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar respostas:", error);
      }
    };

    const criarResposta = async () => {
      try {
        const requestBody = {
          textoDaResposta: textoDaResposta.value,
          pergunta: {
            id: selectedPergunta.value,
          },
        };

        await api.post("/respostas", requestBody);
        feedbackMessage.value = "Resposta criada com sucesso!";
        textoDaResposta.value = "";
        fetchRespostas(selectedPergunta.value);
      } catch (error) {
        feedbackMessage.value = "Erro ao criar resposta: " + error.message;
      } finally {
        showFeedback.value = true;
      }
    };

    const definirRespostaCorreta = async () => {
      try {
        await api.put(
          `/perguntas/${selectedPergunta.value}/resposta-correta/${selectedResposta.value}`
        );
        feedbackMessage.value = "Resposta correta definida com sucesso!";
      } catch (error) {
        feedbackMessage.value =
          "Erro ao definir resposta correta: " + error.message;
      } finally {
        showFeedback.value = true;
      }
    };

    watch(selectedPergunta, (newPerguntaId) => {
      if (newPerguntaId) {
        fetchRespostas(newPerguntaId);
      } else {
        respostas.value = [];
      }
    });

    onMounted(() => {
      fetchPerguntas();
    });

    return {
      perguntas,
      respostas,
      selectedPergunta,
      selectedResposta,
      textoDaResposta,
      showFeedback,
      feedbackMessage,
      criarResposta,
      definirRespostaCorreta,
    };
  },
};
</script>
