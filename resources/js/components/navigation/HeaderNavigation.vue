<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { ROUTE_NAMES } from "../../router";

export default class MobileNavigation extends Vue {
    public ROUTE_NAMES = ROUTE_NAMES;
    public menu = [
        { routeName: ROUTE_NAMES.HOME, title: 'Dashboard' },
    ]
}
</script>

<template>
    <nav class="inline-block flex flex-row">
        <router-link v-for="(item, header_menu_item_index) in menu" :key="`header_menu_item_${header_menu_item_index}`" :to="{ name: item.routeName }" :class="[
            $route.name === item.routeName && item.routeName !== ROUTE_NAMES.HOME ?
                'bg-gray-100 mb-[-1px] pt-[13px] pb-[9px]' :
                'text-gray-700 hover:bg-gray-100 hover:border-b hover:border-b-gray-300 -mb-[1px] pt-[13px] pb-[9px]',
            header_menu_item_index < 1 ? 'border-l' : '',
            item.routeName === ROUTE_NAMES.HOME ? 'font-bold text-lg' : 'font-normal'
        ]" class="inline-block text-sm border-r border-gray-300 border-b border-b-transparent px-5">
            {{ item.title }}
        </router-link>
    </nav>
</template>
