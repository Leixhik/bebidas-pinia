# Prueba técnica (self-check) — Bebidas + Pinia

Este documento está pensado como una “prueba técnica” para medir si realmente entiendes el proyecto y el stack (Vue 3 + Vite + Pinia + Vue Router + Axios + Tailwind + Headless UI).

## Contexto rápido del proyecto

- La app consulta **TheCocktailDB** usando Axios (instancia en `src/lib/axios.js`).
- Maneja estado con Pinia:
  - `src/stores/bebidas.js`: categorías, búsqueda, recetas y receta seleccionada.
  - `src/stores/modal.js`: apertura/cierre del modal.
  - `src/stores/favoritos.js`: (actualmente vacío) — oportunidad perfecta.
- UI:
  - `src/components/Header.vue`: formulario de búsqueda y navegación.
  - `src/views/InicioView.vue`: lista de recetas.
  - `src/components/Receta.vue`: tarjeta de receta.
  - `src/components/Modal.vue`: detalle de receta.

## Reglas / cómo trabajar

- Tiempo sugerido: **90–150 min**.
- Crea una rama y trabaja ahí (ver “Git workflow”).
- Mantén los cambios “quirúrgicos” (no reescribas todo, mejora lo existente).
- Debe correr con:
  - `npm install`
  - `npm run dev`
  - `npm run lint`

## Git workflow (obligatorio)

1. Crea una rama desde `main`:

   ```bash
   git checkout main
   git pull
   git checkout -b reto/prueba-tecnica-bebidas
   ```

2. Haz commits pequeños (mínimo 3). Ejemplo:
   - `feat(favoritos): store con persistencia`
   - `feat(ui): estados loading/error/empty`
   - `refactor(modal): ingredientes sin v-html`

3. Al final deja el working tree limpio:

   ```bash
   npm run lint
   npm run format
   ```

4. (Opcional) Simula un PR: escribe una descripción (puede ser en un comentario o en este mismo archivo al final) con:
   - Qué agregaste
   - Qué trade-offs hiciste
   - Qué harías después

---

## Parte 1 — Explicación del proyecto (obligatorio)

Escribe (en 10–20 líneas) una explicación técnica que cubra:

- Flujo de datos desde el formulario de búsqueda hasta el modal.
- Qué estado vive en Pinia y por qué.
- Qué se renderiza en cada vista y cómo se conecta con el router.

**Plus**: agrega un mini diagrama ASCII (aunque sea simple) tipo:

```
Header (form) -> Pinia (busqueda) -> APIService -> Pinia (recetas) -> InicioView (grid) -> Receta (click) -> Pinia (receta) -> Modal
```

  El flujo de datos en este proyecto es el siguiente: 
  Se comienza en el componente de Header mediante un form, utilizando el @submit para evitar la recarga de la pagina. 
  Habra un label/input que obtendra el Nombre o Ingrediente que el usuario busque, esto estara a la escucha gracias al v-model del input, que reaccionara al instante con lo que el usuario busque.
  Tambien habra un label que hace un llamado a la API de TheCockTail para obtener las categorias y mostrarlas en forma de select/option, y esta usa un v-for para iterar todas las categorias.
  Despues un input submit para que el boton de busqueda.
  Una vez obtenido los datos que el usuario desea buscar se hace la busqueda desde bebidas.js con las funciones necesarias, estas funciones pasan al modal que se encargara de mostrar mediante logica de js la iteracion de cada bebida seleccionada, usando un modal de Headless UI en donde estara el nombre de la bebida, los ingredientes y la preparacion de la receta.

  En Pinia, el state se vive en bebidas.js que trae la informacion de todas las bebidas y las almacena.

  Por el momento, en cada vista se renderiza los componentes de Header, Modal, Receta, cada una de estas con su respectiva funcion y los views que nos permiten cargar las paginas de Inicio y Favoritos.


  Considero que este mini diagrama ya viene tal cual como lo explicaria.
  Header (form) -> Pinia (busqueda) -> APIService -> Pinia (recetas) -> InicioView (grid) -> Receta (click) -> Pinia (receta) -> Modal(Bebida + Informacion)
---

## Parte 2 — Features “rápidos” (obligatorios)

### Reto A — Validación del formulario de búsqueda

En `src/components/Header.vue`, el submit tiene un `//ToDo: Validar`.

Implementa validación con estas reglas (elige tú la UX, pero debe ser clara):

- No permitir buscar si `nombre` y `categoria` están vacíos. (Listo)
- Mostrar un mensaje de error visible (por ejemplo arriba del botón, o debajo de inputs). (Listo)
- Limpiar el error cuando el usuario corrige. (Listo + Cuando termina de realizar la busqueda.)

