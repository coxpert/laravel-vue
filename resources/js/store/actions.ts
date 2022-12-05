import { Mutations } from './mutations'
import { Auth, GrowlMessage } from './state'
import { Commit, Dispatch } from 'vuex/types/index.js'
import { STORAGE_API_KEY, STORAGE_USER_ID } from '../api/client'
import api from '@/api'
import { UserType } from '@/api/users'

export enum Actions {
    SET_USER = 'SET_USER',
    NOTIFY = 'NOTIFY',
    SET_AUTH = 'SET_AUTH',
    CLEAR_AUTH = 'CLEAR_AUTH',
    CHECK_AUTH = 'CHECK_AUTH',
    SET_LOCATION = 'SET_LOCATION',
    SET_AUDIT_LOCATION = 'SET_INVENTORY_LOCATION',
    SET_AUDIT_BARCODE = 'SET_AUDIT_BARCODE',
}

export default {
    async [Actions.SET_USER](
        context: { commit: Commit },
        user: UserType
    ): Promise<void> {
        context.commit(Mutations.SET_USER, user)
    },
    async [Actions.NOTIFY](
        context: { commit: Commit },
        growlMessage: GrowlMessage
    ): Promise<void> {
        context.commit(Mutations.NOTIFY, growlMessage)
    },
    async [Actions.SET_AUTH](
        context: { commit: Commit; dispatch: Dispatch },
        auth: Auth
    ): Promise<void> {
        // remember api key
        localStorage.setItem(STORAGE_API_KEY, auth.token)

        // remember user id
        localStorage.setItem(STORAGE_USER_ID, `${auth.user?.user_id}`)
        // store auth
        context.commit(Mutations.AUTH, auth)
        context.commit(Mutations.SET_USER, auth.user)
    },
    [Actions.CLEAR_AUTH](context: { commit: Commit }): void {
        // remember api key
        localStorage.clear()
        context.commit(Mutations.CLEAR_AUTH)
    },
    async [Actions.CHECK_AUTH](context: any): Promise<void> {
        let user_id = localStorage.getItem(STORAGE_USER_ID)
        let token = localStorage.getItem(STORAGE_API_KEY)
        if (user_id) {
            try {
                let user = await api.user(+user_id)
                context.commit(Mutations.AUTH, {
                    token: token,
                    user: user,
                })
                context.commit(Mutations.SET_USER, user)
            } catch (e) {
                console.error(e)
                context.commit(Mutations.CLEAR_AUTH)
            }
        }
    },
}
