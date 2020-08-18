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

/**
 * 错误处理
 */

try {
} catch (error) {
    console.log(error);
} finally {
    // 一定会执行
}
/**
 * 将错误信息上传至服务器
 * @param {String} server 上传路径
 * @param {String} msg 错误信息
 */
function logError(server, msg) {
    let img = new Image();
    img.src = `${server}?msg=${msg}`;
}
/**
 * 事件处理
 * 事件捕获 目标阶段 事件冒泡
 */

/**
 * addEventListener 最后一个参数 false 表示冒泡阶段 true 捕获阶段
 * 注意的是removeEventListener 传入的函数一定是添加事件函数的引用
 */

/**
 * 事件对象
 * currentTarget 表示事件处理程序正在处理事件的那个元素
 * 事件函数中的this 指向currentTarget那个元素
 * target 目标阶段的元素
 * preventDefault() 阻止默认事件 注意的是只有cancelable 设置为true才能进行更改
 * stopPropagetion() 阻止冒泡
 * 事件处理程序执行期间，this才会存在，一旦事件处理程序执行完成，event就会被销毁
 */

/**
 * js动态生成img的时候，添加load事件一定要在添加src之前，因为在添加src那一刻就会进行加载，
 * 并不是非要添加到文档之中
 * 通过new Image() 产生的新图像实例无法添加到文档之中
 */

/**
 * js动态生成的script 和 link 是添加到文档之中才进行下载，所以指定load事件的顺序无所谓
 */

/**
 * 指定scroll 和 resize 事件注意不能添加过大计算 建议使用 防抖函数
 */

/**
 * focus和blur事件都是不冒泡的！但是可以在捕获的时候监听到他们
 */

/**
 * click和dbclick双击事件
 * mousedown mouseleave 不会冒泡，再依次执行mousedown和mouseup之后会执行click，所以在以上其中随便一个事件
 * 中使用return false 都会导致click失效
 */

/**
 * clientX clientY 相对于视口
 * pageX pageY 相对于页面
 * screenX screenY 相对于屏幕
 */

/**
 * 再按下鼠标时键盘上的状态也能影响到所要采取的措施
 * shiftKey ctrlKey altKey metaKey 用event.shiftKey （Boolean）进行判断
 */
/**
 *
 * keydown事件在用户按下键盘上任意建时触发 而且如果按住不放的话会重复触发此事件
 * keypress 事件在用户按下键盘上的字符键，而且如果按住不放的话会重复触发此事件
 * keyup 当用户释放键盘上的键时触发 文本已经显示到文本框了
 * textinput 事件是对keypress的补充，用意时将文本显示用户之前进行拦截，在文本插入文本框之前会触发textinput
 * 事件
 * textinput事件补充 其中event对象中包含着一个data属性，这个属性的值就是用户输入的字符
 * event对象中还有一个inputMethod属性，表示文本输入文本框中的方式
 */

/**
 * contextmenu事件表示通过鼠标右键可以调处的上下文菜单 可以获取当前的event，然后自定义一个上下文菜单。
 * DOMContentLoaded 事件 文档加载完成
 */

/**
 * 可以使用事件委托来提升性能建议使用document注册各种事件
 * 注意：！！当移除dom之后，但是当前js与dom还有引用，所以当前的dom并不会被垃圾回收建议同时将 eventfunc
 * 设置为null
 */

/**
 * JSON.parse() stringfiy()
 * 第二个参数是过滤函数 第三个参数时美化代码的建议使用 4
 * 利用try catch 进行处理json报错
 */
