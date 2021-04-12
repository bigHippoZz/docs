import { getRect, css, matrix, isRectEqual, indexOfObject } from "./utils";

export default function animationStateManager() {
  let animationStates = [];
  let animationCallbackId;
  return {
    captureAnimationState() {
      // 重置animationStates状态
      animationStates = [];
      if (!this.options.animation) return;
      let children = [].slice.call(this.el.children);
      children.forEach((child) => {
        if (css(child, "display") === "none") {
          return;
        }
        // 给animationStates 添加 Rect
        animationStates.push({
          target: child,
          rect: getRect(child),
        });

        let fromRect = animationStates[animationStates.length - 1].rect;
        // 补偿动画
        if (child.thisAnimationDuration) {
          let childMatrix = matrix(child, true);
          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }
        // 同时给child 添加 fromRect
        child.fromRect = fromRect;
      });
    },

    addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState(target) {
      // 这地方可以简化的
      animationStates.splice(indexOfObject(animationStates, { target }), 1);
    },

    animateAll(callBack) {
      // 开始执行动画 判断是否开启动画
      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callBack === "function") callBack();
        return;
      }
      let animating = false,
        animationTime = 0;
      animationStates.forEach((state) => {
        let time = 0,
          target = state.target,
          fromRect = target.fromRect,
          toRect = getRect(target),
          prevFromRect = target.prevFromRect,
          prevToRect = target.prevToRect,
          animatingRect = state.rect,
          targetMatrix = matrix(target, true);
      });

      if (targetMark) {
        toRect.top -= targetMatrix.f;
        toRect.left -= targetMatrix.e;
      }
	  
      target.toRect = toRect;






    },
    animate(target, currentRect, toRect, duration) {
      if (duration) {
        // 初始化
        css(target, "transition", "");
        css(target, "transform", "");
        // 获取父元素的 matrix 或者更高层级
        let elMatrix = matrix(this.el),
          scaleX = elMatrix && elMatrix.a,
          scaleY = elMatrix && elMatrix.d,
          translateX = (currentRect.left - toRect.left) / (scaleX || 1),
          translateY = (currentRect.top - toRect.top) / (scaleY || 1);

        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(
          target,
          "transform",
          `translate3d(${translateX}px,${translateY}px,0)`
        );

        // 获取元素的实际长度  重绘!!
        this.forRepaintDummy = repaint(target); // repaint

        css(
          target,
          "transition",
          `transform ${duration}ms ${
            this.options.easing ? " " + this.options.easing : ""
          }`
        );

        css(target, "transform", "translate3d(0,0,0)");
        // 清空上一次的动画计时器 animated 判断当前是否有动画执行
        typeof target.animated === "number" && clearTimeout(target.animated);

        target.animated = setTimeout(function () {
          css(target, "transition", "");
          css(target, "transform", "");
          target.animated = false;

          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    },
  };
}

function repaint(target) {
  return target.offsetWidth;
}



function calculateRealTime(animatingRect, fromRect, toRect, options) {
	return (
		(Math.sqrt(
			Math.pow(fromRect.top - animatingRect.top, 2) +
				Math.pow(fromRect.left - animatingRect.left, 2)
		) /
			Math.sqrt(
				Math.pow(fromRect.top - toRect.top, 2) +
					Math.pow(fromRect.left - toRect.left, 2)
			)) *
		options.animation
	);
}
