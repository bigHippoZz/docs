<template>
    <div class="warp">
        <div :ref="componentRef" class="_navbar">
            <div class="navbar_container">
                <a @click="onClickLogo" class="logo" href="javascript:void(0)">
                    <h1 class="h2" style="font-weight: 300">
                        Big<i style="color: rgb(62, 184, 130)">·</i>HippoZz
                    </h1>
                </a>
                <nav>
                    <ul class="navbar_nav" @click="onClickBtn">
                        <li
                            v-for="(item, index) in btnLis"
                            :key="item"
                            class="navbar-nav__item"
                        >
                            <a
                                :class="index === btnLis.length - 1 && 'button'"
                                :data-id="item"
                                href="javascript:void(0)"
                                >{{ item }}</a
                            >
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "navbar",
    props: {
        /**
         * 点击logo事件
         */
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
                "VUE",
                "REDUX",
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

.warp{
    height:80px;
}
._navbar {
    background: @color;
    border-bottom: 1px solid #efefef;
    width: 100%;
    display: block;
    padding: 20px 0;
    top: 0;
    position: fixed;
    .navbar_container {
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
            background-position: left center;
            width: 260px;
            height: 40px;
            h1 {
                line-height: 30px;
                margin-bottom: 0;
                padding-left: 50px;
            }
        }

        ul {
            margin: 0;
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

.button {
    display: inline-block;
    vertical-align: middle;
    padding: 10px 33px;
    background-color: #3eb882;
    color: #fff;
    font-family: Source Sans Pro, sans-serif;
    font-weight: 300;
    font-size: 20px;
    line-height: 1.25;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    border: 0;
    border-radius: 20px;
    letter-spacing: 0.5px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #319267;
    }
}
</style>
