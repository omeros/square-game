

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
        if(props.bound.right!==null){
        const red = getRandomInt(0, 255);
        const green = getRandomInt(0, 255);
        const blue = getRandomInt(0, 255);
        bgcColor.value = `rgba(${red}, ${green}, ${blue}, 0.9)`;
        border.value = '2px solid black';
        zIndex.value = '1';
      }else{
          border.value = ''
        }
      } else {
        // Main bound
        if((props.bound.right!==null)&&(props.main)){
          bgcColor.value = '#2d68f2';
          border.value = '2px solid black';
          zIndex.value = '1';
        }else{
          border.value = ''
        }
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
        if(props.bound.right){
          console.log('on props.answer===== yes ====>:',props.bound.right);
        bgcColor.value = 'transparent';
        border.value = '5px dashed black';
        zIndex.value = '10';
        
        // Update styles
        elementStyle.value.backgroundColor = bgcColor.value;
        elementStyle.value.border = border.value;
        elementStyle.value.zIndex = zIndex.value;
        }else{
          console.log('on props.answer===== no ====>:',props.bound.right);
        
          bgcColor.value = 'transparent';
          border.value = '0px solid black';
          zIndex.value = '10';
          console.log('on props.answer===== border.value====>:',border.value);
          elementStyle.value.backgroundColor = bgcColor.value;
        elementStyle.value.border = border.value;
        elementStyle.value.zIndex = zIndex.value;
        }
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
 