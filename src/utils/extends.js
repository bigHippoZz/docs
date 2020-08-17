let map = new WeakMap();
class NullValue {
    provide = new WeakMap();
    constructor(target) {
        // 创建私有变量
        this.provide.set(this, "liwuzhou");
    }
    get name() {
        return this.provide.get(this);
    }

    get count() {
        return "hello world";
    }
}
let target = new NullValue("liwuzhou");
console.log(target);
console.log(target.name);
function log(msg) {
    console.log(msg);
}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);

function createFlow(task) {
    let callbacks = task.slice().flat();
    console.log(callbacks);
    // while (callbacks.some(i => Array.isArray(i))) {
    //     callbacks = [].concat(...callbacks);
    // }
    return {
        async run(func = () => {}) {
            callbacks.push(func);
            for (const item of callbacks) {
                if (typeof item === "function") {
                    await Promise.resolve(item());
                } else if (typeof item === "object") {
                    await item.run();
                }
            }
        },
    };
}

createFlow([
    () => log("a"),
    () => log("b"),
    subFlow,
    [() => delay(1000).then(() => log("d")), () => log("e")],
]).run(() => console.log("done"));
