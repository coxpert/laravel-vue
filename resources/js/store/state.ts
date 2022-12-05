import { UserType, UserRoles } from '@/api/users'

export type Auth = {
    isAuth?: boolean
    token: string
    user?: UserType
}

export const STATUS_NOTIFICATION = 'NOTIFICATION'
export const STATUS_SUCCESS = 'SUCCESS'
export const STATUS_ERROR = 'ERROR'
export const STATUS_WARNING = 'WARNING'

export enum COLORS {
    NOTIFICATION = 'sky',
    SUCCESS = 'green',
    ERROR = 'red',
    WARNING = 'yellow',
}

export type GrowlMessage = {
    message: string
    status: COLORS
    show?: boolean
}

export type StateType = {
    user: UserType
    users: Array<UserType>
    auth: Auth
    notification: GrowlMessage
}

const state: StateType = {
    user: {
        user_id: null,
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        role: UserRoles.GUEST,
    },
    users: [],
    auth: {
        token: '',
        isAuth: false,
        user: undefined,
    },
    notification: {
        message: '',
        status: COLORS.NOTIFICATION,
        show: false,
    },
}

export default state
