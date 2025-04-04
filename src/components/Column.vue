<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import TaskCard from './TaskCard.vue';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const props = defineProps<{
  title: string;
  status: string;
  tasks: Task[];
}>();

const emit = defineEmits(['taskMoved', 'deleteTask']);

const handleDrop = (event: DragEvent) => {
  const id = event.dataTransfer?.getData('text');
  if (id) emit('taskMoved', { id, status: props.status });
};
</script>

<template>
  <div class="bg-gray-100 p-4 rounded shadow" @drop.prevent="handleDrop" @dragover.prevent>
    <h2 class="font-semibold mb-2">{{ title }}</h2>
    <div class="space-y-2">
      <TaskCard
        v-for="task in tasks.filter(t => t.status === status)"
        :key="task.id"
        :task="task"
        @deleteTask="emit('deleteTask', task.id)"
      />
    </div>
  </div>
</template>