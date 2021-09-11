<script setup lang="ts">
import { onMounted, ref } from "vue-demi";
import { blogStore } from "../store/blogs";
import BaseBlog from "../components/BaseBlog.vue";
const blog_store = blogStore();
const fetchedBlogs = ref([] as any);

onMounted(() => {
  blog_store.getAllBlogs((success: boolean, msg: any)=> {
    if (success) {
      fetchedBlogs.value = msg
    }
  })
});
</script>

<template>
  <div class="w-full md:flex md:flex-col md:items-center">
    <base-blog v-for="blog in fetchedBlogs" :key="blog._id" :blog="blog" />
  </div>
</template>
