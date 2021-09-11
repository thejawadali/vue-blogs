<script lang="ts" setup>
import { ref } from "vue-demi";

const errMsg = ref("");
const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    requried: true,
  },
  type: {
    type: String,
    default: "text",
  },
  labelText: {
    type: String,
    default: ""
  },
  errorMessage: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: ""
  }
});

function checkError(event: any) {
  if (!event.target.value) {
    // show error
    errMsg.value = props.errorMessage + "";
  }
}

const emit = defineEmits();
function onChangeValu(event: any) {
  const value = event.target.value
  emit("update:modelValue", value);
  if (value && errMsg.value) {
    // remove error
    errMsg.value = ''
  }
}
</script>

<template>
  <div class="mb-4 w-full">
    <label class="mx-1 mb-2 block text-sm text-gray-500" :for="id">{{labelText}}</label>
    <input
      :id="id"
      @input="onChangeValu"
      :type="type"
      :value="modelValue"
      @blur="checkError"
      class="
        block
        border 
        text-sm
        w-full
        outline-none
        p-2
        rounded
        focus:border-gray-500
      "
      :class="{errMsg : 'border border-red-600'}"
      :placeholder="placeholder"
    />
    <p v-if="errMsg" class="text-red-600 ml-1 mt-1 text-xs">{{ errMsg }}</p>
  </div>
</template>