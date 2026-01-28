declare module '@faststore/core/experimental' {
  type ProductShippingInfo = {
    id: string
    seller: string
    quantity: number
  }

  export const useShippingSimulation_unstable: (
    shippingItem: ProductShippingInfo
  ) => {
    input: {
      postalCode?: string
      displayClearButton?: boolean
      errorMessage?: string
    }
    shippingSimulation?: {
      address?: {
        neighborhood?: string
        city?: string
      }
      logisticsInfo?: Array<{
        slas: Array<{
          carrier: string
          localizedEstimates: string
          price: number
        }>
      }>
    }
    handleSubmit: () => void
    handleOnInput: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleOnClear: () => void
  }
}
