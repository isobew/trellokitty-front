<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl">Board</h1>
    <button @click="logout" class="bg-red-500 text-white px-4 py-2">Sair</button>
  </div>
</template>
