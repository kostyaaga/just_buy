<script setup>
import {ref, provide, computed} from "vue";

  import Header from './components/Header.vue'
  import Drawer from './components/drawer.vue'

  const cart = ref([]);

  const drawerOpen = ref(false);

  const totalPrice = computed(
      () =>
        cart.value.reduce((acc, item) => acc + item.price, 0)
      );
  const vatPrice = computed(
      () => Math.round((totalPrice.value *5)/100)
  )

  const closeDrawer = () => {
      drawerOpen.value = false;
  }

  const openDrawer = () => {
    drawerOpen.value = true;
  }

  const addToCart = () => {
    cart.value.push(item);
    item.isAdded = true;
  }

  const removeFromCart = (item) => {
    cart.value.splice(
        cart.value.indexOf(item),1
    )
    item.isAdded = false;
  }



  provide('cart',{
    closeDrawer,
    openDrawer,
    cart,
    addToCart,
    removeFromCart,
})

</script>


<template>

  <Drawer
      v-if="drawerOpen"
      :total-price="totalPrice"

      :vatPrice="vatPrice" ></Drawer>
  <div class="bg-white w-4/5 m-auto rounded-2xl shadow-xl mt-14">

    <Header :total-price="totalPrice" @open-drawer="openDrawer" ></Header>
    <div class="p-10 flex items-center flex-col">
      <router-view></router-view>
    </div>
  </div>
</template>


