<script setup lang="ts">
import { computed, onMounted, ref } from "vue-demi";
import {} from "";
import BaseComment from "../components/Base/BaseComment.vue";
import { blogStore } from "../store/blogs";
import { toast } from "../logic/utils";
import dayjs from "dayjs";
import { useRoute } from "vue-router";
import { LS } from "../store/auth";

const blog_store = blogStore();
const blog = ref({} as any);

const route = useRoute();

const myProfilePic = computed(() => {
  if (localStorage.getItem(LS.userProfile)) {
    const myProfile = JSON.parse(
      localStorage.getItem(LS.userProfile) as string
    );
    return myProfile.profilePic;
  }
  return "";
});

onMounted(() => {
  const id = route.params.blogId as string;
  blog_store.getSingleBlog(id, (success: boolean, msg: any) => {
    if (!success) {
      toast(msg, "danger");
      return;
    }
    blog.value = msg;
    console.log("loaded");

    console.log(blog.value.author);
  });
});
</script>

<template>
  <!-- <div v-if="false" class="mt-5 mb-10 w-11/12 lg:w-3/4 mx-auto"> -->
  <div v-if="blog" class="mt-5 mb-10 w-11/12 lg:w-3/4 mx-auto">
    <!-- date and tag -->
    <p class="text-sm text-gray-600 font-semibold">
      {{ dayjs(blog.createdAt).format("MMMM D, YYYY") }} /
      <!-- category -->
      <a
        class="
          text-gray-600
          hover:underline
          inline-block
          cursor-pointer
          text-blue-800
        "
      >
        #{{ blog.category.title }}
      </a>
    </p>

    <!-- title -->
    <h1 class="my-3 text-5xl font-semibold">
      {{ blog.title }}
    </h1>
    <!-- author -->
    <div class="flex items-center">
      <!-- profile photo -->
      <profile-pic :photo="blog.author.profilePic" wh="12" />
      <!-- name -->
      <p class="mx-3 hover:underline cursor-pointer text-lg font-semibold">
        {{ blog.author.name }}
      </p>
    </div>

    <!-- image -->
    <img
      :src="'http://localhost:3000/' + blog.image"
      alt="img"
      class="cursor-pointer w-full object-cover my-5 h-96 lg:h-100 rounded-sm"
    />

    <!-- details -->
    <div class="mx-10">
      <!-- first Paragragh -->
      <p class="font-semibold text-2xl my-5 inline-block">
        {{ blog.initialParagraph }}
      </p>
      <!-- detailed paragraph -->
      <p class="text-md whitespace-pre-line">{{ blog.details }}</p>
      <divider />
      <!-- comments -->
      <div>
        <h1 class="text-xl font-bold inline-block my-4">
          Discussion ({{ blog.comments.length }})
        </h1>
        <base-comment
          v-for="comment in blog.comments"
          :key="comment._id"
          :comment="comment"
        />

        <!-- add comment -->
        <div class="flex my-5 inline-block">
          <!-- photo -->
          <profile-pic :photo="myProfilePic" class="mr-5 mt-4" />
          <form @submit.prevent="" class="w-full">
            <textarea
              class="w-full resize-none border border-gray-300 p-3 rounded-md"
              name=""
              id=""
              cols="30"
              rows="5"
            ></textarea>
            <div class="text-right">
              <button
                type="submit"
                class="
                  bg-green-500
                  hover:bg-green-600
                  active:bg-green-500
                  shadow-md
                  px-2
                  py-1
                  rounded-md
                  text-white
                "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h3>loading</h3>
  </div>
</template>
