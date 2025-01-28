<template>
    <div v-if="!isUserRegistered" class="modal-overlay">
      <div class="modal">
        <h2>Bienvenido a la aplicación</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="username">Tu nombre:</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="avatar">Selecciona un avatar:</label>
            <select v-model="avatar" id="avatar" required>
              <option value="avatar1">Avatar 1</option>
              <option value="avatar2">Avatar 2</option>
              <option value="avatar3">Avatar 3</option>
            </select>
          </div>
  
          <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const username = ref('');
  const avatar = ref('avatar1');
  
  // Función para manejar el registro del usuario
  const handleSubmit = () => {
    const userData = {
      name: username.value,
      avatar: avatar.value,
    };
  
    // Guardamos el usuario en localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  
    // Emitimos el evento de registro
    emit('register'); // Emitimos evento cuando el usuario se registre
  };
  
  const emit = defineEmits(['register']); // Definimos el evento que se emite
  </script>
  
  <style scoped>
  /* Estilos del modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input,
  select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  