// 事件模式
const captureMode = {
  capture: false,
  passive: false,
};

/**
 * 注册事件
 * @param {HTMLElement} el
 * @param {string} event
 * @param {function} func
 */
function on(el, event, func) {
  el.addEventListener(event, func);
}

function off(el, event, func) {
  el.removeEventListener(event, func);
}

/**
 * 判断当前的选择器是否能选择当前的元素
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/matches
 * @param {HTMLElement} el
 * @param {*} selector
 * @returns
 */
function matches(el, selector) {
  if (!selector) return;
  // 判断是不是 ">" 开头，如果是的话将 ">" 进行截取
  selector[0] === ">" && (selector = selector.substring(1));

  // 可以进行重构
  try {
    if (el.matches) {
      return el.matches(selector);
    } else if (el.msMatchesSelector) {
      return el.msMatchesSelector(selector);
    } else if (el.webkitMatchesSelector(selector)) {
      return el.webkitMatchesSelector(selector);
    }
  } catch (error) {
    console.log(error.stack);
    return false;
  }
  // 当前没有可以进行匹配的函数
  return false;
}

/**
 * 暂时不清楚是干嘛
 * @param {HTMLElement} el
 */
export function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType
    ? el.host
    : el.parentNode;
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} selector
 * @param {HTMLElement} ctx
 * @param {*} includeCtx
 */
function closest(el, selector, ctx, includeCtx) {
  if (el) {
    ctx = ctx || document;

    do {
      if (
        (selector != null &&
          (selector[0] === ">"
            ? el.parentNode === ctx && matches(el, selector)
            : match(el, selector))) ||
        (includeCtx && el === ctx)
      ) {
        return el;
      }
      if (el === ctx) break;

      // 在while循环条件中变更数据
    } while ((el = getParentOrHost(el)));
  }
  return null;
}

// 匹配空格
const R_SPACE = /\s+/g;

/**
 *
 * @param {HTMLElement} el
 * @param {string} name
 * @param {boolean} state
 */
export function tiggerClass(el, name, state) {
  if (el && name) {
    // 判断有没有classList
    if (el.classList) {
      // if (false) {
      el.classList[state ? "add" : "remove"](name);
    } else {
      let className = (" " + el.className + " ")
        .replace(R_SPACE, " ")
        .replace(" " + name + " ", " ");
      // 兼容代码处理的步骤
      // 1. "el-form   test"   2." el-form test  " 3." el-form "
      // console.log(el.className);
      // console.log(`${el.className}`.replace(R_SPACE, " "));
      // console.log(
      //   (" " + el.className + " ")
      //     .replace(R_SPACE, " ")
      //     .replace(" " + "test" + " ", " ")
      // );
      el.className = (className + (state ? " " + name : "")).replace(
        R_SPACE,
        " "
      );
    }
  }
}
/**
 * 获取 更改元素css样式
 * @param {HTMLElement} el 
 * @param {string} prop 
 * @param {*} value 
 */
export function css(el, prop, value) {
  console.log(arguments);
  // 以此判断 el prop value 是不是 void 0
  const style = el && el.style
  if (!style) {
    return
  }
  // 知识点 undefined === void 0
  if (value === void 0) {
    // window代表当前浏览器打开的窗口 
    // document代表整个HTML文档
    // 我们可以通过使用 getComputedStyle 读取样式，通过 element.style 修改样式。
    /**
     * https://www.runoob.com/w3cnote/window-getcomputedstyle-method.html
     * 在许多在线的演示代码中, getComputedStyle 是通过 document.defaultView 对象
     * 来调用的。大部分情况下，这是不需要的， 因为可以直接通过 window 对象调用。
     * 但有一种情况，你必需要使用 defaultView, 那是在 Firefox 3.6 
     * 上访问子框架内的样式 (iframe)。
     * 而且除了在 IE8 浏览器中 document.defaultView === window 返回的是 false 外
     * 其他的浏览器（包括 IE9 ）返回的都是 true。
     * 所以后面直接使用 window 就好，不用在输入那么长的代码了。
     * 
     */
    // get
    if (document.defaultView && document.defaultView.getComputedStyle) {
      // 当参数为空的时候 可以进行利用
      value = document.defaultView.getComputedStyle(el)
      // getComputedStyle 读取的样式是最终样式，包括了内联样式、嵌入样式和外部样式。
    } else if (el.currentStyle) {
      value = el.currentStyle
    }
    // 如果prop为空就返回所有的样式
    return prop === void 0 ? value : value[prop]
  } else {
    // set
    if (!(prop in style) && prop.indexOf('webkit') === -1) {
      prop = '-webkit-' + prop
    }
    style[prop] = value + (typeof value === 'string' ? '' : 'px')
  }
}


export function matrix(el, selfOnly) {
  let appliedTransforms = ''
  if (typeof el === 'string') {
    appliedTransforms = el
  } else {
    do {
      let transform = css(el, 'transform')
      if (transform && transform !== 'none') {
        appliedTransforms = transform + " " + appliedTransforms
      }
    } while (!selfOnly && (el = el.parentNode));
  }
  const matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix

  return matrixFn && (new matrixFn(appliedTransforms))

}

/**
 * 
 * @param {HTMLElement} ctx 
 * @param {string} tagName 
 * @param {*} iterator 
 * @returns 
 */
function find(ctx, tagName, iterator) {
  // 大体意思 传入el 判断有没有回调，有的话进行遍历，没有则返回 el的 getElementsByTagName 的
  // 集合
  if (!ctx) {
    return []
  }
  let list = ctx.getElementsByTagName(tagName),
    i = 0,
    n = list.length
  if (iterator) {
    for (; i < n; i++) {
      iterator(list, list[i], i)
    }
  }
  return list
}


// 获取滚动元素
function getWindowScrollingElement() {
  // https://blog.csdn.net/suolong914/article/details/87971172
  // document.scrollingElement 获取当前滚动元素
  let scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    return scrollingElement
  } else {
    // document.documentElement 获取根元素
    // document.body 获取body
    return document.documentElement
  }
}