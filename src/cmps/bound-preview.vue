

  <template>
    <div ref="elementRef" class="my-element" :style="elementStyle"></div>
  </template>
  

  <script setup>
  import { defineProps, ref, watchEffect, watch } from 'vue';
  
  const props = defineProps({
    bound: Object,
    main: {
      type: Boolean,
      default: false,
    },
    answer: {
      type: Boolean,
      default: false,
    },
  });
  
  const elementRef = ref(null);
  
  const elementStyle = ref({
    position: 'absolute',
    width: '0px',
    height: '0px',
    top: '0px',
    left: '0px',
    border: '',
    backgroundColor: '',
    zIndex: '1',
  });
  
  const border = ref('');
  const bgcColor = ref('');
  const zIndex = ref('1');
  
  watchEffect(() => {
    if (!props.answer) {
      // Non-answer bounds
      if (!props.main) {
        // Cover bound
        const red = getRandomInt(0, 255);
        const green = getRandomInt(0, 255);
        const blue = getRandomInt(0, 255);
        bgcColor.value = `rgba(${red}, ${green}, ${blue}, 0.9)`;
        border.value = '2px solid black';
        zIndex.value = '1';
      } else {
        // Main bound
        bgcColor.value = '#2d68f2';
        border.value = '2px solid black';
        zIndex.value = '1';
      }
  
      // Update styles
      elementStyle.value.backgroundColor = bgcColor.value;
      elementStyle.value.border = border.value;
      elementStyle.value.zIndex = zIndex.value;
  
      // Set dimensions and position immediately
      if (props.bound) {
        const width = props.bound.right - props.bound.left;
        const height = props.bound.up - props.bound.down;
        elementStyle.value.width = `${width}px`;
        elementStyle.value.height = `${height}px`;
        elementStyle.value.top = `${props.bound.down}px`;
        elementStyle.value.left = `${props.bound.left}px`;
      }
  
      // Remove the animation class if present
      if (elementRef.value) {
        elementRef.value.classList.remove('scale-in');
      }
    } else {
      // Answer bound
      bgcColor.value = 'transparent';
      border.value = '5px dashed black';
      zIndex.value = '10';
  
      // Update styles
      elementStyle.value.backgroundColor = bgcColor.value;
      elementStyle.value.border = border.value;
      elementStyle.value.zIndex = zIndex.value;
  
      // The dimensions and animation are handled in the watcher
    }
  });
  
  // Watch for changes in props.bound
  watch(
    () => props.bound,
    (newBound) => {
      if (props.answer && newBound) {
        triggerAnimation(newBound);
      }
    },
    { immediate: true, deep: true }
  );
  
  function triggerAnimation(bound) {
    // Update dimensions and position
    const width = bound.right - bound.left;
    const height = bound.up - bound.down;
    const centerX = (bound.left + bound.right) / 2;
    const centerY = (bound.up + bound.down) / 2;
  
    elementStyle.value.width = `${width}px`;
    elementStyle.value.height = `${height}px`;
    elementStyle.value.left = `${centerX - width / 2}px`;
    elementStyle.value.top = `${centerY - height / 2}px`;
  
    // Remove and re-add the animation class to re-trigger the animation
    if (elementRef.value) {
      // Remove the class
      elementRef.value.classList.remove('scale-in');
  
      // Force reflow to ensure the browser registers the class removal
      void elementRef.value.offsetWidth;
  
      // Add the class back to start the animation
      elementRef.value.classList.add('scale-in');
    }
  }
  
  function getRandomInt(min, max) {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil);
  }
  </script>
  

  <style>
  .my-element {
    position: absolute;
    transform-origin: center center;
  }
  
  @keyframes scaleIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
  
  .scale-in {
    animation: scaleIn 0.5s forwards;
  }
  </style>
  

<!-- ************************ -->
<!-- 

