<script setup lang="ts">
import { computed } from "vue-demi";

const props = defineProps({
  photo: {
    type: String,
    default: "",
  },
  wh: {
    type: Number,
    default: 8,
  },
});
</script>


<template>
  <img
    :src="props.photo ? 'http://localhost:3001/' + props.photo : '/avatar.png'"
    alt="profile"
    :class="`w-${props.wh} h-${props.wh} rounded-full cursor-pointer object-cover`"
  />
</template>
