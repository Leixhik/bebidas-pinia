# Práctica (Vue 3 + Pinia + Router) — Ideas y Ejercicios

## 1) Análisis rápido de tu proyecto actual

**Qué ya tienes armado**
- **Stack**: Vue 3 (script setup) + Vite + Pinia + Vue Router + TailwindCSS + Axios.
- **Rutas**: `/` (Inicio) y `/favoritos` (Favoritos).
- **Layout**: `App.vue` monta `Header` y un `RouterView`.
- **Store Pinia**: `stores/bebidas.js`
  - `categorias` (ref) cargadas desde TheCocktailDB.
  - `busqueda` (reactive) con `nombre` y `categoria` enlazado al formulario.
- **UI**: En `Header.vue` ya existe el formulario (texto + select) y navegación.

**Qué está “a medio camino” (perfecto para practicar)**
- El formulario **todavía no ejecuta una búsqueda** (no hay `@submit` ni acción en el store).
- No hay estado de **loading**, **errores**, **resultados**, **detalle**, ni **persistencia de favoritos**.
- `InicioView.vue` y `FavoritosView.vue` son placeholders.

En resumen: es un excelente punto para practicar **flujo completo**: formulario → store → llamada HTTP → render de resultados → favoritos → rutas.

---

## 2) Ideas de proyectos similares (para practicar lo mismo)

Todas estas ideas usan el mismo “esqueleto” que tu app: **Router + Pinia + consumo de API + búsqueda + favoritos + persistencia**.

1) **Buscador de Películas/Series (watchlist)**
- Búsqueda por título + filtro por género.
- Vista de detalle con reparto / trailer.
- Favoritos / “por ver” con persistencia en `localStorage`.

2) **Recetario de Cocina (ingredientes y categorías)**
- Búsqueda por ingrediente + tipo de comida.
- Detalle con pasos e ingredientes.
- Lista de compras (seleccionas ingredientes y se guardan).

3) **Pokedex (filtros y detalle)**
- Filtro por tipo (agua/fuego/etc.) + búsqueda por nombre.
- Detalle con stats y evoluciones.
- Favoritos con persistencia.

4) **Explorador de Libros (biblioteca personal)**
- Buscar libros + filtro por autor/tema.
- Marcar “Leyendo / Leído / Pendiente”.
- Historial de búsquedas y favoritos.

5) **Buscador de Música/Álbumes (playlist)**
- Buscar artistas/álbumes, filtros por género.
- Detalle del álbum y tracks.
- Playlist guardada en `localStorage`.

6) **Dashboard de Clima (favoritos por ciudad)**
- Buscar ciudad, ver pronóstico.
- Favoritos: ciudades frecuentes.
- Manejo de errores (ciudad no encontrada / rate limits).

7) **Catálogo de Productos (mini e-commerce sin pagos)**
- Listado + filtros + ordenamiento.
- Detalle del producto.
- Carrito (estado global) + persistencia.

8) **Gestor de Eventos (agenda)**
- CRUD básico (crear/editar/eliminar) + filtros.
- Rutas: lista, detalle, formulario.
- Persistencia local (o JSON server).

---

## 3) Ejercicios para ESTE proyecto (por niveles)

### Nivel 1 — Fundamentos (fácil)
1) **Conectar el submit del formulario**
- En `Header.vue`, agrega `@submit.prevent`.
- Al enviar, valida que **nombre o categoría** tenga valor.

2) **Mover la carga de categorías a una acción del store**
- Crear `fetchCategorias()` en el store y llamarla desde el componente.
- Objetivo: practicar **acciones** y separar lógica.

3) **Estado de UI mínimo**
- Agrega `loadingCategorias` y `errorCategorias`.
- Renderiza un texto simple: “Cargando categorías…” / “Error al cargar”.

4) **Reset de formulario**
- Botón “Limpiar” que resetee `busqueda.nombre` y `busqueda.categoria`.

