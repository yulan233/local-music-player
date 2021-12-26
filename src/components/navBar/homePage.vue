<template>
  <div class="left">
    <el-carousel :interval="4000" type="card" height="230px" class="zoumadeng" trigger="click">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <div class="Recommend">
      <div class="title"><h4>推荐</h4></div>
      <div class="Recommended-Content">
        <el-card class="card-card" :body-style="{ padding: '0px' ,height:'150px',width:'166px',position:'relative'}" v-for="item in 4" :key="item">
          <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
          />
          <div class="card-neirong" style="padding: 14px">
            <span>Yummy hamburger</span>
            <div class="bottom">
              <time class="time">作者：？？？</time>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage"
}
</script>

<style scoped>
/*推荐样式*/
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
</style>