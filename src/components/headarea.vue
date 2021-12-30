<template>
  <div class="head">
    <div class="logo">
      <img src="../assets/logo.jpg" alt="">
    </div>
    <div class="search">
      <el-input v-model="search" placeholder="Please input" clearable >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="windowControl">
      <el-button @click="minimizeWindow($event)"><i class="el-icon-minus"></i></el-button>
      <el-button @click="closeWindow($event)"><i class="el-icon-close"></i></el-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      search:''
    }
  },
  components:{
  },
  methods:{
    closeWindow(e){//关闭页面
      e.target.blur()
      window.ipcRenderer.send('close')//向主进程发送close
    },
    minimizeWindow(e){//最小化页面
      e.target.blur()
      window.ipcRenderer.send('minimize')
    }
  }
}

</script>

<style scoped>
.head{
  display: flex;
  justify-content: space-between;
  -webkit-app-region: drag;/*用electron的一个功能实现拖动窗口功能*/
}
.logo{
  height: 50px;
}
.logo>img{
  height: 100%;
}
.search{
  width: 300px;
  -webkit-app-region: no-drag;/*设置不用拖放的区域*/
}
.windowControl{
  -webkit-app-region: no-drag;/*设置不用拖放的区域*/
}
</style>