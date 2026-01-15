<script setup>
  import Receta from '../components/Receta.vue';
  import { useBebidasStore } from '../stores/bebidas';

  const bebidas = useBebidasStore()
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recetas</h1>
  <div v-if="bebidas.cargando">Cargando...</div> <!--Aqui puedo meter un spinner de cargando-->
  <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
    <Receta
      v-for="receta in bebidas.recetas"
      :receta="receta"
      :key="receta.idDrink"
    />  
  </div>
</template>

