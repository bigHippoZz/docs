<template>
    <div :ref="componentRef">
        <slot index="1"></slot>
    </div>
</template>
<script>
import { onMounted, ref } from "vue";
export default {
    name: "Box",
    setup(props) {
        let { componentRef } = props;
        return {
            componentRef,
        };
    },
    props: {
        componentRef: {
            type: Function,
        },
    },
};
</script>
