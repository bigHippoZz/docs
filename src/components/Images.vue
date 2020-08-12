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
    <div class="title">
      <img src="https://via.placeholder.com/200x150" />
      <h2>30 Seconds of CSS</h2>
    </div>
  </div>
</template>
<script>
import { inject, ref } from "vue";
export default {
  name: "Images",
  setup() {
    let imagesRef = ref(false);
    const InjectObject = inject("provide", {});
    let handler = InjectObject(imagesRef);
    // console.log(handler,'handler')

    setTimeout(() => {
        // console.log('settimeout 2000s')
        handler.name = 'hippo'
    }, 2000);
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
