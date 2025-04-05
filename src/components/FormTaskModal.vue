<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import axios from 'axios';
import { useToast } from 'vue-toast-notification';

const props = defineProps<{
  task?: {
    id: string
    title: string
    description: string
    status: string
  }
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'refresh'): void
}>();

const title = ref('');
const description = ref('');
const $toast = useToast();
const apiUrl = import.meta.env.VITE_API_URL;

const clearForm = () => {
  title.value = ''
  description.value = ''
}

watch(
  () => props.task,
  (task) => {
    if (task) {
      title.value = task.title
      description.value = task.description
    } else {
      clearForm()
    }
  },
  { immediate: true }
)


const isEditing = computed(() => !!props.task)

const submit = async () => {
  const token = localStorage.getItem('token')

  try {
    if (isEditing.value && props.task) {
      // Atualizar
      await axios.put(
        `${apiUrl}/update-task/${props.task.id}`,
        {
          title: title.value,
          description: description.value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      $toast.success('Tarefa atualizada com sucesso!')
    } else {
      // Criar nova
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
      )
      $toast.success('Tarefa criada com sucesso!')
    }

    emit('refresh')
    emit('close')
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Erro ao salvar tarefa.'
    $toast.error(msg)
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
    <div class="bg-gray-500 p-4 rounded w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">
        {{ isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}
      </h2>
      <input v-model="title" placeholder="Título" class="w-full border p-2 mb-2 rounded" />
      <textarea v-model="description" placeholder="Descrição" class="w-full border p-2 mb-2 rounded"></textarea>
      <div class="flex justify-end gap-2">
        <button @click="emit('close')" class="px-4 py-2 bg-gray-300 rounded">Cancelar</button>        
        <button @click="submit" class="px-4 py-2 text-white rounded">
          {{ isEditing ? 'Salvar' : 'Criar' }}
        </button>
      </div>
    </div>
  </div>
</template>