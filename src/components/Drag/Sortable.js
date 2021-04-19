import { expando } from './utils'
import AnimationStateManager from './Animation'

/**
 * @class  Sortable
 * @param  {HTMLElement}  el
 * @param  {Object}       [options]
 */
function Sortable(el, options) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
        throw `${Object.prototype.toString.call(el)}`
    }

    this.el = el /* 根节点 */
    this.options = options = Object.assign({}, options) /* 浅拷贝 */
    el[expando] = this /* 将this挂载到el 双向引用 */
    const slice = [].slice
    this.animationManager = new AnimationStateManager({
        animation: 200,
        el: this.el,
    })
    let dragEl, nextEl
    slice.call(el.children).forEach(function (itemEl) {
        itemEl.draggable = true
    })
    const _dragover = event => {
        event.preventDefault()
        //   console.log(event)
        // console.log(event.dataTransfer.getData('data-index'))
        event.dataTransfer.dropEffect = 'move'
        const target = event.target
        if (target && target !== dragEl && target.nodeName === 'LI') {
            // console.log(target)
            // console.log(target, 'target')
            // console.log(target.nextSibling, 'nextSibling')
            // 获取当前拖拽底下的元素 rect
            const rect = target.getBoundingClientRect()
            // console.log(rect)
            // 当前鼠标具体浏览器顶部的距离
            // console.log(event.clientY)
            const isNext =
                (event.clientY - rect.top) / (rect.bottom - rect.top) > 0.5
          
            this.animationManager.captureAnimationState()
            
            this.el.insertBefore(
                dragEl,
                (isNext && target) || target.nextSibling
            )
            this.animationManager.animateAll()
        
        }
    }

    const _dragend = event => {
        event.preventDefault()
        this.el.removeEventListener('dragover', _dragover)
        this.el.removeEventListener('dragend', _dragend)
        dragEl.style.opacity = 1
        if (dragEl.nextSibling !== nextEl) {
            this.options.onUpdate()
        }
    }

    this.el.addEventListener('dragstart', event => {
        // event.preventDefault()
        // 利用冒泡机制捕获dragEl
        dragEl = event.target
        // console.log(event.type)
        nextEl = dragEl.nextSibling
        event.dataTransfer.effectAllowed = 'move'
        // event.dataTransfer.setData('data-index', 999)
        this.el.addEventListener('dragover', _dragover, false)
        this.el.addEventListener('dragend', _dragend, false)
        dragEl.style.opacity = 0.3
    })
}
export function randomColor() {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgb(${r},${g},${b})`
}
export default Sortable
