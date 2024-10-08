<script setup >

  const emit = defineEmits(['onClickRemove'])

  defineProps({
    id: Number,
    imageUrl:String,
    title: String,
    price: Number,
  })


</script>

<template>
  <div class="flex items-center border-slate-200 p4 rounded-xl gap-4">
    <div class="flex flex-col flex-1">
      <p>{{title}}</p>
      <div class="flex justify-between mt-2">
        <b class="flex-1">{{price}} руб.</b>
        <div @click="emit('onClickRemove')" >
          <img class="opacity-40 hover:opacity-100 cursor-pointer transition" src="/close.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
