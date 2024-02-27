<script setup>
import { onMounted, reactive, ref } from 'vue'
import Edit from './components/EditT.vue'
import axios from 'axios'
// TODO: 列表渲染
//思路：声明响应式list->调用接口获取数据->后端数据赋值给list->绑定到table组件
const list=reactive([])
const getList=async()=>{
    //接口调用并判断
  try {
    const res =await axios.get('http://localhost:8080/list')
    // list = res.data.result
    Object.assign(list, res.data.result)
  } catch (error) {
    console.error(error)
  }
  // const res=await axios.get('http://localhost:8080/list')
  //交给list
  // list=res.data.result
  console.log(list);
}
onMounted(()=>getList())
// TODO: 删除功能


// TODO: 编辑功能

</script>

<template>
  <div class="app">
    <el-table :data='list'>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name" width="150"></el-table-column>
      <el-table-column label="籍贯" prop="place_of_origin"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default>
          <el-button type="primary" link>编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Edit />
</template>

<style scoped>
.app {
  width: 980px;
  margin: 100px auto 0;
}
</style>
