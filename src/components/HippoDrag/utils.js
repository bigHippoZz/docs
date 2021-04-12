// 事件模式
const captureMode = {
  capture: false,
  passive: false,
};

/**
 * 注册事件
 * @param {HTMLElement} el
 * @param {string} event
 * @param {export function} func
 */
export function on(el, event, func) {
  el.addEventListener(event, func);
}

export function off(el, event, func) {
  el.removeEventListener(event, func);
}

/**
 * 判断当前的选择器是否能选择当前的元素
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/matches
 * @param {HTMLElement} el
 * @param {*} selector
 * @returns
 */
export function matches(el, selector) {
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
 * closest(children[i], options.draggable, el, false)
 * @param {HTMLElement} el
 * @param {string} selector
 * @param {HTMLElement} ctx
 * @param {*} includeCtx
 */
export function closest(el, selector, ctx, includeCtx) {
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
  // 以此判断 el prop value 是不是 void 0
  const style = el && el.style;
  if (!style) {
    return;
  }
  // 知识点 undefined === void 0
  if (value === void 0) {
    // window代表当前浏览器打开的窗口
    // document代表整个HTML文档
    // 我们可以通过使用 getComputedStyle 读取样式，通过 element.style 修改样式。
    /**
     * @see {@link https://www.runoob.com/w3cnote/window-getcomputedstyle-method.html}
     *
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
      value = document.defaultView.getComputedStyle(el);
      // getComputedStyle 读取的样式是最终样式，包括了内联样式、嵌入样式和外部样式。
    } else if (el.currentStyle) {
      value = el.currentStyle;
    }
    // 如果prop为空就返回所有的样式
    return prop === void 0 ? value : value[prop];
  } else {
    // set
    if (!(prop in style) && prop.indexOf("webkit") === -1) {
      prop = "-webkit-" + prop;
    }
    style[prop] = value + (typeof value === "string" ? "" : "px");
  }
}

export function matrix(el, selfOnly) {
  let appliedTransforms = "";
  if (typeof el === "string") {
    appliedTransforms = el;
  } else {
    do {
      let transform = css(el, "transform");
      console.log(transform);
      if (transform && transform !== "none") {
        appliedTransforms = transform + " " + appliedTransforms;
      }
    } while (!selfOnly && (el = el.parentNode));
  }
  const matrixFn =
    window.DOMMatrix ||
    window.WebKitCSSMatrix ||
    window.CSSMatrix ||
    window.MSCSSMatrix;

  return matrixFn && new matrixFn(appliedTransforms);
}

/**
 *
 * @param {HTMLElement} ctx
 * @param {string} tagName
 * @param {*} iterator
 * @returns
 */
export function find(ctx, tagName, iterator) {
  // 大体意思 传入el 判断有没有回调，有的话进行遍历，没有则返回 el的 getElementsByTagName 的
  // 集合
  if (!ctx) {
    return [];
  }
  let list = ctx.getElementsByTagName(tagName),
    i = 0,
    n = list.length;
  if (iterator) {
    for (; i < n; i++) {
      iterator(list, list[i], i);
    }
  }
  return list;
}

// 获取滚动元素
export function getWindowScrollingElement() {
  /**
   * @see {@link https://blog.csdn.net/suolong914/article/details/87971172}
   */
  // document.scrollingElement 获取当前滚动元素
  let scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    return scrollingElement;
  } else {
    // document.documentElement 获取根元素
    // document.body 获取body
    return document.documentElement;
  }
}
/**
 * 返回指定元素的rect returns the bounding client rect of given element
 * @param {HTMLElement} el
 * @param {boolean} relativeToContainingBlock rect是否应相对于（包括）容器的容纳块
 * @param {boolean} relativeToNonStaticParent 文本是否应相对于（包括）容器的相对父对象
 * @param {boolean} undoScale 容器的scale（）是否应撤消 wether the container‘s scale() should be undone
 * @param {HTMLElement} container 元素将放置在的父元素中
 * @returns {object}
 */
export function getRect(
  el,
  relativeToContainingBlock,
  relativeToNonStaticParent,
  undoScale,
  container
) {
  if (!el.getBoundingClientRect && el !== window) return;

  let elRect, top, left, bottom, right, height, width;

  if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }

  if (
    (relativeToContainingBlock || relativeToNonStaticParent) &&
    el !== window
  ) {
    // Adjust for translate()
    container = container || el.parentNode;

    // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
    // Not needed on <= IE11

    do {
      if (
        container &&
        container.getBoundingClientRect &&
        (css(container, "transform") !== "none" ||
          (relativeToNonStaticParent &&
            css(container, "position") !== "static"))
      ) {
        let containerRect = container.getBoundingClientRect();

        // Set relative to edges of padding box of container
        top -= containerRect.top + parseInt(css(container, "border-top-width"));
        left -=
          containerRect.left + parseInt(css(container, "border-left-width"));
        bottom = top + elRect.height;
        right = left + elRect.width;

        break;
      }
      /* jshint boss:true */
    } while ((container = container.parentNode));
  }

  if (undoScale && el !== window) {
    // Adjust for scale()
    let elMatrix = matrix(container || el),
      scaleX = elMatrix && elMatrix.a,
      scaleY = elMatrix && elMatrix.d;

    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;

      width /= scaleX;
      height /= scaleY;

      bottom = top + height;
      right = left + width;
    }
  }

  return {
    top: top,
    left: left,
    bottom: bottom,
    right: right,
    width: width,
    height: height,
  };
}

