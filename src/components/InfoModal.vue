<script setup lang="ts">
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

  defineProps<{ task: Task | null }>()
  defineEmits(['cancel'])

  const categoryLabels: Record<string, string> = {
    feature: 'Funcionalidade',
    bug: 'Bug',
    adjust: 'Ajuste',
    idea: 'Ideia'
  }

</script>

<template>
  <div class="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
    <div class="bg-[#723046] p-4 rounded w-full max-w-md">
      <h2 class="text-lg font-bold mb-2 text-start">{{ task?.title }}</h2>
      <p class="mb-4 text-start">{{ task?.description }}</p>
      <p class="text-sm mb-4 text-start">Responsável: {{ task?.User?.username }}</p>
      <p class="text-sm mb-4 text-start">Categoria: {{ categoryLabels[task?.category || ''] || task?.category }}</p>
      <div class="flex justify-end gap-2">
        <button @click="$emit('cancel')" class="px-4 py-1 bg-gray-300 rounded">Fechar</button>
      </div>
    </div>
  </div>
</template>
