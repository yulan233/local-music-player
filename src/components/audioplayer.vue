<template>
  <div class="audioPlayerAll">
    <div class="musicInfo">
      <div class="musicImg">
        <img src="../assets/logo.png" alt="">
      </div>
      <p class="musicTitle">???</p>
      <p class="Musicians">???</p>
    </div>
    <div class="musicPlayer">
      <div class="musicPlay">
        <audio :src="musicUrl" autoplay class="playMusicAudio" ref="audio" @canplay="getDuration" @timeupdate="durationUpdate"></audio>
        <div id="audioFunc">
          <!-- 播放顺序 -->
          <div @click="changeOrd">
            <el-tooltip class="item" effect="light" content="顺序播放" placement="top" :open-delay="500">
              <div id="playOrd" v-show="playOrd === 0"><i style="font-size: 18px;">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shunxubofang"></use>
                </svg>
              </i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="列表循环" placement="top" :open-delay="500">
              <div id="playOrd" v-show="playOrd === 1"><i style="font-size: 18px;">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yinlebofangliebiao"></use>
                </svg>
              </i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="单曲循环" placement="top" :open-delay="500">
              <div id="playOrd" v-show="playOrd === 2"><i style="font-size: 18px;">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xunhuanbofang"></use>
                </svg>
              </i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="随机播放" placement="top" :open-delay="500">
              <div id="playOrd" v-show="playOrd === 3"><i style="font-size: 18px;">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yinpinboduan"></use>
                </svg>
              </i></div>
            </el-tooltip>
          </div>

          <!-- 上一首歌曲 -->
          <div id="backSong"><i style="font-size: 18px;">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shangyiqu"></use>
            </svg>
          </i></div>
          <!-- 播放与暂停 -->
          <div>
            <div id="pause" v-show="isPlaying" @click="pauseSong"><i style="font-size: 18px;">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-a-zantingyinle"></use>
              </svg>
            </i></div>
            <div id="play" v-show="!isPlaying" @click="playSong"><i style="font-size: 30px;">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-huodekaishi"></use>
              </svg>
            </i></div>
          </div>
          <!-- 下一首歌曲 -->
          <div id="nextSong"><i style="font-size: 18px;">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiayiqu"></use>
            </svg>
          </i></div>
          <!-- 歌词 -->
          <div id="album"><span style="font-size: 15px;">词</span></div>
        </div>
        <!-- 播放进度条 -->
        <span style="position: absolute;right: 72%;bottom: 14%;">{{this.musicDuration | timeFormat}}</span>
        <div id="playSlider">
          <el-slider v-model="musicDuration" :max="musicAllDuration" :show-tooltip="false" @change="changeMusicDuration" @mousedown.native="isChange = true" @mouseup.native="isChange = false"></el-slider>
        </div>
        <span style="position: absolute;left: 72%;bottom: 14%;">{{this.musicAllDuration | timeFormat}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "audioplayer",
  components:{

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
  methods:{
    // playMusic(e){//音乐播放函数，之后添加内容
    //   e.target.blur()
    // }
    // 播放音乐
    playSong() {
      if (!this.musicUrl) {
        // const h = this.$createElement;
        // this.$message.error({
        //   message: h('p', null, [
        //     h('span', null, '列表中没有可播放的歌曲'),
        //     h('i', {
        //       style: 'color: red'
        //     }, '')
        //   ]),
        //   offset: 280,
        //   center: true,
        //   showClose: true
        // });
        return
      }
      this.isPlaying = true
      this.$refs.audio.play()
    },
    // 暂停音乐
    pauseSong() {
      this.isPlaying = false
      this.$refs.audio.pause()
    },
    //变化播放模式
    changeOrd() {
      if (this.playOrd === 3) return this.playOrd = 0
      this.playOrd++
    },
    //获得播放歌曲总时长
    getDuration() {
      this.musicAllDuration = this.$refs.audio.duration
    },
    //更新当前时长
    durationUpdate() {
      if (this.isChange === true) return
      this.musicDuration = this.$refs.audio.currentTime
    },
    //鼠标拖拽松开时
    changeMusicDuration() {
      if (this.musicAllDuration === 0) return
      this.$refs.audio.currentTime = this.musicDuration
      this.isChange = false
    },
  }
}
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.audioPlayerAll{
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.musicInfo{
  display: flex;
  width: 300px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.musicPlayer{
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
}
.musicTitle{
  margin: 0;
}
.musicImg{
  height: 80px;
  width: 80px;
  overflow: hidden;
  box-sizing: border-box;
  border: 2px solid #a2a2a2;
  border-radius: 5px;
}
.musicImg>img{
  height: 100%;
}
.musicPlay {
  position: fixed;
  width: 700px;
  height: 150px;
}

/* 音乐操作 */
#play,
#pause {
  cursor: pointer;
  background: #ebebed;
  border-radius: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

#play:hover,
#pause:hover {
  background: #ddddde;
}

#playOrd,
#backSong,
#nextSong {
  cursor: pointer;
  border-radius: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

#playOrd:hover,
#backSong:hover,
#nextSong:hover,
#album:hover {
  color: #ed6566;
}

#album {
  cursor: pointer;
  border-radius: 100%;
  height: 40px;
  line-height: 36px;
  text-align: center;
}

#audioFunc {
  display: grid;
  width: 280px;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 20px;
  margin-top: 1%;
  margin-left: 50%;
  transform: translateX(-50%);
}
/* 播放条样式 */

#playSlider {
  width: 43%;
  margin-top: -5px;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>