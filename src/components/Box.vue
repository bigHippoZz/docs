<template>
    <div v-bind="props"></div>
</template>
<script>
import { onMounted, reactive, ref } from "vue";
export default {
    props: {
        total: {
            type: Number,
            validator: function (prop) {
                console.log(prop);
                return false;
            },
        },
    },
    setup(props, { attrs, emit, slots }) {
        onMounted(() => {});
        let $name = ref(1);
        return { props:{
            name:$name,
        } };
    },
};
</script>
<style lang="less" scoped></style>
