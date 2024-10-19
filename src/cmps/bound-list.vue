<template>
  <div class="bound-list-container">
    <BoundPreview :bound="props.answerBound"  :main="false" :answer="true" />
    <BoundPreview :bound="props.mainBound"  :main="true" :answer="false" />
    <div v-for="(bound, i) in props.bounds" :key="i">
      <BoundPreview :bound="bound" :main="false" :answer="false" />
    </div>
  </div>
</template>

<script setup >
import { defineProps } from 'vue'; 
import BoundPreview from './bound-preview.vue';

const props = defineProps({
  bounds: {
      type: Array,
      default: () => []
  },
  mainBound: {
      type: Object,
      default: () => ({})
  },
  answerBound: {
      type: Object,
      default: () => ({})
  }
});
</script>
<style>
.bound-list-container{
  position: relative;
}
</style>