<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { Prop } from "vue-property-decorator";
import { ExclamationIcon } from '@heroicons/vue/outline';

@Options({
    components: { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot, ExclamationIcon }
})
export default class Warning extends Vue {
    @Prop({ required: false })
    public show: boolean = false;

    @Prop({ required: false })
    public message: string = "";

    public close(): void {
        this.$emit('update:show', false);
    }
}
</script>

<template>
    <TransitionRoot as="template" :show="show">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="close">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div>
                            <div class="text-left">
                                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-orange-700">
                                    <ExclamationIcon class="w-8 h-8 inline-block" />
                                    Warning!
                                </DialogTitle>
                            </div>
                        </div>

                        <div class="py-4 border-t border-b border-1 border-gray-100">
                            {{ message }}
                        </div>

                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                            <button type="button"
                                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                @click="close" ref="cancelButtonRef">
                                Close
                            </button>
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>