<script setup lang="ts">
import { computed } from "vue-demi";
const baseURL = import.meta.env.APP_BASE_URL?.toString();
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
    :src="props.photo ? `${baseURL}/${props.photo}` : '/avatar.png'"
    alt="profile"
    :class="`w-${props.wh} h-${props.wh} rounded-full cursor-pointer object-cover`"
  />
</template>
