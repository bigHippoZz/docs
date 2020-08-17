// /**
//  * @Author Liwz
//  * @Description struct  获取url中参数对象 返回带hash参数
//  * @Date 2020-08-12 14:48:37 星期三
//  * @param {String} url 当前网址url
//  * @return {Object} 返回参数对象
//  */
// export const getURLParameters = (url = location.href) =>
//   (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
//     (a, v) => (
//       (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
//     ),
//     {}
//   );

// // EXAMPLE
/**
 * @Author Liwz
 * @Description struct  复制文本
 * @Date 2020-08-12 14:55:08 星期三
 * @param {String} str 选择复制的字符串
 * @return {Object} 指定元素
 */
export const copyToClipboard = str => {
    if (typeof str !== "string")
        throw new Error(`The currently passed string is not a string - ${str}`);
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};

// location.assign   和 location.href 作用差不多
// location.href     网页跳转到当前的url 但是会保存历史记录
// location.reload   重新加载该页面
// location.replace  替换当前的url并且历史记录中没有该记录

// 判断当前的对象是否含有key
// hasOwnProperty()

/**
 * @Author Liwz
 * @Description struct  将对象转为url的参数
 * @Date 2020-08-12 15:14:45 星期三
 * @param {String}
 * @return {Object} 指定元素
 */
export const objectToQueryString = queryParameters => {
    let isObject = target =>
        Object.prototype.toString.call(target) === "[object Object]";
    if (!isObject(queryParameters)) throw new Error("Not currently an object");
    return queryParameters
        ? Object.entries(queryParameters).reduce(
              (queryString, [key, val], index) => {
                  const symbol = queryString.length === 0 ? "?" : "&";
                  queryString +=
                      typeof val === "string" ? `${symbol}${key}=${val}` : "";
                  return queryString;
              },
              ""
          )
        : "";
};
/**
 * @Author Liwz
 * @Description struct  依次执行异步函数并且函数结果
 * @Date 2020-08-12 15:37:18 星期三
 * @param {Function[]} 异步函数集合
 * @return {Any} 指定元素
 */
export const pipeAsyncFunctions = (...fns) => arg =>
    fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

/**
 * @Author Liwz
 * @Description r4r4  利用js 多线程进行数据计算
 * @Date 2020-08-12 15:46:18 星期三
 * @param {Function}  计算函数
 * @return {Any} 指定元素
 */
export const runAsync = fn => {
    const worker = new Worker(
        URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
            type: "application/javascript; charset=utf-8",
        })
    );
    return new Promise((res, rej) => {
        worker.onmessage = ({ data }) => {
            res(data), worker.terminate();
        };
        worker.onerror = err => {
            rej(err), worker.terminate();
        };
    });
};

export const isAsyncFunction = val =>
    Object.prototype.toString.call(val) === "[object AsyncFunction]";
/**
 * @Author Liwz
 * @Description struct  创建对象hash
 * @Date 2020-08-12 16:10:07 星期三
 * @param {Object}  目标对象
 * @return {String} 返回生成的hash
 */
const hashBrowser = val =>
    crypto.subtle
        .digest("SHA-256", new TextEncoder("utf-8").encode(val))
        .then(h => {
            let hexes = [],
                view = new DataView(h);
            for (let i = 0; i < view.byteLength; i += 4)
                hexes.push(
                    ("00000000" + view.getUint32(i).toString(16)).slice(-8)
                );
            return hexes.join("");
        });

const escapeHTML = str =>
    str.replace(
        /[&<>'"]/g,
        tag =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;",
            }[tag] || tag)
    );

/**
 * @Author Liwz
 * @Description struct  首字母大写
 * @Date 2020-08-12 16:20:06 星期三
 * @param {String}
 * @param {String}
 * @param {String}
 * @return {Object} 指定元素
 */
const capitalize = ([first, ...rest], lowerRest = false) =>
    first.toUpperCase() +
    (lowerRest ? rest.join("").toLowerCase() : rest.join(""));

/**
 * @Author Liwz
 * @Description struct  将字符串转为驼峰格式
 * @Date 2020-08-12 16:20:19 星期三
 * @param {String}
 * @return {Object} 指定元素
 */
const toCamelCase = str => {
    let s =
        str &&
        str
            .match(
                /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
            )
            .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
            .join("");
    return s.slice(0, 1).toLowerCase() + s.slice(1);
};

/**
 * @Author Liwz
 * @Description struct  创建随机UUID
 * @Date 2020-08-12 17:36:45 星期三
 * @return {String} 指定元素
 */
const UUIDGeneratorBrowser = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );

/**
 * @Author Liwz
 * @Description struct  平滑滚动到当前页面顶部
 * @Date 2020-08-12 16:27:11 星期三
 * @param {String}
 * @param {String}
 * @param {String}
 * @return {Object} 指定元素
 */
const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};

/**
 * @Author Liwz
 * @Description struct  返回当前页面的滚动位置。
 * @Date 2020-08-12 16:28:54 星期三
 * @param {Element}
 * @return {Object} 指定元素
 */
const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

/**
 * @Author Liwz
 * @Description struct  将base64的字符串转为正常字符串
 * @Date 2020-08-12 17:35:39 星期三
 * @param {String}
 * @return {Object} 指定元素
 */
const atob = str => Buffer.from(str, "base64").toString("binary");

/**
 * @Author Liwz
 * @Description struct  判断当前用户是PC还是手机
 * @Date 2020-08-12 17:34:10 星期三
 * @return {String}
 */
const detectDeviceType = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
        ? "Mobile"
        : "Desktop";
