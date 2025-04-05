<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Column from '../components/Column.vue';
import FormTaskModal from '../components/FormTaskModal.vue';
import { useToast } from 'vue-toast-notification'

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const router = useRouter();
const tasks = ref<Task[]>([]);
const showModal = ref(false);
const $toast = useToast();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

const apiUrl = import.meta.env.VITE_API_URL;

const fetchTasks = async () => {
  try {
    const token = localStorage.getItem('token');

    const res = await axios.get(`${apiUrl}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    tasks.value = Array.isArray(res.data) ? res.data : [];
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Erro ao buscar tarefas.'
    $toast.error(msg)
  }
};

const updateTaskStatus = async (id: string, status: string) => {
  try {
    const token = localStorage.getItem('token');

    await axios.put(
      `${apiUrl}/update-task/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    await fetchTasks();
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Erro ao atualizar tarefas.'
    $toast.error(msg)
  }
};

const deleteTask = async (id: string) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(
      `${apiUrl}/delete-task/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    await fetchTasks();
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Erro ao deletar tarefas.'
    $toast.error(msg)
  }
};

const onTaskMoved = ({ id, status }: { id: string; status: string }) => {
  updateTaskStatus(id, status);
};

onMounted(fetchTasks);

const selectedTask = ref<Task | undefined>(undefined)

const openEditModal = (task: Task) => {
  selectedTask.value = task
  showModal.value = true
}

const closeModal = () => {
  selectedTask.value = undefined
  showModal.value = false
}

</script>

<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-5">
      <h1 class="text-2xl font-bold sm:mb-5">Quadro de tarefas</h1>
      <div class="flex gap-4">
        <button @click="showModal = true" class="text-white px-4 py-2 rounded">+ Tarefa</button>
        <button @click="logout" class="text-white px-4 py-2 rounded">Logout</button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
      <Column title="Para fazer" status="pendente" :tasks="tasks" @taskMoved="onTaskMoved" @deleteTask="deleteTask" @editTask="openEditModal"/>
      <Column title="Em andamento" status="em andamento" :tasks="tasks" @taskMoved="onTaskMoved" @deleteTask="deleteTask" @editTask="openEditModal" />
      <Column title="Concluída" status="concluída" :tasks="tasks" @taskMoved="onTaskMoved" @deleteTask="deleteTask" @editTask="openEditModal" />
    </div>

    <FormTaskModal
      v-show="showModal"
      :task="selectedTask"
      @close="closeModal"
      @refresh="fetchTasks"
    />

  </div>
</template>