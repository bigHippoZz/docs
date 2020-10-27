import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

const contextReactive = require.context("./reactive", true, /\.ts$/);
contextReactive.keys().forEach((file) => contextReactive(file));

// const context = require.context('./reactive',false,/\.ts$/)
// console.log(context.keys())
// context.keys().forEach(file=>{
//   context(file)
// })
// const files:string[]  =  ['./reactive']
// function importAll(){
//   files.forEach(fileName=>{
//      const context =  require.context(fileName,false,/\.ts$/)
//   })
// }

// importAll()
