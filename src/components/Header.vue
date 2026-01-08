<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from 'vue-router'
import { useBebidasStore } from '../stores/bebidas'

const route = useRoute()
const store = useBebidasStore()
console.log(store.categorias);


const paginaInicio = computed(() => route.name === 'inicio')

</script>

<template>
  <header class="bg-slate-800" :class="{header : paginaInicio}">
    <div class="mx-auto px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'inicio' }">
            <img src="/img/logo.svg" alt="Logotipo" class="w-32" />
          </RouterLink>
        </div>

        <nav class="flex gap-4">
          <RouterLink
            :to="{ name: 'inicio' }"
            v-slot="{ isActive }"
          >
            <span :class="[ 'uppercase font-bold', isActive ? 'text-orange-500' : 'text-white' ]">
              Inicio
            </span>
          </RouterLink>

          <RouterLink
            :to="{ name: 'favoritos' }"
            v-slot="{ isActive }"
          >
            <span :class="[ 'uppercase font-bold', isActive ? 'text-orange-500' : 'text-white' ]">
              Favoritos
            </span>
          </RouterLink>
        </nav>
      </div>

      <form class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6" v-if="paginaInicio">
        <div class="space-y-4">
          <label class="block text-white uppercase font-extrabold text-lg" for="ingrediente"
            >Nombre o Ingredientes</label
          >
          <input
            id="ingrediente"
            type="text"
            class="p-3 w-full rounded-lg focus:outline-none bg-white text-gray-700 placeholder-gray-400 border-gray-200"
            placeholder="Nombre o Ingrediente: ej. Vodka, Tequila, etc."
          />
        </div>

        <div class="space-y-4">
          <label class="block text-white uppercase font-extrabold text-lg" for="ingrediente"
            >Categoría</label
          >
          <select
            id="ingrediente"
            type="text"
            class="p-3 w-full rounded-lg focus:outline-none bg-white text-gray-700 placeholder-gray-400 border-gray-200"
            placeholder="Nombre o Ingrediente: ej. Vodka, Tequila, etc."
          >
            <option value="">-- Seleccione --</option>
            <option
              v-for="categoria in store.categorias"
              :key="categoria.strCategory"
              :value="categoria.strCategory"
            >{{ categoria.strCategory }}</option>
          </select>
        </div>

        <input
          type="submit"
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
          value="Buscar Recetas"
        />
      </form>
    </div>
  </header>
</template>

<style>
  .header {
    background-image: url('/img/bg.jpg');
    background-size: cover;
    background-position: center;
  }
</style>