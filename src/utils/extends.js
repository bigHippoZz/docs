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

// createFlow([
//     () => log("a"),
//     () => log("b"),
//     subFlow,
//     [() => delay(1000).then(() => log("d")), () => log("e")],
// ]).run(() => console.log("done"));

class _promise_ {
    callbacks = [];
    value = "";
    status = "pending";
    constructor(func) {
        func(
            value => this._resolve(value),
            err => this._reject(err)
        );
    }

    then(onfulfilled, onrejected) {
        return new _promise_((resolve, reject) => {
            this._handle({
                resolve: resolve,
                reject: reject,
                onfulfilled: onfulfilled,
                onrejected: onrejected,
            });
        });
    }

    _handle(callback) {
        console.log(callback);
        if (this.status === "pending") {
            console.log(this.status, "pending");
            this.callbacks.push(callback);
            return;
        }

        if (this.status === "fulfilled") {
            if (!callback.onfulfilled) {
                callback.resolve(this.value);
                return;
            }
            let result = callback.onfulfilled(this.value);
            callback.resolve(result);
        }

        if (this.status === "rejected") {
            if (!callback.onrejected) {
                callback.reject(this.value);
                return;
            }

            let result = callback.onrejected(this.value);
            callback.reject(result);
        }
    }

    _resolve(value) {
        if (
            value &&
            (typeof value === "function" || typeof value === "object")
        ) {
            if (typeof value.then === "function") {
                value.then(
                    value => this._resolve(value),
                    err => this._reject(err)
                );
            }
        }
        if (this.status !== "pending") return;
        this.status = "fulfilled";
        this.value = value;
        this.callbacks.forEach(f => this._handle(f));
    }

    _reject(errVal) {
        if (
            errVal &&
            (typeof errVal === "function" || typeof errVal === "object")
        ) {
            if (typeof errVal.then === "function") {
                errVal.then(
                    value => this._resolve(value),
                    err => _this._reject(err)
                );
            }
        }

        if (this.status !== "pending") return;
        this.status = "rejected";
        this.value = errVal;
        this.callbacks.forEach(f => this._handle(f));
    }
    catch(onerror) {
        return this.then(null, onerror);
    }

    static resolve(value) {
        // return new /
        if (
            value &&
            (typeof value === "function" || typeof value === "object")
        ) {
            if (typeof value.then === "function") {
                return value;
            }
        } else if (value) {
            return new _promise_(resolve => resolve(value));
        } else {
            return new _promise_(resolve => resolve());
        }
    }

    static reject(value) {
        // return new /
        if (
            value &&
            (typeof value === "function" || typeof value === "object")
        ) {
            if (typeof value.then === "function") {
                return value;
            }
        } else if (value) {
            return new _promise_((resolve, reject) => reject(value));
        } else {
            return new _promise_((resolve, reject) => reject(value));
        }
    }

    static all(promises) {
        if (!promises.length) return;
        let result = [];
        let promisesLen = promises.length;
        let count = 0;

        return new _promise_((resolve, reject) => {
            for (let index = 0; index < promises.length; index++) {
                promises[index].then(
                    res => {
                        count++;
                        result[index] = res;
                        if (count === promisesLen) {
                            resolve(result);
                        }
                    },
                    err => {
                        reject(err);
                    }
                );
                // const element = array[index];
            }
        });
    }

    static race(promises) {
        if (!promises.length || !Array.isArray(promises)) return;
        return new _promise_((resolve, reject) => {
            for (let index = 0; index < promises.length; index++) {
                // const element = array[index];
                promises[index].then(
                    res => {
                        resolve(res);
                    },
                    err => {
                        reject(err);
                    }
                );
            }
        });
    }
}

new _promise_((resolve, reject) => {
    reject(10);
})
    .then(
        res => {
            console.log(res);
        },
        err => {
            console.log(err);
            return new _promise_((resolve, reject) => {
                resolve(1000);
            });
        }
    )
    .then(res => {
        console.log(res);
        return new _promise_((resolve, reject) => {
            reject(3000);
        });
    })
    .catch(console.log);
