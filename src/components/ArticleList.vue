<template>
    <article>
        <header>
            <h3>The WET Codebase</h3>
            <div>July 13, 2020 • ☕️ 1 min read</div>
        </header>
        <p>Returns the target value in a nested JSON object, based on the keys array.</p>
    </article>
</template>

<script>
export default {
    name: "ArticleList",
};
</script>

<style lang="less" scoped>
article {
    height: 160px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 32, 128, 0.09);
    border-radius: 0.25rem;
    padding: 2rem;
    display:flex;
    flex-flow: column;
    justify-content:space-between;
}

article + article {
    margin-top: 10px;
}
</style>
