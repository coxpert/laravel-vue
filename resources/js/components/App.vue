<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import Growl from "./public/Growl.vue";

@Options({
    components: { Growl }
})
export default class AppComponent extends Vue {

}
</script>

<template>
    <div>
        <router-view></router-view>
        <Growl />
        <!-- LOAD TAILWIND DYNAMIC CSS CLASSES -->
        <div class="hidden bg-sky-800 bg-red-800 bg-green-800 bg-orange-800 bg-yellow-800 border-b mb-40"></div>
    </div>
</template>

<style lang="scss">

</style>