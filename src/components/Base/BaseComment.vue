<script setup lang="ts">
import { computed } from "vue-demi";
import dayjs from "dayjs";

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const pic = computed(() => props.comment.user.profilePic || "/avatar.png");
</script>

<template>
  <div class="my-5 flex">
    <img
      :src="pic"
      class="w-8 h-8 rounded-full cursor-pointer object-cover mr-5 mt-4"
      alt="profile photo"
    />
    <div class="w-full border border-gray-300 px-3 py-5 rounded-md bg-white">
      <!-- user details -->
      <p class="mb-3 font-semibold text-md">
        {{ comment.user.name }} <span class="text-lg text-gray-400"> . </span>
        <span class="text-sm font-normal text-gray-500">
          {{ dayjs(comment.createdAt).format("MMM D") }}</span
        >
      </p>
      <!-- statement -->
      <p class=" whitespace-pre-line">
        {{ comment.statement }}
      </p>
    </div>
  </div>
</template>
