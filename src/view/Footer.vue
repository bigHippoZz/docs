<template>
    <FooterComponent
        :onLinkClick="onLinkClick"
        :onClickAuthor="onClickAuthor"
    />
</template>
<script>
import FooterComponent from "../components/Footer.vue";
const AUTHOR_LINK = "https://github.com/bigHippoZz";
export default {
    components: {
        FooterComponent,
    },
    name: "Footer",
    setup() {
        const onLinkClick = event => {
            console.log(event);
        };
        const onClickAuthor = () => {
            location.href = AUTHOR_LINK;
        };
        return {
            onLinkClick,
            onClickAuthor,
        };
    },
};
</script>
