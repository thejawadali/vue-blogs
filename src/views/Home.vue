<script setup lang="ts">
import { onMounted, ref } from "vue-demi";
import { blogStore } from "../store/blogs";
import BaseBlog from "../components/BaseBlog.vue";
import { useRouter } from "vue-router";
const blog_store = blogStore();
const fetchedBlogs = ref([] as any);
const router = useRouter();

onMounted(() => {
  blog_store.getAllBlogs((success: boolean, msg: any) => {
    if (success) {
      fetchedBlogs.value = msg;
    }
  });
});

function loadBlogDetails(_id: string) {
  router.push(`/blogs/${_id}`);
}
</script>

<template>
  <div class="w-full md:flex md:flex-col md:items-center">
    <div
      v-for="blog in fetchedBlogs"
      :key="blog._id"
      @click="loadBlogDetails(blog._id)"
    >
      <base-blog :blog="blog" />
    </div>
  </div>
</template>
