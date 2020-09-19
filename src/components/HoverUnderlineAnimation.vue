<template>
    <p class="hover-underline-animation">Hover this text to see the effect!</p>
</template>

<style lang="less">
:root {
    --textColor: #0087ca;
}
.hover-underline-animation {
    font-size: 20px;
    position: relative;
    // overflow: hidden;
    display: inline-block;
    color: var(--textColor);
    &:before {
        content: "";
        position: absolute;
        height: 2px;
        left: 0;
        width: 100%;
        bottom: 0;
        transform-origin: bottom left;
        transform: scaleX(0);
        transition: transform 0.5s ease-out;
        background-color: var(--textColor);
    }
    &:hover:before {
        transform: scaleX(1);
        transform-origin: bottom right;
    }
}
</style>
