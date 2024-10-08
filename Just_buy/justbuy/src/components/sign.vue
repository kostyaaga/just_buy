<script setup>

import { ref, watch, defineEmits } from 'vue';

const emit = defineEmits();

const isFocusedEmail = ref(false);
const isFocusedPassword = ref(false);
const isFocusedName = ref(false);
const inputValueEmail = ref('');
const inputValueName = ref('');
const inputValuePassword = ref('');

watch(inputValueName, (newValue) => {
  emit('update-data', {
    fio: newValue,
    email: inputValueEmail.value,
    password: inputValuePassword.value,
  });
});

watch(inputValueEmail, (newValue) => {
  emit('update-data', {
    fio: inputValueName.value,
    email: newValue,
    password: inputValuePassword.value,
  });
});

watch(inputValuePassword, (newValue) => {
  emit('update-data', {
    fio: inputValueName.value,
    email: inputValueEmail.value,
    password: newValue,
  });
});

const handleBlurEmail = () => {
  if (!inputValueEmail.value) {
    isFocusedEmail.value = false;
  }
};

const handleBlurPassword = () => {
  if (!inputValuePassword.value) {
    isFocusedPassword.value = false;
  }
};

const handleBlurName = () => {
  if (!inputValueName.value) {
    isFocusedName.value = false;
  }
};

</script>

<template>
  <div>
    <div class="flex flex-col items-center mb-10">
      <h2 class="text-5xl mt-7 mb-8 font-semibold">Зарегестрироватсья</h2>
      <img src="/main_profile.svg" alt="">
      <form action="">
        <div class="relative mt-6 w-64 mx-auto">
          <input
              type="text"
              id="fio"
              v-model="inputValueName"
              @focus="isFocusedName = true"
              @blur="handleBlurName"
              class="block w-full px-4 py-4 text-base border border-black rounded-lg outline-none"
          />
          <label
              :class="['absolute left-4 text-gray-500 transition-all duration-300 ease-in-out pointer-events-none',
                (isFocusedName || inputValueName) ? 'top-1 text-xs text-lime-600' : 'top-1/2 -translate-y-1/2']"
              for="name"
          >
            Ваше ФИО
          </label>
        </div>
        <div class="relative mt-6 w-64 mx-auto">
          <input
              type="email"
              id="email"
              v-model="inputValueEmail"
              @focus="isFocusedEmail = true"
              @blur="handleBlurEmail"
              autocomplete="email"
              class="block w-full px-4 py-4 text-base border border-black rounded-lg outline-none"
          />
          <label
              :class="['absolute left-4 text-gray-500 transition-all duration-300 ease-in-out pointer-events-none',
                (isFocusedEmail || inputValueEmail) ? 'top-1 text-xs text-lime-600' : 'top-1/2 -translate-y-1/2']"
              for="email"
          >
            Ваша почта
          </label>
        </div>
        <div class="relative mt-6 w-64 mx-auto">
          <input
              type="password"
              id="password"
              v-model="inputValuePassword"
              @focus="isFocusedPassword = true"
              @blur="handleBlurPassword"
              autocomplete="current-password"
              class="block w-full px-4 py-4 text-base border border-black rounded-lg outline-none"
          />
          <label
              :class="['absolute left-4 text-gray-500 transition-all duration-300 ease-in-out pointer-events-none',
                (isFocusedPassword || inputValuePassword) ? 'top-1 text-xs text-lime-600' : 'top-1/2 -translate-y-1/2']"
              for="password"
          >
            Придумайте пароль
          </label>
        </div>
      </form>
    </div>
  </div>
</template>