<script setup lang="ts">
import { computed } from 'vue'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'

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

const props = defineProps<{
  title: string
  status: string
  tasks: Task[]
}>()

const emit = defineEmits(['taskMoved', 'deleteTask', 'editTask', 'showInfo'])

const filteredTasks = computed({
  get() {
    return props.tasks.filter((t) => t.status === props.status)
  },
  set(newTasks) {
    newTasks.forEach((task: Task) => {
      if (task.status !== props.status) {
        task.status = props.status
        emit('taskMoved', { id: task.id, status: props.status })
      }
    })
  }
})
</script>

<template>
  <div class="column-container p-4 rounded h-100 w-70 overflow-y-auto">
    <h2 class="font-semibold mb-2 text-[#3c1824]">{{ title }}</h2>
    
    <draggable
      v-model="filteredTasks"
      group="tasks"
      item-key="id"
      class="space-y-2 min-h-[100px]"
    >
      <template #item="{ element }">
        <TaskCard
          :task="element"
          @deleteTask="emit('deleteTask', element.id)"
          @editTask="emit('editTask', element)"
          @showInfo="emit('showInfo', element)"
        />
      </template>
    </draggable>
  </div>
</template>
