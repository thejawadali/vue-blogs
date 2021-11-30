<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <div class="my-5 flex">
    <profile-pic  class="mr-5 mt-4 hidden md:block" :photo="comment.user.profilePic" />
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
