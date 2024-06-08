<template>
  <div>
    <BoundPreview :bound="props.mainBound"  :type="true"  />
    <div v-for="(bound, i) in props.bounds" :key="i">
      Bound {{ i + 1 }}
        <BoundPreview :bound="bound" :type="false" />
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
  }
});
</script>