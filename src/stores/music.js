import { defineStore } from "pinia";
import { ref } from "vue";

export const useMusicStore = defineStore("music", () => {
  const currentSong = ref(null);

  const setCurrentSong = (song) => {
    console.log("Datos de la canción antes de pasarla al store:", song);
    currentSong.value = song;
    console.log("Datos de la canción después de pasarla al store:", currentSong.value);
    console.log("Titulo de la cancion:", currentSong.value.title);
  };

  return { currentSong, setCurrentSong };
});

