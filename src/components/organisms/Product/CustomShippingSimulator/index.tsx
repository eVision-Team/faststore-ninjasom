import type { ShippingSimulationProps as UIShippingSimulationProps } from '@faststore/ui'
import React, { useEffect } from 'react'

import { ShippingSimulation as UIShippingSimulation } from '@faststore/ui'
import { useShippingSimulation_unstable } from '@faststore/core/experimental'

type ShippingSimulationOptionalProps =
  | 'title'
  | 'formatter'
  | 'inputLabel'
  | 'optionsLabel'
  | 'idkPostalCodeLinkProps'

interface CustomShippingSimulatorProps
  extends Partial<
    Pick<UIShippingSimulationProps, ShippingSimulationOptionalProps>
  > {
  productShippingInfo: {
    id: string
    quantity: number
    seller: string
  }
}

type ShippingSLA = {
  carrier: string
  localizedEstimates: string
  price: number
}

const translateEstimate = (value?: string) => {
  if (!value) {
    return value ?? ''
  }

  return value
    .replace(/up to/gi, 'Até')
    .replace(/business days?/gi, 'dias úteis')
    .replace(/business day/gi, 'dia útil')
    .replace(/days?/gi, 'dias')
    .replace(/day/gi, 'dia')
}

const translateError = (value?: string) => {
  if (!value) {
    return value ?? ''
  }

  if (/postal code/i.test(value)) {
    return 'CEP inválido'
  }

  return value
}

const translateLabel = (value?: string, fallback?: string) => {
  if (!value) {
    return fallback
  }

  if (value === 'Shipping') {
    return 'Frete'
  }

  if (value === 'Postal Code') {
    return 'CEP'
  }

  if (value === 'Shipping options') {
    return 'Opções de frete'
  }

  return value
}

const formatPostalCode = (value: string) => {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 8)

  if (digitsOnly.length <= 5) {
    return digitsOnly
  }

  return `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5)}`
}

const CustomShippingSimulator = ({
  productShippingInfo,
  formatter,
  inputLabel,
  title,
  idkPostalCodeLinkProps,
  optionsLabel,
  ...otherProps
}: CustomShippingSimulatorProps) => {
  const {
    input,
    shippingSimulation,
    handleSubmit,
    handleOnInput,
    handleOnClear,
  } = useShippingSimulation_unstable(productShippingInfo)

  const { postalCode, displayClearButton, errorMessage } = input

  const location =
    [
      shippingSimulation?.address?.neighborhood,
      shippingSimulation?.address?.city,
    ]
      .filter(Boolean)
      .join(' / ') ?? ''

  const options: ShippingSLA[] =
    shippingSimulation?.logisticsInfo?.[0]?.slas ?? []

  const translatedOptions = options.map((option) => ({
    ...option,
    localizedEstimates: translateEstimate(option.localizedEstimates),
  }))

  const formatterWithFallback = (
    value: number,
    variant: Parameters<NonNullable<typeof formatter>>[1]
  ) => {
    if (value === 0) {
      return 'Grátis'
    }

    return formatter ? formatter(value, variant) : value.toString()
  }

  // ============================
  // useEffect para adicionar a classe "free-freight"
  // ============================
  useEffect(() => {
    const interval = setInterval(() => {
      const tds = document.querySelectorAll<HTMLTableCellElement>(
        'td[data-fs-table-cell-align="right"]'
      )
      tds.forEach((td) => {
        const text = td.textContent?.trim()
        if (text === '0' || text === '0,00') {
          td.classList.add('free-freight')
        } else {
          td.classList.remove('free-freight')
        }
      })
    }, 200) // verifica a cada 200ms

    return () => clearInterval(interval)
  }, []) // sem dependências, só roda uma vez no mount

  return (
    <UIShippingSimulation
      formatter={formatterWithFallback}
      onInput={(event) => {
        const formatted = formatPostalCode(event.currentTarget.value)
        handleOnInput({
          ...event,
          currentTarget: {
            ...event.currentTarget,
            value: formatted,
          },
        } as React.ChangeEvent<HTMLInputElement>)
      }}
      onSubmit={handleSubmit}
      onClear={handleOnClear}
      location={location}
      options={translatedOptions}
      address={shippingSimulation?.address}
      displayClearButton={displayClearButton}
      errorMessage={translateError(errorMessage)}
      postalCode={postalCode}
      inputLabel={translateLabel(inputLabel, 'CEP')}
      title={translateLabel(title, 'Frete')}
      optionsLabel={translateLabel(optionsLabel, 'Opções de frete')}
      idkPostalCodeLinkProps={{
        ...idkPostalCodeLinkProps,
        children:
          idkPostalCodeLinkProps?.children ?? 'Não sei meu CEP',
        target: '_blank',
        rel: 'noreferrer',
      }}
      {...otherProps}
    />
  )
}

export default CustomShippingSimulator
