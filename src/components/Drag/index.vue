<template>
    <div>
        <div v-show="false" class="el-form test" :ref="getEl">Test</div>
        <ul id="el-drag" @pointerdown="handlePointer">
            <li
                :style="{ background: randomColor() }"
                v-for="item of state.array"
                :key="item"
                :data-index="item"
            >
                {{ item }}
            </li>
        </ul>

        <Line line-text="分割线" />

        <ul id="_el-drag" @pointerdown="handlePointer">
            <li
                :style="{ background: randomColor() }"
                v-for="item of state.array"
                :key="item"
                :data-index="item"
            >
                {{ item }}
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { getParentOrHost, toggleClass, css, matrix, getRect } from './utils'
import Sortable from '@/sortable/Sortable'
import { randomColor, default as _Sortable } from './Sortable'
import Line from '@/components/Line/index.vue'
export default {
    components: {
        Line,
    },
    name: 'test',
    setup() {
        const elRef = ref<HTMLElement | null>(null)
        function getEl<T extends HTMLElement>(el: T) {
            // tiggerClass(el, "active", true);
            // console.log(el.style)
            elRef.value = el
        }
        const state = reactive({
            array: Array(10)
                .fill(1)
                .map((_, index) => index),
        })
        onMounted(() => {
            // console.log()
            // console.log(elRef.value?.style)
            // console.log(void 0)
            // console.log(document.defaultView, 'document defaultView')
            // console.log(getRect(document.querySelector(".a"),true));
            // console.log(css(elRef.value));
            // console.log(window.getComputedStyle(elRef.value as HTMLElement));
            // console.log(matrix(elRef.value));
            // console.log(document.body.host)
            function onUpdate() {
                console.log('update')
            }

            new _Sortable(document.getElementById('el-drag') as HTMLElement, {
                onUpdate,
            })

            new Sortable(document.getElementById('_el-drag') as HTMLElement, {
                animation: 200,
            })
        })
        const handlePointer = <T extends PointerEvent>(event: T) => {
            console.log(event)
            const root = document.getElementById('el-drag') as HTMLElement
            const inputs = root.getElementsByTagName('input')
            let index = inputs.length
            const inputCheckedState = []
            while (index--) {
                const current = inputs[index]
                console.log(current.checked)
            }
            console.log(event.composedPath())
        }
        return {
            getEl,
            state,
            randomColor,
            handlePointer,
        }
    },
}
</script>
<style lang="scss" scoped>
.el-form {
    width: 100px;
    height: 100px;
    transform: scale(2);
}

.box {
    width: 400px;
    height: 400px;
    background: red;
    transform: translateX(200px);
    transform: scale(2);
    .a {
        width: 200px;
        height: 200px;
        background: blue;
        position: fixed;
        top: 100px;
        // transform: scale(2);
    }
}
ul {
    li {
        height: 40px;
        line-height: 40px;
    }
}
</style>
