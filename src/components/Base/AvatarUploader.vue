<script setup lang="ts">
import cameraIcon from "virtual:vite-icons/mdi/camera";
import { ref } from "vue-demi"

const imageURL = ref("/avatar.png")

const emit = defineEmits(["handle-change"])

function loadFile(e: any) {
  emit('handle-change', e.target.files[0])
  imageURL.value = URL.createObjectURL(e.target.files[0])
}
</script>

<template>
  <!-- profile pic -->
  <div
    class="
      text-transparent
      flex
      justify-center
      items-center
      transition-all
      duration-1000
      ease
    "
  >
    <label
      class="
        cursor-pointer
        w-28
        h-28
        z-10
        rounded-full
        flex
        justify-center
        items-center
        hover:bg-black
        opacity-70
        text-xs
        z-50
        hover:text-white
      "
      for="file"
    >
      <camera-icon />
      <span>Change Image</span>
    </label>
    <!-- onchange="loadFile(event)" -->
    <input class="hidden" id="file" type="file" @change="loadFile"/>
    <img
      class="absolute object-cover w-28 h-28 shadow-lg rounded-full z-0"
      :src="imageURL"
    />
  </div>
</template>

