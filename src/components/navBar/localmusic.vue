<template>
<div id="localmusic">
  <el-table
      class="table"
      :data="tableData"
      height="380"
      border
      style="width: 100%">
    <el-table-column
        prop="date"
        label="日期"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址">
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
export default {
  components:{
  },
  name: "localmusic",
  setup(){
  },
  data() {
    return {
      currentPage:1,
      total:1000,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    handleCurrentChange(val){
      this.currentPage=val
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
