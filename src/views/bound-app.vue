<template>
<div class="body">
  <div class="header-container">
    <div class="header" >
      <div class="btn-container">
        <div class="btn-container-inner">
          <div class="add-rec-btn" style="">
            <button id="big-add"  class="config-add-btn"  style="cursor: pointer; margin-left: 0vw;"  @click="openMainBoundModal()">Main Rectangle</button>
            <button id="small-add" class="config-add-btn"  style="cursor: pointer; margin-left: 0vw;"   @click="openCoverBoundModal()"> Cover Rectangle</button>
          </div>
          <div class="defalutMainbound">
            <button class="config-btn" :class="{'lazy-btn-activ': isLazy }" @click="defalutMainbound()">i'm lazy</button>
          </div>
          <div class="config-btn-container">
            <button class="new-btn"  :class="{'finish-btn-activ': isFinished }" @click="onClearBounds()">New</button>
            <button class="random-btn"  :class="{'random-btn-activ': isRandom }" @click="onRandomBounds()">Random</button>
          </div>
        </div>
        <div class="run-btn-container">
          <button class="explain-btn" @click="onExplain()">Explain</button>
          <button class="run-btn "   :class="{ 'run-btn-active shining-text': isCalculate, 'run-btn-debaunce': isDebounce }"   @click="run()" :disabled="isCalculate">{{ isCalculate ? 'Calculating' : isFinished ? 'Finished' : 'Run' }} </button>
        </div>
      </div>
    </div>
  </div>
  <div style="height: 82vh;">
    <BoundList :bounds="bounds" :mainBound="mainBound" :answerBound="answerBound"  />
  </div>
  <MyModal v-if="isShowMainBoundModal" @close="isShowMainBoundModal = false">
    <div class="modal-inner-container">
      <h2 style="text-align: center;">Main Bound size</h2>
      <div>
        <div class="bound-input-container">
          Top <input class="bound-input" type="number" v-model="mainBoundY1">
          Bottom <input class="bound-input" type="number" v-model="mainBoundY2">
        </div>
        <div class="bound-input-container">
          Left <input class="bound-input" type="number" v-model="mainBoundX1">
          Right <input class="bound-input" type="number" v-model="mainBoundX2">
        </div>
      </div>
      <div style="display: flex; justify-content: center;">
        <button class="modal-add-btn" @click="onAddMainBound()">Add</button>
      <!-- <button class="modal-btn" @click="isShowMainBoundModal = false">Close Modal</button> -->
      </div>
    </div>
  </MyModal>
  <MyModal v-if="isShowMCoverBoundModal" @close="isShowMCoverBoundModal = false">
    <div class="modal-inner-container">
      <h2 style="text-align: center;">Cover Bound size</h2>
      <div>
        <div class="bound-input-container">
          Top <input class="bound-input" type="number" v-model="coverBoundY1">
          Bottom <input class="bound-input" type="number" v-model="coverBoundY2">
        </div>
        <div class="bound-input-container">
          Left <input class="bound-input" type="number" v-model="coverBoundX1">
          Right <input class="bound-input" type="number" v-model="coverBoundX2">
        </div>
      </div>
      <div style="display: flex; justify-content: center;">
        <button class="modal-add-btn" @click="onAddCoverBound()">Add</button>
      </div>
      <!-- <button class="modal-close-btn" @click="isShowMCoverBoundModal = false">Close Modal</button> -->
    </div>
  </MyModal>
  <transition name="scale">
    <div  v-show="isExplain" style="" class="explain">
        <img src="https://res.cloudinary.com/omerphoto/image/upload/v1731521344/explain2_sacwlc.png" alt="">
    </div>

  </transition>
  <div v-if="isXError" style="background-color: rgb(128, 209, 35); height: 200px;"> left should be smaller then rigth</div>
  <div  v-if="isYError"> Top should be bigger then Bottom</div>
</div>
</template>


