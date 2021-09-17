<script setup lang="ts">
import { onMounted, reactive, ref } from "vue-demi";
import { useRouter } from "vue-router"
import { reloadBrowser } from "../../logic/utils"
import { blogStore } from "../../store/blogs";
import { categoryStore } from "../../store/category";

const tagStore = categoryStore();
const blog_store = blogStore();
const categories = ref([] as any);
const router = useRouter()

const newBlog = reactive({
  title: "",
  categoryId: "",
  firstParagraph: "",
  details: "",
  image: ""
});
const imageURL = ref("")

function submitForm() {
  const blogData = {
    catId: newBlog.categoryId,
    firstParagraph: newBlog.firstParagraph,
    title: newBlog.title,
    details: newBlog.details,
    image: newBlog.image
  };
  blog_store.postBlog(blogData, (success: boolean, obj: any) => {
    if (success) {
      router.push("/blogs")
    }
  });
}


function loadFile(e: any) {
  imageURL.value = URL.createObjectURL(e.target.files[0])
  newBlog.image = e.target.files[0]
}

onMounted(() => {
  tagStore.getAllTags((success: boolean, obj: any) => {
    // console.log(obj);
    categories.value = obj;
  });
});
</script>
<template>
  <div class="w-full">
    <form
      class="w-full flex flex-col bg-transparent p-4 rounded-md mb-10"
      @submit.prevent="submitForm"
    >
      <h1 class="text-center font-semibold text-xl mt-2">Create Blog</h1>
      <!-- <input type="file" class="hidden" /> -->
      <div
        class="
          text-gray-500
          flex
          justify-center
          items-center
          transition-all
          duration-1000
          ease
        "
      >
        <label
          class="
            flex flex-col
            items-center
            justify-center
            px-4
            py-6
            bg-white
            text-blue
            w-96
            h-60
            rounded-lg
            z-10
            shadow-lg
            tracking-wide
            uppercase
            border border-blue
            opacity-70
            cursor-pointer
            hover:bg-gray-500
            hover:text-white
            my-4
          "
          for="file"
        >
          <svg
            class="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
            />
          </svg>
          <span class="mt-2 text-base leading-normal">Select Image</span>
        </label>
        <input class="hidden" id="file" type="file" @change="loadFile"/>
        <img
          v-if="imageURL"
          class="absolute object-cover w-96 h-60 shadow-lg rounded-lg z-0"
          :src="imageURL"
        />
      </div>

      <select
        v-model="newBlog.categoryId"
        id="tag"
        class="
          block
          w-full
          text-gray-500 text-sm
          p-2
          border
          bg-white
          rounded
          focus:outline-none
          focus:border-gray-500
        "
      >
        <option value="">Select an Category</option>
        <option v-for="cat in categories" :key="cat._id" :value="cat._id">
          {{ cat.title }}
        </option>
      </select>

      <base-input
        placeholder="Enter title for your blog"
        v-model="newBlog.title"
        type="text"
        error-message="Title is required"
      />

      <textarea
        placeholder="Introductory Paragraph"
        v-model="newBlog.firstParagraph"
        id="details"
        cols="30"
        rows="5"
        class="
          border border-gray-light
          focus:border-gray-500
          px-3
          my-2
          resize-none
          py-2
          rounded-md
          outline-none
        "
      ></textarea>
      <textarea
        placeholder="Details"
        v-model="newBlog.details"
        id="details"
        cols="30"
        rows="15"
        class="
          border border-gray-light
          focus:border-gray-500
          px-3
          my-2
          resize-none
          py-2
          rounded-md
          outline-none
        "
      ></textarea>
      <div class="flex justify-end px-3 mt-3">
        <button
          class="
            bg-green-500
            active:bg-green-600
            text-white
            rounded-md
            px-4
            py-2
          "
        >
          Post
        </button>
      </div>
    </form>
  </div>
</template>


<style src="@vueform/multiselect/themes/default.css"></style>