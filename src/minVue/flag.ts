


 export enum VNodeFlags {
    ELEMENT_HTML = 1,
    ELEMENT_SVG = 1 << 1,
    COMPONENT_STATEFUL_NORMAL = 1 << 2,
    COMPONENT_STATEFUL_SHOULD_KEEP_ALIVE = 1 << 3,
    COMPONENT_STATEFUL_KEPT_ALIVE = 1 << 4,
    COMPONENT_FUNCTIONAL = 1 << 5,
    TEXT = 1 << 6,
    FRAGMENT = 1 << 7,
    PORTAL = 1 << 8,
    ELEMENT = VNodeFlags.ELEMENT_HTML | VNodeFlags.ELEMENT_SVG,
    COMPONENT_STATEFUL = VNodeFlags.COMPONENT_STATEFUL_NORMAL |
        VNodeFlags.COMPONENT_STATEFUL_SHOULD_KEEP_ALIVE |
        VNodeFlags.COMPONENT_STATEFUL_KEPT_ALIVE,
    COMPONENT = VNodeFlags.COMPONENT_STATEFUL | VNodeFlags.COMPONENT_FUNCTIONAL,
}

 export enum ChildrenFlags {
    UNKNOWN_CHILDREN = 0, // 未知的 children 类型
    NO_CHILDREN = 1, // 没有 children
    SINGLE_VNODE = 1 << 1, // children 是单个 VNode
    KEYED_VNODES = 1 << 2, // children 是多个拥有 key 的 VNode
    NONE_KEYED_VNODES = 1 << 3, // children 是多个没有 key 的 VNode
    MULTIPLE_VNODES = ChildrenFlags.KEYED_VNODES |
        ChildrenFlags.NONE_KEYED_VNODES, // 多节点
}
