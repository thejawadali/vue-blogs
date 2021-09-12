<script lang="ts" setup>
import { computed, ref } from "vue";
import searchIcon from "virtual:vite-icons/ion/ios-search-strong";
import { LS } from "../store/auth";
import { useRouter } from "vue-router";
import { reloadBrowser } from "../logic/utils"

const router = useRouter();

const search = ref("");

const loggedIn = computed(()=> localStorage.getItem(LS.authToken))

function logout() {
  localStorage.clear()
  reloadBrowser()
}

function searchBlog() {
  console.log(search.value);
  search.value = "";
}

function createBlog() {
  if (localStorage.getItem(LS.authToken)) {
    router.push('/blogs/add')
  } else {
    router.push("/login");
  }
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
    <div class="flex">
      <button
        @click="createBlog"
        class="
          bg-white
          rounded-sm
          active:bg-gray-100
          text-gray-700 text-lg
          px-2
          mx-2
        "
      >
        Create Blog
      </button>
      <button
      v-if="!loggedIn"
        @click="$router.push('/login')"
        class="hover:bg-white rounded-sm text-white hover:text-gray-700 text-lg px-2 mx-2"
      >
        Login
      </button>
      <button
      v-else
        @click="logout"
        class="hover:bg-white rounded-sm text-white hover:text-gray-700 text-lg px-2 mx-2"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

