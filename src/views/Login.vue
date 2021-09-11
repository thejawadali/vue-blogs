<script lang="ts" setup>
import { computed, onMounted, reactive } from "vue-demi";
import { useRouter } from "vue-router";
import { toast } from "../logic/utils"
import { userAuth } from "../store/auth";

const auth = userAuth();

const user = reactive({
  email: "",
  password: "",
});

const router = useRouter();

function login(e: any) {
  e.preventDefault();
  if (user.email === "" || user.password === "") {
    toast("Either email or password is empty", "danger")
    return;
  }
  auth.login(user, (success: boolean, msg: string) => {
    if (success) {
      toast(msg, "success")
      user.email = ""
      user.password = ""
      router.push("/blogs");
    } else {
      toast(msg, "danger")
      console.error(msg);
    }
  });
}

function jugad() {
  user.email= "ali@ali.com",
  user.password= "123123123"
}


</script>
<template>
  <div class="flex w-full h-screen bg-gray-50 justify-center items-center">
    <div class="flex w-auth-width flex-col">
      <div class="bg-white px-6 py-8 rounded-md shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center" @dblclick="jugad">Login</h1>
        <base-input
          placeholder="e.g. johndoe@example.com"
          error-message="Email is required"
          label-text="Enter Email"
          id="email"
          v-model="user.email"
          type="text"
        />

        <base-input
          placeholder="Password"
          error-message="Password of min 8 char is required"
          v-model="user.password"
          label-text="Enter Password"
          id="password"
          type="password"
        />

        <button
          @click="login"
          type="submit"
          class="
            w-full
            text-center
            py-3
            rounded
            bg-gray-700
            text-white
            hover:bg-gray-600
            active:bg-gray-700
            focus:outline-none
            my-1
          "
        >
          Login
        </button>
        <div class="text-center my-4 text-sm text-gray-500">
          <p>
            Not Registered?
            <a
              @click="$router.push('/signup')"
              class="cursor-pointer text-blue-800 hover:underline"
              >Sign up now</a
            >
          </p>
        </div>
      </div>
      <div class="text-center mt-4">
        <a
          class="text-sm cursor-pointer text-blue-800 underline"
          @click="$router.push('/blogs')"
          >Skip For Now</a
        >
      </div>
    </div>
  </div>
</template>

