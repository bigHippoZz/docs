<template>
    <slot v-bind="componentProps"></slot>
</template>
<script>
export default {
    name: "forNavBar",
    setup(props) {
        const handleClickLogo = () => {
            location.href = "/";
        };
        return {
            componentProps: {
                onClickLogo: handleClickLogo,
            },
        };
    },
};
</script>
