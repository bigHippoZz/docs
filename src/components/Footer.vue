<template>
    <footer>
        <div class="wrapper">
            <div>
                <div class="foooter__header">Contact</div>
                <div class="foooter__details" @click="onClickAuthor">
                    作者：<a href="javascript:void(0)"> @{{ author }}</a>
                </div>
                <div class="foooter__details" @click="onClickMail">
                    Email：<a href="javascript:void(0)">{{ email }}</a>
                </div>
            </div>

            <div>
                <div class="foooter__header">Useful links</div>
                <ul @click="onLinkClick($event)">
                    <li v-for="(item, index) in btnList" :key="index">
                        <a class="foooter__list" href="javascript:void(0)">{{
                            item
                        }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    name: "Footer",
    props: {
        /**
         * 作者
         */
        author: {
            type: String,
            default: "bigHippoZz",
        },
        /**
         * 邮箱
         */
        email: {
            type: String,
            default: "289901948@qq.com",
        },
        /**
         * 按钮列表
         */
        btnList: {
            type: Array,
            default: () => ["VUE", "REDUX", "SCHEDULE", "GUIDE", "Summary"],
        },
        /**
         * link点击事件
         */
        onLinkClick: {
            type: Function,
            default: () => {},
        },
        /**
         * 点击作者事件
         */
        onClickAuthor: {
            type: Function,
            default: () => {},
        },
        /**
         * 点击邮箱事件
         */
        onClickMail: {
            type: Function,
            default: () => {},
        },
    },
};
</script>

<style lang="less" scoped>
.wrapper {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-around;
    padding-top: 60px;
}
footer {
    height: 350px;
    background: #fff;
    margin-top: 40px;
    .foooter__header {
        margin: 15px 0;
        font-size: 36px;
        font-weight: 300;
        color: #35485e;
    }

    li {
        list-style: none;
    }
    .foooter__list {
        font-weight: 400;
        color: #3bb881;
        font-size: 18px;
        text-decoration: none;
    }
    .foooter__details {
        font-weight: 300;
        display: block;
        font-size: 22px;
        a {
            text-decoration: none;
            font-weight: 400;
            color: #3bb881;
        }
    }
}
</style>
