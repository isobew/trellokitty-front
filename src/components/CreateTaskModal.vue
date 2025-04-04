<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'refresh'): void
}>();

const title = ref('');
const description = ref('');
const $toast = useToast();
const apiUrl = import.meta.env.VITE_API_URL;

const createTask = async () => {
   try {
    const token = localStorage.getItem('token');

    await axios.post(
      `${apiUrl}/create-task`,
      {
        title: title.value,
        description: description.value,
        status: 'pendente'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Erro ao criar tarefas.'
    $toast.error(msg)
  }
  emit('refresh');
  emit('close');
};

</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-4 rounded w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Nova Tarefa</h2>
      <input v-model="title" placeholder="Título" class="w-full border p-2 mb-2 rounded" />
      <textarea v-model="description" placeholder="Descrição" class="w-full border p-2 mb-2 rounded"></textarea>
      <div class="flex justify-end gap-2">
        <button @click="emit('close')" class="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
        <button @click="createTask" class="px-4 py-2 bg-blue-500 text-white rounded">Criar</button>
      </div>
    </div>
  </div>
</template>