<script lang="ts">
import Header from './Header.vue';
import { Vue, Options } from 'vue-class-component';

@Options({
    components: {
        Header
    }
})
export default class Layout extends Vue {

}
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <Header />
        <main class="flex flex-1 overflow-hidden h-full max-h-full w-full relative">
            <!-- Content -->
            <div class="absolute left-0 top-0 h-full w-full">
                <div class="absolute left-0 top-0 h-full w-full max-h-full overflow-hidden light-form">
                    <div class="m-auto max-w-full h-full overflow-hidden">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </main>
        <BarcodeScanner />
    </div>
</template>