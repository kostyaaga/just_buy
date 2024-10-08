<script>
export default {
  data() {
    return {
      isFocusedEmail: false,
      isFocusedPassword: false,
      inputEmail: '',
      inputPassword: '',
    };
  },

  watch: {
    inputEmail(newValue) {
      this.$emit('update-data', {
        email: newValue,
        password: this.inputPassword,
      });
    },
    inputPassword(newValue) {
      this.$emit('update-data', {
        email: this.inputEmail,
        password: newValue,
      });
    },
  },

  methods: {
    handleBlurEmail() {
      if (!this.inputValueEmail) {
        this.isFocusedEmail = false;
      }
    },

    handleBlurPassword() {
      if (!this.inputValuePassword) {
        this.isFocusedPassword = false;
      }
    },


  }
};


</script>

<template>
  <div class="flex flex-col items-center mb-10" >
    <h2 class="text-5xl mt-7 mb-8 font-semibold">Войти</h2>
    <img src="/main_profile.svg" alt="">
    <form action="">
      <div class="relative mt-6 w-64 mx-auto">
        <input
            type="email"
            id="email"
            v-model="inputEmail"
            @focus="isFocusedEmail = true"
            @blur="handleBlurEmail"
            autocomplete="email"
            class="block w-full px-4 py-4 text-base border border-black rounded-lg outline-none"
        />
        <label
            :class="['absolute left-4 text-gray-500 transition-all duration-300 ease-in-out pointer-events-none',
                (isFocusedEmail || inputEmail) ? 'top-1 text-xs text-lime-600' : 'top-1/2 -translate-y-1/2']"
            for="email"
        >
          Ваша почта
        </label>
      </div>
      <div class="relative mt-6 w-64 mx-auto">
        <input
            type="password"
            id="password"
            v-model="inputPassword"
            @focus="isFocusedPassword = true"
            @blur="handleBlurPassword"
            autocomplete="new-password"
            class="block w-full px-4 py-4 text-base border border-black rounded-lg outline-none"
        />
        <label
            :class="['absolute left-4 text-gray-500 transition-all duration-300 ease-in-out pointer-events-none',
                (isFocusedPassword || inputPassword) ? 'top-1 text-xs text-lime-600' : 'top-1/2 -translate-y-1/2']"
            for="password"
        >
          Ваш пароль
        </label>
      </div>
    </form>
  </div>
</template>
