<template>
  <div class="container mx-auto form-container">
    <h1 class="mb-5 title-form">Cadastro</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" 
      class="input-form my-5"
      required />
      <input v-model="password" type="password" placeholder="Password" 
      class="input-form my-2"
      required/>
      <button type="submit"
      class="w-full min-h-[2.5em] min-w-[100px] text-dark font-bold text-lg rounded-lg cursor-pointer mt-5">
      Cadastrar</button>
    </form>
    <p class="mt-5 pt-5 text-sm">
      Já possui conta?
      <a href="/login" class="font-bold">Faça Login</a>
    </p>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toast-notification'

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    const $toast = useToast();

    const apiUrl = import.meta.env.VITE_API_URL;

    const register = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/register`,
          { username: username.value, password: password.value }
        );
        router.push("/login");
      } catch (error: any) {
        console.error("Erro no registro:", error);
        const msg = error.response?.data?.message || 'Erro no login. Tente novamente.'
        $toast.error(msg)
      }
    };

    return { username, password, register };
  },
};
</script>
