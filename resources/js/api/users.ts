import api from './'

export enum UserRoles {
    USER = 'user',
    ADMIN = 'admin',
    GUEST = 'guest',
}

export type UserType = {
    user_id?: number | string | null
    username: string
    email: string
    role: string
    first_name?: string
    last_name?: string
}

export const USER_TEMPLATE: UserType = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    role: 'user',
}

export const USER_BASIC_QUERY_FIELDS = `
    user_id,
    email,
    username,
    last_name,
    first_name,
    role
`

export async function user(id: number): Promise<UserType> {
    const response = await api.client.request(`
        query {
            me {
                ${USER_BASIC_QUERY_FIELDS} 
            }
        }
    `)
    if(response.errors) {
        throw response.errors
    }
    return response.data.me
}
