<template>
<div class="body">
  <div class="header-container">
    <div class="header" >
      <div class="input-container" style="padding: 2vw;"> 
        <div style="display: flex; ">
          <div>
            left<input class="bound-input" type="number" v-model="mainBoundX1">
            right<input class="bound-input" type="number" v-model="mainBoundX2">
            UP<input class="bound-input" type="number" v-model="mainBoundY1">
            DOWN <input class="bound-input" type="number" v-model="mainBoundY2">
          </div>
          <div style="padding: 3px;">
            <button id="big-add" style="cursor: pointer;"  @click="onAddMainBound()">+</button>
            <label for="big-add">Main Rectangle</label>
          </div>
        </div>
        <div  style="display: flex;">
          <div >
            left<input class="bound-input" type="number" v-model="coverBoundX1">
            right<input class="bound-input" type="number" v-model="coverBoundX2">
            UP<input class="bound-input" type="number" v-model="coverBoundY1">
            DOWN<input class="bound-input" type="number" v-model="coverBoundY2">
          </div>
          <button id="small-add" style="cursor: pointer;"   @click="onAddCoverBound()">+</button>
          <label for="small-add">Small Rectangle</label>
        </div>
      </div>  
      <div class="run-btn-container">
        <button class="run-btn" @click="onClearBounds()">New</button>
        <button class="run-btn" @click="onRandomBounds()">Random</button>
      </div>
      <div class="run-btn-container">
        <button class="run-btn">Exit</button>
        <button class="run-btn">Run</button>
      </div>
    </div>
  </div>
  <div style="height: 82vh;">
    <BoundList :bounds="boundsReactiv" :mainBound="mainBound"/>
  </div>
</div>
</template>


<script setup>
// import { log10 } from 'core-js/core/number';
import { storeToRefs } from 'pinia'

import BoundList  from '../cmps/bound-list.vue'
import {boundStore} from '../store/bound.store'
import{reactive} from 'vue'
    
    const storeBound = boundStore()
    const bounds = storeBound.getBounds
    const {mainBound} = storeToRefs(storeBound)
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

    }
    function onRandomBounds(){

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
.run-btn-container{
  display: flex;
  flex-direction: column; 
  padding: 2vw; 
}
.run-btn{
    cursor: pointer;
}
</style>