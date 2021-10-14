<template>
  <basic-form :test="line" :ifShowIndex="result" v-model="model"></basic-form>
</template>
<script lang="ts" setup>
import BasicForm from "@/components/Form/BasicForm.vue";
import { generateRandom } from "@/utils";
import { StopWatch } from "@/utils/stopWatch";

import { Ref, ref, shallowRef, unref } from "vue";

const model = ref<Recordable>({});

const line = shallowRef(
  Array(30)
    .fill(0)
    .map(() => generateRandom(6, 10))
);
console.log(unref(line));
// const line = shallowRef([6, 3, 3, 9, 7, 7, 6, 2, 3, 4]);
console.log(unref(line));

function _calculateLineIndex(
  lines: Ref<number[]> | number[],
  basicCols: number,
  showLineIndex: number
): number {
  const len = unref(lines).length;

  let currentIndex = 0;
  let currentLine = 0;

  const prefix = Array(len + 1).fill(0);
  for (let i = 1; i < len; i++) {
    prefix[i] = prefix[i - 1] + unref(lines)[i - 1];
  }

  __DEV__ && console.log("_calculateLineIndex => prefix", prefix);

  for (let i = 0; i < len; i++) {
    const element = unref(lines)[i];
    validCol(element);
    if (prefix[i + 1] - prefix[currentIndex] > basicCols) {
      currentIndex = i;
      currentLine++;
    }
    if (currentLine === showLineIndex) {
      return currentIndex;
    }
  }

  return -1;

  function validCol(lineNumber: number) {
    if (lineNumber > basicCols || isNaN(lineNumber)) {
      throw new Error(`cannot calculate line index \`${lineNumber}\``);
    }
  }
}

const stopWatch = new StopWatch();
stopWatch.stop();
const result = _calculateLineIndex(line, 24, 3);
console.log(stopWatch.elapsed());
console.log(result, "result");
</script>

<style lang="less">
.a {
  color: @namespace;
}
</style>
