import { createApp } from "vue"

// 导入 ElementPlus 和 样式文件
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import locale from 'element-plus/lib/locale/lang/zh-cn'
import App from "./App.vue"
const app = createApp(App)

// 使用 ElementPlus
app.use(ElementPlus,{locale})

app.mount("#app")
