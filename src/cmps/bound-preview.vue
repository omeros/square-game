<template>
    <div>boundpriview</div>
            <div  class="my-element" >
            </div>
</template>
    
    
    <script setup >
    import { defineProps,onBeforeMount , ref,watchEffect,computed } from 'vue'; // Import defineProps
    
    const props = defineProps({
        bound: {
            type: Object,
        },
        type: {
            type: Boolean,
            default: false,
  },
    });
    const leftReactive = ref(props.bound.left);
const rightReactive = ref(props.bound.right);
const upReactive = ref(props.bound.up);
const downReactive = ref(props.bound.down);

// Example: Log the reactive values when they change
    watchEffect(() => {
    console.log('watchEffect- Left changed:', leftReactive.value);
    console.log('watchEffect -Right changed:', rightReactive.value);
    console.log('watchEffect -upReactive changed:', upReactive.value);
    console.log('watchEffect -downReactive changed:', downReactive.value);
    // ... other properties ...
    });
    let myWidth = computed(() => {
  return props.bound.right - props.bound.left + 'px';
});

let myHeight = computed(() => {
  return props.bound.up - props.bound.down + 'px';
});

    // let myWidth = rightReactiv.value - leftReactiv.value
    // let myWidth =  props.bound.right -  props.bound.left 

    // // let myHeight = upReactiv.value - downReactiv.value 
    // let myHeight = props.bound.up-  props.bound.down 

    // let myHeight = downReactiv.value - upReactiv.value
    console.log('props.bound.left  in boundView!!:',props.bound.left  );
    console.log('myHeight in boundView:',myHeight);
    let bgcColor =''
    
    onBeforeMount(() => {
        console.log('onBeforeMount:');
        if(!props.type){  // cover bound
            // console.log('left in cover Bound:',leftReactiv.value);
            // console.log('righ in cover Bound:',rightReactiv.value);
            console.log('type in boundView:',props.type);
            console.log(' props.bound.left  in boundView:', props.bound.left );
            console.log(' props.bound.right in boundView:', props.bound.right);
            bgcColor =  '#43e822';
        }else if(props.type){ // Main Bound
            // console.log('left in Main Bound:',leftReactiv.value);
            // console.log('righ in Main Bound:',rightReactiv.value);
            console.log('type in boundView:',props.type);
            console.log(' props.bound.left  in boundView:', props.bound.left );
            console.log(' props.bound.right in boundView:', props.bound.right);
            bgcColor =  '#2d68f2';
        }
    });
    
    //console.log('props:' ,props)
    </script>

<style>
.my-element {
    
    width: v-bind('myWidth');
    height:v-bind('myHeight');
    border: 2px solid black;
    background-color: v-bind('bgcColor');
}
</style>