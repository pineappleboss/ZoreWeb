<template>
<div>
<Tree :data="treeData" show-checkbox ref="treeData"></Tree>
</div>
  
</template>

<script>
export default {
 props:{
     treeData:Array
 },
  data() {
    return {
      checkData:[],
    };
  },
  methods:{
    getData(){
        return this.$refs.treeData.getCheckedNodes()
    },
  }
};
</script>

<style>
</style>