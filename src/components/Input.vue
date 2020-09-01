<template>
    <div>
        <input
            type="file"
            name="file"
            id="file"
            @change="onChange"
            @blur="onBlur"
            v-bind="attrs"
        />
    </div>
</template>

<script>
import { computed, reactive, ref, onMounted, onUnmounted, readonly } from "vue";
export default {
    name: "Input",
    setup(props, { slots, attrs, emit }) {
        return {
            attrs,
        };
    },
    props: {
        onChange: {
            type: Function,
            required: true,
            default: () => {},
        },

        onBlur: {
            type: Function,
            default: () => {},
        },
    },
};
</script>

<style lang="less" scoped></style>
