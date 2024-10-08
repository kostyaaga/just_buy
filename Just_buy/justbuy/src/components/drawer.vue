<script setup>
  import DrawerHead from "@/components/DrawerHead.vue";
  import CarditemList from "@/components/carditemList.vue";
  import infoBlock from "@/components/InfoBlock.vue";
  import axios from "axios";
  import {ref,inject} from "vue";

  const isCreating = ref(false);
  const orderId = ref(null);

  const props = defineProps({
    totalPrice: Number,
    vatPrice: Number,

  })

  const createOrder = async () => {
    try{
      isCreating.value = false
      const {data} = await axios.post(`https://ecb36e655bde8b57.mokky.dev/orders`, {
        items: cart.value,
        totalPrice: props.totalPrice.value,
      })

      cart.value = []

      orderId.value = data.id;
    } catch (err) {
        console.log(err);
    } finally {
      isCreating.value = false;
    }
  }

  const {cart, closeDrawer} = inject('cart');

</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead></DrawerHead>



    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <infoBlock v-if="!totalPrice && !orderId" titel="Корзина пустая" description="Добавьте хотя бы пару кроссовок что бы сделать заказ" image-url="/package-icon.png"></infoBlock>
      <infoBlock v-if="orderId" titel="Заказ оформлен!" :description="`Ваш заказаз №${orderId} скоро будет передан курькрской доставке`" image-url="/order-success-icon.png"></infoBlock>
    </div>

    <div v-else>
      <CarditemList ></CarditemList>

      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{totalPrice}} ₽</b>
        </div>
        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{vatPrice}} ₽</b>
        </div>
        <button
            :disabled="!totalPrice"
            @click="createOrder"
            class="mt-4 bg-lime-500 cursor-pointer w-full disabled:bg-slate-400 rounded-xl py-3 text-white hover:bg-lime-600 active:bg-lime-700 transition">
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
