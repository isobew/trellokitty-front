<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification'
import InfoModal from '../components/InfoModal.vue'
import TaskMetrics from '../components/TaskMetrics.vue';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  User: {
    id: string;
    username: string;
  };
}

const router = useRouter();
const tasks = ref<Task[]>([]);
const showModal = ref(false);
const $toast = useToast();
const showConfirmDelete = ref(false);
const taskToDelete = ref<string | null>(null);

const selectedTaskInfo = ref<Task | null>(null)
const showInfoModal = ref(false)

// const openInfoModal = (task: Task) => {
//   selectedTaskInfo.value = task
//   showInfoModal.value = true
// }

// const closeInfoModal = () => {
//   showInfoModal.value = false
//   selectedTaskInfo.value = null
// }

const apiUrl = import.meta.env.VITE_API_URL;


const fetchTasks = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${apiUrl}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    tasks.value = Array.isArray(res.data) ? res.data : [];
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Erro ao buscar tarefas.';
    $toast.error(msg);
  }
};

onMounted(fetchTasks);

const metrics = computed(() => {
  const total = tasks.value.length;
  const pendentes = tasks.value.filter(t => t.status === 'pendente').length;
  const andamento = tasks.value.filter(t => t.status === 'em andamento').length;
  const concluidas = tasks.value.filter(t => t.status === 'concluída').length;

  const userCount: Record<string, number> = {};
  tasks.value.forEach(t => {
    const username = t.User?.username || 'Desconhecido';
    userCount[username] = (userCount[username] || 0) + 1;
  });

  const mostTasksUser = Object.entries(userCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

  return {
    "Total de tarefas": total,
    "Tarefas pendentes": pendentes,
    "Tarefas em andamento": andamento,
    "Tarefas concluídas": concluidas,
    "Usuário com mais tarefas": `@${mostTasksUser}`,
  };
});
// const selectedTask = ref<Task | undefined>(undefined)

// const requestDelete = (id: string) => {
//   taskToDelete.value = id
//   showConfirmDelete.value = true
// }
</script>

<template>
  <div class="p-10 rounded-md bg-[#723046]">
    <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-5">
      <h1 class="text-2xl font-bold sm:mb-5">Relatórios</h1>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- <Column title="Para fazer" status="pendente" :tasks="tasks" @taskMoved="onTaskMoved" @deleteTask="requestDelete" @editTask="openEditModal" @showInfo="openInfoModal"/> -->
      <TaskMetrics :metrics="metrics" />
    </div>

    <!-- <InfoModal
      v-if="showInfoModal"
      :task="selectedTaskInfo"
      @cancel="closeInfoModal"
    /> -->
  </div>
</template>