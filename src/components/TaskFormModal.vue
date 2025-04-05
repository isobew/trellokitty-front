<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import { onMounted } from 'vue';

const props = defineProps<{
  task?: {
    id: string
    title: string
    description: string
    status: string
    userId: string
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
const users = ref<{ id: string; username: string }[]>([]);
const userId = ref('');

const clearForm = () => {
  title.value = ''
  description.value = ''
  userId.value = ''
}

watch(
  () => props.task,
  (task) => {
    if (task) {
      title.value = task.title
      description.value = task.description
      userId.value = task.userId || '';
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
          description: description.value,
          user_id: userId.value
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

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    users.value = res.data;
  } catch (error: any) {
    $toast.error('Erro ao buscar usuários');
  }
};

onMounted(fetchUsers);
</script>

<template>
  <div class="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
    <div class="bg-[#723046] p-4 rounded w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">
        {{ isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}
      </h2>
      <input v-model="title" placeholder="Título" class="w-full border p-2 mb-2 rounded" />
      <textarea v-model="description" placeholder="Descrição" class="w-full border p-2 mb-2 rounded"></textarea>
      <select
        v-model="userId"
        class="w-full border p-2 mb-2 rounded border-white text-white"
      >
        <option disabled value="">Selecione um usuário</option>
        <option class="text-black" v-for="user in users" :key="user.id" :value="user.id">
          {{ user.username }}
        </option>
      </select>
      <div class="flex justify-end gap-2">
        <button @click="emit('close')" class="px-4 py-2 bg-gray-300 rounded">Cancelar</button>        
        <button @click="submit" class="px-4 py-2 text-white rounded">
          {{ isEditing ? 'Salvar' : 'Criar' }}
        </button>
      </div>
    </div>
  </div>
</template>