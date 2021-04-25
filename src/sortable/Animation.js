import { getRect, css, matrix, isRectEqual, indexOfObject } from './utils.js'

import Sortable from './Sortable.js'

export default function AnimationStateManager() {
    let animationStates = [],
        animationCallbackId

    return {
        captureAnimationState() {

            animationStates = []

            if (!this.options.animation) return

            let children = [].slice.call(this.el.children)

            children.forEach(child => {
                // 排除display none
                if (
                    css(child, 'display') === 'none' ||
                    child === Sortable.ghost
                )
                    return
                // 将当前的位置进行元素及位置进行缓存
                animationStates.push({
                    target: child,
                    rect: getRect(child),
                })

                let fromRect = {
                    ...animationStates[animationStates.length - 1].rect,
                }

                // If animating: compensate for current animation
                if (child.thisAnimationDuration) {
                    // 如果是动画：补偿当前动画
                    let childMatrix = matrix(child, true)
                    if (childMatrix) {
                        // childMatrix.f  垂直方向偏移距离  translate
                        // childMatrix.e  水平方向偏移距离  translate
                        fromRect.top -= childMatrix.f
                        fromRect.left -= childMatrix.e
                    }
                }
                // 将当前补偿之后的位置赋值Rect
                child.fromRect = fromRect
            })
        },

        addAnimationState(state) {
            animationStates.push(state)
        },

        removeAnimationState(target) {
            animationStates.splice(
                indexOfObject(animationStates, { target }),
                1
            )
        },

        animateAll(callback) {
            // 判断是否有动画
            if (!this.options.animation) {
                clearTimeout(animationCallbackId)
                if (typeof callback === 'function') callback()
                return
            }

            let animating = false,
                animationTime = 0

            animationStates.forEach(state => {
                let time = 0,
                    animatingThis = false,
                    target = state.target /* 当前元素 */,
                    fromRect = target.fromRect /* 动画开始位置 */,
                    toRect = getRect(target) /* 动画结束位置 */,
                    prevFromRect = target.prevFromRect /* 之前动画开始位置 */,
                    prevToRect = target.prevToRect /* 之前动画结束位置 */,
                    animatingRect = state.rect /* 动画开始的位置 */,
                    targetMatrix = matrix(target, true) 

                if (targetMatrix) {
                    // Compensate for current animation
				
                    toRect.top -= targetMatrix.f
                    toRect.left -= targetMatrix.e
                }

                target.toRect = toRect

                if (target.thisAnimationDuration) {
                    // Could also check if animatingRect is between fromRect and toRect
                    if (
                        isRectEqual(prevFromRect, toRect) &&
                        !isRectEqual(fromRect, toRect) &&
                        // Make sure animatingRect is on line between toRect & fromRect
                        (animatingRect.top - toRect.top) /
                            (animatingRect.left - toRect.left) ===
                            (fromRect.top - toRect.top) /
                                (fromRect.left - toRect.left)
                    ) {
                        // If returning to same place as started from animation and on same axis
                        time = calculateRealTime(
                            animatingRect,
                            prevFromRect,
                            prevToRect,
                            this.options
                        )
                    }
                }

                // if fromRect != toRect: animate
                if (!isRectEqual(toRect, fromRect)) {

                    target.prevFromRect = fromRect
                    target.prevToRect = toRect

                    if (!time) {
                        time = this.options.animation
                    }

                    this.animate(target, animatingRect, toRect, time)

                }

                if (time) {
                    animating = true
                    animationTime = Math.max(animationTime, time)
                    clearTimeout(target.animationResetTimer)
                    target.animationResetTimer = setTimeout(function () {
                        target.animationTime = 0
                        target.prevFromRect = null
                        target.fromRect = null
                        target.prevToRect = null
                        target.thisAnimationDuration = null
                    }, time)
                    target.thisAnimationDuration = time
                }
            })

            clearTimeout(animationCallbackId)

            if (!animating) {
                if (typeof callback === 'function') callback()
            } else {
                animationCallbackId = setTimeout(function () {
                    if (typeof callback === 'function') callback()
                }, animationTime)
            }
            animationStates = []
        },

        animate(target, currentRect, toRect, duration) {
            if (duration) {
                css(target, 'transition', '')
                css(target, 'transform', '')

                let elMatrix = matrix(this.el),
                    scaleX = elMatrix && elMatrix.a,
                    scaleY = elMatrix && elMatrix.d,
                    translateX =
                        (currentRect.left - toRect.left) / (scaleX || 1),
                    translateY = (currentRect.top - toRect.top) / (scaleY || 1)

                target.animatingX = !!translateX
                target.animatingY = !!translateY

                css(
                    target,
                    'transform',
                    'translate3d(' + translateX + 'px,' + translateY + 'px,0)'
                )

                // 重绘
                this.forRepaintDummy = repaint(target) // repaint

                css(
                    target,
                    'transition',
                    'transform ' +
                        duration +
                        'ms' +
                        (this.options.easing ? ' ' + this.options.easing : '')
                )

                css(target, 'transform', 'translate3d(0,0,0)')

                typeof target.animated === 'number' &&
                    clearTimeout(target.animated)
				
                target.animated = setTimeout(function () {
                    css(target, 'transition', '')
                    css(target, 'transform', '')
                    target.animated = false
                    target.animatingX = false
                    target.animatingY = false
                }, duration)

            }
        },
    }
}

function repaint(target) {
    return target.offsetWidth
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
    )
}
