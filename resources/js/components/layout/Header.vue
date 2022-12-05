<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import HeaderUserMenu from "../navigation/HeaderUserMenu.vue";
import HeaderNavigation from "../navigation/HeaderNavigation.vue";

@Options({
    components: {
        HeaderUserMenu, HeaderNavigation
    }
})
export default class Header extends Vue {

}

</script>

<template>
    <header>
        <div class="flex justify-between relative bg-gray-200 flex border-gray-300 border-b">
            <div class="w-full">
                <HeaderNavigation />
            </div>
            <div class="flex items-center">
                <HeaderUserMenu />
            </div>
        </div>
    </header>
</template>