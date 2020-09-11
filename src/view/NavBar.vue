<template>
    <NavBarComponent
        v-bind="componentsProps"
        :componentRef="componentRef"
        :onClickLogo="onClickLogo"
        :onClickBtn="onClickBtn"
    />
</template>
<script>
import NavBarComponent from "../components/NavBar.vue";
export default {
    components: {
        NavBarComponent,
    },
    name: "NavBar",
    setup(props, { attrs }) {
        const onClickLogo = () => {
            location.href = "/";
        };
        const onClickBtn = event => {
            console.log(event);
        };
        const componentRef = ref => {
            console.log(ref);
        };
        return {
            onClickLogo,
            onClickBtn,
            componentRef,
            componentsProps: attrs,
        };
    },
};
</script>
