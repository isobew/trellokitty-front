<template>
    <div class="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
      <div class="bg-[#723046] p-4 rounded w-full max-w-md">
        <h2 class="text-lg font-bold mb-2">Confirmar exclusão</h2>
        <p class="mb-4">Tem certeza que deseja excluir esta tarefa?</p>
        <div class="flex justify-end gap-2">
          <button @click="$emit('cancel')" class="px-4 py-1 rounded">Cancelar</button>
          <button @click="$emit('confirm')" class="px-4 py-1 text-white rounded">Excluir</button>
        </div>
      </div>
    </div>
  </template>
  