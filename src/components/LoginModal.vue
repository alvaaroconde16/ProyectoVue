<template>
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal-content text-white">
        <h2>Iniciar Sesión</h2>
        <p>Ingresa tu nombre de usuario y contraseña.</p>
  
        <!-- Input para el nombre -->
        <input v-model="nombreLogin" type="text" class="form-control" placeholder="Nombre de usuario" />
  
        <!-- Input para la contraseña -->
        <input v-model="contraseñaLogin" type="password" class="form-control mt-2" placeholder="Contraseña" />
  
        <!-- Botón para iniciar sesión -->
        <button @click="iniciarSesion" class="btn btn-primary">Login</button>
        <button @click="cerrarModal" class="btn btn-secondary mt-2">Cancelar</button>
  
        <!-- Mensaje de error -->
        <p v-if="errorMensaje" class="error">{{ errorMensaje }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const mostrarModal = ref(false);
  const nombreLogin = ref('');
  const contraseñaLogin = ref('');
  const errorMensaje = ref('');
  const emit = defineEmits(["usuarioLogueado"]);
  
  const abrirModal = () => {
    mostrarModal.value = true;
    errorMensaje.value = ''; // Limpiar errores cuando se abre el modal
  };
  
  const cerrarModal = () => {
    mostrarModal.value = false;
  };
  
  const iniciarSesion = () => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
  
    if (!usuarioGuardado) {
      errorMensaje.value = "No hay usuario registrado. Regístrate primero.";
      return;
    }
  
    if (usuarioGuardado.nombre === nombreLogin.value && usuarioGuardado.contraseña === contraseñaLogin.value) {
      usuarioGuardado.sesionIniciada = true; // Marcar sesión iniciada
      localStorage.setItem("usuario", JSON.stringify(usuarioGuardado));
      emit("usuarioLogueado", usuarioGuardado);
      cerrarModal();
    } else {
      errorMensaje.value = "Usuario o contraseña incorrectos.";
    }
  };
  
  defineExpose({ abrirModal });
  </script>
  
  <style scoped>
 .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}

.modal-content {
  background: #2c2c2c;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 400px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
}

h2 {
  font-size: 1.8rem;
  color: #fff;
}

input {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #333;
  color: white;
}

input::placeholder {
  color: #aaa;
}

button {
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
}

button.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  margin-top: 15px;
}

button.btn-primary:hover {
  background-color: #0056b3;
}

button.btn-secondary {
  color: white;
  background-color: #495057;
  border: none;
}

button.btn-secondary:hover {
  background-color: #343a40;
}

.error {
  color: red;
  margin-top: 10px;
}
  </style>
  