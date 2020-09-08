<template>
    <NavBarComponent
        :onClickLogo="onClickLogo"
        :onClickBtn="onClickBtn"
        :componentRef="componentRef"
    />
</template>
<script>
import NavBarComponent from "../components/NavBar.vue";
export default {
    components: {
        NavBarComponent,
    },
    name: "NavBar",
    setup() {
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
        };
    },
};
</script>
