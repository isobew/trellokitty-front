<template>
    <div class="column-container p-4 rounded h-full w-full overflow-auto bg-[#723046] text-white">
      <h2 class="text-xl font-semibold mb-4 text-white">Tarefas Recentes</h2>
      <table class="w-full border-separate border-spacing-y-2 text-sm text-white overflow-y-auto">
        <thead>
          <tr class="text-left">
            <th class="pb-2">Título</th>
            <th class="pb-2">Usuário</th>
            <th class="pb-2">Status</th>
            <th class="pb-2">Criada em</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="emit('showInfo', task)" v-for="task in recentTasks" :key="task.id" class="bg-[#8c4c5e]/60 rounded text-white cursor-pointer">
            <td class="px-2 py-1">{{ shortTitle(task) }}</td>
            <td class="px-2 py-1">@{{ task.User.username }}</td>
            <td class="px-2 py-1 capitalize">{{ task.status }}</td>
            <td class="px-2 py-1">{{ formatDate(task.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    userId: string;
    User: {
      id: string;
      username: string;
    };
  }
  
  const props = defineProps<{ tasks: Task[] }>()
  const emit = defineEmits(['showInfo'])

  const recentTasks = computed(() => {
    return [...props.tasks]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 7)
  })
  
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString('pt-BR')
  }

  const shortTitle = (task: Task) => {
    return task.title.length > 10
        ? task.title.slice(0, 10) + '...'
        : task.title
  }

  </script>
  