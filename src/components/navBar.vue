<template>
  <div class="all">
    <div class="right">
      <h5>音乐</h5>
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
      >
        <router-link to="/navBar/homePage">
          <el-menu-item index="1">
          <span>主页</span>
          </el-menu-item>
        </router-link>
        <router-link to="/navBar/localMusic">
          <el-menu-item index="2">
            <span>本地音乐</span>
          </el-menu-item>
        </router-link>
        <router-link to="/navBar/netResources">
          <el-menu-item index="3">
            <span>网络资源</span>
          </el-menu-item>
        </router-link>
<!--        可能之后会加上这个功能-->
<!--        <router-link to="/navBar/personalSongList">-->
<!--          <el-menu-item index="4">-->
<!--            <span>个人歌单</span>-->
<!--          </el-menu-item>-->
<!--        </router-link>-->
<!--        <router-link to="/navBar/musicList/486022716">-->
<!--          <el-menu-item index="5">-->
<!--            <span>页面歌单</span>-->
<!--          </el-menu-item>-->
<!--        </router-link>-->
      </el-menu>
    </div>
    <div class="left">
      <router-view></router-view>
    </div>
  </div>



</template>

<script>

</script>

<style scoped>
.all{
  display: flex;
  width: 100%;
  height: 100%;
}
.right{
  width: 150px;
}
.left{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/*去除router-link的默认样式*/
a {
  text-decoration:none ;
  color: #00ecfc;
}
.router-link-active {
  text-decoraction: none ;
  color: #00ecfc;
}
</style>