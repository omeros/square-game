<template>
<div class="body">
  <div class="header-container">
    <div class="header" >
      <div class="input-container" style="padding: 1.5vw 1vw;"> 
        <div style="display: flex; ">
          <div>
            left<input class="bound-input" type="number" v-model="mainBoundX1">
            right<input class="bound-input" type="number" v-model="mainBoundX2">
            UP<input class="bound-input" type="number" v-model="mainBoundY1">
            DOWN <input class="bound-input" type="number" v-model="mainBoundY2">
          </div>
          <div style="padding: 0.2vw">
            <button id="big-add"  class="config-btn"  style="cursor: pointer; margin-left: 1vw;"  @click="onAddMainBound()">Main Rectangle</button>
          </div>
        </div>
        <div  style="display: flex;">
          <div >
            left<input class="bound-input" type="number" v-model="coverBoundX1">
            right<input class="bound-input" type="number" v-model="coverBoundX2">
            UP<input class="bound-input" type="number" v-model="coverBoundY1">
            DOWN<input class="bound-input" type="number" v-model="coverBoundY2">
          </div>
          <button id="small-add" class="config-btn"  style="cursor: pointer; margin-left: 1vw;"   @click="onAddCoverBound()"> Cover Rectangle</button>
        </div>
      </div>  
      <div class="defalutMainbound">
        <button class="config-btn" @click="defalutMainbound()">i'm lazy</button>
      </div>
      <div class="config-btn-container">
        <button class="config-btn" @click="onClearBounds()">New</button>
        <button class="config-btn" @click="onRandomBounds()">Random</button>
      </div>
      <div class="run-btn-container">
        <button class="run-btn"   @click="run()">Run</button>
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
import{reactive,ref} from 'vue'

    const storeBound = boundStore()
    const runBtn = ref('lightgreen') // Make runBtn reactive using ref
    let configBtn = 'lightgreen'
    let isCalculate = false
    // const bounds = storeBound.getBounds
    const {mainBound,bounds,answerBound} = storeToRefs(storeBound)
    // const mainBound = storeBound.getMainBound
    // const newBound = reactive({ left: 0, rigth: 0, up: 0, down: 0 })
    const boundsReactiv = reactive(bounds)
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
      storeBound.clearBounds()
    }
    function onRandomBounds(){
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
    runBtn.value = '#f1396e'
    if(!isCalculate){
      try {
          console.log(' run function - !isCalculate');
          isCalculate = true
          const ans = await boundService.postBoundToAlgoquest(mainBound.value, bounds.value)
          storeBound.updateAnswerBound(ans)
          isCalculate = false
        } catch (error) {
          console.error('Error running bound service:', error)
        } finally {
          runBtn.value = 'lightgreen' // Reset the button color if needed
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
  margin-top: 1vw;
  width: 70vw;

}
.bound-input{
  width: 5vw;
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
.config-btn-container{
  display: flex;
  flex-direction: column; 
  padding: 0vw; 
  padding-top: 2vw; 
}
.run-btn-container{
  display: flex;
  flex-direction: column; 
  padding: 1vw; 
  padding-top: 2vw; 
}
.config-btn{
    cursor: pointer;
    margin: 0.2vw;
    background-color: v-bind('configBtn');
    padding: 0.4vw 0.6vw;

}
.run-btn:hover{
  width: 4vw;
  height: 2.5vw;
 
}
.run-btn{
    cursor: pointer;
    margin: 0.2vw;
    background-color: v-bind('runBtn');
    padding: 0.4vw 0.7vw;
    width: 3vw;
    height: 2vw;
    transition: width 2s, height 2s;
  
}
.defalutMainbound{
  padding: 0.5vw; 
  padding-top: 2vw;
}
button{
  border-radius: 8px;
  font-weight: 700;
}
</style>