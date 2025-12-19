import { ref } from "vue";
import { defineStore } from "pinia";

export const useBebidasStore = defineStore('bebidas', () => {

  const categorias = ref([])

  return{
    categorias
  }
})