<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { XIcon } from '@heroicons/vue/outline';
import { GrowlMessage, COLORS } from "../../store/state";

interface Growls {
    [key: string]: GrowlMessage
}

/**
 * Usage Example:
 *
 *      this.$store.dispatch(Actions.NOTIFY, {
 *          message: "test message",
 *          status: STATUS_NOTIFICATION
 *      })
 */
@Options({
    components: { XIcon }
})
export default class Growl extends Vue {
    public COLORS = COLORS;
    public growls: Growls = {};

    public GROWL_TIME = 5000;
    public APPEARANCE_TIME = 700;
    public DISMISS_TIME = 2000;

    public growlsRefs: string[] = [];

    public get hideGrowlWrapper(): boolean {
        return Object.keys(this.growls).length > 0;
    }

    /**
     * @param growl
     */
    @Watch('$store.state.notification')
    private notificationWatcher = (growl: GrowlMessage): void => {
        this.showGrowlMessage(growl);
    }

    /**
     * @param growl
     * @private
     */
    private showGrowlMessage(growl: GrowlMessage): void {
        let key = `${Math.floor(Math.random() * Math.pow(10, 15))}`;
        this.growls[key] = growl;
        this.growlsRefs.push(key);
        this.animateGrowl(key);
    }

    /**
     * @param key
     * @private
     */
    private animateGrowl(key: string): void {
        // appear
        setTimeout(() => {
            this.growls[key].show = true;
        }, 10)

        // remove
        setTimeout(() => {
            if (this.growls.hasOwnProperty(key)) {
                this.close(key);
            }
        }, this.GROWL_TIME)

        // animate dismiss
        setTimeout(() => {
            if (this.growls.hasOwnProperty(key)) {
                this.growls[key].show = false;
            }
        }, this.GROWL_TIME - this.DISMISS_TIME - 200)
    }

    /**
     * @param key
     */
    public getGrowlIndexPosition(key: string): number {
        return (this.growlsRefs.indexOf(key) * 55) + 15;
    }

    /**
     * @param key
     */
    public close(key: string): void {
        delete this.growls[key];
        if (Object.keys(this.growls).length < 1) {
            this.growlsRefs = [];
        }
    }

}
</script>

<template>
    <div class="fixed inset-x-0 bottom-0 flex flex-col items-center justify-center px-4 pointer-events-none sm:px-6 sm:justify-start space-y-4 z-50 pb-4" v-show="hideGrowlWrapper">
        <div v-for="(key, index) in Object.keys(growls)" :key="index" :style="`transition-duration: ${growls[key].show ? APPEARANCE_TIME : DISMISS_TIME}ms; left: calc(50% - 14rem); bottom: ${getGrowlIndexPosition(key)}px;`"
            class="max-w-md w-full shadow-lg rounded-lg pointer-events-auto transition-opacity linear absolute inset-x-0 " :class="`bg-${COLORS[growls[key].status]}-800 ${growls[key].show ? 'opacity-100' : 'opacity-0'}`">
            <div class="rounded-lg shadow-xs overflow-hidden">
                <div class="p-2">
                    <div class="flex items-start">
                        <div class="flex-shrink-0 text-white">
                            <i class="far fa-check-circle"></i>
                        </div>
                        <div class="ml-3 w-0 flex-1 pt-0.5">
                            <p class="text-sm leading-5 font-medium text-white">
                                {{ growls[key].message }}
                            </p>
                        </div>
                        <div class="ml-4 flex-shrink-0 flex">
                            <button class="inline-flex focus:outline-none transition ease-in-out duration-150" @click="close(key)">
                                <XIcon class="block h-6 w-6 text-white opacity-40 hover:opacity-100" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>