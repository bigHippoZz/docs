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
        function test(url) {
            var nextUrl = decodeURIComponent(url).replace(/^http:\/\//, "");
            nextUrl = window.location.protocol + "//" + nextUrl;
            window.location.href = nextUrl;
        }
        const onClickLogo = () => {
            // location.href = "/";
            test('http://www.baidu.com')
        };
        const onClickBtn = event => {
            console.log(event);
        };
        const componentRef = ref => {
            // console.log(ref);
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
