<template>
    <div class="titles">
        <div class="title">
            <img src="https://via.placeholder.com/200x150" />
            <h2>30 Seconds of CSS</h2>
        </div>
        <div class="title">
            <img src="https://via.placeholder.com/200x150" />
            <h2>30 Seconds of CSS</h2>
        </div>
        <div  class="title">
            <img src="https://via.placeholder.com/200x150" />
            <h2>30 Seconds of CSS</h2>
        </div>
    </div>
</template>
<script>
import { onMounted } from "vue";

// import "../utils/promise";
export default {
    name: "Images",
    setup() {
    
    },
};
</script>
<style lang="less" scoped>
.titles {
    font-size: 0;
    width: 600px;
    margin: 0 auto;
    .title {
        display: inline-block;
        width: calc(600px / 3);
        h2 {
            font-size: 20px;
        }
    }
}
</style>
