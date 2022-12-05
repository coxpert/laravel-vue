import { createStore, StoreOptions } from 'vuex'
import mutations, { Mutations } from './mutations'
import actions, { Actions } from './actions'
import getters, { Getters } from './getters'
import state, { StateType } from './state'

const store = createStore({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
} as StoreOptions<StateType>)

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: typeof store
    }
}

export { getters, Getters, actions, Actions, mutations, Mutations, state }

export default store
