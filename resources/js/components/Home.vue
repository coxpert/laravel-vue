<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import api from "../api";
import { ProductType } from "@/api/products";

@Options({})
export default class Dashboard extends Vue {

  public products: ProductType[] = [];

  mounted() {
    this.getProducts()
  }

  async getProducts() {
    try {
      const products = await api.products()
      this.products = products
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<template>
    <div class="min-w-0 max-w-full max-h-full flex-1 border-t border-gray-200 lg:flex relative overflow-hidden light-form p-5">
      <table class="w-full border-collapse border table-auto">
        <thead class="bg-white border-b">
          <tr>
            <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Product Id</th>
            <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Product Name</th>
            <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Inventory Quantity</th>
            <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Ship on Weekends</th>
            <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Max business days to ship</th>
            <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Ordered Date</th>
            <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Ship Date</th>
            <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product of products" :key="product.productId"  class="bg-gray-100 border-b">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{product.productId}}</td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{product.productName}}</td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{product.inventoryQuantity}}</td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{product.shipOnWeekends ? "Yes" : "No"}}</td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{product.maxBusinessDaysToShip}}</td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{product.orderedDate}}</td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{product.shipDate}}</td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Edit
              </button>
              <button
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
