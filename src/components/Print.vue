<template>
    <slot></slot>
</template>
<script>
import { onMounted, reactive, computed, watchEffect } from "vue";
export default {
    name: "Print",
    setup(props, { slots }) {
        let $state = reactive({
            slots: [],
            items: computed(() =>
                $state.slots.map(vnode => {
                    console.log(vnode);
                })
            ),
        });
        onMounted(() => {
            // console.log(slots);
            // $state.slots = slots.default();
            // console.log($state.slots);
            // console.log($state.items);
        });

        watchEffect(() => {
            // let items = $state.items;
            // console.log(items);
        });
    },
};
</script>
