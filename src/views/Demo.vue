<template>
  <div class="big">
    <!-- <BasicFormVue ref="form">
      <template #submitBefore>
        <div>hello world</div>
      </template>
    </BasicFormVue>
    <n-button @click="handleClick">点击</n-button>
    <span>{{ hash }}</span>
    <n-input
      v-model:value="hash"
      type="text"
      placeholder="基本的 Input"
    ></n-input> -->
  </div>
</template>

<script lang="ts" setup>
// import BasicFormVue from "@/components/Form/BasicForm.vue";
// import { useForm } from "@/components/Form/hooks/useForm";
// import { useRouteHash } from "@/hooks/routers/useRouteHash";
// import { Ref, ref } from "@vue/reactivity";
// import { NForm, NButton, NInput } from "naive-ui";
import { onMounted } from "vue";
// import { useTemplateRef } from "@/hooks/core/useTemplateRef";
// const hash = useRouteHash("a", "b");
// const input = ref("");
// const instance = useTemplateRef("form");
onMounted(() => {
  // console.log(instance);
});
// console.log(instance);
// const handleClick = () => {
//   hash.value = `${Math.random()}`;
// };
</script>

<style lang="less">
.a {
  color: @namespace;
}
</style>