<template>
    <div class="my-element" :style="elementStyle"></div>
  </template>
  
  <script setup>
  import { defineProps, ref, watchEffect, watch } from 'vue';
  
  const props = defineProps({
    bound: Object,
    main: {
      type: Boolean,
      default: false,
    },
    answer: {
      type: Boolean,
      default: false,
    },
  });
  
  const elementStyle = ref({
    position: 'absolute',
    width: '0px',
    height: '0px',
    top: '0px',
    left: '0px',
    border: '',
    backgroundColor: '',
    zIndex: '1',
  });
  
  const border = ref('');
  const bgcColor = ref('');
  const zIndex = ref('1');
  
  watchEffect(() => {
    if (!props.answer) {
      // Non-answer bounds
      if (!props.main) {
        // Cover bound
        const red = getRandomInt(0, 255);
        const green = getRandomInt(0, 255);
        const blue = getRandomInt(0, 255);
        bgcColor.value = `rgba(${red}, ${green}, ${blue}, 0.5)`;
        border.value = '2px solid black';
        zIndex.value = '1';
        elementStyle.value.backgroundColor = bgcColor.value;
        elementStyle.value.border = border.value;
      } else {
        // Main bound
        bgcColor.value = '#2d68f2';
        border.value = '2px solid black';
        zIndex.value = '1';
      }
  
      // Update styles
      elementStyle.value.backgroundColor = bgcColor.value;
      elementStyle.value.border = border.value;
      elementStyle.value.zIndex = zIndex.value;
  
      // Set dimensions and position immediately
      if (props.bound) {
        const width = props.bound.right - props.bound.left;
        const height = props.bound.up - props.bound.down;
        elementStyle.value.width = `${width}px`;
        elementStyle.value.height = `${height}px`;
        elementStyle.value.top = `${props.bound.down}px`;
        elementStyle.value.left = `${props.bound.left}px`;
      }
  
      // Reset transform and transition
      elementStyle.value.transform = '';
      elementStyle.value.transition = '';
      elementStyle.value.transformOrigin = '';
    } else {
      // Answer bound
      bgcColor.value = 'transparent';
      border.value = '5px dashed black';
      zIndex.value = '10';
  
      // Update styles
      elementStyle.value.backgroundColor = bgcColor.value;
      elementStyle.value.border = border.value;
      elementStyle.value.zIndex = zIndex.value;
  
      // The dimensions and animation are handled in the watcher
    }
  });
  
  // Watch for changes in props.bound
  watch(
    () => props.bound,
    (newBound) => {
      if (props.answer && newBound) {
        triggerAnimation(newBound);
      }
    },
    { immediate: true, deep: true }
  );
  
  function triggerAnimation(bound) {
    // Ensure transform origin is set
    elementStyle.value.transformOrigin = 'center center';
  
    // Set transition before changing transform
    elementStyle.value.transition = 'transform 10s';
  
    // Update dimensions and position
    const width = bound.right - bound.left;
    const height = bound.up - bound.down;
    const centerX = (bound.left + bound.right) / 2;
    const centerY = (bound.up + bound.down) / 2;
  
    elementStyle.value.width = `${width}px`;
    elementStyle.value.height = `${height}px`;
    elementStyle.value.left = `${centerX - width / 2}px`;
    elementStyle.value.top = `${centerY - height / 2}px`;
  
    // Set transform to scale(0) after setting transition
    elementStyle.value.transform = 'scale(0)';
  
    // Use requestAnimationFrame to ensure the browser registers the initial state
    requestAnimationFrame(() => {
      // Trigger the transition to scale(1)
      elementStyle.value.transform = 'scale(1)';
    });
  }
  
  function getRandomInt(min, max) {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil);
  }
  </script>
  
  <style>
  .my-element {
    position: absolute;
  }
  </style>
   -->

<!-- /************************************ */ -->

