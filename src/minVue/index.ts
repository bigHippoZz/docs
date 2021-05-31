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
    el: Node | null
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

        function mount(vnode: VNode, container: HTMLElement) {
            const { flags } = vnode
            if (flags & VNodeFlags.ELEMENT) {
                // 挂载普通标签
                mountElement(vnode, container)
            } else if (flags & VNodeFlags.TEXT) {
                mountText(vnode, container)
            } else if (flags & VNodeFlags.FRAGMENT) {
                mountFragment(vnode, container)
            } else if (flags & VNodeFlags.COMPONENT) {
                mountComponent(vnode, container)
            }

            // else if (flags & VNodeFlags.COMPONENT) {
            //   // 挂载组件
            //   mountComponent(vnode, container)
            // } else if (flags & VNodeFlags.TEXT) {
            //   // 挂载纯文本
            //   mountText(vnode, container)
            // } else if (flags & VNodeFlags.FRAGMENT) {
            //   // 挂载 Fragment
            //   mountFragment(vnode, container)
            // } else if (flags & VNodeFlags.PORTAL) {
            //   // 挂载 Portal
            //   mountPortal(vnode, container)
            // }
        }

        function render(vnode: VNode, container: VElement) {
            const preVNode = container.vnode

            if (preVNode) {
                if (vnode) {
                    patch(preVNode, vnode, container)
                    vnode.el = container
                } else {
                }
            } else {
                if (vnode) {
                    mount(vnode, container)
                    container.vnode = vnode
                }
            }
            // mountElement(instance.$vnode, container)
        }
        function normalizeStyle(val: unknown) {
            if (isArray(val)) {
                for (const key of val) {
                    normalizeStyle(isString(key) ? '' : normalizeStyle(key))
                }
            } else if (isObject(val)) {
            }
        }

        function mountComponent(vnode: VNode, container: HTMLElement) {
            // @ts-ignore
            const instance = (vnode.children = new vnode.tag())

            instance._update = function () {
                if (instance._mounted) {
                    const preVNode = instance.$vnode
                    instance.$props = vnode.data
                    const nextVNode = (instance.$vnode = instance.render())
                    patch(preVNode, nextVNode, container)
                    // @ts-ignore
                    vnode.el = instance.$el = instance.$vnode.el
                } else {
                    instance.$props = vnode.data
                    instance.$vnode = instance.render()
                    mount(instance.$vnode, container)
                    instance._mounted = true
                    instance.mounted && instance.mounted()
                    // @ts-ignore
                    vnode.el = instance.$el = instance.$vnode.el
                }
            }
            instance._update()
            // instance.$vnode = instance.render()
            // mount(instance.$vnode, container)
            // vnode.el = instance.$el = instance.$vnode.el
        }

        function mountFragment(vnode: VNode, container: HTMLElement) {
            const { childFlags, children } = vnode
            switch (childFlags) {
                case ChildrenFlags.SINGLE_VNODE:
                    mount(children as VNode, container)
                    vnode.el = (children as VNode).el
                    break
                case ChildrenFlags.KEYED_VNODES:
                    for (let i = 0; i < (children as []).length; i++) {
                        mount((children as [])[i], container)
                    }
                    // @ts-ignore
                    vnode.el = children[0].el
                    break
                case ChildrenFlags.NO_CHILDREN:
                    const placeholder = createTextVNode('')
                    mountText(placeholder, container)
                    vnode.el = placeholder.el
                default:
                    break
            }
        }
        function mountText(vnode: VNode, container: HTMLElement) {
            const textNode = document.createTextNode(vnode.children as string)
            vnode.el = textNode
            container.appendChild(textNode)
        }

        function patch(preVNode: VNode, vnode: VNode, container: HTMLElement) {
            const { flags: preFlag } = preVNode
            const { flags: nextFlag } = vnode
            if (preFlag !== nextFlag) {
                replaceVNode(preVNode, vnode, container)
            } else if (nextFlag & VNodeFlags.ELEMENT) {
                patchElement(preVNode, vnode, container)
            } else if (nextFlag & VNodeFlags.TEXT) {
                patchText(preVNode, vnode)
            } else if (nextFlag & VNodeFlags.FRAGMENT) {
                patchFragment(preVNode, vnode, container)
            } else if (nextFlag & VNodeFlags.COMPONENT) {
                patchComponent(preVNode, vnode, container)
            }
        }

        function patchComponent(
            prevVNode: VNode,
            nextVNode: VNode,
            container: HTMLElement
        ) {
            if (nextVNode.tag !== prevVNode.tag) {
                replaceVNode(prevVNode, nextVNode, container)
            } else if (nextVNode.flags & VNodeFlags.COMPONENT_STATEFUL) {
                const instance = (nextVNode.children = prevVNode.children)
                // @ts-ignore
                instance.$props = nextVNode.data
                // @ts-ignore
                instance._update()
            }
        }

        function patchFragment(
            preVNode: VNode,
            nextVNode: VNode,
            container: HTMLElement
        ) {
            patchChildren(
                preVNode.childFlags,
                nextVNode.childFlags,
                preVNode,
                nextVNode,
                container
            )

            switch (nextVNode.childFlags) {
                case ChildrenFlags.SINGLE_VNODE:
                    nextVNode.el = (nextVNode.children as VNode).el
                    break
                case ChildrenFlags.NO_CHILDREN:
                    nextVNode.el = preVNode.el
                    break
                default:
                    // @ts-ignore
                    nextVNode.el = nextVNode.children[0].el
                    break
            }
        }
        function patchText(preVNode: VNode, nextVNode: VNode) {
            const el = (nextVNode.el = preVNode.el)
            if (preVNode.children !== nextVNode.children) {
                if (el?.nodeValue) {
                    el.nodeValue = nextVNode.children as string
                }
            }
        }

        function patchData(
            el: HTMLElement,
            key: string,
            preValue: any,
            nextValue: any
        ) {
            switch (key) {
                case 'style':
                    for (const key in nextValue) {
                        // @ts-ignore
                        el.style[key] = nextValue[key]
                    }
                    for (const key in preValue) {
                        // @ts-ignore
                        if (!nextValue.hasOwnProperty(key)) {
                            // @ts-ignore
                            el.style[key] = ''
                        }
                    }
                    break
                case 'class':
                    el.className = nextValue
                default:
                    if (key.startsWith('on')) {
                        if (preValue) {
                            el.removeEventListener(key.slice(2), preValue)
                        }

                        if (nextValue) {
                            el.addEventListener(key.slice(2), nextValue)
                        }
                    } else if (domPropsRE.test(key)) {
                        // domProps
                        // @ts-ignore
                        el[key] = nextValue
                    } else {
                        // dom attr
                        el.setAttribute(key, nextValue)
                    }

                    break
            }
        }

        function patchElement(
            preVNode: VNode,
            vnode: VNode,
            container: HTMLElement
        ) {
            const { tag: preTag, data: preData } = preVNode
            const { tag: nextTag, data: nextData } = vnode

            if (preTag !== nextTag) {
                replaceVNode(preVNode, vnode, container)
                return
            }
            const el = (vnode.el = preVNode.el)
            if (nextData) {
                for (const key in nextData) {
                    const preVNodeValue = preData![key]
                    const nextVNodeValue = nextData[key]
                    patchData(
                        el as HTMLElement,
                        key,
                        preVNodeValue,
                        nextVNodeValue
                    )
                }
            }

            if (preData) {
                for (const key in preData) {
                    const preVNodeValue = preData![key]
                    if (preVNodeValue && !nextData!.hasOwnProperty(key)) {
                        patchData(el as HTMLElement, key, preVNodeValue, null)
                    }
                }
            }

            patchChildren(
                preVNode.childFlags,
                vnode.childFlags,
                preVNode.children,
                vnode.children,
                el as HTMLElement
            )
        }
        function replaceVNode(
            preVNode: VNode,
            vnode: VNode,
            container: HTMLElement
        ) {
            container.removeChild(preVNode.el!)
            if(preVNode.flags & VNodeFlags.COMPONENT_STATEFUL){
                const instance = preVNode.children
                // @ts-ignore
                instance.unMounted&&instance.unMounted()
            }
            mount(vnode, container)
        }
        const domPropsRE = /\[A-Z]|^(?:value|checked|selected|muted)$/
        function mountElement(vnode: VNode, container: VElement) {
            const { childFlags, children, data } = vnode
            // 创建元素
            const el = document.createElement(vnode.tag as string)
            // vnode 引用el
            vnode.el = el
            if (data) {
                for (const key in data) {
                    switch (key) {
                        case 'style':
                            for (const key in data.style) {
                                // @ts-ignores
                                el.style[key] = data.style[key]
                            }
                            break
                        case 'class':
                            el.className = data[key]
                            break
                        default:
                            if (key.startsWith('on')) {
                                el.addEventListener(key.slice(2), data[key])
                            } else if (domPropsRE.test(key)) {
                                // @ts-ignore
                                el[key] = data[key]
                            } else {
                                el.setAttribute(key, data[key])
                            }

                            break
                    }
                }
            }
            if (childFlags !== ChildrenFlags.NO_CHILDREN) {
                if (childFlags & ChildrenFlags.SINGLE_VNODE) {
                    mount(children as VNode, el)
                } else if (childFlags & ChildrenFlags.MULTIPLE_VNODES) {
                    for (let i = 0; i < (children as []).length; i++) {
                        mount((children as [])[i], el)
                    }
                }
            }
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

        function patchChildren(
            prevChildFlags: number,
            nextChildFlags: number,
            prevChildren: VNode[] | null | string | VNode,
            nextChildren: VNode[] | null | string | VNode,
            container: HTMLElement
        ) {
            switch (prevChildFlags) {
                case ChildrenFlags.SINGLE_VNODE:
                    switch (nextChildFlags) {
                        case ChildrenFlags.SINGLE_VNODE:
                            patch(
                                prevChildren as VNode,
                                nextChildren as VNode,
                                container
                            )
                            break
                        case ChildrenFlags.NO_CHILDREN:
                            container.removeChild((prevChildren as VNode).el!)
                            break
                        default:
                            container.removeChild((prevChildren as VNode).el!)
                            for (
                                let i = 0;
                                i < (nextChildren as []).length;
                                i++
                            ) {
                                mount((nextChildren as [])[i], container)
                            }
                            break
                    }
                    break
                case ChildrenFlags.NO_CHILDREN:
                    switch (nextChildFlags) {
                        case ChildrenFlags.SINGLE_VNODE:
                            mount(nextChildren as VNode, container)
                            break
                        case ChildrenFlags.NO_CHILDREN:
                            break
                        default:
                            for (
                                let i = 0;
                                i < (nextChildren as []).length;
                                i++
                            ) {
                                mount((nextChildren as [])[i], container)
                            }
                            break
                    }
                    break
                default:
                    switch (nextChildFlags) {
                        case ChildrenFlags.SINGLE_VNODE:
                            for (
                                let i = 0;
                                i < (prevChildren as []).length;
                                i++
                            ) {
                                container.removeChild(
                                    (prevChildren as VNode[])[i].el!
                                )
                            }
                            mount(nextChildren as VNode, container)
                            break
                        case ChildrenFlags.NO_CHILDREN:
                            for (
                                let i = 0;
                                i < (prevChildren as []).length;
                                i++
                            ) {
                                container.removeChild(
                                    (prevChildren as VNode[])[i].el!
                                )
                            }
                            break
                        default:
                            break
                    }
                    break
            }
        }

        const fragmentVNode = h(Fragment, null, [h('h1')])

        class Header extends Component {
            state = 'hello world'

            mounted() {
                setTimeout(() => {
                    this.state = 'hello bigHippo'
                    // @ts-ignore
                    this._update()
                }, 1000)
            }

            render() {
                return h(
                    'div',
                    {
                        style: {
                            height: '100px',
                            width: '100px',
                            background: 'red',
                        },
                        onclick: () => {
                            // @ts-ignore
                            console.log(this.$props.name)
                        },
                    },
                    this.state
                )
            }
        }

        class Container extends Component {
            render() {
                return h(Header, { name: 'liwuzhou' })
            }
        }

        // // 旧的 VNode
        // const prevVNode = h(Fragment, null, [
        //     h('p', null, '旧片段子节点 1'),
        //     h('p', null, '旧片段子节点 2'),
        // ])

        // // 新的 VNode
        // const nextVNode = h(Fragment, null, [
        //     h('p', null, '新片段子节点 1'),
        //     h('p', null, '新片段子节点 2'),
        // ])

        render(h(Container), container)

        // setTimeout(() => render(nextVNode, container), 1000)
        // console.log(container)
        // console.log(h(Header))
    }
