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
    createdAt: string
    category: string
    User: {
      id: string;
      username: string;
    }
  }
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'refresh'): void
}>();

const title = ref('');
const description = ref('');
const userId = ref('');
const category = ref('')
const $toast = useToast();
const apiUrl = import.meta.env.VITE_API_URL;
const users = ref<{ id: string; username: string }[]>([]);

const clearForm = () => {
  title.value = ''
  description.value = ''
  userId.value = ''
  category.value = ''
}

watch(
  () => props.task,
  (task) => {
    if (task) {
      title.value = task.title
      description.value = task.description
      userId.value = task.userId || '';
      category.value = task.category || '';
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
          user_id: userId.value,
          category: category.value
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
          status: 'pendente',
          category: category.value
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

const categoryOptions = [
  { value: 'feature', label: 'Funcionalidade' },
  { value: 'bug', label: 'Bug' },
  { value: 'adjust', label: 'Ajuste' },
  { value: 'idea', label: 'Ideia' }
]
</script>

<template>
  <div class="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
    <div class="bg-[#723046] rounded w-full max-w-md text-left p-7">
      <h2 class="text-xl font-bold mb-4">
        {{ isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}
      </h2>
      <label for="title" class="text-sm font-semibold text-white mb-1 block">Título</label>
      <input id="title" v-model="title" placeholder="Título" class="w-full border p-2 mb-2 rounded" />
      <label for="desc" class="text-sm font-semibold text-white mb-1 block">Descrição</label>
      <textarea id="desc" v-model="description" placeholder="Descrição" class="w-full border p-2 mb-2 rounded"></textarea>
      <label for="user" class="text-sm font-semibold text-white mb-1 block">Usuário</label>
      <select
        v-if="isEditing"
        id="user"
        v-model="userId"
        class="w-full border p-2 mb-2 rounded border-white text-white"
      >
        <option disabled value="">Selecione um usuário</option>
        <option
          class="text-black"
          v-for="user in users"
          :key="user.id"
          :value="user.id"
        >
          {{ user.username }}
        </option>
      </select>
      <label for="category" class="text-sm font-semibold text-white mb-1 block">Categoria</label>
      <select
        id="category"
        v-model="category"
        class="w-full border p-2 mb-2 rounded border-white text-white"
      >
        <option disabled value="">Selecione uma categoria</option>
        <option
          class="text-black"
          v-for="option in categoryOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
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