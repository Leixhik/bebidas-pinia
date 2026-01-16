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
- Si hay error, mostrarlo. (Pendiente pero listo, lo hace manualmente el bebidas.js, ya que no se por que no se trae el error global desde bebidas hasta Heading)
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

