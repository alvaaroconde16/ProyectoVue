<template>
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal-content">
        <h2>¡Únete a la diversión! 🎶</h2>
        <p>Introduce tu nombre y elige un avatar para empezar.</p>
  
        <!-- Input para el nombre -->
        <div class="input-group">
          <label for="nombre">Nombre</label>
          <input v-model="nombre" id="nombre" type="text" class="form-control" placeholder="Tu nombre..." />
        </div>
  
        <!-- Input para la contraseña -->
        <div class="input-group mt-3">
          <label for="contraseña">Contraseña</label>
          <input v-model="contraseña" id="contraseña" type="password" class="form-control" placeholder="Contraseña" />
        </div>
  
        <!-- Selección de avatar -->
        <div class="avatar-selection mt-3">
          <div 
            v-for="(avatar, index) in avatars" 
            :key="index" 
            class="avatar-item"
            :class="{ selected: avatarSeleccionado === avatar }"
            @click="avatarSeleccionado = avatar"
          >
            <img :src="avatar" alt="Avatar" class="avatar-image" />
          </div>
        </div>
  
        <!-- Botón de registro -->
        <div class="modal-buttons mt-4">
          <button @click="registrarUsuario" class="btn btn-primary">Registrarse</button>
          <button @click="cerrarModal" class="btn btn-secondary mt-2">Cancelar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, onMounted } from 'vue';
  
  const mostrarModal = ref(false);
  const nombre = ref('');
  const contraseña = ref('');
  const avatarSeleccionado = ref('');
  const emit = defineEmits(["usuarioRegistrado"]);
  
  const avatars = ref([
    "https://randomuser.me/api/portraits/men/75.jpg",
    "https://randomuser.me/api/portraits/men/76.jpg",
    "https://randomuser.me/api/portraits/men/77.jpg",
    "https://randomuser.me/api/portraits/men/78.jpg",
    "https://randomuser.me/api/portraits/men/79.jpg"
  ]);
  
  // Función para abrir el modal si no hay usuario guardado
  const abrirModal = () => {
    mostrarModal.value = true;
  };
  
  const cerrarModal = () => {
    mostrarModal.value = false;
  };
  
  const registrarUsuario = () => {
    if (nombre.value.trim() && avatarSeleccionado.value) {
      const usuario = {
        nombre: nombre.value.trim(),
        contraseña: contraseña.value.trim(),
        avatar: avatarSeleccionado.value,
        sesionIniciada: false,  // Asegúrate de que esta propiedad sea false al crear el usuario
      };
  
      localStorage.setItem('usuario', JSON.stringify(usuario));
      emit("usuarioRegistrado", usuario);
      cerrarModal();
    } else {
      alert("Por favor, ingresa tu nombre y selecciona un avatar.");
    }
  };
  
  // Verificar si hay un usuario guardado y no mostrar el modal si existe
  onMounted(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (!usuarioGuardado) {
      abrirModal(); // Si no hay usuario guardado, muestra el modal
    }
  });
  
  defineExpose({ abrirModal });
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
  }
  
  .modal-content {
    background: #f7f7f7;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    width: 380px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  }
  
  h2 {
    font-size: 1.8rem;
    color: #333;
  }
  
  label {
    font-size: 1rem;
    margin-bottom: 5px;
    display: block;
    text-align: left;
  }
  
  .input-group {
    width: 100%;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
  
  .avatar-selection {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  
  .avatar-item {
    cursor: pointer;
    padding: 5px;
    border-radius: 10px;
    transition: transform 0.3s ease;
  }
  
  .avatar-item:hover {
    transform: scale(1.1);
  }
  
  .avatar-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid transparent;
  }
  
  .selected .avatar-image {
    border: 2px solid #007bff;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  button {
    padding: 10px 15px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
  }
  
  button.btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
  }
  
  button.btn-primary:hover {
    background-color: #0056b3;
  }
  
  button.btn-secondary {
    background-color: #6c757d;
    color: white;
    border: none;
  }
  
  button.btn-secondary:hover {
    background-color: #495057;
  }
  </style>
  