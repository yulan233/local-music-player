<template>
  <div class="musicPlayer">
    <div class="musicPlay">
      <aplayer
                 :music="{
              title: 'secret base~君がくれたもの~',
              artist: 'Silent Siren',
              src: 'F:\\SomethingWritten\\Html+Css+js\\local-music\\src\\assets\\123.mp3',
              pic: '../../assets/logo.png'
              }"
      />
    </div>
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
export default {
  name: "audioplayer",
  components:{
    Aplayer
  },
  data() {
    return {
      // 判断当前是否在播放
      isPlaying: false,
      //判断播放顺序模式
      playOrd: 0,
      //歌曲总时长
      musicAllDuration: 88,
      // 歌曲当前时长
      musicDuration: 0,
      //判断是否被拖动
      isChange: false,
      musicUrl:'../../assets/123.mp3'
    }
  },
  setup(){

  },
  methods: {
    // playMusic(e){//音乐播放函数，之后添加内容
    //   e.target.blur()
    // }
    // 播放音乐
  }
}
</script>

<style scoped>
.musicPlayer{
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
}
.musicPlay{
  width: 100%;
}
/deep/.aplayer-pic{
  width: 150px!important;
  height: 150px!important;
}
/deep/.aplayer-body{
  align-items: center!important;
}
.aplayer{
  height: 150px!important;
}
</style>