<script setup>
// import { log10 } from 'core-js/core/number';
import { storeToRefs } from 'pinia'
import {boundService} from '../services/api.service'
import BoundList  from '../cmps/bound-list.vue'
import {boundStore} from '../store/bound.store'
import{reactive,ref,onUnmounted } from 'vue'
import MyModal from '../cmps/MyModal.vue';

    onUnmounted(() => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      if (colorSwapTimer) {
        clearInterval(colorSwapTimer);
  }
    });

    const storeBound = boundStore()
    const {mainBound,bounds,answerBound} = storeToRefs(storeBound)
    const runBtn = ref('lightgrey') // Make runBtn reactive using ref
    const explainBtn = ref('rgb(197, 136, 255') // Make runBtn reactive using ref

    let configBtn = 'lightgrey'
    const boundsReactiv = reactive(bounds)
    const isCalculate = ref(false) // Make isCalculate reactive
    const isFinished = ref(false) // Make isFinished reactive
    const isLazy = ref(true) // Make isFinished reactive
    const isRandom = ref(false) // Make isFinished reactive
    const isDebounce = ref(false);
    const isShowMainBoundModal = ref(false);
    const isShowMCoverBoundModal = ref(false);
    const isXError = ref(false);
    const isYError = ref(false);
    const isExplain = ref(false);
    let debounceTimer = null;
    let colorSwapTimer = null;

    // const bounds = storeBound.getBounds
    // const mainBound = storeBound.getMainBound
    // const newBound = reactive({ left: 0, rigth: 0, up: 0, down: 0 })
    // const mainBoundReactiv = reactive(mainBound)
    // console.log('mainBoundReactiv:',mainBoundReactiv);
    console.log('boundsReactiv:',boundsReactiv);

    let mainBoundX1 //= ref()
    let mainBoundX2 //= ref()
    let mainBoundY1 //= ref()
    let mainBoundY2// = ref()
    
    let coverBoundX1  //ref()
    let coverBoundX2  //ref()
    let coverBoundY1 //ref()
    let coverBoundY2 //ref()
    
    function openMainBoundModal(){
      isShowMainBoundModal.value = true
    }
    function openCoverBoundModal(){
      isShowMCoverBoundModal.value = true
    }

    function onAddMainBound(){
      isShowMainBoundModal.value = false
      console.log('mainBoundX1:',mainBoundX1);
      console.log('mainBoundX2:',mainBoundX2);
      console.log('mainBoundY1:',mainBoundY1);
      console.log('mainBoundY2:',mainBoundY2);
      if(mainBoundX2<=mainBoundX1){
        isXError.value = true
      }
      if(mainBoundY1<=mainBoundY2){
        isYError.value = true
      }
      const mainBound = {
        left: mainBoundX1,
        right: mainBoundX2,
        up: mainBoundY1,
        down: mainBoundY2
      }
      storeBound.addMainBound(mainBound)
    }
    
    function onAddCoverBound(){
      isShowMCoverBoundModal.value = false
      console.log('coverBoundX1:',coverBoundX1);
      console.log('coverBoundX2:',coverBoundX2);
      console.log('coverBoundY1:',coverBoundY1);
      console.log('coverBoundY2:',coverBoundY2);
      const coverBound = {
        left: coverBoundX1,
        right: coverBoundX2,
        up: coverBoundY1,
        down: coverBoundY2
      }
      storeBound.addCoverBound(coverBound)
    }

    function onClearBounds(){
      isFinished.value = false
      isRandom.value = false
      isLazy.value = true
      isDebounce.value = false
      storeBound.clearBounds()
    }
    function onRandomBounds(){
      isRandom.value = true

    // Clear any existing debounce timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    // Reset `isDebounce` to false immediately when the function is called
    isDebounce.value = false;
    // Start a new debounce timer
    debounceTimer = setTimeout(() => {
      isDebounce.value = true;
      isRandom.value = false
      runBtn.value  = 'lightgreen'
      // Start color swapping
      if (colorSwapTimer) {
          clearInterval(colorSwapTimer);
        }
        let isLightGreen = true;
        colorSwapTimer = setInterval(() => {
          isLightGreen = !isLightGreen;
          runBtn.value = isLightGreen ? 'lightgreen' : 'lightgrey';
        }, 700);
      // Additional actions can be performed here when `isDebounce` becomes true
    }, 2000); // Debounce duration in milliseconds (e.g., 2000ms = 2 seconds)


      const screenWidth = window.innerWidth; // Get screen width
      const screenHeight = window.innerHeight; // Get screen height
      const rigth = getRandomInt(0,screenWidth)
      const left = getRandomInt(0,rigth)
      const up = getRandomInt(0,screenHeight)
      const down = getRandomInt(0,up)
      console.log(left,down);
      const coverBound = {
        left: left,
        right: rigth,
        up: up,
        down: down
      }
      storeBound.addCoverBound(coverBound)
    }

    function getRandomInt(min, max) {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  async function run(){
    console.log('run function!');

      // Stop the color swap timer
    if (colorSwapTimer) {
      clearInterval(colorSwapTimer);
      colorSwapTimer = null;
    }

    runBtn.value = 'rgb(247, 3, 15)'
    isRandom.value = false
    isFinished.value = false
    isDebounce.value = false
    clearTimeout(debounceTimer);
    if(!isCalculate.value){
      try {
          console.log(' run function - !isCalculate');
          isCalculate.value = true
          const ans = await boundService.postBoundToAlgoquest(mainBound.value, bounds.value)
          storeBound.updateAnswerBound(ans)
          isCalculate.value = false
          isFinished.value = true
          isDebounce.value = false;
        } catch (error) {
          console.error('Error running bound service:', error)
        } finally {
          runBtn.value = 'lightgreen' // Reset the button color if needed
          setTimeout(()=>{
            runBtn.value = 'lightgrey' // Reset the button color if needed
          },500)
        }
    }else{
      console.log('calculation in progress!');
    }
    //   left:ans.L ,
    //   right: ans.right,
    //   up: ans.T,
    //   down: ans.B
    // }
    // console.log('run bounds:',bounds.value, 'mainBound:',mainBound.value );
  }
  function defalutMainbound(){
    const screenWidth = window.innerWidth - (window.innerWidth/50) ; // Get screen width
    const screenHeight = window.innerHeight - (window.innerHeight/5); // Get screen height
    isLazy.value = false
    isRandom.value = true
    const mainBound = {
        left: 0,
        right: screenWidth,
        up: screenHeight,
        down: 0
      }
      storeBound.addMainBound(mainBound)
  }
  function onExplain() {
    if(isExplain.value){
      explainBtn.value = 'lightgrey'
    }else{
      explainBtn.value = 'grey'
    }
    isExplain.value = !isExplain.value;  // This will toggle the state each time the button is clicked
  }
// export default {
//   name: 'BoundApp',
//   components: {
//     BoundList
//   }
// }
</script>

<style>
body{
 margin: 0;
}
.body{
  background-color: #f0f2f5;
 
}
.header-container{
  display: flex;
  justify-content: center;

}
.header{
  display: flex; 
  justify-content: center;
  border: 2px inset  #fcfcfc;
  background-color: #ffffff;
  box-shadow: 6px 5px 20px 0px;
  border-radius: 8px;
  margin: 0.5vw  0.5vw;
  width: 30vw;
  min-width: fit-content;
  padding: 1vw;

}
.bound-input{
  width: 4vw;
  min-width: 50px;
  padding: 0.2vw 0.3vw;
  border-radius: 8px;
  margin: 0.2vw;
}
.bound-input-container{
  padding: 0.3vw;
}
.input-containerr{
  /* width: 100vw; */
  /* border: 2px inset black; */
  /* height: 20vh; */
  display: flex;
  flex-direction: column;
}
.frame{
  width: 100vw;
  height: 100vh;
}
.btn-container{
  display: flex;
  width: 30vw;
}
.btn-container-inner{
  display: flex;
}

.config-btn-container{
  display: flex;
  flex-direction: column; 
  padding: 0vw; 
  padding-top: 0vw; 
}

.config-add-btn{
    cursor: pointer;
    margin: 0.2vw;
    background-color: v-bind('configBtn');
    padding: 0.5vw 0.7vw;
    transition: background-color 1s;

}
.config-btn{
    cursor: pointer;
    margin: 0.2vw;
    background-color: v-bind('configBtn');
    padding: 0.4vw 0.6vw;
    transition: background-color 1s;
}
.new-btn{
  cursor: pointer;
    margin: 0.2vw;
    background-color: v-bind('configBtn');
    padding: 0.4vw 0.6vw;
    transition: background-color 1s;
}
/* .run-btn:hover{
  width: 4vw;
  height: 2.5vw;
} */

.run-btn-container{
  display: flex;
  justify-content: center;
  padding: 0.3vw; 
  padding-top: 0vw; 
}
.run-btn-debaunce{
  background-color: lightgreen;
}
.run-btn{
    cursor: pointer;
    margin: 0.2vw;
    background-color: v-bind('runBtn');
    padding: 0.4vw 0.7vw;
    width: 5.3vw;
    height: 2vw;
    min-width: fit-content;
    min-height: fit-content;
    transition: width 2s, height 2s, background-color 1s, font-size 1s;
}
.run-btn-active {
  width: 7vw;
  height: 2.5vw;
  font-size: medium;
}
/* .run-btn-debaunce{
  background-color: lightgreen;
} */
.defalutMainbound{
  /* padding: 0.5vw;  */
  padding-top: 0vw;
}
.add-rec-btn{
  /* padding: 0.2vw; */
  margin-left: 0;
  padding-top: 0vw;
  display: flex;
  flex-direction: column;
}
.finish-btn-activ{
  background-color: lightgreen;
}
.lazy-btn-activ{
  background-color: lightgreen;
}
.random-btn{
  cursor: pointer;
  margin: 0.2vw;
  background-color: v-bind('configBtn');
  padding: 0.4vw 0.6vw;
  transition: background-color 1s;
}
.random-btn-activ{
  background-color: lightgreen;
}
button{
  border-radius: 8px;
  font-weight: 700;
  color: black;
  cursor: pointer;
}

.modal-btn{
  width: 7vw;
  padding: 0.4vw 0.7vw;
}
.modal-add-btn{
  width: 5vw;
  padding: 0.4vw 0.7vw;
  min-width: 70px;
}
.modal-inner-container{
  /* display: flex;
  flex-direction: column;
  padding: 0vw; */
}


.explain-btn{
  margin: 0.2vw;
  height: 4vh;
  padding: 0.4vw 0.7vw;
  /* background-color: rgb(197, 136, 255); */
  background-color: v-bind('explainBtn');
  transition: background-color 1s;
}
.explain{
  position: absolute;
  display: flex;
  justify-content: center;
  /* top: 15vh;
  z-index: 3;
  width: 100vw;  */
  top: 10vh;
  /* left:20vw; */
  z-index: 3;
  width: fit-content;
  height: 90%;
  width: 100vw;
  transform-origin: center center;
}
img{
  border-radius: 8px;
  box-shadow: 6px 5px 20px 0px;
  
}

.scale-enter-active, .scale-leave-active {
  transition: all 0.7s ease;
  transform-origin: center center;
}

.scale-enter-from, .scale-leave-to {
  transform: scale(0);
  opacity: 0;
}

.scale-enter-to, .scale-leave-from {
  transform: scale(1);
  opacity: 1;
}


.shining-text {  
  position: relative;  
  display: inline-block;  
  overflow: hidden;  
}  

.shining-text::before {  
  content: "";  
  position: absolute;  
  top: 0;  
  left: 0;  
  width: 50%;  
  height: 100%;  
  background-image: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8), transparent);  
  animation: shine 2s ease-in-out infinite;  
} 
@keyframes shine {  
  0% {  
    transform: translateX(-100%);  
  }  
  100% {  
    transform: translateX(100%);  
  }  
} 

@media screen and (max-width: 600px) {
  .header{
    width: 70vw;
  }
    .btn-container{
      flex-direction: column;
      width: 60vw;
    }
    .run-btn{
      width: 18vw;
      height: 7vw;
    }
    .run-btn-active {
    width: 23vw;
    height: 10vw;
    font-size: large;
  }
  .config-btn{
    width: 18vw;
    height:7vw ;
  }
  .config-add-btn{
    width: 20vw;
    height: 10vw ;
    padding: 1vw 1vw;
  }
  .random-btn{
    padding: 3vw 1.5vw;
  }
  .new-btn{
    padding: 3vw;
  }
  .explain-btn{
    height: 7vw;
  }
  .explain{
    top: 17vh;
    height: 60%;
    width: 100vw;

  }
  iframe{
    width: 90vw;
  }
}
</style>