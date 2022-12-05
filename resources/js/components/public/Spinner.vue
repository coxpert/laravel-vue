<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from "vue-property-decorator";

@Options({})
export default class Spinner extends Vue {
    @Prop({ required: false, default: 'rgba(255, 255, 255, .5)' })
    public background: string = '#e5e7eb';

    @Prop({ required: false, default: true })
    public show: boolean = true;

    @Prop({ required: false, default: false })
    public small: boolean = false;

    @Prop({ required: false, default: "LOADING" })
    public text: string = "LOADING";
}
</script>

<template>
    <div v-show="show" :class="{'w-full': small}">
        <div v-if="small" class="small-spinner">
            <span class="whitespace-nowrap block w-full text-xs pb-2">{{ text }}</span>
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>

        <div v-else class="spinner-wrapper" :style="{
            background: background
        }">
            <div class="spinner-block text-center">
                <div class="main-spinner">
                    <div class="main-spinner-2"></div>
                </div>
                <span class="pb-8 text-sm font-semibold text-gray-500 whitespace-nowrap">
                    ...
                    <br />
                    {{ text }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.spinner-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 15;
}

.spinner-block {
    position: absolute;
    left: calc(50% - 55px);
    top: calc(50% - 50px);
}

.main-spinner {
    height: 75px;
    width: 75px;
    border: 1px solid transparent;
    border-top-color: #474c59;
    border-bottom-color: #474c59;
    border-radius: 50%;
    position: relative;
    -webkit-animation: spin 5.1s linear infinite;
    animation: spin 5.1s linear infinite;
}

.main-spinner::before {
    content: "";
    position: absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
    border: 1px solid transparent;
    border-top-color: #474c59;
    border-bottom-color: #474c59;
    border-radius: 50%;
    -webkit-animation: spin 3.3s linear infinite;
    animation: spin 3.3s linear infinite;
}

.main-spinner-2 {
    content: "";
    position: absolute;
    top: 21px;
    right: 21px;
    bottom: 21px;
    left: 21px;
    border: 1px solid transparent;
    border-top-color: #474c59;
    border-bottom-color: #474c59;
    border-radius: 50%;
    -webkit-animation: spin 1.4s linear infinite;
    animation: spin 1.4s linear infinite;
}

@-webkit-keyframes spin {
    from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes spin {
    from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

// ------- SMALL SPINNER ------- //

.small-spinner {
    font-weight: 500;
    margin: 15px auto auto;
    //width: 50px;
    height: 10px;
    text-align: center;
    font-size: 10px;
    color: #8a92a8;
}

.small-spinner>div {
    background-color: #8a92a8;
    height: 100%;
    width: 5px;
    margin: -2px 2px 0 2px;
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.small-spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.small-spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.small-spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.small-spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {

    0%,
    40%,
    100% {
        -webkit-transform: scaleY(1.0)
    }

    20% {
        -webkit-transform: scaleY(1.5)
    }
}

@keyframes sk-stretchdelay {

    0%,
    40%,
    100% {
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
    }

    20% {
        transform: scaleY(1.5);
        -webkit-transform: scaleY(1.5);
    }
}
</style>