import api from './'

export type ProductType = {
  productId: number
  productName: string
  inventoryQuantity: number
  shipOnWeekends: boolean
  maxBusinessDaysToShip: number
  shipDate: string
  orderedDate: string
}

export const PRODUCT_QUERY_FIELDS = `
    productId,
    productName,
    inventoryQuantity,
    shipOnWeekends,
    maxBusinessDaysToShip,
    shipDate,
    orderedDate,
`

export async function products(): Promise<ProductType[]> {
  const response = await api.client.request(`
        query ProductsQuery{
            products {
                ${PRODUCT_QUERY_FIELDS} 
            }
        }
    `)

  if(response.errors) {
    throw response.errors
  }

  return response.data.products
}
