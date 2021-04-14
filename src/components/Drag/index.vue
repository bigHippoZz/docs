<template>
    <div>
        <div class="el-form test" :ref="getEl">Test</div>
        <ul id="el-drag">
            <li
                :style="{ background: randomColor() }"
                v-for="item of state.array"
                :key="item"
                :data-index="item"
            >
                {{ item }}
            </li>
        </ul>
        <!-- <div class="box">
            <div class="a"></div>
        </div> -->
    </div>
</template>
<script lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { getParentOrHost, tiggerClass, css, matrix, getRect } from './utils'
import ElTableColumn from 'element-plus/lib/el-table/src/tableColumn'
import Sortable, { randomColor } from './Sortable'
export default {
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

            function onUpdate() {
                console.log('update')
            }
            new Sortable(document.getElementById('el-drag') as HTMLElement, {
                onUpdate,
            })
        })
        return {
            getEl,
            state,
            randomColor,
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
