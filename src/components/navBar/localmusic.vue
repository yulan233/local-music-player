<template>
<div id="localmusic">
  <el-input clearable v-model="localUrl" >
    <el-button slot="append" @click="setLocalUrl">设置</el-button>
  </el-input>
  <el-table
      class="table"
      :data="tableData"
      height="380"
      border
      @row-click="play"
      style="width: 100%">
    <el-table-column
        prop="name"
        label="名字"
        width="500">
    </el-table-column>
    <el-table-column
        prop="url"
        label="地址"
        width="240">
    </el-table-column>
  </el-table>
  <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="prev, pager, next"
      :total="total">
  </el-pagination>
</div>
</template>

<script>
import { Event } from '@/util/bus'  // 引入这个事件总线
export default {
  components:{
  },
  name: "localmusic",
  setup(){
  },
  data() {
    return {
      localUrl:'',
      currentPage:1,
      total:1000,
      tableData: []
    }
  },
  created() {
    this.getLocalUrl()
  },
  methods: {
    getLocalUrl(){
      window.ipcRenderer.send('getLocalUrl')
      window.ipcRenderer.on('getLocalUrl1',(event, musicUrl) => {
        this.localUrl=musicUrl
        this.getList(1)
      })
    },
    setLocalUrl(){
      window.ipcRenderer.send('setLocalUrl',this.localUrl)
      this.getList(1)
    },
    handleCurrentChange(val){
      this.currentPage=val
      this.getList(val)
    },
    play(row){
      let music={
        name:row.name,
        localUrl:row.url
      }
      Event.$emit('getMusic', music)
    },
    getList(currPage){
      if(this.localUrl===''){
        return
      }
      window.ipcRenderer.send('readList',this.localUrl)
      let listObject;
      window.ipcRenderer.on('listObject',(event, args) => {
        this.tableData=[]
        listObject=args
        this.total=listObject.length/20*10
        for (let i = (currPage-1)*20; i < currPage*20; i++) {
          if(i===listObject.length){
            break
          }
          this.tableData.push(
              {
                name:listObject[i],
                url:this.localUrl+'\\'+listObject[i],
              }
          )
        }
      })
    }
  }
}
</script>

<style scoped>
#localmusic{
  width: 850px;
}
.table{
  width: 890px;
}
</style>
