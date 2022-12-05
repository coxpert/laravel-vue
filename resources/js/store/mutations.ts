import { Auth, GrowlMessage, StateType } from './state'
import { UserType } from '@/api/users'

export enum Mutations {
    SET_USER = 'SET_USER',
    SET_USERS = 'SET_USERS',
    NOTIFY = 'NOTIFY',
    AUTH = 'AUTH',
    CLEAR_AUTH = 'CLEAR_AUTH',
    SET_LOCATION = 'SET_LOCATION',
    SET_AUDIT_LOCATION = 'SET_INVENTORY_LOCATION',
    SET_AUDIT_BARCODE = 'SET_AUDIT_BARCODE',
}

export default {
    [Mutations.SET_USER](state: StateType, user: UserType): void {
        state.user = user
    },
    [Mutations.SET_USERS](state: StateType, users: Array<UserType>): void {
        state.users = users
    },
    [Mutations.NOTIFY](state: StateType, growlMessage: GrowlMessage): void {
        state.notification = growlMessage
    },
    [Mutations.AUTH](state: StateType, auth: Auth): void {
        state.auth = auth
        state.auth.isAuth = true
    },
    [Mutations.CLEAR_AUTH](state: StateType): void {
        state.auth = {
            token: '',
            isAuth: false,
            user: undefined,
        }
        state.user = {
            user_id: null,
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            role: '',
        }
    },
}
