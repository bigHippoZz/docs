<template function>
    <div class="line">{{ lineText }}</div>
</template>

<script>
export default {
    name: 'Line',
    props: {
        lineText: {
            type: String,
        },
    },
}
</script>

<style lang="scss" scoped>
.line {
    padding: 0 20px 0;
    margin: 20px 0;
    line-height: 1px;
    border-left: 190px solid #ddd;
    border-right: 190px solid #ddd;
    text-align: center;
}
</style>
