<template>
  <div class="left">
    <el-carousel :interval="4000" type="card" height="230px" class="zoumadeng" trigger="click">
      <el-carousel-item v-for="item in newMusicList" :key="item" style="background-color: rgba(255,255,255,0)">
        <img :src="item.album.blurPicUrl" class="Newimage">
      </el-carousel-item>
    </el-carousel>
    <div class="Recommend">
      <div class="title"><h4>推荐歌单</h4></div>
      <div class="Recommended-Content">
        <el-card class="card-card" :body-style="{ padding: '0px' ,height:'150px',width:'166px',position:'relative'}" v-for="item in musicList" :key="item">
          <router-link :to="toto+item.id">
            <img
                v-bind:src="item.coverImgUrl"
                class="image"
            />
            <div class="card-neirong" style="padding: 14px">
              <span>{{item.name}}</span>
              <div class="bottom">
                <time class="time">作者：{{item.creator.nickname}}</time>
              </div>
            </div>
          </router-link>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage",
  data(){
    return{
      toto:'/navBar/musicList/',
      musicList:[],
      newMusicList:[]
    }
  },
  created() {
    this.getNetEaseCloudMusic()
    this.getNetEaseCloudMusicNew()
  },
  methods:{
    getNetEaseCloudMusic(){
      window.ipcRenderer.send('getNetEaseCloudMusic')
      window.ipcRenderer.on('musicList',(event, musicList) => {
        const musicList1=musicList
        this.musicList=musicList1
        console.log(musicList1)
      })
    },
    getNetEaseCloudMusicNew(){
      window.ipcRenderer.send('getNetEaseCloudMusicNew')
      window.ipcRenderer.on('newMusicList',(event, newMusicList) => {
        const newMusicList1=newMusicList
        this.newMusicList=newMusicList1.slice(0,6)
      })
    }

  }
}
</script>

<style scoped>
/*推荐样式*/
.time{
  font-size: 10px;
}
.Newimage{
  height: 100%;
}
.Recommend{
  height: 180px;
}
.title{
  text-align: left;
}
.title>h4{
  margin: 5px 0;
}
.Recommended-Content{
  height: 150px;
  display: flex;
  justify-content: space-around;
}
.card-card:hover{
  box-shadow: 0px 0px 5px;
}
.image{
  width: 100%;
}
.card-neirong{
  position: absolute;
  bottom: 0;
  width: 150px;
  padding: 8px!important;
  background-color: rgba(162, 162, 162, 0.7);
}
/*走马灯样式*/
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.zoumadeng{
  margin: 0 10px;
  width: 820px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/*去除router-link的默认样式*/
a {
  text-decoration:none;
  color: #475669;
}
.router-link-active {
  text-decoraction: none ;
  color: #475669;
}
</style>