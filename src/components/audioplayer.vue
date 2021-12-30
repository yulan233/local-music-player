<template>
  <div class="musicPlayer">
    <div class="musicPlay">
      <aplayer :audio="audio" :lrcType="3" />
    </div>
  </div>
</template>

<script>
import { Event } from '@/util/bus'  // 引入这个事件总线
export default {
  name: "audioplayer",
  components:{
  },
  data() {
    return {
      audio: {
        name: 'The Party We Have Never Seen',
        artist: 'Nana Takahashi',
        url: 'F:\\SomethingWritten\\Html+Css+js\\local-music\\src\\assets\\123.mp3',
        cover: 'https://p1.music.126.net/IwclpJu4gaqhSZrKunEFWg==/3297435379408525.jpg?param=300y300', // prettier-ignore
        lrc: 'https://cdn.moefe.org/music/lrc/thepartywehaveneverseen.lrc',
      }
    }
  },
  setup(){

  },
  mounted() {
        Event.$on('getMusic',music => {  // $on接收发送方传给我们的数据
          console.log(music)
          this.audio.url=music.localUrl
          this.audio.lrc=music.localUrl.substring(0,music.localUrl.length-3)+'lrc'
          window.ipcRenderer.send('getMusicImg',music.localUrl)
          window.ipcRenderer.on('replyMusicImg',(event, tag) => {
            var picture = tag.tags.picture; // create reference to track art
            var base64String = "";
            for (var i = 0; i < picture.data.length; i++) {
              base64String += String.fromCharCode(picture.data[i]);
            }
            var imageUri = "data:" + picture.format + ";base64," + window.btoa(base64String);
            this.audio.cover=imageUri
            this.audio.name=tag.tags.title
            this.audio.artist=tag.tags.artist
          })
        })
    Event.$on('getNetMusic',music=>{
      window.ipcRenderer.send('getNetMusic',music.id)
      window.ipcRenderer.on('getNetMusic1',(event, music,musicLrc,musicDetail) => {
        this.audio.url=music.body.data[0].url
        this.audio.lrc=musicLrc.body.lrc.lyric
        this.audio.name=musicDetail.body.songs[0].name
        this.audio.cover=musicDetail.body.songs[0].al.picUrl
        this.audio.artist=musicDetail.body.songs[0].ar[0].name
      })
    })
  },
  destroyed () {
    Event.$off("getMusic");
    Event.$off("getNetMusic");
  },
  methods: {
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
/deep/.aplayer{
  height: 150px;
}
/deep/.aplayer-pic{
  height: 150px!important;
  width: 150px!important;
}
</style>