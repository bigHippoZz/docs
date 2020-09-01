<template>
    <div></div>
</template>
<script>
import { onMounted, reactive } from "vue";
export default {
    name: "Chunk",
    setup() {
        const $state = reactive({
            total: 10,
        });
        onMounted(() => {
            console.log("chunk");
        });
    },
};
</script>

<style lang="less" scoped></style>
