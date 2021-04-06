<script lang="ts">
import { onMounted, h, ref } from "vue";
import { $message } from "@/components/utils/console";

type ComponentAttributes = {
  [props: string]: any;
};

function isHtmlAttributes(attr: string) {
  const attrs = ["id", "class"];
  return attrs.includes(attr) || attr.startsWith("data-");
}

function getComponentAttributes<T>({ attrs }: { attrs: T }) {
  const attributes = Object.entries(attrs)
    .filter(([key, _]) => isHtmlAttributes(key))
    .reduce((result, [key, value]) => {
      // result[key] = value;
      return result;
    }, {});

  return {
    ...attributes,
  };
}

export default {
  name: "Drag",
  props: {},

  setup(props, context) {
    console.log(`context -> ${JSON.stringify(context, null, 4)}`, context);
    const error = ref(false);
    const { emit, attrs, slots } = context;

    const { default: defaultNode } = slots;

    const attributes = getComponentAttributes({ attrs });

    interface DragHTMLElement extends HTMLElement {
      __draggable_component__: any;
    }

    const elRef = ref<DragHTMLElement | null>(null);

    onMounted(() => {
      console.log(elRef.value);
      if (elRef.value) {
        elRef.value.__draggable_component__ = Object.create(null);
      }
    });

    try {
      error.value = false;
      return () => h("div", { ref: elRef }, defaultNode?.());
    } catch (error) {
      error.value = true;
      return () => h("pre", { style: { color: "red" } }, error.stack);
    }
  },
  created() {
    console.log(this);
  },
  // render() {
  //   try {
  //     throw new Error("hello world");
  //   } catch (error) {
  //     console.log(error.message, error.name, error.stack);
  //     return h("pre", { style: { color: "red" } }, error.stack);
  //   }
  // },
};
</script>

<style lang="scss" scoped></style>
