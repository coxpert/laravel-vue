import { StateType, Auth } from './state'
import { UserType } from '@/api/users'

export enum Getters {
    USER = 'user',
    USERS = 'users',
    AUTH = 'auth',
    ROLES = 'roles',
    PERMISSIONS = 'permission',
    LOCATION = 'location',
    INVENTORY_LOCATION = 'inventoryLocation',
    AUDIT = 'audit',
    AUDIT_LOCATION = 'auditLocation',
    AUDIT_BARCODE = 'auditBarcode',
}

export default {
    [Getters.USER]: (state: StateType): UserType => {
        return state.user
    },
    [Getters.USERS]: (state: StateType): Array<UserType> => {
        return state.users
    },
    [Getters.AUTH]: (state: StateType): Auth => {
        return state.auth
    },
}