<!-- <template>
    <div class="my-element" :style="elementStyle"></div>
  </template>
  
  <script setup>
  import { defineProps, ref, watchEffect, watch } from 'vue';
  
  const props = defineProps({
    bound: Object,
    main: {
      type: Boolean,
      default: false,
    },
    answer: {
      type: Boolean,
      default: false,
    },
  });
  
  const elementStyle = ref({
    position: 'absolute',
    width: '0px',
    height: '0px',
    top: '0px',
    left: '0px',
    border: '',
    backgroundColor: '',
    zIndex: '1',
  });
  
  const border = ref('');
  const bgcColor = ref('');
  const zIndex = ref('1');
  
  watchEffect(() => {
    if (!props.answer) {
      // Non-answer bounds
      if (!props.main) {
        // Cover bound
        const red = getRandomInt(0, 255);
        const green = getRandomInt(0, 255);
        const blue = getRandomInt(0, 255);
        bgcColor.value = `rgba(${red}, ${green}, ${blue}, 0.5)`;
        border.value = '2px solid black';
        zIndex.value = '1';
        elementStyle.value.backgroundColor = bgcColor.value;
        elementStyle.value.border = border.value;
      } else {
        // Main bound
        bgcColor.value = '#2d68f2';
        border.value = '2px solid black';
        zIndex.value = '1';
      }
  
      // Update styles
      elementStyle.value.backgroundColor = bgcColor.value;
      elementStyle.value.border = border.value;
      elementStyle.value.zIndex = zIndex.value;
  
      // Set dimensions and position immediately
      if (props.bound) {
        const width = props.bound.right - props.bound.left;
        const height = props.bound.up - props.bound.down;
        elementStyle.value.width = `${width}px`;
        elementStyle.value.height = `${height}px`;
        elementStyle.value.top = `${props.bound.down}px`;
        elementStyle.value.left = `${props.bound.left}px`;
      }
  
      // Reset transform and transition
      elementStyle.value.transform = '';
      elementStyle.value.transition = '';
      elementStyle.value.transformOrigin = '';
    } else {
      // Answer bound
      bgcColor.value = 'transparent';
      border.value = '5px dashed black';
      zIndex.value = '10';
  
      // Update styles
      elementStyle.value.backgroundColor = bgcColor.value;
      elementStyle.value.border = border.value;
      elementStyle.value.zIndex = zIndex.value;
  
      // The dimensions and animation are handled in the watcher
    }
  });
  
  // Watch for changes in props.bound
  watch(
    () => props.bound,
    (newBound) => {
      if (props.answer && newBound) {
        triggerAnimation(newBound);
      }
    },
    { immediate: true, deep: true }
  );
  
  function triggerAnimation(bound) {
    // Reset transform to scale(0)
    elementStyle.value.transform = 'scale(0)';
  
    // Ensure transform origin and transition are set
    elementStyle.value.transformOrigin = 'center center';
    elementStyle.value.transition = 'transform 5s';
  
    // Update dimensions and position
    const width = bound.right - bound.left;
    const height = bound.up - bound.down;
    const centerX = (bound.left + bound.right) / 2;
    const centerY = (bound.up + bound.down) / 2;
  
    elementStyle.value.width = `${width}px`;
    elementStyle.value.height = `${height}px`;
    elementStyle.value.left = `${centerX - width / 2}px`;
    elementStyle.value.top = `${centerY - height / 2}px`;
  
    // Use requestAnimationFrame to ensure the browser registers the initial state
    requestAnimationFrame(() => {
      // Trigger the transition to scale(1)
      elementStyle.value.transform = 'scale(1)';
    });
  }
  
  function getRandomInt(min, max) {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil);
  }
  </script>
  
  <style>
  .my-element {
    position: absolute;
  }
  </style>
   -->
<!-- *************************************************** -->

