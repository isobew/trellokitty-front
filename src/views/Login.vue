<template>
  <div class="container mx-auto">
    <h1 class="text-2xl">Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
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
    const errorMessage = ref("");
    const router = useRouter();

    const apiUrl = import.meta.env.VITE_API_URL;

    const login = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/login`,
          { username: username.value, password: password.value }
        );
        localStorage.setItem("token", response.data.token);
        router.push("/board"); 
      } catch (error: any) {
        errorMessage.value = error.response?.data?.message || "Erro no login. Tente novamente.";
      }
    };

    return { username, password, login, errorMessage };
  },
};
</script>
