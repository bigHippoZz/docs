<template>
    <div>
        <slot v-bind="children"></slot>
    </div>
</template>
<script>
import { onMounted, reactive, ref } from "vue";

export default {
    setup(props, { attrs, emit, slots }) {
        console.log(this);
        onMounted(() => {
            console.log(props);
            console.log(attrs);
            console.log(emit);
            attrs.onStateChange();
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
