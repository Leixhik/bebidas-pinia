import { ref, reactive, onMounted } from "vue";
import { defineStore } from "pinia";
import APIService from '../services/APIService'
import { useModalStore } from './modal'

export const useBebidasStore = defineStore('bebidas', () => {

  const modal = useModalStore()

  const cargando = ref(false)
  const error = ref(null)

  const categorias = ref([])
  const busqueda = reactive({
    nombre : '',
    categoria : ''
  })

  const recetas = ref([])
  const receta = ref({})

  onMounted(async function() {
    cargando.value = true
    error.value = ''
    try {
      const {data: {drinks}} = await APIService.obtenerCategorias()
      categorias.value = drinks
    }catch(error){
      error.value = "Hubo un problema al cargar las recetas"
    }finally{
      cargando.value = false
    }
    
  })


  async function obtenerRecetas(){
    cargando.value = true
    error.value = ''
    try {
      const {data: {drinks}} = await APIService.buscarRecetas(busqueda)
      recetas.value = drinks
    }catch(error){
      error.value = "Hubo un problema al cargar las recetas"
    }finally{
      cargando.value = false
    }
  }

  async function seleccionarBebida(id){
    cargando.value = true
    error.value = ''
    try{
    const { data: {drinks}} = await APIService.buscarReceta(id)
    receta.value =drinks[0]

    modal.handleClickModal()
    }catch(error) {
      error.value = "Hubo un problema al cargar las recetas"
    }finally{
      cargando.value = false
    }
  }

  return{
    categorias,
    busqueda,
    obtenerRecetas,
    recetas,
    seleccionarBebida,
    receta,
    error,
    
  }
})