<!-- <template>
    <div class="my-element" :style="elementStyle"></div>
  </template>
  
  <script setup>
  import { defineProps, ref, watchEffect, nextTick } from 'vue';
  
  const props = defineProps({
    bound: Object,
    main: {
      type: Boolean,
      default: false,
    },
    answer: {
      type: Boolean,
      default: false,
    },
  });
  
  const elementStyle = ref({
    position: 'absolute',
    width: '0px',
    height: '0px',
    top: '0px',
    left: '0px',
    border: '',
    backgroundColor: '',
    zIndex: '1',
    // Transition and transform will be set conditionally
  });
  
  const border = ref('');
  const bgcColor = ref('');
  const zIndex = ref('1');
  
  watchEffect(() => {
    // Update common styles
    elementStyle.value.backgroundColor = bgcColor.value;
    elementStyle.value.border = border.value;
    elementStyle.value.zIndex = zIndex.value;
  
    if (!props.answer) {
      // Non-answer bounds
      // ... existing code ...
      // Ensure transition and transform are reset
      elementStyle.value.transition = '';
      elementStyle.value.transform = '';
      elementStyle.value.transformOrigin = '';
    } else {
      // Answer bound
      bgcColor.value = 'transparent';
      border.value = '5px dashed black';
      zIndex.value = '10';
  
      if (props.bound) {
        const width = props.bound.right - props.bound.left;
        const height = props.bound.up - props.bound.down;
        const centerX = (props.bound.left + props.bound.right) / 2;
        const centerY = (props.bound.up + props.bound.down) / 2;
  
        // Position the element centered at (centerX, centerY)
        elementStyle.value.width = `${width}px`;
        elementStyle.value.height = `${height}px`;
        elementStyle.value.left = `${centerX - width / 2}px`;
        elementStyle.value.top = `${centerY - height / 2}px`;
  
        // Set transform origin to center
        elementStyle.value.transformOrigin = 'center center';
  
        // Start from scale(0)
        elementStyle.value.transform = 'scale(0)';
  
        // Apply transition to transform
        elementStyle.value.transition = 'transform 1s';
  
        // Debugging: Log before nextTick
        console.log('Before nextTick:', elementStyle.value);
  
        // Trigger the transition to scale(1) after DOM updates
        nextTick(() => {
          elementStyle.value.transform = 'scale(1)';
          console.log('After setting transform to scale(1):', elementStyle.value);
        });
      }
    }
  });
  </script>
  
  <style>
  .my-element {
    position: absolute;
    /* No transition here; it's applied conditionally */
  }
  </style>
   -->


<!-- *************************************************************** -->
<!-- <template>
    <div class="my-element" :style="elementStyle"></div>
  </template>
  
  <script setup>
  import { defineProps, ref, watchEffect } from 'vue';
  
  const props = defineProps({
    bound: Object,
    main: {
      type: Boolean,
      default: false,
    },
    answer: {
      type: Boolean,
      default: false,
    },
  });
  
  const elementStyle = ref({
    position: 'absolute',
    width: '0px',
    height: '0px',
    top: '0px',
    left: '0px',
    border: '',
    backgroundColor: '',
    zIndex: '1',
    // Transition will be set conditionally
  });
  
  const border = ref('');
  const bgcColor = ref('');
  const zIndex = ref('1');
  
  watchEffect(() => {

    // Update common styles
    elementStyle.value.backgroundColor = bgcColor.value;
    elementStyle.value.border = border.value;
    elementStyle.value.zIndex = zIndex.value;
  
    if (!props.answer) {
      // Non-answer bounds
        if (!props.main) {
            // Cover bound
            
            const red = getRandomInt(0, 255);
            const green = getRandomInt(0, 255);
            const blue = getRandomInt(0, 255);
            bgcColor.value = `rgba(${red}, ${green}, ${blue}, 0.9)`;
            border.value = '2px solid black';
            elementStyle.value.backgroundColor = bgcColor.value;
            elementStyle.value.border = border.value;
            console.log('Element Style======== cover Bound ======>:', elementStyle.value, ' bgcColor.value :', bgcColor.value );

        } else {
            // Main bound
            bgcColor.value = '#2d68f2';
            border.value = '2px solid black';
            console.log('Element Style======== main Bound ======>:', elementStyle.value);
        }
        // Set dimensions immediately without transition
        if (props.bound) {
            elementStyle.value.width = `${props.bound.right - props.bound.left}px`;
            elementStyle.value.height = `${props.bound.up - props.bound.down}px`;
            elementStyle.value.top = `${props.bound.down}px`;
            elementStyle.value.left = `${props.bound.left}px`;
            elementStyle.value.transition = ''; // Remove transition
        }
    } else {
        
        // Answer bound
        bgcColor.value = 'transparent';
        border.value = '5px dashed black';
        zIndex.value = '10';
        
        // Start from zero dimensions
        // elementStyle.value.width = '0px';
        // elementStyle.value.height = '0px';
        elementStyle.value.width = `${(props.bound.right - props.bound.left)/2}px`;
        elementStyle.value.height = `${(props.bound.up - props.bound.down)/2}px`;
        elementStyle.value.top = `${props.bound.down}px`;
        elementStyle.value.left = `${props.bound.left}px`;
        
        // Apply transition
        elementStyle.value.transition = 'width 1s, height 1s';
        console.log('Element Style====== Answer Bound ========>:', elementStyle.value);
  
      // Update dimensions to trigger transition
      setTimeout(() => {
        if (props.bound) {
          elementStyle.value.width = `${props.bound.right - props.bound.left}px`;
          elementStyle.value.height = `${props.bound.up - props.bound.down}px`;
        }
      }, 0);
    }
  });
  
  function getRandomInt(min, max) {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil);
  }
  </script>
  
  <style>
  .my-element {
    position: absolute;
    /* Transition is applied conditionally in the script */
  }
  </style>
  

 -->



