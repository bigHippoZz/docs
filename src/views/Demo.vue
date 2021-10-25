<template>
	<h1 @click="handleClick">hello</h1>
</template>

<script lang="ts" setup>
const handleClick = (event: MouseEvent) => {
	console.log(event);
};
</script>

<style lang="less">
.a {
	color: @namespace;
}
</style>
