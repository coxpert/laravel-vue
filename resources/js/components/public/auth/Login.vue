<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import api from "../../../api";
import { STATUS_ERROR } from "../../../store/state";
import { Actions } from "../../../store/actions";
import { ShieldExclamationIcon } from '@heroicons/vue/outline';
import { ROUTE_NAMES } from "../../../router";

@Options({
    components: { ShieldExclamationIcon }
})
export default class Login extends Vue {
    public email: string = "";
    public password: string = "";
    public errorMessage = "";
    public loading = false;
    public ROUTE_NAMES = ROUTE_NAMES

    async login(): Promise<void> {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.errorMessage = "";
        try {
            let auth = await api.login(this.email, this.password);
            await this.$store.dispatch(Actions.SET_AUTH, auth);
            await this.$router.push({ name: ROUTE_NAMES.HOME });
        } catch (e) {
            console.dir(e)
            this.errorMessage = "Email or Password is invalid.";
            await this.$store.dispatch(Actions.NOTIFY, {
                message: this.errorMessage,
                status: STATUS_ERROR
            })
        }
        this.loading = false;
    }
}
</script>

<template>
    <div class="min-h-full flex flex-col justify-center py-12 px-4 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <b class="mt-4 block text-center font-bold text-xl text-gray-700">
                Admin Dashboard
            </b>
        </div>

        <div class="mt-4 px-4" v-on:keyup.enter="login">
            <div class="bg-white py-8 px-4 shadow max-w-sm mx-auto">
                <div class="space-y-6">
                    <div class="border-2 border-rose-600 rounded-md px-4 py-2" v-if="!!errorMessage">
                        <ShieldExclamationIcon class="inline-block mr-4 text-red-800 h-4 w-4" />
                        {{ errorMessage }}
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div class="mt-1">
                            <input v-model="email" name="email" type="email" id="email" autocomplete="email" required=""
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div class="mt-1">
                            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required=""
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" :disabled="!email || password.length < 4 || loading" @click="login" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm
                                text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
                                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600">
                            Sign in
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
