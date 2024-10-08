<script setup>
import Sign from "@/components/sign.vue";
import Login from "@/components/login.vue";
import Header from "@/components/header.vue";
import {ref} from 'vue';
import axios from "axios";

const isActiveLogin = ref(true);
const isActiveSign = ref(false);

const isLoggedIn = ref(false);
const isSingIn = ref(false);

const formData = ref({
  fio: '',
  email: '',
  password: '',
});

const handleData = (data) => {
  formData.value = data;
};

const opening = async () => {
  try{
    const response = await axios.post(`/api-shop/login`, formData.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    isLoggedIn.value = true;
    const tokenLogin = response.data?.data?.user_token;

    if (tokenLogin) {
      localStorage.setItem('authToken', tokenLogin);
    } else {
      console.error('Токен не получен');
    }

  } catch (error) {
    console.error('Ошибка при входе:', error);
  }
}

const register = async () => {

  try {
    const response = await axios.post('/api-shop/signup', formData.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    isSingIn.value = true;
    const tokenSign = response.data?.data?.user_token;

    if (tokenSign) {
      localStorage.setItem('authToken', tokenSign);
    } else {
      console.error('Токен не получен');
    }


    formData.value = { fio: '', email: '', password: '' };

  } catch (error) {
    console.error('Ошибка при регистрации:', error);
  }
};

const Activate = () => {
  isActiveLogin.value = !isActiveLogin.value;
  isActiveSign.value = !isActiveSign.value;
};

</script>

<template>
  <Header :is-logged-in="isLoggedIn" class="hidden"></Header>
  <div class="flex flex-col px-12 items-center rounded-2xl border-lime-600 border-solid border-2 my-12">
    <Login @update-data="handleData" v-if="isActiveLogin" />

    <Sign @update-data="handleData" v-if="isActiveSign" />

    <div v-if="isActiveLogin">
      <p v-if="isLoggedIn" class="text-black text-lg mb-10">Вы успешно вошли</p>
      <p v-else class="text-black text-lg mb-10">Вы не вошли</p>
    </div>
    <div v-else>
      <p v-if="isSingIn" class="text-black text-lg mb-10">Вы успешно зарегестрировались</p>
      <p v-else class="text-black text-lg mb-10">Вы не зарегестрированы</p>
    </div>

    <div class="flex border-b-amber-50 mb-20">
      <button @click="isActiveLogin ? opening() : Activate()" :class=" isActiveLogin ?
        'bg-lime-500 rounded-2xl p-3 w-52 h-16 text-white font-semibold text-xl mr-20' :
        'bg-white border-lime-500 border-solid border rounded-2xl p-3 w-52 h-16 text-lime-500 font-semibold text-lg text-center mr-20'">
        Войти
      </button>

      <button @click="isActiveSign ? register() : Activate()" :class=" isActiveSign ?
        'bg-lime-500 rounded-2xl p-3 w-52 h-16 text-white font-semibold text-xl text-center' :
        'bg-white border-lime-500 border-solid border rounded-2xl p-3 w-52 h-16 text-lime-500 font-semibold text-lg text-center'">
        Зарегистрироваться
      </button>
    </div>
  </div>
</template>