<!-- /*********************************************** */ -->





<!-- <template>
    <div class="my-element" :style="elementStyle">
    </div>
  </template>
  
<script setup>
import { defineProps, ref, watchEffect, watch } from 'vue';

const props = defineProps({
  bound: Object,
  main: {
    type: Boolean,
    default: false,
  },
  answer: {
    type: Boolean,
    default: false,
  },
});

const elementStyle = ref({
  position: 'absolute',
  width: '0px', // Start from 0 to animate from 0 to target size
  height: '0px',
  top: '0px',
  left: '0px',
  border: '',
  backgroundColor: '',
  zIndex: '1',
});

const border = ref('');
const bgcColor = ref('');
const zIndex = ref('1');

watchEffect(() => {
  if (!props.answer) {
    elementStyle.value.transition = ''; // Remove transition
    if (!props.main) {
      // Cover bound
        const red = getRandomInt(0, 255);
        const green = getRandomInt(0, 255);
        const blue = getRandomInt(0, 255);
        bgcColor.value = `rgba(${red}, ${green}, ${blue}, 0.5)`;
        border.value = '2px solid black';
    } else {
      // Main bound
        bgcColor.value = '#2d68f2';
        border.value = '2px solid black';
    }
    
  } else {
    // Answer bound
    bgcColor.value = 'transparent';
    border.value = '5px dashed black';
    zIndex.value = '10';
    elementStyle.value.transition = 'width 1s, height 1s';
  }

  // Update elementStyle with computed values
  elementStyle.value.backgroundColor = bgcColor.value;
  elementStyle.value.border = border.value;
  elementStyle.value.zIndex = zIndex.value;
});

// Watch for changes in props.bound and update elementStyle accordingly
watch(
  () => props.bound,
  (newBound) => {
    if (newBound) {
      // Compute new dimensions and positions
      const width = `${newBound.right - newBound.left}px`;
      const height = `${newBound.up - newBound.down}px`;
      const top = `${newBound.down}px`;
      const left = `${newBound.left}px`;

      // Update elementStyle to trigger transitions
      elementStyle.value.width = width;
      elementStyle.value.height = height;
      elementStyle.value.top = top;
      elementStyle.value.left = left;
    }
  },
  { immediate: true }
);

