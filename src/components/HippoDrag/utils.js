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

// function css(el, prop, value) {
//   console.log(arguments);
// }
