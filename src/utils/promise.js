class _promise {
    callbacks = [];
    status = "pending";
    value = null;
    constructor(func) {
        func(
            value => this._resolve(value),
            error => this._reject(error)
        );
    }
    id = Math.random();
    then(onfulfilled, onrejected) {
        return new _promise((resolve, reject) => {
            this._handle({
                onfulfilled: onfulfilled || null,
                resolve: resolve,
                onrejected: onrejected || null,
                reject: reject,
            });
        });
    }

    catch(onerr) {
        return this.then(null, onerr);
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
                return;
            }
        }

        if (this.status !== "pending") return;
        this.status = "fulfilled";
        this.value = value;
        this.callbacks.forEach(f => this._handle(f));
    }

    _reject(error) {
        if (
            error &&
            (typeof error === "function" || typeof error === "object")
        ) {
            if (typeof error.then === "function") {
                error.then(
                    value => this._resolve(value),
                    err => this._reject(err)
                );
                return;
            }
        }

        if (this.status !== "pending") return;
        this.status = "rejected";
        this.value = error;
        this.callbacks.forEach(f => this._handle(f));
    }

    _handle(callback) {
        if (this.status === "pending") {
            this.callbacks.push(callback);
            return;
        }

        if (this.status === "fulfilled") {
            if (!callback.onfulfilled) return callback.resolve(this.value);

            let nextResult = callback.onfulfilled(this.value);
            callback.resolve(nextResult);
        }

        if (this.status === "rejected") {
            if (!callback.onrejected) return callback.reject(this.value);
            let nextResult = callback.onrejected(this.value);
            callback.reject(nextResult);
        }
    }

    static resolve(value) {
        if (
            value &&
            (typeof value === "function" || typeof value === "object")
        ) {
            return new _promise(res => {
                value.then(res);
            });
        } else if (value) {
            return new _promise(resolve => resolve(value));
        } else return new _promise(resolve => resolve());
    }

    static all(promises) {
        let length = promises.length;
        let count = 0;
        let result = Array.from({
            length: length,
        });
        return new _promise((resolve, reject) => {
            promises.forEach((promise, index) => {
                promise.then(
                    res => {
                        count++;
                        result[index] = res;
                        if (length === count) {
                            resolve(result);
                        }
                    },
                    err => reject(err)
                );
            });
        });
    }

    static race(promises) {
        return new _promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                _promise.resolve(promises[i]).then(
                    function (value) {
                        return resolve(value);
                    },
                    function (reason) {
                        return reject(reason);
                    }
                );
            }
        });
    }
}
console.log(new _promise((res, rej) => {}));

// let promise = new _promise((resolve, reject) => {
//         setTimeout(() => {
//             reject(1000)
//         }, 2000);
//     })
//     .then(res => {

//         return new _promise((res, rej) => {
//             res('hello world')
//         })
//     }, err => {
//         console.log(err, 1)
//         return new _promise((res, rej) => {
//             rej('hello world err')
//         })
//     })
//     .then(res => {
//         console.log(res, '--')
//     })
//     .catch(err => {
//         console.log(err, 'err')
//     })

// _promise.all(arr).then(res => {
//     console.log(res, '888888')
// })

// let person = new Object()

// for (const key in person) {
//     console.log(key)
// }
// Object.defineProperty(person, 'name', {
//     configurable: true,
//     // value: 'liwuzhou',
//     get() {
//         return 'hello world'
//     },
//     set(...args) {
//         console.log(...args)
//         console.log(this)
//         return 'hello world'
//         // return target[key] = value
//     },
//     enumerable: true,
//     // writable: true,
// })

let arr = [undefined, null];
console.log(arr.toString());

/** 如果数组中一项是undefined null 的话 在使用toString join 等方法的时候 会转换成空 "" */
let pattern; /** 以后使用这个进行正则命名 */
/** 使用基本包装类型的时候 一定不要使用type of 会返回 object,而且转为boolean 的时候 全是 true  */
console.log(typeof new String(""));
/** toFixed使用来处理数字的，parseInt,parseFloat处理字符串的  */
let stringValue = "loarm ipsum doclor sit amet , consectetur adipisicingw edit";
let position = [];
let posIndex = stringValue.indexOf("e");
while (posIndex !== -1) {
    position.push(posIndex);
    posIndex = stringValue.indexOf("e", posIndex + 1);
}
console.log(position);
/** 利用while 循环出所用包括e的地方 */
/** 利用 encodeURI encodeURIComponent 处理url */

/**
 * 返回一定范围的随机数值
 * @param {Number} lowerVal 初始值
 * @param {Number} upperVal 结束值
 */
function seleForm(lowerVal, upperVal) {
    let range = upperVal - lowerVal + 1;
    return Math.floor(Math.random() * range + 1);
}

Math.ceil(); /** 向上取舍 */
Math.floor(); /** 向下取舍 */
Math.round(); /** 四舍五入 */

/** 这两种的配置 只能同时存在一个   */
let object_ = {};
Object.defineProperty(object_, "name", {
    configurable: true,
    enumerable: true,
    value: "hello",
    writable: true,
});

Object.defineProperty(object_, "age", {
    get() {
        return "23";
    },
    set() {
        return "23";
    },
    configurable: true,
    enumerable: true,
});

/** Object.getPrototypeOf();  获取当前对象的原型对象 */
/** hasOwnProperty() 判断对象上是否存在当前属性 */

/**
 * 判断实例对象的原型上是否存在当前属性
 * @param {Object} object
 * @param {String} name
 */
function hasProtoProperty(object, name) {
    return !object.hasProtoProperty(name) && name in object;
}

/** Object.getOwnPropertyNames() 无论当前实例的属性是否可枚举 都可以得到 */
/**
 * 可以利用动态原型 构造对象
 * if(){
 *   object.prototype.change = function (){ }
 * }
 */

/**
 * 经典继承
 */
function SuperType(name) {
    this.name = name;
    this.callbacks = [];
}
SuperType.prototype.change = function () {
    console.log("change");
};
function Type(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

let F = function () {};
F.prototype = SuperType.prototype;
let target = new F();

Type.prototype = target;
Type.prototype.constructor = Type;
Type.prototype.handleClick = function () {
    console.log("handleClick");
};

console.log(new Type("liwuzhou", 23));

/**
 * 闭包产生的终极原因是因为变量对象的存在
 */

let funcObject = {
    name: "liwuzhou",
    change() {
        let that = this;
        return function () {
            console.log(that.name);
        };
    },
};

let currentFunc = funcObject.change();
let func = {
    name: "hippo",
    change: currentFunc.bind(this),
};

func.change();
location.hash; //返回url中的hash
location.search; // url中的参数
location.host; // 返回服务器地址 也就是ip
location.hostname; // 返回不带端口的服务器地址
location.pathname; // 返回url中目录名和文件名
location.port; // 返回端口
location.href; // 返回url
/** location.reload(true); 从服务器中读取文件 如果不加的话可能从缓存中读取 */
/** history.length===0  来判断是否是用户打开的第一个页面 */
/**
 * input 和 textarea 中都有select的方法
 * 提交表单可以使用input type='image' 按钮进行提交
 * autofocus   size控制input的长度
 *
 */