function getRandomInt(min, max) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil);
}
</script>

  
  <style>
  .my-element {
    position: absolute;
    transition: width 1s, height 1s, top 1s, left 1s;
  }
  </style>
  
 -->


<!-- /////****************************************// -->
<!-- <template>
    <div  class="my-element" >
    </div>
</template>
    
    
<script setup >
import { defineProps,onBeforeMount ,watchEffect,computed } from 'vue'; // Import defineProps

const props = defineProps({
    bound: {
        type: Object,
    },
    main: {
        type: Boolean,
        default: false,
    },
    answer: {
        type: Boolean,
        default: false,
    },
    });


    let myWidth 
    let myHeight
    let myTop
    let myButtomt
    let myLeft
    let myRight
    // let red
    // let green 
    // let blue
    console.log('props.bound!!!!!!!!!!!!!!!!!!!!!!1111:', props.bound);

    if(props.bound){ 
        if(props.answer){
            console.log(' on bound-preview - bound answer:===========>:', props.bound);
        }
        // const leftReactive = ref(props.bound.left);
        // const rightReactive = ref(props.bound.right);
        // const upReactive = ref(props.bound.up);
        // const downReactive = ref(props.bound.down);

        // Example: Log the reactive values when they change
        watchEffect(() => {
            // ... other properties ...
            myWidth = computed(() => {
                return props.bound.right - props.bound.left + 'px';
            });
            myHeight = computed(() => {
                return props.bound.up - props.bound.down + 'px';
            });
            myTop = computed(() => {
                return props.bound.up  + 'px';
            });
            myButtomt = computed(() => {
                return  props.bound.down + 'px';
            });
            myLeft = computed(() => {
                return props.bound.left + 'px';
            });
            myRight = computed(() => {
                return  props.bound.right + 'px';
            });
            // if(props.answer){
            //     console.log('watchEffect - on bound-preview - bound answer:, myWidth:',myWidth, 'myHeight:',myHeight, 'myTop:',myTop, 'myButtomt: ',myButtomt, "myLeft: ",myLeft, 'myRight: ',myRight);
                
            // }
        })
    }

    const borderCollapse = computed(() => {
            return props.answer ? 'collapse' : 'separate'; // Simulate border collapse behavior
        });
    // let myWidth = rightReactiv.value - leftReactiv.value
    // let myWidth =  props.bound.right -  props.bound.left 

    // // let myHeight = upReactiv.value - downReactiv.value 
    // let myHeight = props.bound.up-  props.bound.down 

    // let myHeight = downReactiv.value - upReactiv.value
    // console.log('props.bound.left  in boundView!!:',props.bound.left  );
    console.log('myHeight in boundView:',myHeight);
    let bgcColor = ''
    let border = ''
    let zIndex = 1
    let shadowParameters = ''
    
    onBeforeMount(() => {
        console.log('onBeforeMount:');
        if(!props.answer){
            if(!props.main){  // cover bound
                let red = getRandomInt(0,255)
                let green = getRandomInt(0,255)
                let blue = getRandomInt(0,255)
                bgcColor =  `rgba(${red},${green},${blue})`;
                border = '2px solid black'
            }else if(props.main){ // Main Bound
                border = '2px solid black'
                bgcColor =  '#2d68f2';
            }
        }else{
            border = '5px dashed black'
            bgcColor = 'transparent' // '#0000003b' //'transparent'
            zIndex = 10
            // shadowParameters = '6px 5px 20px 0px'
        }
    });
    
    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }
// export
    </script>

<style>
.my-element {
    position: absolute;
    width: v-bind('myWidth');
    height:v-bind('myHeight');
    top:v-bind('myButtomt');
    bottom:v-bind('myTop');
    left:v-bind('myLeft');
    right:v-bind('myRight');
    border: v-bind('border');
    background-color: v-bind('bgcColor');
    z-index: v-bind('zIndex');
    border-collapse: v-bind(borderCollapse);
    box-shadow: v-bind(shadowParameters);
}
.bound-preview-container{
    
}
</style> -->