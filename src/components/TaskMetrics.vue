<script setup lang="ts">
defineProps<{
  metrics: Record<string, string | number>
}>()
</script>

<template>
  <div class="column-container p-4 rounded h-full w-full">
    <table class="w-full text-white border-separate border-spacing-y-2">
      <thead>
        <tr class="text-left text-sm">
          <th class="pb-7">Métrica</th>
          <th class="pb-7">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in metrics" :key="key" class="text-base text-left">
          <td class="font-medium">{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
