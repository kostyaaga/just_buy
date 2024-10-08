<script setup>

const emit =  defineEmits(['openDrawer']);

defineProps({
  totalPrice: Number,
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
});


</script>


<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    
    <router-link to="/"><div class="flex items-center gap-4">
      <div>
        <h2 class="text-xl font-bold uppercase">Простые покупки</h2>
        <p class="text-slate-400">Магазин лучших товаров</p>
      </div>
    </div></router-link>

    <ul class="flex items-center gap-10">
      <li @click="() => emit('openDrawer')" class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img src="/cart.svg" alt="">
        <span>{{ totalPrice }} руб.</span>
      </li>

      <router-link to="/profile">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/profile.svg" alt="">
          <span>Профиль</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>

