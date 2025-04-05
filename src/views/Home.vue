<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Column from '../components/Column.vue';
import TaskFormModal from '../components/TaskFormModal.vue';
import { useToast } from 'vue-toast-notification'
import ConfirmDeleteModal from '../components/ConfirmModal.vue'
import InfoModal from '../components/InfoModal.vue'

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  createdAt: string;
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

const openInfoModal = (task: Task) => {
  selectedTaskInfo.value = task
  showInfoModal.value = true
}

const closeInfoModal = () => {
  showInfoModal.value = false
  selectedTaskInfo.value = null
}

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

const requestDelete = (id: string) => {
  taskToDelete.value = id
  showConfirmDelete.value = true
}

const cancelDelete = () => {
  taskToDelete.value = null
  showConfirmDelete.value = false
}

const confirmAndDelete = async () => {
  if (taskToDelete.value) {
    await deleteTask(taskToDelete.value)
    taskToDelete.value = null
    showConfirmDelete.value = false
  }
}
</script>

<template>
  <div class="p-10 rounded-md bg-[#723046]">
    <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-5">
      <h1 class="text-2xl font-bold sm:mb-5">Quadro de tarefas</h1>
      <div class="flex gap-4">
        <button @click="showModal = true" class="text-white px-4 py-2 rounded">+ Tarefa</button>
        <button @click="logout" class="text-white px-4 py-2 rounded">Logout</button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
      <Column title="Para fazer" status="pendente" :tasks="tasks" @taskMoved="onTaskMoved" @deleteTask="requestDelete" @editTask="openEditModal" @showInfo="openInfoModal"/>
      <Column title="Em andamento" status="em andamento" :tasks="tasks" @taskMoved="onTaskMoved" @deleteTask="requestDelete" @editTask="openEditModal"  @showInfo="openInfoModal"/>
      <Column title="Concluída" status="concluída" :tasks="tasks" @taskMoved="onTaskMoved" @deleteTask="requestDelete" @editTask="openEditModal"  @showInfo="openInfoModal"/>
    </div>

    <TaskFormModal
      v-show="showModal"
      :task="selectedTask"
      @close="closeModal"
      @refresh="fetchTasks"
    />

    <ConfirmDeleteModal
      v-if="showConfirmDelete"
      @cancel="cancelDelete"
      @confirm="confirmAndDelete"
    />

    <InfoModal
      v-if="showInfoModal"
      :task="selectedTaskInfo"
      @cancel="closeInfoModal"
    />
  </div>
</template>