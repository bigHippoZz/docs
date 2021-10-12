<template>
  <div class="big">
    <basic-form ref="form" v-bind="conf" v-model="model"></basic-form>
  </div>
</template>

<script lang="ts" setup>
import { BasicFormProps } from "@/components/Form";
import BasicForm from "@/components/Form/BasicForm.vue";

// import { useForm } from "@/components/Form/hooks/useForm";
// import { useRouteHash } from "@/hooks/routers/useRouteHash";
// import { Ref, ref } from "@vue/reactivity";
import { onMounted, ref } from "vue";
// import { useTemplateRef } from "@/hooks/core/useTemplateRef";
import { useRouteQuery } from "../hooks/routers/useRouteQuery";

// const hash = useRouteHash("a", "b");
// const input = ref("");
// const instance = useTemplateRef("form");

const conf: BasicFormProps = {
  baseFormOptions: { labelWidth: 80, labelPlacement: "left" },
  schema: [
    {
      fieldName: "name",
    },
    {
      fieldName: "demo",
    },
    {
      fieldName: "age",
    },
  ],
};

const model = ref({ name: "hello" });

const query = useRouteQuery("name");

console.log(query);
</script>

<style lang="less">
.a {
  color: @namespace;
}
</style>
