<script lang="ts" setup>
import { computed, ref } from "vue";
import searchIcon from "virtual:vite-icons/ion/ios-search-strong";
// import { useRouter } from "vue-router";

const search = ref("");


function searchBlog() {
  console.log(search.value);
  search.value = ""
  
}

</script>
<template>
  <nav
    class="
      bg-gray-700
      fixed
      top-0
      z-30
      right-0
      left-0
      h-12
      flex
      justify-between
      items-center
      px-5
    "
  >
    <div class="flex">
      <!-- Logo -->

      <h1
        class="text-xl font-bold cursor-pointer text-white mr-8"
        @click="$router.push('/')"
      >
        Vue Blogs
      </h1>
      <form
      @submit.prevent="searchBlog"
        class="
          hidden
          md:flex
          justify-between
          items-center
          pr-2
          pl-3
          py-1
          bg-gray-500
        "
      >
        <search-icon class="text-gray-50 opacity-80" />
        <input
          v-model="search"
          type="text"
          placeholder="Search"
          class="
            outline-none
            mx-1
            text-md
            bg-transparent
            w-80
            text-sm text-white
          "
        />
      </form>
    </div>
    <button class="hover:bg-white text-white hover:text-gray-700 text-lg px-2">
      Login
    </button>
  </nav>
</template>

