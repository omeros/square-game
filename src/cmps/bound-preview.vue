<template>
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
            border = '4px dashed black'
            bgcColor = 'transparent'
            zIndex = 10
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
}
.bound-preview-container{
    
}
</style>