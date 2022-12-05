<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({})
export default class Tooltip extends Vue {
    public show: boolean = false;

    @Prop({ required: true })
    value: string = '';

    @Prop({ required: false })
    cssClass: any = {};
}
</script>

<template>
    <div class="w-full relative" @mouseover="show = !!value" @mouseleave="show = false">
        <div v-show="show" :class="cssClass" class="absolute p-1 z-[500]">
            <div v-html="value" class="py-1 px-2 text-xs text-gary-700 bg-gray-100 rounded-sm
                shadow-sm transition-opacity duration-300 bg-opacity-90 border border-gray-500">
            </div>
        </div>
        <div>
            <slot />
        </div>
    </div>
</template>