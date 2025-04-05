<template>
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div class="bg-white text-black p-4 rounded shadow-md w-full max-w-sm">
        <h2 class="text-lg font-bold mb-2">Confirmar exclusão</h2>
        <p class="mb-4">Tem certeza que deseja excluir esta tarefa?</p>
        <div class="flex justify-end gap-2">
          <button @click="$emit('cancel')" class="px-4 py-1 bg-gray-300 rounded">Cancelar</button>
          <button @click="$emit('confirm')" class="px-4 py-1 bg-red-600 text-white rounded">Excluir</button>
        </div>
      </div>
    </div>
  </template>
  