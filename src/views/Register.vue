<template>
  <div class="container mx-auto">
    <h1 class="text-2xl">Register</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();

    const apiUrl = import.meta.env.VITE_API_URL;

    const register = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/register`,
          { username: username.value, password: password.value }
        );
        router.push("/login");
      } catch (error) {
        console.error("Erro no registro:", error);
      }
    };

    return { username, password, register };
  },
};
</script>
