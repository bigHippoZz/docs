import { provide } from "vue";
/**
 * 依赖注入 将conf中的配置项注入各个组件页面
 * @param {function} func 回调函数
 */
async function confLoad(func = value => value) {
    provide(
        "conf",
        fetch("/conf.json", { method: "GET" })
            .then(res => res.json())
            .then(func)
    );
}
function log() {}

/**
 * as default 设置为默认导出
 */
export { confLoad as default, log };
