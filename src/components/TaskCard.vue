<script setup lang="ts">
import { computed } from 'vue'

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

const props = defineProps<{ task: Task }>();

const emit = defineEmits(['deleteTask', 'editTask']);

const shortDescription = computed(() => {
  return props.task.description.length > 20
    ? props.task.description.slice(0, 20) + '...'
    : props.task.description
})
</script>

<template>
  <div
    class="bg-[#723046] text-white p-2 rounded shadow flex justify-between cursor-grab items-start" 
    style="user-select: none;"
  >
    <div class="flex flex-col items-start">
      <h3 class="font-bold">{{ task.title }}</h3>
      <p class="text-sm text-black">{{ shortDescription }}</p>
      <p class="text-xs text-gray-300 mt-5">Criado por: {{ task.User?.username }}</p>
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