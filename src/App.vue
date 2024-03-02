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
//思路：用户填写新数据->
const inputs=reactive({
  showModal:false,
  input1:'',
  input2:'',
  id:''
})
// const id=list.id
// const name=list.name
// const origin=list.origin
const Adddata=async (id,name,origin)=>{
  inputs.showModal=false
  await axios.put(`http://localhost:8080/list/${id}`,{
    name:inputs.input1,
    origin:inputs.input2,
    
  })
  getList()
  inputs.input1=''
  inputs.input2=''
}
const add=(id)=>{
  inputs.showModal=true
  inputs.id=id
}
</script>

<template>
  <div class="app">
    <el-table :data='list'>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name" width="150"></el-table-column>
      <el-table-column label="籍贯" prop="origin"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{row}">
          <el-button type="primary" @click="add(row.id)" link>编辑</el-button>
          <el-button type="danger" @click="onDelete(row.id)" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="box" v-show="inputs.showModal">
    <div style=" padding: 10%;">
      <input type="text" v-model="inputs.input1" placeholder="姓名">
    <br>
    <input type="text" v-model="inputs.input2" placeholder="籍贯">
    <br>
    <br>
   <div style="width: 100%; height: auto; display: flex; justify-content: space-evenly;"> <input type="button" value="取消" @click="inputs.showModal=false"><input type="button" @click="Adddata(inputs.id,inputs.input1,inputs.input2)" value="提交"></div>
    </div>
  </div>

  <Edit />
</template>

<style scoped>
.app {
  width: 980px;
  margin: 100px auto 0;
}
.box{
  width: 300px;
  height: 150px;
  border: 1px solid black;
  text-align: center;
  position: fixed;
  left: 40%;
}
</style>
