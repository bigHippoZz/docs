<template>
    <div>
        <slot v-bind="children"></slot>
        <p>this is Box component</p>
    </div>
</template>
<script>
import { onMounted, reactive, ref } from "vue";

export default {
    setup(props, { attrs, emit, slots }) {
        console.log(this);
        onMounted(() => {
            // console.log(props);
            // console.log(attrs);
            // console.log(emit);
            attrs.onStateChange();
            let target = { a: 1, b: 2 };
            let source = { c: 3, d: 4 };
            // 后面的同名属性能够覆盖前端的同名属性
            Object.assign(target, source);
            console.log(target);
            // 字符串的话会以数组的形式传入target中
            console.log(Object.assign({}, "hello"));
            // let array = ["a", "b", "c", "d"];
            // // Second argument to map sets `this`
            // array
            //     .map(
            //         String.prototype.toUpperCase.call,
            //         String.prototype.toUpperCase
            //     )
            //     .map(console.log);
        });
        let $name = ref(1);
        return {
            children: {
                handleClick: function () {
                    console.log("hello world");
                },
            },
        };
    },
    data() {
        return {
            count: "10",
        };
    },
    name: "Box",
};
</script>
<style lang="less" scoped></style>
