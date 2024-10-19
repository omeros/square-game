import { defineStore } from 'pinia'
// mainBound: { left: 0; right: 0; up: 0; down: 0  },
// bounds: [ {left: 0; right: 0; up: 0; down: 0  }]
// const { mainBound } = storeToRefs(boundStore);

export const boundStore = defineStore('bound.store', {
  
  // state (){ 
  //     return{
  //         mainBound: { left: 10, right: 1500, up: 500, down: 0  },
  //         bounds: [ {left: 20, right: 100, up: 50, down: 0  }]
  //     }
  // },
  state: () => ({
    mainBound: { left: null, right: null, up: null, down: null  },
    bounds: [],
    answerBound: { left: null, right: null, up: null, down: null  }
  }),
  getters: {
    getBounds: (state) => {
      console.log('store - getBounds- state.bounds:',state.bounds);
      return state.bounds
    },
    getMainBound: (state)=>{
      console.log('store - getMainBound- state.mainBound:',state.mainBound);
      return state.mainBound
    }
  },
  actions: {
    addCoverBound(bound) {
      console.log('store addCoverBound-this.bounds:',this.bounds);
      this.bounds.push(bound)
    },
    addCoverBounds(bounds){
      this.bounds = bounds
    },
    addMainBound(bound){
        console.log('store addMainBound-this.mainBound1:',this.mainBound);
        // this.mainBound.left = bound.left
        // this.mainBound.right = bound.right
        // this.mainBound.up = bound.up
        // this.mainBound.down = bound.down
        // this.patch({
        //   mainBound: bound
        // })
        this.mainBound = bound
                console.log('store addMainBound-this.mainBound2:',this.mainBound);
    },
  clearBounds(){
    // $patch({
    //   mainBound :  { left: 0, right: 0, up: 0, down: 0  },
    //   bounds : [{ left: 0, right: 0, up: 0, down: 0  } ] }
    // )
    this.mainBound =  { left: null, right: null, up: null, down: null  }
    this.answerBound =  { left: null, right: null, up: null, down: null  }
    this.bounds = []
    //console.log('clearBounds - this.bounds',this.bounds);
  },
  updateAnswerBound(answeBound){
    console.log('updateAnswerBound:',answeBound);
    this.answerBound = answeBound
  }
  },
  sendDataToAgoquest(){

  }
})