**Criterios de aceptación**
- Si ambos están vacíos, no llama a `store.obtenerRecetas()`. (Listo)
- El usuario entiende qué hacer. (Listo)

### Reto B — Estados de carga, error y “sin resultados”

Agrega a `src/stores/bebidas.js` estados mínimos:

- `loading` (boolean) (Listo)
- `error` (string | null) (Listo)

Y refleja esos estados en `src/views/InicioView.vue`:

- Cuando `loading=true`, mostrar un “Cargando…” (o spinner si quieres). (Listo)
- Si hay error, mostrarlo. (Pendiente pero listo, lo hace manualmente el bebidas.js)
- Si la búsqueda termina sin resultados, mostrar un mensaje tipo “No se encontraron recetas”.(Pendiente)

**Criterios de aceptación**
- `loading` se activa antes de la request y se apaga al finalizar (success o fail).(Listo)
- `error` se setea en catch y se limpia al iniciar una nueva búsqueda. (Listo)

### Reto C — Favoritos con Pinia + persistencia

Implementa `src/stores/favoritos.js` y conéctalo a UI.

Requisitos:

- El store debe permitir:
  - `agregarFavorito(receta)`
  - `eliminarFavorito(idDrink)`
  - `existeEnFavoritos(idDrink)` (boolean)
  - `totalFavoritos` (computed)
- Persistencia con `localStorage`:
  - Cargar favoritos al iniciar.
  - Guardar cuando cambian.

UI:

- En `src/components/Modal.vue`, el botón “Agregar a Favoritos” debe:
  - Cambiar a “Quitar de Favoritos” si ya existe.
  - Ejecutar la acción correspondiente.
- En `src/views/FavoritosView.vue` mostrar la lista de favoritos.
  - Reutiliza `src/components/Receta.vue` si te encaja.
  - Incluye una acción clara para quitar de favoritos.
- (Opcional muy recomendado) Mostrar el contador en el nav del header, ejemplo: `Favoritos (3)`.

**Criterios de aceptación**
- Recargar la página mantiene favoritos.
- No se duplican favoritos.

---

## Parte 3 — Refactor técnico (obligatorio)

### Reto D — Eliminar `v-html` y DOM manual del modal

En `src/components/Modal.vue` se construyen ingredientes usando `document.createElement` y luego se renderiza con `v-html`.

Refactor:

- Crea una lista (array) de ingredientes en JS (idealmente `computed`).
- Renderiza con `v-for` (sin `v-html`, sin `createElement`).

**Criterios de aceptación**
- El modal sigue mostrando ingredientes y cantidades.
- El código queda más “Vue-like” y fácil de testear mentalmente.

---

## Parte 4 — Debug / mejora de API (semi-obligatorio)

En `src/services/APIService.js` se llama:

```js
api(`/filter.php?c=${categoria}&i=${nombre}`)
```

Investiga (consola/network) si esa URL realmente devuelve lo esperado en TheCocktailDB.

Si no funciona como esperas, ajusta el servicio para soportar una estrategia clara, por ejemplo:

- Si hay `categoria` y `nombre`:
  - Decide una prioridad (p. ej. filtrar por categoría primero y luego filtrar en frontend por nombre/ingrediente).
- Si solo hay `categoria`:
  - `filter.php?c=...`
- Si solo hay `nombre`:
  - Decide si es nombre del trago (`search.php?s=...`) o ingrediente (`filter.php?i=...`) y documenta tu decisión.

**Criterios de aceptación**
- Dejas el comportamiento definido (aunque no sea perfecto).
- No rompes el flujo actual.

---

## Parte 5 — Preguntas técnicas (responde en texto)

Responde breve (3–6 líneas cada una). Puedes responder al final de este documento.

1. ¿Diferencia entre `ref()` y `reactive()`? ¿Cuándo usarías cada uno?
2. En tu store `bebidas` hay un `onMounted` dentro del store. ¿Qué implica eso? ¿Se ejecuta una vez o puede ejecutarse varias veces? ¿Qué alternativa propondrías?
3. ¿Qué ventaja tiene usar una instancia de Axios (`src/lib/axios.js`) vs usar `axios.get(...)` directo en cada componente?
4. ¿Qué problema potencial de seguridad o mantenimiento tiene `v-html`?
5. ¿Por qué `computed` es mejor que un método para derivar valores cuando depende de estado reactivo?
6. ¿Qué hace el lazy-loading de rutas en `src/router/index.js` y por qué importa?
7. ¿Qué significa “single source of truth” en estado global y cómo se aplica aquí?

---

## Bonus (elige 1–2 si te sobra tiempo)

- Añade un “toast” simple (sin librerías) para feedback: “Agregado a favoritos” / “Eliminado”.
- Persistir la última búsqueda (`busqueda`) en `localStorage`.
- Añadir un botón “Limpiar búsqueda” que resetee estado y UI.
- Manejar el caso `bebidas.recetas` nulo/undefined sin romper el `v-for`.

