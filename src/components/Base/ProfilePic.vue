<script setup lang="ts">
import { computed } from "vue-demi";

const props = defineProps({
  photo: {
    type: String,
    default: "",
  },
  wh: {
    type: Number,
    default: 8
  }
});

const pic = computed(() => props.photo || "/avatar.png");
</script>
<template>
  <img
    :src="pic"
    :class="`w-${props.wh} h-${props.wh}`"
    class="rounded-full cursor-pointer object-cover"
    alt="profile photo"
  />
</template>
