import _ from 'lodash'

export enum OrderDirections {
    ASC = 'asc',
    DESC = 'desc',
}

export type Order = {
    direction: OrderDirections | boolean
    column: string
}

export function clone<Input>(value: Input): Input {
    return JSON.parse(JSON.stringify(value))
}

export function data_get(
    data: Array<any> | { [key: string]: any } | null | undefined,
    path: string
): any {
    if (!data || !path) {
        return
    }
    const keys = path.split('.')
    if (keys.hasOwnProperty(0) && !!keys?.length) {
        const key = keys[0]
        if (data.hasOwnProperty(key)) {
            if (keys.length > 1) {
                keys.shift()
                if (Array.isArray(data) && !isNaN(+key)) {
                    return data_get(data[+key], keys.join('.'))
                } else if (!Array.isArray(data)) {
                    return data_get(data[key], keys.join('.'))
                }
            } else {
                return !Array.isArray(data) ? data[key] : data[+key]
            }
        }
    }
    return null
}

export async function getFormValidation(formRef: any): Promise<{
    errors: { [key: string]: string }
    valid: boolean
    results: {
        [key: string]: { errors: Array<string>; valid: boolean }
    }
}> {
    return await formRef.validate()
}

export function randomString(): string {
    return Math.random().toString(36).slice(2)
}

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function revealDropdownMenu(elemId: string): void {
    let elem = document.getElementById(elemId)
    setTimeout(() => {
        elem?.querySelector('.multiselect-dropdown')?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
    }, 10)
}

export function getValue(item: any, keys: Array<string>): any {
    let value = item
    keys.forEach((key) => {
        value = value[key]
    })
    return value
}

export function getKeyByValue(object: { [key: string]: any }, value: any) {
    return Object.keys(object).find((key) => object[key] === value)
}

/**
 * Order items by deep properties using dot notation
 */
export function orderBy<InputType>(
    items: Array<InputType>,
    order: Order = { direction: OrderDirections.ASC, column: '' }
): Array<InputType> {
    if (items.length < 1 || !order.direction) return items
    let keys = order.column.split('.')
    return _.orderBy(
        items,
        (item: any) => {
            let value = getValue(item, keys)
            return value
        },
        [order.direction]
    )
}

export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function focusField(attributeFieldId: string): void {
    let fieldElement = document.querySelector(attributeFieldId)
    if (fieldElement) {
        fieldElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        })
        ;(fieldElement as HTMLFormElement).focus()
    }
}

export function toClipboard(value: string | undefined | null): void {
    if (!!value) {
        window.navigator.clipboard.writeText(value)
    }
}

export function formatDate(
    inputDate: string,
    month: any = 'long',
    time: boolean = true
): string {
    let date = new Date(inputDate)
    let conf: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        day: 'numeric',
    }
    if (month) {
        conf.month = month
    }
    if (time) {
        conf.hour = '2-digit'
        conf.minute = '2-digit'
        conf.second = '2-digit'
    }
    return date.toLocaleString('en-US', conf)
}

