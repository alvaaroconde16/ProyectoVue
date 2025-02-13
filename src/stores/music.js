import { defineStore } from "pinia";
import { ref } from "vue";

export const useMusicStore = defineStore("music", () => {
  const currentSong = ref(null);
  const songs = ref([]); /* Aquí va tu lista de canciones */

  const setCurrentSong = (song) => {
    currentSong.value = song;
  };

  return { currentSong, setCurrentSong };
});

