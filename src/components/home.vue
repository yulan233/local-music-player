<template>
  <div id="home">
    <headarea></headarea>
    <div class="navBar">
      <navBar></navBar>
    </div>
    <div class="audioplayer">
      <audioplayer></audioplayer>
    </div>
  </div>
</template>

<script>
import headarea from './headarea.vue'
import navBar from './navBar.vue'
import audioplayer from './audioplayer.vue'
export default {
  name:'home',
  components:{
    headarea,
    navBar,
    audioplayer
  }
}
</script>

<style scoped>
.navBar{
  width: 100%;
  height: 450px;
}
.audioplayer{
  height: 150px;
}
</style>