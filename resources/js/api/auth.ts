import api from './'
import { UserType } from './users'
import { USER_BASIC_QUERY_FIELDS } from './users'

export async function login(
    login: string,
    password: string
): Promise<UserType> {
    return (
        await api.client.request(`
        mutation {
            login(
                input: {
                    password: "${password}"
                    email: "${login}"
                }
            ) {
                token,
                user { ${USER_BASIC_QUERY_FIELDS} }
            }
        }
    `)
    ).data.login
}
