<script setup >
import Card from "@/components/card.vue";

defineProps({
  items:Array,
})

const emit = defineEmits(['addToCart'])


</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
        v-for="item in items"
        :key="item.id"
        :name="item.name"
        :image="item.image"
        :price="item.price"
        :isAdded="item.isAdded"
        :description="item.description"
        :onClickAdd="() => emit('addToCart', item)"
        ></Card>
  </div>
</template>