5) **Computed derivadas**
- Crea un `computed` que diga si el formulario es válido (ej.: al menos un campo lleno) y deshabilita el submit.

### Nivel 2 — Búsqueda y resultados (intermedio)
6) **Implementar búsqueda real**
- Crea en el store una acción `buscarBebidas()` que use `busqueda` y consulte la API.
- Guardar resultados en `resultados` (ref array) y mostrarlos en `InicioView.vue`.

7) **Componente de listado reutilizable**
- Crear un componente (por ejemplo `BebidaCard.vue`) para renderizar cada resultado.
- Props mínimas: nombre, imagen, id.

8) **Manejo de estados para la búsqueda**
- `loadingBusqueda`, `errorBusqueda`, `sinResultados`.
- Casos: búsqueda vacía, sin resultados, error de red.

9) **Evitar búsquedas duplicadas**
- Si el usuario manda el mismo query consecutivo, no vuelvas a consultar (caching simple en memoria o comparación con `ultimaBusqueda`).

10) **Debounce (opcional)**
- Si decides buscar al escribir, implementa debounce (300–500ms) para evitar spam de requests.

### Nivel 3 — Favoritos y persistencia (intermedio/avanzado)
11) **Agregar favoritos (Pinia)**
- Estado `favoritos` (array).
- Acciones: `agregarFavorito(bebida)`, `quitarFavorito(id)`, `esFavorito(id)`.

12) **Persistir favoritos en `localStorage`**
- Al cambiar favoritos, guardar.
- Al iniciar, cargar.
- Practica watchers o suscripción a Pinia.

13) **Vista Favoritos real**
- Renderiza favoritos en `FavoritosView.vue`.
- Mostrar estado vacío: “Aún no tienes favoritos”.

14) **Evitar duplicados**
- Asegura que un favorito no se repita.

### Nivel 4 — Detalle, rutas y arquitectura (avanzado)
15) **Ruta de detalle**
- Nueva ruta tipo `/bebida/:id`.
- Al hacer click en una card, navegar al detalle.

16) **Fetch de detalle**
- Acción `fetchDetalle(id)` en el store.
- Estado `detalleActual` + `loadingDetalle` + `errorDetalle`.

17) **Normalizar datos**
- La API suele traer muchos campos (ingredientes, medidas, etc.).
- Crea un helper que transforme el objeto crudo a una estructura limpia (ej.: `ingredientes: [{nombre, medida}]`).

18) **Separar stores por dominio (opcional)**
- Store `busqueda` (categorías + query) y store `favoritos` (persistencia).
- Practicar modularidad.

### Nivel 5 — Calidad, DX y robustez (avanzado/experto)
19) **Abortar requests previas**
- Si el usuario dispara otra búsqueda, cancela la anterior (AbortController o cancel tokens, según config).

20) **Retry/backoff básico**
- Reintentar 1–2 veces cuando sea error de red.

21) **Tests (si quieres subir nivel)**
- Tests unitarios del store (acciones y helpers de normalización).
- Tests de componentes (render condicional de estados).

22) **Accesibilidad y UX mínimos**
- Mensajes de error claros.
- `aria-label` donde aplique.
- Focus/teclado: navegar y activar resultados.

---

## 4) “Misiones” tipo checklist (para practicar por entregables)

**Entrega A (1–2h):** submit + validación + búsqueda y render de resultados.

**Entrega B (2–4h):** favoritos completos + persistencia + vista Favoritos.

**Entrega C (4–6h):** ruta de detalle + normalización de ingredientes + estados loading/error.

**Entrega D (reto):** cancelar requests + caching + pruebas unitarias del store.

---

## 5) Recomendación de orden (si estás siguiendo un curso)

1) Store (acciones + estado) → 2) consumo API → 3) render resultados → 4) favoritos + persistencia → 5) rutas detalle → 6) robustez.

Si quieres, te puedo proponer el **siguiente paso exacto** para tu repo (qué archivos crear y qué acciones del store implementar primero) y dejarte una lista “paso a paso” tipo guía de implementación.