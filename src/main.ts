import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
const app = createApp(App)
app.use(ElementPlus).mount('#app')
const a = import.meta.globEager('./algorithm/**/*')
const b = import.meta.globEager('./complier/**/*')
const c = import.meta.globEager('./dataStructure/**/*')
const d = import.meta.globEager('./global/**/*')
const e = import.meta.globEager('./reactive/**/*')
const f = import.meta.globEager('./regexp/**/*')
const g = import.meta.globEager('./proxy/**/*')

/**
 * [object Object] 名字如何进行修改
 *
 */

/**
 * typeOf Object.protoType.toString.call()
 * typeOf 无法判断基本包装类型
 */
