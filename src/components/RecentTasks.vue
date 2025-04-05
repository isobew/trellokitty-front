<template>
    <div class="column-container p-4 rounded h-full w-full overflow-auto bg-[#723046] text-white">
      <h2 class="text-xl font-semibold mb-4 text-white">Tarefas Recentes</h2>
  
      <!-- Filtros -->
      <div class="flex gap-4 mb-4 flex-wrap">
        <select v-model="selectedUser" class="bg-[#8c4c5e] text-white px-3 py-1 rounded text-sm">
          <option value="">Todos os usuários</option>
          <option
            v-for="user in availableUsers"
            :key="user"
            :value="user"
          >
            @{{ user }}
          </option>
        </select>
  
        <select v-model="selectedStatus" class="bg-[#8c4c5e] text-white px-3 py-1 rounded text-sm">
          <option value="">Todos os status</option>
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em andamento</option>
          <option value="concluída">Concluída</option>
        </select>

        <select v-model="selectedCategory" class="bg-[#8c4c5e] text-white px-3 py-1 rounded text-sm">
            <option value="">Todas as categorias</option>
            <option
            v-for="cat in availableCategories"
            :key="cat.value"
            :value="cat.value"
            >
                {{ cat.label }}
            </option>
        </select>
      </div>
  
      <!-- Tabela -->
      <table class="w-full border-separate border-spacing-y-2 text-white">
        <thead>
          <tr class="text-left">
            <th class="pb-2">Título</th>
            <th class="pb-2">Usuário</th>
            <th class="pb-2">Status</th>
            <th class="pb-2">Criada em</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="task in filteredTasks"
            :key="task.id"
            @click="emit('showInfo', task)"
            class="bg-[#8c4c5e]/60 rounded cursor-pointer hover:bg-[#a25d72]/50 transition text-sm text-left"
          >
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
  import { computed, ref } from 'vue'
  
  interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    category: string;
    userId: string;
    User: {
      id: string;
      username: string;
    };
  }
  
  const props = defineProps<{ tasks: Task[] }>()
  const emit = defineEmits(['showInfo'])
  
  const selectedUser = ref('')
  const selectedStatus = ref('')
  const selectedCategory = ref('')
  
  const availableUsers = computed(() => {
    const users = props.tasks.map(task => task.User.username)
    return [...new Set(users)]
  })
  
  const recentTasks = computed(() => {
    return [...props.tasks]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6)
  })

  const categoryLabels: Record<string, string> = {
    feature: 'Funcionalidade',
    bug: 'Bug',
    adjust: 'Ajuste',
    idea: 'Ideia'
  }

  const availableCategories = computed(() => {
  const categories = [...new Set(props.tasks.map(task => task.category))]
    return categories.map(cat => ({
        value: cat,
        label: categoryLabels[cat] || cat
    }))
  })
  
  const filteredTasks = computed(() => {
    return recentTasks.value.filter(task => {
        const matchUser = selectedUser.value ? task.User.username === selectedUser.value : true
        const matchStatus = selectedStatus.value ? task.status === selectedStatus.value : true
        const matchCategory = selectedCategory.value ? task.category === selectedCategory.value : true
        return matchUser && matchStatus && matchCategory
    })
  })

  
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString('pt-BR')
  }
  
  const shortTitle = (task: Task) => {
    return task.title.length > 8
      ? task.title.slice(0, 8) + '...'
      : task.title
  }
  </script>
  