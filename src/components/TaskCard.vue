<script setup lang="ts">

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const props = defineProps<{ task: Task }>();

const emit = defineEmits(['deleteTask']);

</script>

<template>
  <div
    class="bg-[#723046] text-white p-2 rounded shadow flex justify-between cursor-grab items-start" 
    style="user-select: none;"
  >
    <div>
      <h3 class="font-bold">{{ task.title }}</h3>
      <p class="text-sm text-black">{{ task.description }}</p>
    </div>
    <button @click.stop="emit('deleteTask')" class="text-white text-sm">✕</button>
  </div>
</template>