import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type BrowsingHistory = {
  products: { id: string; category: string }[]
}
const initialState: BrowsingHistory = {
  products: [],
}

export const browsingHistoryStore = create<BrowsingHistory>()(
  persist(() => initialState, {
    name: 'browsingHistoryStore',
  })
)

export default function useBrowsingHistory() {
  const { products } = browsingHistoryStore()
  return {
    products,
    addItem: (product: { id: string; category: string }) => {
      console.log('dentro de useBrowsingHistory id ==>> ',product.id)
      const index = products.findIndex((p) => p.id === product.id)
      console.log('dentro de useBrowsingHistory index ==>> ',index)
      if (index !== -1) products.splice(index, 1) // Remove duplicate if it exists
      products.unshift(product) // Add id to the start

      if (products.length > 10) products.pop() // Remove excess items if length exceeds 10
      
      console.log('dentro de useBrowsingHistory products  => ',products)
      browsingHistoryStore.setState({
        products,
      })
    },

    clear: () => {
      browsingHistoryStore.setState({
        products: [],
      })
    },
  }
}