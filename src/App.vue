<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld />
    <!-- <Drag id="header"></Drag> -->
</template>

<script lang="ts">
import { h } from './h/h'
import { defineComponent } from 'vue'
import { TreeNode } from './algorithm/BinaryTreeForEach'
import HelloWorld from './components/HelloWorld.vue'
import Drag from './components/Drag/index.vue'
import Tree from './views/Tree.vue'

export default defineComponent({
    name: 'App',
    components: {
        HelloWorld,
        Tree,
        Drag,
    },
    setup() {
        function generateTree(array: number[]) {
            const { length } = array
            if (!length) return null
            function helper(left: number, right: number): TreeNode | null {
                if (left > right) return null
                const mid = (left + right) >> 1
                const root = new TreeNode(array[mid])
                root.left = helper(left, mid - 1)
                root.right = helper(mid + 1, right)
                return root
            }
            const result = helper(0, length - 1)
            return result
        }
        const data = generateTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])

        // 旧的 VNode
        const prevVNode = h('div', null, [
            h('p', { key: 'a' }, '节点1'),
            h('p', { key: 'b' }, '节点2'),
            h('p', { key: 'c' }, '节点3'),
            h('p', { key: 'd' }, '节点4'),
            h('p', { key: 'f' }, '节点6'),
            h('p', { key: 'h' }, '节点8'),
            h('p', { key: 'e' }, '节点5'),
        ])

        // 新的 VNode
        const nextVNode = h('div', null, [
            h('p', { key: 'a' }, 'new 节点1'),
            h('p', { key: 'c' }, 'new 节点3'),
            h('p', { key: 'd' }, 'new 节点4'),
            h('p', { key: 'b' }, 'new 节点2'),
            h('p', { key: 'g' }, 'new 节点7'),
            h('p', { key: 'e' }, 'new 节点5'),
        ])
        console.log(prevVNode,nextVNode)
        return {
            data,
        }
    },
})
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