/**
 * 获取有滚动效果的父元素
 * @param {HTMLElement} el
 * @param {boolean} includeSelf
 * @returns
 */
export function getParentAutoScrollElement(el, includeSelf) {
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();

  let elem = el;
  let gotSelf = false;

  do {
    if (
      elem.clientWidth < elem.scrollWidth ||
      elem.clientHeight < el.scrollHeight
    ) {
      // 获取一次进行缓存
      let elemCSS = css(elem);

      if (
        (elem.clientWidth < elem.scrollWidth &&
          (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll")) ||
        (elem.clientHeight < elem.scrollHeight &&
          (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll"))
      ) {
        if (!elem.getBoundingClientRect || elem === document.body) {
          return getWindowScrollingElement();
        }
        if (includeSelf || gotSelf) {
          return elem;
        }
        gotSelf = true;
      }
    }
  } while ((elem = elem.parentNode));
  return getWindowScrollingElement();
}

export function isScrolledPast(el, elSide, parentSide) {
  let parent = getParentAutoScrollElement(el, true),
    elSideVal = getRect(el)[elSide];

  while (parent) {
    let parentSideVal = getRect(parent)[parentSide],
      visible;
    if (parentSide === "top" || parentSide === "left") {
      visible = elSideVal >= parentSideVal;
    } else {
      visible = elSideVal <= parentSideVal;
    }
    if (!visible) {
      return parent;
    }
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }
  return false;
}

export function getChild(el, childNum, options) {
  let currentChild = 0,
    i = 0,
    children = el.children;

  while (i < children.length) {
    if (
      children[i].style.display !== "none" &&
      // children[i] !== Sortable.ghost &&
      // children[i] !== Sortable.dragged &&
      closest(children[i], options.draggable, el, false)
    ) {
      if (currentChild === childNum) {
        return children[i];
      }
      currentChild++;
    }
    i++;
  }
  return null;
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} selector
 */
export function lastChild(el, selector) {
  let last = el.lastElementChild;
  while (
    last &&
    // last === Sortable.ghost ||
    (css(last, "display") === "none" || (selector && !matches(last, selector)))
  ) {
    last = last.previousElementSibling;
  }
  return last || null;
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} selector
 * @returns
 */
export function index(el, selector) {
  let index = 0;
  if (!el || !el.parentNode) {
    return -1;
  }

  while ((el = el.previousElementSibling)) {
    // && el !== Sortable.clone
    if (
      el.nodeName.toUpperCase() !== "TEMPLATE" &&
      (!selector || matches(el, selector))
    ) {
      index++;
    }
  }
  return index;
}

export function getRelativeScrollOffset(el) {
  let offsetLeft = 0,
    offsetTop = 0,
    winScroller = getWindowScrollingElement();

  if (el) {
    do {
      let elMatrix = matrix(el),
        scaleX = elMatrix.a,
        scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }
  return [offsetLeft, offsetTop];
}

/**
 *
 * @param {Array} arr
 * @param {Object} obj
 */
export function indexOfObject(arr, obj) {
  for (let i in arr) {
    if (!arr.hasOwnProperty(i)) {
      continue;
    }
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) {
        return Number(i);
      }
    }
  }
  return -1;
}

export function extend(dst, src) {
  if (dst && src) {
    for (let key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }
  return dst;
}

export function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}

let _throttleTimeout;

export function _throttle(callBack, ms) {
  return function () {
    let _this = this;
    let args = arguments;
    if (!_throttleTimeout) {
      if (args.length === 1) {
        callBack.call(_this, args[0]);
      } else {
        callBack.apply(_this, args);
      }
      _throttleTimeout = setTimeout(() => {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}

export function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}

export function clone(el) {
  let Polymer = window.Polymer;
  let $ = window.jQuery || window.Zepto;

  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}

export function isRectEqual(rect1, rect2) {
  return (
    Math.round(rect1.top) === Math.round(rect2.top) &&
    Math.round(rect1.left) === Math.round(rect2.left) &&
    Math.round(rect1.height) === Math.round(rect2.height) &&
    Math.round(rect1.width) === Math.round(rect2.width)
  );
}

export function setRect(el, rect) {
  css(el, "position", "absolute");
  css(el, "top", rect.top);
  css(el, "left", rect.left);
  css(el, "width", rect.width);
  css(el, "height", rect.height);
}

export function unsetRect(el) {
  css(el, "position", "");
  css(el, "top", "");
  css(el, "left", "");
  css(el, "width", "");
  css(el, "height", "");
}

export const expando = "Sortable" + new Date().getTime();
