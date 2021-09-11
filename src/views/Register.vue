<script lang="ts" setup>
import { reactive, ref } from "vue-demi";
import AvatarUploader from "../components/Base/AvatarUploader.vue";
import { useRouter } from "vue-router";
import { toast } from "../logic/utils";
import { userAuth } from "../store/auth";

const auth = userAuth();
const router = useRouter();
// const file = ref("")

const user = reactive({
  name: "",
  email: "",
  password: "",
  file: ""
});

const confirmPassword = ref("");

function register(e: any) {
  e.preventDefault();
  if (user.name === "" || user.password === "" || user.password === "") {
    toast("Please required fields to continue", "danger");
    return;
  }
  if (confirmPassword.value !== user.password) {
    toast("Password not matched", "danger");
    return;
  }
  auth.signup(user, (success: boolean, msg: string)=> {
    if (success) {
      toast(msg, "success")
      user.name = ""
      user.email = ""
      user.password = ""
      user.file = ""
      confirmPassword.value = ""
      router.push("/blogs")
    }else {
      toast(msg, "danger")
    }
  });
}




function gotoLogin(e: any) {
  e.preventDefault();
  router.push("/login");
}

function handleChange(file: any) {
  user.file = file
}
</script>

<template>
  <div class="flex w-full h-screen bg-gray-50 justify-center items-center">
    <div class="flex w-auth-width flex-col">
      <div class="bg-white px-6 py-8 rounded-md shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up</h1>
        <avatar-uploader @handle-change="handleChange" class="mb-6" />
        <base-input
          placeholder="e.g. Jawad Ali"
          label-text="Enter your name here"
          id="name"
          error-message="Name is required"
          v-model="user.name"
          type="text"
        />
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
        <base-input
          placeholder="Password"
          label-text="Confirm Password"
          id="confirm-password"
          error-message="Password of min 8 char is required"
          v-model="confirmPassword"
          type="password"
        />

        <button
          @click="register"
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
          Register Now
        </button>
        <div class="text-center my-4 text-sm text-gray-500">
          <p>
            Already Registered?
            <a
              @click="gotoLogin"
              class="cursor-pointer text-gray-700 font-semibold hover:underline"
              >Sign In</a
            >
            instead
          </p>
        </div>
      </div>
      <div class="text-center mt-4">
        <a
          class="text-sm cursor-pointer text-blue-700 underline"
          @click="$router.push('/questions')"
          >Skip For Now</a
        >
      </div>
    </div>
  </div>
</template>


