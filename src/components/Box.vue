<template>
    <div>
        <slot v-bind="$name"></slot>
    </div>
</template>
<script>
import { onMounted, reactive, ref } from "vue";

export default {
    setup(props, { attrs, emit, slots }) {
        onMounted(() => {
            console.log(props);
            console.log(attrs);
            console.log(emit);
            emit("stateChange");
        });
        let $name = ref(1);
        return {
            attrs,
            children: {
                handleClick: function(){
                    console.log('hello world')
                }
            },
        };
    },
};
</script>
<style lang="less" scoped></style>
