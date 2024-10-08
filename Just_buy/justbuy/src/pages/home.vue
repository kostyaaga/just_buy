<script setup>
  import CardList from "@/components/cardList.vue";
  import axios from "axios";
  import {onMounted, reactive, ref, watch, inject} from "vue";

  const items = ref([]);

  const filters = reactive({
    sortBy: 'name',
    searchQuery: ''
  })

  const onClickAddPlus = (item) => {
    if(!item.isAdded){
      cart.value.push(item);
      item.isAdded = true;
    } else {
      removeFromCart(item);
    }
  }

  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://lifestealer86.ru/public/api-shop/products`);


      const data = response.data.data;
      if (Array.isArray(data)) {
        items.value = data.map(obj => ({
          ...obj,
          isAdded: false
        }));
      } else {
        console.error('Ответ API не содержит массив данных', response.data);
      }
    } catch (err) {
      console.error('Ошибка при загрузке данных:', err);
    }
  };

  const {addToCart, removeFromCart, cart} = inject('cart')

  onMounted(async () => {
    try {
      await fetchItems(); //

      if (Array.isArray(items.value)) {

        items.value = items.value.map((item) => ({
          ...item,
          isAdded: false
        }));
      } else {
        console.error('items.value не является массивом', items.value);
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  });


  watch(filters, fetchItems);

</script>

<template>
  <div class="flex justify-between gap-60 items-center">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

    <div class="flex gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none  ">
        <option value="name">По названию</option>
        <option value="price">По цене(дешевые)</option>
        <option value="-price">По цене(дорогие)</option>
      </select>

      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" alt="">
        <input
            @input="onChangeSearchInput"
            type="text"
            class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400" placeholder="Поиск...">
      </div>
    </div>
  </div>

  <div class="mt-10">
    <CardList :items="items" @add-to-cart="onClickAddPlus"></CardList>
  </div>
</template>

<style scoped>

</style>