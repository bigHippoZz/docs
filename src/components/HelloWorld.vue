<template>
  <div class="hello"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "Hello world",
  setup() {
    onMounted(() => {
      (function () {
        function helper(func: Function) {
          const map = Object.create(null);
          return function (str: string) {
            const value = map[str];
            return value || (map[str] = func(str));
          };
        }
        const pattern = /-(\w)/g;
        const camelize = helper((str: string) =>
          str.replace(pattern, (_, c) => c.toUpperCase())
        );
        // console.log(camelize('data-base'))
      })();
    });
  },
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
