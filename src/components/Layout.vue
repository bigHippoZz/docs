<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Layout",
};
</script>
<style lang="less" scoped>
.container {
    max-width: 960px;
    padding: 0 20px;
    margin: 0 auto;
}
</style>
