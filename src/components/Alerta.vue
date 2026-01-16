<template>
  <div class="alerta">
    <div class="icono">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
    </div>
    <div class="contenido">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.alerta {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background-color: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-left: 6px solid #DC2626;
  border-radius: 0.5rem;
  color: #991B1B;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.icono {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: #DC2626;
}

.contenido {
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>