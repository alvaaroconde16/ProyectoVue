<template>
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal-content text-white">
        <h2>Registro</h2>
        <p>Para empezar, ingresa tu nombre y selecciona un avatar.</p>
  
        <!-- Input para el nombre -->
        <input v-model="nombre" type="text" class="form-control" placeholder="Nombre" />
  
        <!-- Input para la contraseña -->
        <input v-model="contraseña" type="password" class="form-control mt-2" placeholder="Contraseña" />
  
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
        <button @click="registrarUsuario" class="btn btn-primary">Registrarse</button>
        <button @click="cerrarModal" class="btn btn-secondary mt-2">Cancelar</button>
      </div>
    </div>
</template>
    
<script setup>
  import { ref, defineEmits } from 'vue';
  
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
  
  const abrirModal = () => {
    mostrarModal.value = true;
    nombre.value = '';
    contraseña.value = '';
    avatarSeleccionado.value = '';
  };
  
  const cerrarModal = () => {
    mostrarModal.value = false;
  };
  
  const registrarUsuario = () => {
    if (!nombre.value.trim() || !contraseña.value.trim() || !avatarSeleccionado.value) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Obtener los usuarios guardados en localStorage, si existen
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];  // Aquí cambio 'usuario' por 'usuarios' y me aseguro de obtener un array vacío si no existe

    // Verificar si ya existe un usuario con el mismo nombre
    const usuarioExistente = usuarios.find(usuario => usuario.nombre === nombre.value.trim());
    if (usuarioExistente) {
      alert("Ya existe un usuario con ese nombre.");
      return;
    }
  
    const nuevoUsuario = {
      nombre: nombre.value.trim(),
      contraseña: contraseña.value.trim(),
      avatar: avatarSeleccionado.value,
      sesionIniciada: true,  // Iniciar sesión automáticamente
    };

    // Agregar el nuevo usuario al arreglo
    usuarios.push(nuevoUsuario);
    
    // Guardar el array de usuarios en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));  // Aquí también cambiamos la clave a 'usuarios'
    
    // Emitir el evento para notificar al componente padre
    emit("usuarioRegistrado", nuevoUsuario);

    // Iniciar sesion y cerrar el modal
    iniciarSesion(nuevoUsuario);
    cerrarModal();
  };

  // Función para iniciar sesión automáticamente
  const iniciarSesion = (usuario) => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuariosGuardados.find(usuarioGuardado => usuarioGuardado.nombre === usuario.nombre);

    if (usuarioEncontrado) {
      usuarioEncontrado.sesionIniciada = true; // Asegúrate de marcar la sesión como iniciada
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
      emit("usuarioLogueado", usuarioEncontrado);  // Emitir el evento para actualizar el estado del padre
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
    background: rgba(0, 0, 0, 0.7);
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
    width: 500px;
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
  
  .avatar-selection {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  
  .avatar-item {
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
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
    </style>
    