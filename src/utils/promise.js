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

/**
 * 在事件执行之前注册监听事件！！ 比如xhr，script，link。
 */

/**
 * Ajax
 * 1.open方法只是启动一个xhr并不会发送请求，三个参数（method，URL，是否异步）
 * 而且url可以指定相对路径
 * 2.send方法接受一个参数，请求主体要发送的数据，由于不同浏览器兼容性的问题，所以必须传null。
 * 返回参数说明：
 *  responseText 作为响应返回的文本
 *  status 响应的状态码
 *  statusText http状态码的说明
 */

/**
 * xhr本身的readyState属性
 * 0 代表未调用open
 * 1 已经调用 open 但是没有调用 send
 * 2 已经调用send 但是并未收到响应
 * 3 已经收到部分响应数据
 * 4 已经收到全部数据的响应 而且可以在客户端进行使用
 *
 * readyState 对应的监听方法为readystatechange事件 通常只对 3 4 感兴趣
 * 并且建议不要在readyStateChange中使用this 可能会发生错误
 *
 */

/**
 *  abort() 终止xhr请求  终止请求之后不允许访问任何与响应有关的对象属性 建议解除当前xhr的引用 设置成null
 */

/**
 * 可以使用setRequestHeader方法设置自定义请求头部信息 两个参数 [ 头部字段 头部字段值 （key value）]
 * 使用getRequestHeader()方法传入头部字段名称，可以获取响应的头部信息
 * getAllRequestHeader()方法可以获取所有包含头部信息的长字符串
 */

/**
 * GET请求
 * get请求经常出现的问题，就是查询字符串格式问题，利用encodeURIComponent()方法可以解决
 * 通常发送相同的数据，get比post快2倍
 */
/**
 * POST请求
 * 如果要模仿表单提交的话首先将content-type设置成application/x-www-form-urlencoded格式
 * 也就是表单提交时的内容格式
 */

/**
 * FormData
 * 主要作用是为了序列化表单以及创建表单格式相同的数据
 * new FormData({name:'liwuzhou'}) 反正可以在构造函数中添加键值对
 * append方法 添加键值对
 */
/**
 * xhr 超时设定
 * timeout 表示请求在等待响应多少毫秒之后终止
 * 可以监听的方法 ontimeout 建议使用timeout试试
 * 边界问题！！ 如果将timeout设置为1000毫秒，意味着请求在1秒钟之后会自动终止，但是 但是readystate可能已经为4
 * 这意味着可能会调用readystatechange事件，但并不访问xhr的status属性会报错 所以建议将访问status 封装
 * 早try- catch中
 */

/**
 *
 * loadstart事件 在接收响应数据的第一个字节时触发
 * error 事件 在请求发生错误的时候触发
 * abort 事件 调用abort方法而终止连接时触发
 * load 事件 接收到完整的响应数据时触发 一定要检查返回的状态码
 * loadend 事件 在通信完成error abort load事件 后触发
 *
 * 注意所有的请求都是从loadstart 事件开始触发
 */

/**
 * progress事件 进度条事件
 * 描述：这个事件会在浏览器接受新数据期间不断的触发
 * 其中的event对象有三个属性
 * 1.lengthComputable 表示进度条事件是否可用
 * 2.position 表示已经接收的字节数
 * 3.totalSize 表示根据content-length响应头部确定的预期字节数 如果有的话
 */

/**
 *
 * 跨域请求 cors
 * 背后的思想 使用自定义的http头部与服务器进行沟通 以判断服务端是否要进行响应
 * 在发送请求的时候会带上origin头部 会携带请求页面的源信息 协议 域名 端口
 * 如果服务端认为请求可以接受，就在access-control-allow-origin 发回相同的源信息
 * 如果返回的源信息不匹配，浏览器就会驳回请求
 * ！！！跨域请求并不能设置cookie
 */

/**
 * freflighted reqeusts 透明服务器验证机制
 * 什么情况下会出现options请求呢？
 * 1.请求的方法并不是get post head
 * 2.post请求content-type并非application/x-www-form-urlencoded， multipart/form-data ，
 * text/plain
 * 3.请求出现自定义头部
 *
 * options请求的头部
 * 1.origin
 * 2.access-control-request-method 请求自身的方法
 * 3.access-control-request-headers 自定义头部 多个头部用逗号隔开
 * options响应的头部
 * 1.access-control-allow-origin
 * 2.access-control-allow-method 允许的方法 多个用逗号隔开
 * 3.access-control-allow-headers 允许的头部 多个头部用逗号隔开
 * 4.access-control-Max-age 将这个请求缓存的时间
 */

/**
 * 带凭证的跨域请求
 * 首先一般情况下 跨域请求是不能携带凭证的（cookie http认证及客户端的ssl证明）
 * 可以将withcredentials属性设置为true 可以指定某个请求可以携带凭证
 *
 * 如果服务端接收的凭证的跨域请求会用一下http头部进行响应
 * access-control-allow-credentials：true
 *
 * 边界情况！！
 * 1.如果发送的携带凭证的跨域请求，但是服务端并未响应这个access-control-allow-credentials头部，那么
 * 浏览器就不会将响应交给用户，而是将responseText设置为空字符串，status设置为0 并且会调用error事件处理
 * 2.服务器允许options请求的响应中携带这个头部，代表允许源请求发送携带凭证的请求
 */

/**
 * 其他的跨域技术
 * 1.图片 利用onload 和 onerror 处理事件程序 但是也只是发送get 并不能访问服务器的响应文本
 * 2.jsonp 利用动态脚本 注意将本只有嵌入文档中才会进行下载哦
 * 缺点 并不能处理失败事件 处理失败很费劲 虽然实现了onerror事件
 */

/**
 * Conmet 服务端推送事件
 * 长轮询：就是先发送一个请求然后服务端等待数据更新之后会响应数据
 * 短轮询：不间断的发送请求返回响应
 * http流：整个页面的生命周期只有一个http连接
 * 原理还是监听readystatechange事件 因为这样的话 readystae 周期性的为3
 */

/**
 *
 * websocket 会发送很少量的数据不会出现http那样的开销
 * 构造函数中的url必须是绝对URL
 *
 * 其中也有状态readystate
 * 0 表示正在建立链接
 * 1 已经建立链接
 * 2 正在关闭链接
 * 3 已经关闭链接
 *
 * 注意 执行close事件之后，readystate会马上变为2 当完全关闭的时候会变成3
 * ws 只能发送纯文本 所以发送数据要使用json stringfiy方法
 * close方法的event事件包含 wasclean code reason
 * wasclean 表示是否明确的关闭了ws
 * code表示后端返回的状态码
 * reason 代表后端返回的文本 可以看看有什莫
 */

/**
 * 安全
 * 注意检查来源url并不可信 这是可以进行伪造的！！
 */
