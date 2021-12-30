<template>
<div class="musicList">
  <div class="top">
    <img :src='coverImgUrl' alt="">
    <div class="infomation">
      <div class="name">{{ name }}</div>
      <div class="info">{{description}}</div>
    </div>
  </div>
  <div class="List">
    <el-table
        class="table"
        :data="tableData"
        height="250"
        border
        @row-click="play"
        style="width: 100%">
      <el-table-column
          prop="id"
          label="id"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="名字"
          width="180">
      </el-table-column>
      <el-table-column
          prop="artist"
          label="艺术家"
          width="180">
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import { Event } from '@/util/bus'  // 引入这个事件总线

export default {
  name: "musicList",
  data(){
    return{
      id:1,
      coverImgUrl:'',
      name:'',
      description:'',
      tableData:[]
    }
  },
  created() {
    this.id=this.$route.params.id
    this.getMusicList()
  },
  methods:{
    play(row){
      let music={
        id:this.tableData[row.id].realId
      }
      Event.$emit('getNetMusic', music)
    },
    getMusicList(){
      window.ipcRenderer.send('getMusicList',this.id)
      window.ipcRenderer.on('getMusicList1',(event, musicList) => {
        console.log(musicList)
        this.name=musicList.body.playlist.name
        this.coverImgUrl=musicList.body.playlist.coverImgUrl
        this.description=musicList.body.playlist.description
        for(var i=0;i<musicList.body.playlist.tracks.length;i++){
          this.tableData.push({
            id:i,
            realId:musicList.body.playlist.tracks[i].id,
            name:musicList.body.playlist.tracks[i].name,
            artist:musicList.body.playlist.tracks[i].ar[0].name
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.musicList{
  width: 850px;
  height: 450px;
}
.top{
  width: 850px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top>img{
  height: 100%;
}
.infomation{
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>