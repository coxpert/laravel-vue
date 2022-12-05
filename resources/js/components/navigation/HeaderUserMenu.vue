<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import {
    UserIcon
} from '@heroicons/vue/outline';
import { Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot, Dialog, DialogOverlay } from '@headlessui/vue'
import { Actions } from "../../store/actions";
import { ROUTE_NAMES } from "../../router";
import { capitalizeFirstLetter } from '../../helpers';

@Options({
    components: {
        MenuButton, MenuItem, Menu, MenuItems, UserIcon, TransitionChild, TransitionRoot, Dialog, DialogOverlay
    },
    methods: {
        capitalizeFirstLetter
    }
})
export default class MobileNavigation extends Vue {
    public ROUTE_NAMES = ROUTE_NAMES;

    public async signOut() {
        await this.$store.dispatch(Actions.CLEAR_AUTH);
        await this.$router.push({ name: ROUTE_NAMES.LOGIN });
    }
}
</script>

<template>
    <div class="w-full px-2">
        <span class="whitespace-nowrap sm:inline-flex hidden text-gray-600">{{ capitalizeFirstLetter($store.getters.user.username) }} ({{ $store.getters.user.role }})</span>
    </div>

    <div class="flex items-center pl-1 pr-2">
        <Menu as="div" class="relative inline-block text-left">
            <MenuButton class="bg-gray-700 rounded-lg flex text-sm focus:outline-none focus:ring-1 hover:bg-gray-500 p-1">
                <span class="sr-only">Open user menu</span>
                <UserIcon class="w-4 h-4 text-white hidden sm:inline-block" />
                <b class="sm:hidden inline-block text-xs px-1 text-white">{{ $store.getters.user.username.charAt(0).toUpperCase() }}</b>
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="origin-top-right absolute z-40 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                        <MenuItem v-slot="{ active }">
                        <a href="#" @click="signOut" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Sign Out
                        </a>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>