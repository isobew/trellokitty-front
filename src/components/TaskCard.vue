<script setup lang="ts">
import { computed } from 'vue'

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  createdAt: string;
  category: string;
  User: {
    id: string;
    username: string;
  };
}

const props = defineProps<{ task: Task }>();

const emit = defineEmits(['deleteTask', 'editTask', 'showInfo']);

const shortDescription = computed(() => {
  return props.task.description.length > 20
    ? props.task.description.slice(0, 20) + '...'
    : props.task.description
})

const shortTitle = computed(() => {
  return props.task.title.length > 15
    ? props.task.title.slice(0, 15) + '...'
    : props.task.title
})

const translatedCategory = computed(() => {
  const map: Record<string, string> = {
    feature: 'Funcionalidade',
    bug: 'Bug',
    adjust: 'Ajuste',
    idea: 'Ideia'
  }
  return map[props.task.category] || props.task.category
})
</script>

<template>
  <div
    class="bg-[#723046] text-white p-2 rounded shadow flex justify-between cursor-grab items-start" 
    style="user-select: none;"
    @click="emit('showInfo')"
  >
    <div class="flex flex-col items-start">
      <h3 class="font-bold">{{ shortTitle }}</h3>
      <p class="text-sm text-white">{{ shortDescription }}</p>
      <p class="text-xs text-white mt-5">Tarefa de: {{ task.User?.username }}</p>
      <p class="text-xs text-white mt-1">Categoria: {{ translatedCategory }}</p>
    </div>
    <div class="flex flex-col gap-2">
      <button @click.stop="emit('deleteTask')" class="text-white text-sm flex items-center justify-center"
      style="width: 2px; height: 25px;"><i class='bx bxs-trash-alt' ></i></button>
      <button @click.stop="emit('editTask')" class="text-white text-sm flex items-center justify-center"
      style="width: 2px; height: 25px;"><i class='bx bxs-edit-alt' ></i>
    </button>
    </div>
  </div>
</template>