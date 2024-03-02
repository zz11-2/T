<script setup>
import { onMounted, reactive, ref } from 'vue'
import Edit from './components/EditT.vue'
import axios from 'axios'
// import { id } from 'element-plus/es/locale';
// TODO: 列表渲染
//思路：声明响应式list->调用接口获取数据->后端数据赋值给list->绑定到table组件
const list=reactive([])
const getList=async()=>{
    //接口调用并判断
  try {
    const res =await axios.get('http://localhost:8080/list')
    list.length=0//清空数组
    list.push(...res.data.result)//重新填充数据
    // Object.assign(list, res.data.result)把res.data.result的属性复制到list对象中，Object.assign是浅复制，如果源对象是个引用的对象那就会直接复制这个引用.
  } catch (error) {
    console.error(error)
  }
  // const res=await axios.get('http://localhost:8080/list')
  //交给list
  // list=res.data.result
  // console.log(list);
}
onMounted(()=>getList())
// TODO: 删除功能
//思路：获取当前行的id->通过id调用删除接口->更新最新的列表
const onDelete=async (id)=>{
  // console.log(id);
  await axios.delete(`http://localhost:8080/list/${id}`)
  getList()
}
// TODO: 编辑功能

</script>

<template>
  <div class="app">
    <el-table :data='list'>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name" width="150"></el-table-column>
      <el-table-column label="籍贯" prop="place_of_origin"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{row}">
          <el-button type="primary" link>编辑</el-button>
          <el-button type="danger" @click="onDelete(row.id)" link>删除</el-button>
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
