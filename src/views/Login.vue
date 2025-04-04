<template>
  <div class="container mx-auto form-container">
    <h1 class="mb-5 title-form">Bem vindo!</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username"
      class="input-form my-5"
      required/>
      <input v-model="password" type="password" placeholder="Password" 
      class="input-form my-2"
      required/>
      <button type="submit"
      class="w-full min-h-[2.5em] min-w-[100px] text-dark font-bold text-lg rounded-lg cursor-pointer mt-5">
      Login</button>
    </form>
    <p class="mt-5 pt-5 text-sm">
      Ainda não tem conta?
      <a href="/register" class="font-bold">Cadastre-se</a>
    </p>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
// import { toast } from 'vue3-toastify'
import { useToast } from 'vue-toast-notification'

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();
    const $toast = useToast();

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
        const msg = error.response?.data?.message || 'Erro no login. Tente novamente.'
        errorMessage.value = error.response?.data?.message || "Erro no login. Tente novamente.";
        // toast.error(error.response?.data?.message || 'Erro no login!')
        $toast.error(msg)
      }
    };

    return { username, password, login, errorMessage };
  },
};
</script>

try {
  // sua lógica de login
  toast.success('Login realizado com sucesso!')
} catch (error: any) {
  toast.error(error.response?.data?.message || 'Erro no login!')
}