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
// .hover-underline-animation {

//   display: inline-block;
//   position: relative;
//   color: var(--textColor);
//   font-size: 18px;
//   &:after {
//     content: "";
//     position: absolute;
//     width: 100%;
//     transform: scaleX(0);
//     height: 2px;
//     bottom: 0;
//     left: 0;
//     background-color: #0087ca;
//     transform-origin: bottom right;
//     transition: transform 0.25s ease-out;
//   }

//   &:hover:after {
//     transform: scaleX(1);
//     transform-origin: bottom left;
//   }
// }
</style>
