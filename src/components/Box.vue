
<script>
import { onMounted, h } from "vue";
export default {
    props: {},
    setup(props, { attrs, emit, slots }) {
        onMounted(() => {
            console.log(attrs);
            console.log(emit);
            console.log(slots.default()[0]);
        });
        console.log(h)
        return (<div>ahah</div>)
    },
};
</script>
<style lang="less" scoped></style>