---

## Entregables

- Rama: `reto/prueba-tecnica-bebidas`
- Código funcionando (`npm run dev`)
- Lint OK (`npm run lint`)
- Respuestas a preguntas (en este archivo o en un `NOTAS.md`)

## Tu solución (pega aquí al finalizar)

- Explicación del proyecto:

- Respuestas preguntas:

- Notas/decisiones:

---

# 📝 FEEDBACK Y REVISIÓN TÉCNICA

## 🎯 Resumen General

Has hecho un **buen avance** en la implementación de los retos. Tienes las bases correctas y entiendes el flujo de la aplicación. Sin embargo, hay varios aspectos que necesitan mejoras tanto en implementación como en conceptos teóricos.

**Puntuación estimada: 60/100**

---

## ✅ Lo que has hecho BIEN

### 1. **Validación del formulario (Reto A)**
- ✅ Implementaste validación básica correctamente
- ✅ Evitas llamar a `obtenerRecetas()` cuando ambos campos están vacíos
- ✅ Creaste un componente `Alerta.vue` reutilizable con buen diseño
- ✅ El mensaje de error es claro para el usuario

### 2. **Estados de carga y error (Reto B - parcial)**
- ✅ Agregaste `cargando` y `error` al store de bebidas
- ✅ Implementaste manejo de estados en todas las funciones async
- ✅ Mostraste el estado de carga en `InicioView.vue`
- ✅ Usaste `finally` correctamente para limpiar el estado

### 3. **Comprensión básica del flujo**
- ✅ Entiendes cómo funcionan los stores de Pinia
- ✅ Entiendes el flujo de datos de la aplicación
- ✅ Sabes usar Composition API correctamente

---

## ❌ Lo que necesitas MEJORAR

### 1. **Explicación del proyecto (Parte 1)**

**Problema**: Tu explicación es correcta pero superficial y tiene algunos errores conceptuales.

**Errores identificados**:
- Dices "se hace la busqueda desde bebidas.js con las funciones necesarias, estas funciones pasan al modal". **Esto es incorrecto**. Las funciones NO pasan al modal. El modal CONSUME el estado del store.
- No mencionas el papel crucial de `APIService.js` y la instancia de Axios
- No explicas qué hace `seleccionarBebida()` ni cómo se conecta con el modal

**Mejora sugerida**:
```
El flujo completo es:

1. Header.vue → Usuario completa formulario (nombre/ingrediente + categoría)
2. @submit.prevent → Ejecuta handleSubmit() que valida los campos
3. Si válido → Llama a store.obtenerRecetas()
4. Store (bebidas.js) → Llama APIService.buscarRecetas(busqueda)
5. APIService → Usa instancia de Axios configurada para llamar TheCocktailDB API
6. API Response → Store actualiza recetas.value con los resultados
7. InicioView.vue → Reactivamente renderiza el grid usando v-for sobre bebidas.recetas
8. Receta.vue → Muestra cada tarjeta con botón "Ver Receta"
9. Click en "Ver Receta" → Llama bebidas.seleccionarBebida(id)
10. seleccionarBebida() → Obtiene detalle completo de la bebida y actualiza receta.value
11. seleccionarBebida() → Llama modal.handleClickModal() para abrir el modal
12. Modal.vue → Lee bebidas.receta del store y lo muestra reactivamente

Estado en Pinia:
- bebidas.js: categorías (para el select), busqueda (modelo del form), 
  recetas (resultados), receta (detalle seleccionado), cargando, error
- modal.js: modal (boolean para mostrar/ocultar)
- favoritos.js: (pendiente de implementar)

Renderizado de vistas:
- InicioView: Muestra grid de recetas usando Receta.vue
- FavoritosView: (pendiente de implementar lista de favoritos)
- Ambas vistas incluyen Header.vue y Modal.vue en App.vue
```

