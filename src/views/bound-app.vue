<template>
<div class="body">
  <div class="header-container">
    <div class="header" >
      <div class="input-container" style="padding: 1.5vw 1vw;"> 
        <div style="display: flex; ">
          <div>
            LEFT <input class="bound-input" type="number" v-model="mainBoundX1">
            RIGHT <input class="bound-input" type="number" v-model="mainBoundX2">
            UP <input class="bound-input" type="number" v-model="mainBoundY1">
            DOWN <input class="bound-input" type="number" v-model="mainBoundY2">
          </div>
        </div>
        <div  style="display: flex;">
          <div >
            LEFT <input class="bound-input" type="number" v-model="coverBoundX1">
            RIGHT <input class="bound-input" type="number" v-model="coverBoundX2">
            UP <input class="bound-input" type="number" v-model="coverBoundY1">
            DOWN <input class="bound-input" type="number" v-model="coverBoundY2">
          </div>
        </div>
      </div>  
      <div class="btn-container">
        <div class="add-rec-btn" style="">
          <button id="big-add"  class="config-btn"  style="cursor: pointer; margin-left: 0vw;"  @click="onAddMainBound()">Main Rectangle</button>
          <button id="small-add" class="config-btn"  style="cursor: pointer; margin-left: 0vw;"   @click="onAddCoverBound()"> Cover Rectangle</button>
        </div>
        <div class="defalutMainbound">
          <button class="config-btn" :class="{'lazy-btn-activ': isLazy }" @click="defalutMainbound()">i'm lazy</button>
        </div>
        <div class="config-btn-container">
          <button class="config-btn"  :class="{'finish-btn-activ': isFinished }" @click="onClearBounds()">New</button>
          <button class="config-btn"  :class="{'random-btn-activ': isRandom }" @click="onRandomBounds()">Random</button>
        </div>
        <div class="run-btn-container">
          <button class="run-btn"   :class="{ 'run-btn-active': isCalculate, 'run-btn-debaunce': isDebounce }"   @click="run()" :disabled="isCalculate">{{ isCalculate ? 'Calculating' : isFinished ? 'Finished' : 'Run' }} </button>
        </div>
      </div>
    </div>
  </div>
  <div style="height: 82vh;">
    <BoundList :bounds="bounds" :mainBound="mainBound" :answerBound="answerBound"  />
  </div>
</div>
</template>


<script setup>
// import { log10 } from 'core-js/core/number';
import { storeToRefs } from 'pinia'
import {boundService} from '../services/api.service'
import BoundList  from '../cmps/bound-list.vue'
import {boundStore} from '../store/bound.store'
import{reactive,ref,onUnmounted } from 'vue'

    onUnmounted(() => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    });

    const storeBound = boundStore()
    const {mainBound,bounds,answerBound} = storeToRefs(storeBound)
    const runBtn = ref('lightgrey') // Make runBtn reactive using ref
    let configBtn = 'lightgrey'
    const boundsReactiv = reactive(bounds)
    const isCalculate = ref(false) // Make isCalculate reactive
    const isFinished = ref(false) // Make isFinished reactive
    const isLazy = ref(true) // Make isFinished reactive
    const isRandom = ref(false) // Make isFinished reactive
    const isDebounce = ref(false);
    let debounceTimer = null;

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
    
    function onAddMainBound(){
      console.log('mainBoundX1:',mainBoundX1);
      console.log('mainBoundX2:',mainBoundX2);
      console.log('mainBoundY1:',mainBoundY1);
      console.log('mainBoundY2:',mainBoundY2);
      const mainBound = {
        left: mainBoundX1,
        right: mainBoundX2,
        up: mainBoundY1,
        down: mainBoundY2
      }
      storeBound.addMainBound(mainBound)
    }
    
    function onAddCoverBound(){
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
          runBtn.value = 'lightgrey' // Reset the button color if needed
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
    isLazy.value = false
    isRandom.value = true
    const mainBound = {
        left: 0,
        right: 1850,
        up: 700,
        down: 0
      }
      storeBound.addMainBound(mainBound)
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
  border: 2px inset  #fcfcfc;
  background-color: #ffffff;
  box-shadow: 6px 5px 20px 0px;
  border-radius: 8px;
  margin: 0.5vw  0.5vw;
  width: 70vw;

}
.bound-input{
  width: 5vw;
  padding: 0.2vw 0.3vw;
  border-radius: 8px;
  margin: 0.2vw;
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
}
.config-btn-container{
  display: flex;
  flex-direction: column; 
  padding: 0vw; 
  padding-top: 1vw; 
}
.run-btn-container{
  display: flex;
  flex-direction: column; 
  padding: 0.3vw; 
  padding-top: 2vw; 
}
.config-btn{
    cursor: pointer;
    margin: 0.2vw;
    background-color: v-bind('configBtn');
    padding: 0.4vw 0.6vw;
    
}
/* .run-btn:hover{
  width: 4vw;
  height: 2.5vw;
} */

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
  padding-top: 1vw;
}
.add-rec-btn{
  /* padding: 0.2vw; */
  margin-left: 0;
  padding-top: 1vw;
  display: flex;
  flex-direction: column;
}
.finish-btn-activ{
  background-color: lightgreen;
}
.lazy-btn-activ{
  background-color: lightgreen;
}
.random-btn-activ{
  background-color: lightgreen;
}
button{
  border-radius: 8px;
  font-weight: 700;
  color: black;
}
</style>