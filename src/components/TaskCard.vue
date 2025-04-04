<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const props = defineProps<{ task: Task }>();

const emit = defineEmits(['deleteTask']);

const onDragStart = (event: DragEvent) => {
  event.dataTransfer?.setData('text', props.task.id);
};
</script>

<template>
  <div
    draggable
    @dragstart="onDragStart"
    class="bg-white p-2 rounded shadow border flex justify-between items-start"
  >
    <div>
      <h3 class="font-bold">{{ task.title }}</h3>
      <p class="text-sm text-gray-600">{{ task.description }}</p>
    </div>
    <button @click="emit('deleteTask')" class="text-red-500 text-sm">✕</button>
  </div>
</template>