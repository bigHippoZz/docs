<template>
    <div>
        <slot v-bind="componentProps"></slot>
        <!-- 处理渲染劫持 -->
        <!-- do something -->
    </div>
</template>

<script>
import { onMounted } from "vue";
export default {
    name: "BufferedInput",

    setup(props, { attrs, emit }) {
        onMounted(() => {});
        // console.log(attrs);
        const handleFileUpload = function (
            files,
            onLoad,
            onError = function () {}
        ) {
            let fileReader = function (files, index) {
                if (index === files.length) {
                    files = null;
                    return;
                }
                console.log(files[0]);
                const reader = new FileReader();
                reader.onload = function (event) {
                    onLoad(event.target);
                    fileReader(files, ++index);
                };
                reader.readAsArrayBuffer(files[index]);
            };
            fileReader(files, 0);
        };
        const handleChange = event => {
            let files = event.target.files;
            console.log(files);
            handleFileUpload(files, function (target) {
                console.log(target);
            });
        };
        return {
            componentProps: Object.assign({}, attrs, {
                onChange: handleChange,
            }),
        };
    },
};
</script>
