<template>
    <div :ref="componentRef" class="navbar">
        <div class="navbar__container">
            <a @click="onClickLogo" class="logo" href="javascript:void(0)">
                <!-- <h1>BigHippoZz</h1> -->
                <slot></slot>
            </a>
            <nav>
                <ul class="navbar-nav" @click="onClickBtn">
                    <li
                        v-for="(item) in btnLis"
                        :key="item"
                        class="navbar-nav__item"
                    >
                        <a class='' :data-id="item" href="javascript:void(0)">{{
                            item
                        }}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
export default {
    name: "navbar",
    props: {
        // 点击logo事件
        onClickLogo: {
            type: Function,
            default: () => {
                console.log("click logo");
            },
        },
        // ui btn 按钮列表
        btnLis: {
            type: Array,
            default: () => [
                "SPEAKERS",
                "WORKSHOPS",
                "SCHEDULE",
                "GUIDE",
                "Summary",
            ],
        },
        onClickBtn: {
            type: Function,
            default: () => {},
        },
        componentRef: {
            type: Function,
            default: ref => ref,
        },
    },
};
</script>
<style lang="less" scoped>
@color: hsla(0, 0%, 100%, 0.8);
.navbar {
    position: flex;
    background: @color;
    border-bottom: 1px solid #efefef;
    width: 100%;
    display: block;
    padding: 20px 0;
    .navbar__container {
        max-width: 960px;
        padding: 0 20px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        a.logo {
            text-decoration: none;
            color: #445b71;
            background-image: url("../assets/logo.svg");
            background-size: contain;
            background-repeat: no-repeat;
            width: 260px;
            height: 40px;
        }

        .navbar-nav__item {
            display: inline-block;
            vertical-align: middle;
            padding-left: 25px;
            line-height: 35px;
            text-transform: uppercase;

            a {
                text-decoration: none;
                color: #445b71;
                font-size: 15px;
                font-weight: 400;
            }

            a.button {
                color: #fff;
            }
        }
    }
}
</style>
