<script setup lang="ts">
import { timeDifference } from "../logic/utils"
const props = defineProps({
  blog: {
    type: Object,
    required: true
  }
});

</script>
<template>
  <!-- for small devices -->
  <div class="mb-16 flex flex-col md:flex-row md:w-100 md:h-44">
    <!-- Blog image -->
    <img
      :src="blog.image"
      alt="img"
      class="cursor-pointer w-full object-cover h-96 rounded-sm md:w-72 md:h-44"
    />
    <div class="flex flex-col md:ml-10 justify-between pb-6">
      <!-- blog category -->
      <a
        class="
          text-gray-600
          hover:underline
          mt-3
          mb-1
          inline-block
          cursor-pointer
          text-blue-800
        "
        >#{{ blog.category.title }}</a
      >

      <!-- blog title -->
      <h1 class="text-xl font-semibold hover:underline cursor-pointer">
        {{ blog.title }}
      </h1>
      <!-- bottom line -->
      <div
        class="
          my-2
          flex
          items-center
          text-sm
          justify-between
          text-gray-600
          mr-4
        "
      >
        <!-- author -->
        <div class="flex items-center">
          <!-- profile photo -->
          <img
            :src="blog.author.profilePic || '/avatar.png'"
            class="w-8 h-8 rounded-full cursor-pointer object-cover"
            alt="profile photo"
          />
          <!-- name -->
          <p class="mx-3 hover:underline cursor-pointer">{{blog.author.name}}</p>
        </div>
        <!-- time posted -->
        <p>{{timeDifference(blog.createdAt)}}</p>
      </div>
    </div>
  </div>
</template>