Component({
  properties: {
    cpnlist:{
      type:[],
      value:null
    }
  },
  methods:{
    handleCancle(){
      this.triggerEvent('pagecompleteCancle',{},{})
    },
    handleReducenum(e){
      this.triggerEvent('pagehandleReduce',{cpnreduceid:this.data.cpnlist[e.currentTarget.dataset.cpnreduce].foods_id},{})
    },
    handleAddnum(e){
      this.triggerEvent('pagehandleAdd',{cpnaddid:this.data.cpnlist[e.currentTarget.dataset.cpnadd].foods_id},{})
    }
    
  }
})
