import { VNodeFlags, ChildrenFlags } from '@/minVue/flag'
import { isArray, isFunction, isObject, isString } from 'lodash'

// export interface VNode {
// 	// _isVNode 属性在上文中没有提到，它是一个始终为 true 的值，有了它，我们就可以判断一个对象是否是 VNode 对象
// 	_isVNode: true
// 	// el 属性在上文中也没有提到，当一个 VNode 被渲染为真实 DOM 之后，el 属性的值会引用该真实DOM
// 	el: Element | null
// 	flags: VNodeFlags
// 	tag: string | FunctionalComponent | ComponentClass | null
// 	data: VNodeData | null
// 	children: VNodeChildren
// 	childFlags: ChildrenFlags
// }

interface ComponentClassImp {
    new (): ComponentClass
}

interface ComponentClass {
    render(): VNode
    [prop: string]: any
}

type Tag = string | Function | ComponentClassImp | null | Symbol
export interface VNode {
    _isVNode: true
    el: Element | null
    flags: VNodeFlags
    tag: Tag
    data: VNodeData | null
    children: VNode[] | null | string | VNode
    childFlags: ChildrenFlags
    key?: string
}
export interface VNodeData {
    [props: string]: any
}

export interface VElement extends HTMLElement {
    vnode?: VNode
}
window.onload =
    window.onload ||
    function () {
        const container = document.createElement('div')

        document.body.appendChild(container)

        function render(vnode: VNode, container: VElement) {
            const preVNode = container.vnode
            // if (vnode) {
            //     if (preVNode) {
            //         // patch
            //     } else {
            //         // mount
            //     }
            // } else {
            //     // remove
            // }
            if(preVNode){
                if(vnode){
                    
                }
            }else{
                
            }
            // mountElement(instance.$vnode, container)
        }

        function mountElement(vnode: VNode, container: VElement) {
            // 创建元素
            const el = document.createElement(vnode.tag as string)
            // 将元素添加到容器
            container.appendChild(el)
        }
        const Fragment = Symbol()
        const Portal = Symbol()
        function h(
            tag: Tag,
            data: VNodeData | null = null,
            children: VNode[] | null | string | VNode = null
        ): VNode {
            let flag
            if (isString(tag)) {
                flag =
                    tag === 'svg'
                        ? VNodeFlags.ELEMENT_SVG
                        : VNodeFlags.ELEMENT_HTML
            } else if (tag === Fragment) {
                flag = VNodeFlags.FRAGMENT
            } else if (tag === Portal) {
                flag = VNodeFlags.PORTAL
            } else if (isFunction(tag)) {
                flag = tag.prototype.render
                    ? VNodeFlags.COMPONENT_STATEFUL
                    : VNodeFlags.COMPONENT_FUNCTIONAL
            } else {
                throw new Error('xixi ')
            }

            let childFlags = null
            if (isArray(children)) {
                const { length } = children
                if (length === 0) {
                    childFlags = ChildrenFlags.NO_CHILDREN
                    children = null
                } else if (length === 1) {
                    childFlags = ChildrenFlags.SINGLE_VNODE
                    children = children[0]
                } else {
                    childFlags = ChildrenFlags.KEYED_VNODES
                    children = normalizeVNodes(children)
                }
            } else if (children === null) {
                childFlags = ChildrenFlags.NO_CHILDREN
            } else if ((children as VNode)._isVNode) {
                childFlags = ChildrenFlags.SINGLE_VNODE
            } else {
                childFlags = ChildrenFlags.SINGLE_VNODE
                children = createTextVNode(children + '')
            }
            return {
                _isVNode: true,
                // flags 是 VNodeFlags.TEXT
                flags: flag,
                tag,
                data,
                // 纯文本类型的 VNode，其 children 属性存储的是与之相符的文本内容
                children,
                // 文本节点没有子节点
                childFlags,
                el: null,
            }
        }

        class Component {
            render() {
                throw '组件缺少 render 函数'
            }
        }

        function normalizeVNodes(children: VNode[]): VNode[] {
            const result = []
            for (let i = 0; i < children.length; i++) {
                const child = children[i]
                !child.key ? (child.key = '|' + i) : child.key
                result.push(child)
            }
            return result
        }

        function createTextVNode(text: string): VNode {
            return {
                _isVNode: true,
                // flags 是 VNodeFlags.TEXT
                flags: VNodeFlags.TEXT,
                tag: null,
                data: null,
                // 纯文本类型的 VNode，其 children 属性存储的是与之相符的文本内容
                children: text,
                // 文本节点没有子节点
                childFlags: ChildrenFlags.NO_CHILDREN,
                el: null,
            }
        }

        const fragmentVNode = h(Fragment, {}, [h('h1'), h('h1')])

        console.log(fragmentVNode)
    }
