<template>
    <blockquote class="blockquote text-center">
        <p class="mb-0">{{ verseDetails }}</p>
        <footer class="blockquote-footer">
            {{ verseAuthor }} {{ verseTitle }}
        </footer>
    </blockquote>
</template>
<script>
export default {
    name: "Verse",
    props: {
        verseDetails: {
            type: String,
            default: "欲买桂花同载酒，终不似，少年游。",
        },
        verseAuthor: {
            type: String,
            default: "《唐多令·芦叶满汀洲》",
        },
        verseTitle: {
            type: String,
            default: "刘过",
        },
    },
};
</script>

<style lang="less" scoped>
.blockquote {
    margin-top: 1rem;
}
</style>
