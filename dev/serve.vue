<template>
  <div id="app">
    <ims-keyword-box
        v-model="keywords"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import ImsKeywordBox from '@/ims-keyword-box.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    ImsKeywordBox
  },
  data(){
    return {
      keywords: ["hawaii","pacific","relaxing","wide","holidays","polynesia","tahiti","dreaming","blue","palm","panorama","sand","sky","bask","lagoon","ocean","panoramic","recreation","romantic","south","sun","clouds","turquoise","warm","nature"]
    }
  }
});
</script>

<style>
#app{
  font-family: sans-serif;
}
</style>