**Qué estudiar**:
- 📚 Documentación oficial de Pinia: [State Management](https://pinia.vuejs.org/core-concepts/)
- 📚 Vue 3 Composition API: [Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

---

### 2. **Validación del formulario - Lógica redundante (Reto A)**

**Problema**: Tu validación tiene código duplicado y lógica innecesaria.

**Código actual en Header.vue** (líneas 15-44):
```javascript
if (busqueda.nombre === '' && busqueda.categoria === '' ) {
  error.value = 'Favor de rellenar todos los campos.'
  setTimeout(() => {
    error.value = ''
  }, 3000);
  
  busqueda.nombre =''
  busqueda.categoria = ''
  return
}
else if (busqueda.categoria === '')  {
  error.value = 'Seleccione una Categoria.'
  setTimeout(() => {
    error.value = ''
  }, 3000);
  
  busqueda.nombre =''
  busqueda.categoria = ''
  return
}
```

**Problemas**:
1. ❌ **Limpias el formulario incluso cuando el usuario comete un error** - Esto es mala UX. El usuario pierde lo que escribió.
2. ❌ **Código duplicado** - El `setTimeout` y limpiar campos se repite
3. ❌ **No limpias el error después de búsqueda exitosa**
4. ❌ **Lógica confusa** - ¿Por qué limpiar campos cuando hay error?

**Código mejorado**:
```javascript
const handleSubmit = () => {
  // Limpiar errores previos
  error.value = ''
  
  // Validar
  if (!busqueda.categoria) {
    error.value = 'Seleccione una categoría'
    return
  }
  
  // Buscar (nombre es opcional según tu lógica)
  store.obtenerRecetas()
  
  // Limpiar SOLO después de búsqueda exitosa
  busqueda.nombre = ''
  busqueda.categoria = ''
}
```

**Alternativa con mejor UX** - No auto-ocultar el error:
```javascript
const handleSubmit = () => {
  error.value = ''
  
  if (!busqueda.categoria) {
    error.value = 'Seleccione una categoría'
    return
  }
  
  if (!busqueda.nombre) {
    error.value = 'Ingrese un nombre o ingrediente'
    return
  }
  
  store.obtenerRecetas()
  
  // Limpiar después de búsqueda
  busqueda.nombre = ''
  busqueda.categoria = ''
}
```

**Qué estudiar**:
- 📚 UX Patterns: [Form Validation Best Practices](https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/)
- 📚 Vue: [Form Input Bindings](https://vuejs.org/guide/essentials/forms.html)

---

### 3. **Estados de error y sin resultados (Reto B - incompleto)**

**Problema**: No muestras mensaje cuando la búsqueda no devuelve resultados.

**En InicioView.vue** solo tienes:
```vue
<div v-if="bebidas.cargando">Cargando...</div>
<div v-else class="grid...">
```

**¿Qué pasa si `bebidas.recetas` está vacío o es `null`?**
- El grid se renderiza pero no muestra nada
- El usuario no sabe si funcionó o no

**Código mejorado**:
```vue
<template>
  <h1 class="text-6xl font-extrabold">Recetas</h1>
  
  <!-- Estado: Cargando -->
  <div v-if="bebidas.cargando" class="text-center py-10">
    <p class="text-2xl text-gray-600">Cargando recetas...</p>
  </div>
  
  <!-- Estado: Sin resultados -->
  <div v-else-if="!bebidas.recetas || bebidas.recetas.length === 0" class="text-center py-10">
    <p class="text-2xl text-gray-600">No se encontraron recetas. Intenta con otra búsqueda.</p>
  </div>
  
  <!-- Estado: Con resultados -->
  <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
    <Receta
      v-for="receta in bebidas.recetas"
      :receta="receta"
      :key="receta.idDrink"
    />  
  </div>
</template>
```

**Qué estudiar**:
- 📚 Vue: [Conditional Rendering](https://vuejs.org/guide/essentials/conditional.html)
- 📚 UX: [Empty States](https://www.nngroup.com/articles/empty-state/)

---

### 4. **Store de favoritos (Reto C - NO implementado)**

**Problema**: El store está completamente vacío. Este es un **reto obligatorio**.

**Implementación completa requerida**:

```javascript
// src/stores/favoritos.js
import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useFavoritosStore = defineStore('favoritos', () => {
  const favoritos = ref([])

  // Cargar favoritos de localStorage al iniciar
  function cargarFavoritos() {
    const favoritosGuardados = localStorage.getItem('favoritos')
    if (favoritosGuardados) {
      favoritos.value = JSON.parse(favoritosGuardados)
    }
  }

  // Guardar en localStorage cuando cambia
  watch(
    favoritos,
    (nuevosFavoritos) => {
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos))
    },
    { deep: true }
  )

  function agregarFavorito(receta) {
    // Evitar duplicados
    if (!existeEnFavoritos(receta.idDrink)) {
      favoritos.value.push(receta)
    }
  }

  function eliminarFavorito(idDrink) {
    favoritos.value = favoritos.value.filter(
      (favorito) => favorito.idDrink !== idDrink
    )
  }

  function existeEnFavoritos(idDrink) {
    return favoritos.value.some((favorito) => favorito.idDrink === idDrink)
  }

  const totalFavoritos = computed(() => favoritos.value.length)

  // Cargar favoritos al crear el store
  cargarFavoritos()

  return {
    favoritos,
    agregarFavorito,
    eliminarFavorito,
    existeEnFavoritos,
    totalFavoritos
  }
})
```

**En Modal.vue**, actualiza el botón:
```vue
<script setup>
import { computed } from 'vue'
import { useFavoritosStore } from '../stores/favoritos'

const favoritos = useFavoritosStore()

const textoBoton = computed(() => {
  return favoritos.existeEnFavoritos(bebidas.receta.idDrink)
    ? 'Quitar de Favoritos'
    : 'Agregar a Favoritos'
})

const handleClickFavorito = () => {
  if (favoritos.existeEnFavoritos(bebidas.receta.idDrink)) {
    favoritos.eliminarFavorito(bebidas.receta.idDrink)
  } else {
    favoritos.agregarFavorito(bebidas.receta)
  }
}
</script>

<template>
  <button
    type="button"
    class="w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500"
    @click="handleClickFavorito"
  >
    {{ textoBoton }}
  </button>
</template>
```

**En FavoritosView.vue**:
```vue
<script setup>
import { useFavoritosStore } from '../stores/favoritos'
import Receta from '../components/Receta.vue'

const favoritos = useFavoritosStore()
</script>

<template>
  <h1 class="text-6xl font-extrabold">Favoritos</h1>
  
  <div v-if="favoritos.totalFavoritos === 0" class="text-center py-10">
    <p class="text-2xl text-gray-600">No tienes favoritos todavía.</p>
    <p class="text-lg text-gray-500 mt-4">Busca recetas y agrégalas a favoritos.</p>
  </div>
  
  <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
    <Receta
      v-for="receta in favoritos.favoritos"
      :receta="receta"
      :key="receta.idDrink"
    />
  </div>
</template>
```

**En Header.vue**, añade contador en navegación:
```vue
<RouterLink
  :to="{ name: 'favoritos' }"
  v-slot="{ isActive }"
>
  <span :class="[ 'uppercase font-bold', isActive ? 'text-orange-500' : 'text-white' ]">
    Favoritos ({{ favoritos.totalFavoritos }})
  </span>
</RouterLink>
```

**Qué estudiar**:
- 📚 Pinia: [Getting Started](https://pinia.vuejs.org/getting-started.html)
- 📚 Vue: [Watchers](https://vuejs.org/guide/essentials/watchers.html)
- 📚 MDN: [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- 📚 Vue: [Computed Properties](https://vuejs.org/guide/essentials/computed.html)

---

### 5. **Refactor de Modal.vue - v-html (Reto D - NO implementado)**

**Problema GRAVE**: Estás usando `document.createElement` y `v-html`, lo cual:
- ❌ No es idiomático de Vue
- ❌ Riesgo de seguridad (XSS si los datos vienen de usuarios)
- ❌ Difícil de testear
- ❌ No es reactivo correctamente

**Código actual** (líneas 10-27):
```javascript
const formatearIngredientes = () => {
  const ingredientesDiv = document.createElement('DIV')
  
  for(let i = 1; i <= 15; i++){
    if(bebidas.receta[`strIngredient${i}`]){
      const ingrediente = bebidas.receta[`strIngredient${i}`]
      const cantidad = bebidas.receta[`strMeasure${i}`]
      
      const ingredienteCantidad = document.createElement('P')
      ingredienteCantidad.classList.add('text-lg', 'text-gray-500')
      ingredienteCantidad.textContent = `${ingrediente} - ${cantidad}`
      
      ingredientesDiv.appendChild(ingredienteCantidad)
    }
  }
  
  return ingredientesDiv
}
```

**Y luego usas**:
```vue
<div v-html="formatearIngredientes().outerHTML"></div>
```

**Código correcto con computed + v-for**:
```vue
<script setup>
import { computed } from 'vue'

const ingredientes = computed(() => {
  const lista = []
  
  for (let i = 1; i <= 15; i++) {
    const ingrediente = bebidas.receta[`strIngredient${i}`]
    const cantidad = bebidas.receta[`strMeasure${i}`]
    
    if (ingrediente) {
      lista.push({
        nombre: ingrediente,
        cantidad: cantidad || ''
      })
    }
  }
  
  return lista
})
</script>

<template>
  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
    Ingredientes y Cantidades
  </DialogTitle>
  
  <ul class="space-y-2">
    <li 
      v-for="(item, index) in ingredientes" 
      :key="index"
      class="text-lg text-gray-500"
    >
      {{ item.nombre }} - {{ item.cantidad }}
    </li>
  </ul>
</template>
```

**¿Por qué es mejor?**
- ✅ **100% Vue idiomático** - Usa computed + v-for
- ✅ **Reactivo** - Si cambia la receta, se actualiza automáticamente
- ✅ **Seguro** - No hay riesgo de XSS
- ✅ **Testeable** - Puedes testear `ingredientes` como función pura
- ✅ **Más limpio y legible**

**Qué estudiar**:
- 📚 Vue: [List Rendering](https://vuejs.org/guide/essentials/list.html)
- 📚 Vue: [Security - v-html](https://vuejs.org/guide/best-practices/security.html#potential-dangers)
- 📚 Vue: [Why avoid v-html](https://vuejs.org/api/built-in-directives.html#v-html)
- 📖 Blog: [Vue Anti-patterns](https://www.vuemastery.com/blog/common-vue-antipatterns/)

---

### 6. **Problema con la API (Reto D - NO revisado)**

**Problema**: La URL actual NO funciona correctamente:

```javascript
return api(`/filter.php?c=${categoria}&i=${nombre}`)
```

**TheCocktailDB NO soporta ambos parámetros a la vez.**

La API tiene endpoints separados:
- `filter.php?c=Cocktail` - Filtra por categoría
- `filter.php?i=Vodka` - Filtra por ingrediente  
- `search.php?s=margarita` - Busca por nombre

**Solución 1: Priorizar categoría**
```javascript
buscarRecetas({categoria, nombre}){
  if (categoria && nombre) {
    // Si ambos están presentes, prioriza categoría
    return api(`/filter.php?c=${categoria}`)
  } else if (categoria) {
    return api(`/filter.php?c=${categoria}`)
  } else if (nombre) {
    // Decide: ¿es nombre o ingrediente?
    // Por defecto, buscar por ingrediente
    return api(`/filter.php?i=${nombre}`)
  }
}
```

**Solución 2: Más sofisticada (filtrado en frontend)**
```javascript
async buscarRecetas({categoria, nombre}){
  if (categoria && nombre) {
    // 1. Obtener por categoría
    const response = await api(`/filter.php?c=${categoria}`)
    
    // 2. Filtrar en frontend por nombre/ingrediente
    const drinks = response.data.drinks || []
    const filtrados = drinks.filter(drink => 
      drink.strDrink.toLowerCase().includes(nombre.toLowerCase())
    )
    
    return { data: { drinks: filtrados } }
  } else if (categoria) {
    return api(`/filter.php?c=${categoria}`)
  } else if (nombre) {
    return api(`/filter.php?i=${nombre}`)
  }
}
```

**Documenta tu decisión en el código**:
```javascript
/**
 * Busca recetas en TheCocktailDB
 * 
 * NOTA: La API no soporta filtrar por categoría e ingrediente simultáneamente.
 * Estrategia implementada:
 * - Si hay categoría + nombre: filtra por categoría primero
 * - Si solo categoría: usa filter.php?c=
 * - Si solo nombre: usa filter.php?i= (busca por ingrediente)
 * 
 * Alternativa futura: Buscar por categoría y filtrar en frontend
 */
```

**Qué estudiar**:
- 📚 [TheCocktailDB API Documentation](https://www.thecocktaildb.com/api.php)
- 📚 MDN: [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- 📖 Blog: [Working with REST APIs](https://www.freecodecamp.org/news/rest-api-best-practices/)

---

### 7. **Preguntas técnicas (Parte 5 - NO respondidas)**

**Estas preguntas son OBLIGATORIAS.** Aquí te doy las respuestas esperadas:

#### 1. ¿Diferencia entre `ref()` y `reactive()`?

**Respuesta correcta**:
- `ref()`: Para valores primitivos (string, number, boolean) y objetos que necesitas reasignar completamente. Acceso con `.value`.
- `reactive()`: Para objetos y arrays que modificarás sus propiedades internas. Acceso directo sin `.value`.

```javascript
// ref - Para primitivos o cuando necesitas reasignar
const contador = ref(0)
contador.value++ // Necesitas .value

const user = ref({ name: 'Juan' })
user.value = { name: 'Pedro' } // Puedes reasignar completamente

// reactive - Para objetos que modificarás internamente
const busqueda = reactive({
  nombre: '',
  categoria: ''
})
busqueda.nombre = 'vodka' // Sin .value
// NO puedes hacer: busqueda = {} ❌
```

**Cuándo usar cada uno**:
- `ref()`: Variables simples, flags booleanos, contadores, datos que reasignarás
- `reactive()`: Formularios, configuraciones, objetos complejos que modificarás

#### 2. onMounted en el store - ¿Qué implica?

**Respuesta correcta**:
En tu código (bebidas.js línea 22) tienes `onMounted` dentro del store. Esto funciona PERO:
- Se ejecuta **una vez** cuando se crea el store por primera vez
- Pinia crea el store la primera vez que se usa (lazy initialization)
- Si usas hot-reload en desarrollo, puede ejecutarse múltiples veces

**Problema**: `onMounted` es para componentes, no stores. Es confuso.

**Alternativa mejor**:
```javascript
export const useBebidasStore = defineStore('bebidas', () => {
  const categorias = ref([])
  const cargando = ref(false)
  
  // Función explícita para inicializar
  async function obtenerCategorias() {
    cargando.value = true
    try {
      const {data: {drinks}} = await APIService.obtenerCategorias()
      categorias.value = drinks
    } catch(error) {
      console.error(error)
    } finally {
      cargando.value = false
    }
  }
  
  // Ejecutar al crear el store
  obtenerCategorias()
  
  return { categorias, cargando }
})
```

**O mejor aún**: Cargar categorías solo cuando se monta el Header:
```vue
// Header.vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  store.obtenerCategorias()
})
</script>
```

#### 3. ¿Ventaja de instancia de Axios vs axios.get directo?

**Respuesta correcta**:
- **Configuración centralizada**: baseURL, headers, timeouts en un solo lugar
- **Interceptors compartidos**: Puedes agregar lógica global (auth, logging)
- **Mantenibilidad**: Si cambia la URL base, solo modificas un archivo
- **Consistencia**: Todos los requests usan la misma configuración

```javascript
// src/lib/axios.js - Configuración única
const api = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
  timeout: 5000
})

// Interceptor de ejemplo
api.interceptors.request.use(config => {
  console.log('Request:', config.url)
  return config
})
```

#### 4. ¿Problema de v-html?

**Respuesta correcta**:
- **Seguridad (XSS)**: Si el HTML viene de usuarios, pueden inyectar `<script>` malicioso
- **Performance**: Vue no puede optimizar el render
- **Mantenibilidad**: No puedes aplicar estilos scoped fácilmente
- **Testing**: Difícil de testear

**Ejemplo de XSS**:
```javascript
// Si esto viene de usuario:
const malicious = '<img src=x onerror="alert(\'XSS\')">'
// Y lo renderizas con v-html, ejecuta código

#### 5. ¿Por qué computed es mejor que método?

**Respuesta correcta**:
- **Caché**: `computed` cachea el resultado y solo recalcula cuando dependencias cambian
- **Performance**: Evita cálculos innecesarios en cada render
- **Reactividad**: Se actualiza automáticamente cuando cambian dependencias

```javascript
// ❌ Método - Se ejecuta en CADA render
const total = () => {
  return items.value.reduce((sum, item) => sum + item.price, 0)
}

// ✅ Computed - Solo recalcula si items cambia
const total = computed(() => {
  return items.value.reduce((sum, item) => sum + item.price, 0)
})
```

#### 6. ¿Lazy-loading de rutas y por qué importa?

**Respuesta correcta**:
```javascript
// Sin lazy-loading - Todo se carga al inicio
import InicioView from '../views/InicioView.vue'

// Con lazy-loading - Se carga solo cuando navegas a la ruta
component: () => import('../views/InicioView.vue')
```

**Por qué importa**:
- **Bundle más pequeño inicialmente**: Carga más rápida
- **Code splitting**: Cada ruta es un chunk separado
- **Mejor performance**: Solo descarga lo que necesitas
- **Mejor experiencia**: App carga más rápido

#### 7. ¿Single source of truth y cómo se aplica?

**Respuesta correcta**:
- Cada dato debe tener **un único lugar autoritativo** donde vive
- No duplicar estado en múltiples lugares
- Todos los componentes leen del mismo lugar

**En tu app**:
```javascript
// ✅ CORRECTO - Single source of truth
// bebidas.js tiene las recetas
const recetas = ref([])

// Múltiples componentes leen del mismo store
// InicioView.vue, Modal.vue → usan useBebidasStore()

// ❌ INCORRECTO - Duplicar estado
// bebidas.js tiene recetas
// Header.vue también guarda copia de recetas ❌
```

**Beneficios**:
- Sin inconsistencias
- Más fácil de debugear
- Cambios se propagan automáticamente

---

## 📊 Estado de los retos

| Reto | Estado | Puntos |
|------|--------|--------|
| Parte 1: Explicación | ⚠️ Parcial | 4/10 |
| Reto A: Validación | ✅ Completo | 8/10 |
| Reto B: Loading/Error | ⚠️ Parcial | 6/10 |
| Reto C: Favoritos | ❌ No hecho | 0/20 |
| Reto D: Refactor v-html | ❌ No hecho | 0/15 |
| Reto E: API Debug | ❌ No hecho | 0/10 |
| Parte 5: Preguntas | ❌ No hecho | 0/25 |
| Bonus | ❌ No hecho | 0/10 |
| **TOTAL** | | **18/100** |

---

## 🎓 Plan de estudio recomendado

### Semana 1: Fundamentos Vue 3
1. **Día 1-2**: Reactivity in depth
   - 📺 [Vue 3 Reactivity (Vue Mastery)](https://www.vuemastery.com/courses/vue-3-reactivity/vue3-reactivity)
   - 📚 [Vue Docs: Reactivity](https://vuejs.org/guide/extras/reactivity-in-depth.html)

2. **Día 3-4**: Composition API profundo
   - 📺 [Composition API (Official)](https://vuejs.org/guide/extras/composition-api-faq.html)
   - 💻 Practica: Convierte Options API a Composition API

3. **Día 5**: Computed vs Methods vs Watchers
   - 📚 [Computed Properties](https://vuejs.org/guide/essentials/computed.html)
   - 💻 Ejercicio: Crea una calculadora de carrito

### Semana 2: Pinia y State Management
1. **Día 1-2**: Pinia desde cero
   - 📺 [Pinia Course (Vue Mastery)](https://www.vuemastery.com/courses/from-vuex-to-pinia/what-is-pinia)
   - 📚 [Pinia Docs](https://pinia.vuejs.org/)
   - 💻 Ejercicio: Crea un store de tareas con persistencia

2. **Día 3-4**: LocalStorage y persistencia
   - 📚 [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
   - 💻 Ejercicio: Implementa favoritos con undo/redo

3. **Día 5**: Composición de stores
   - 💻 Ejercicio: Conecta múltiples stores (usuarios + productos)

### Semana 3: APIs y Axios
1. **Día 1-2**: Axios en profundidad
   - 📚 [Axios Docs](https://axios-http.com/docs/intro)
   - 💻 Ejercicio: Crea interceptors para logging

2. **Día 3-4**: Manejo de errores y loading states
   - 📖 [Error Handling Best Practices](https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript)
   - 💻 Ejercicio: Sistema de notificaciones

3. **Día 5**: REST APIs
   - 📺 [Understanding REST](https://www.youtube.com/watch?v=7YcW25PHnAA)
   - 💻 Práctica con TheCocktailDB API

### Semana 4: Mejores prácticas
1. **Día 1-2**: Seguridad en Vue
   - 📚 [Vue Security Best Practices](https://vuejs.org/guide/best-practices/security.html)
   - 📖 [OWASP Top 10](https://owasp.org/www-project-top-ten/)

2. **Día 3-4**: Performance
   - 📺 [Vue Performance](https://www.vuemastery.com/courses/vue3-performance)
   - 💻 Ejercicio: Optimiza lista grande con virtual scrolling

3. **Día 5**: Testing (bonus)
   - 📚 [Vitest](https://vitest.dev/)
   - 💻 Ejercicio: Tests para stores

---

## 🚀 Próximos pasos INMEDIATOS

### Prioridad ALTA (hacer AHORA)
1. ✅ **Implementar store de favoritos completo** (Reto C)
2. ✅ **Refactorizar Modal.vue** sin v-html (Reto D)
3. ✅ **Responder preguntas técnicas** (Parte 5)
4. ✅ **Agregar mensaje "sin resultados"** en InicioView

### Prioridad MEDIA (siguiente sesión)
1. ⚠️ Revisar y arreglar validación del formulario
2. ⚠️ Debugear problema de la API
3. ⚠️ Mejorar explicación del proyecto

### Bonus (si tienes tiempo)
1. 💡 Toast de notificaciones
2. 💡 Persistir última búsqueda
3. 💡 Spinner animado para loading

---

## 💬 Comentarios finales

### Lo bueno
- Tienes la **actitud correcta**: Estás intentando y documentando tu proceso
- Entiendes los **conceptos básicos** de Vue y Pinia
- Tu código **funciona** (aunque sea parcialmente)

### Lo que necesitas mejorar urgente
- **Completar los retos obligatorios**: Llevas 18/100 puntos
- **Entender conceptos a profundidad**: No solo copiar código, entender POR QUÉ
- **Leer documentación oficial**: Es tu mejor amigo

### Mentalidad
> "No se trata de completar rápido, sino de **entender profundamente**. Cada concepto que dominas hoy te ahorra 10 bugs mañana."

**Pregunta antes de implementar**:
1. ¿Por qué estoy usando este approach?
2. ¿Hay una manera más idiomática de Vue?
3. ¿Esto es seguro y mantenible?

---

## 📞 Preguntas frecuentes que deberías hacerte

1. **"¿Por qué usar computed en lugar de una función?"**
   → Performance y caché automático

2. **"¿Cuándo usar ref vs reactive?"**
   → ref para primitivos/reasignar, reactive para modificar propiedades

3. **"¿Por qué v-html es malo?"**
   → XSS, performance, no testeable

4. **"¿Qué hace realmente Pinia diferente de un objeto global?"**
   → Reactividad, DevTools, composabilidad, tipado

5. **"¿Por qué no duplicar estado?"**
   → Single source of truth previene bugs

---

**¡Sigue adelante! Tienes las bases, ahora profundiza. 🚀**

