<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Errors extends Vue {

}
</script>

<template>
    <div class="h-full w-full text-center absolute left-0 top-0">
        <div class="flex justify-center items-center h-full">
            <router-view></router-view>
        </div>
    </div>
</template>