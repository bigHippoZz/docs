<template>
    <div>
        <div class="el-form test" :ref="getEl">Test</div>

        <div class="box">
            <div class="a"></div>
        </div>
    </div>
</template>
<script lang="ts">
import { onMounted, ref } from 'vue'
import { getParentOrHost, tiggerClass, css, matrix, getRect } from './utils'
export default {
    name: 'test',
    setup() {
        const elRef = ref<HTMLElement | null>(null)
        function getEl<T extends HTMLElement>(el: T) {
            // tiggerClass(el, "active", true);
            // console.log(el.style)
            elRef.value = el
        }
        onMounted(() => {
            // console.log()
            console.log(elRef.value?.style)
            console.log(void 0)
            console.log(document.defaultView, 'document defaultView')
            // console.log(getRect(document.querySelector(".a"),true));
            // console.log(css(elRef.value));
            // console.log(window.getComputedStyle(elRef.value as HTMLElement));
            // console.log(matrix(elRef.value));
            ;(function () {
                class Sortable {
                    el: HTMLElement
                    constructor(el: HTMLElement) {
                        this.el = el
                        let currentDragEl = null
                        const slice = [].slice

                        this.el.addEventListener('dragstart', (evt) => {
                            console.log(evt)
                            currentDragEl = evt.target
                            console.log(currentDragEl)
                            this.el.addEventListener('dragover', (evt) => {})
                            this.el.addEventListener('dragend', (evt) => {})
                        })
                        const _dragover = (evt: DragEvent) => {
                            const target = evt.target

                            console.log(evt)
                        }
                        const _dragend = (evt: DragEvent) => {
                            this.el.removeEventListener('dragover', _dragover)
                            this.el.removeEventListener('dragend', _dragend)
                        }
                    }
                }
            })()
        })
        return {
            getEl,
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
</style>
