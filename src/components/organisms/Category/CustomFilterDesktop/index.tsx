import { setFacet, toggleFacet, useSearch } from '@faststore/sdk'
import {
  Filter as UIFilter,
  FilterFacetBoolean as UIFilterFacetBoolean,
  FilterFacetBooleanItem as UIFilterFacetBooleanItem,
  FilterFacetRange as UIFilterFacetRange,
  FilterFacets as UIFilterFacets,
} from '@faststore/ui'

import formatPrice from '../../../../utils/formatPrice'

type FacetBooleanItem = {
  label: string
  quantity: number
  selected: boolean
  value: string
}

type FacetBoolean = {
  __typename: 'StoreFacetBoolean'
  key: string
  label: string
  values: FacetBooleanItem[]
}

type FacetRange = {
  __typename: 'StoreFacetRange'
  key: string
  label: string
  min: { absolute: number; selected: number }
  max: { absolute: number; selected: number }
}

type FilterFacet = FacetBoolean | FacetRange

type FilterDesktopProps = {
  facets: FilterFacet[]
  testId?: string
  dispatch: (action: { type: 'toggleExpanded'; payload: number }) => void
  expanded: Set<number>
  title?: string
}

const translateLabel = (label?: string | null) => {
  if (!label) return ''

  const trimmed = label.trim()
  const categoryMatch = trimmed.match(/^Category\s+(\d+)$/i)
  if (categoryMatch) {
    return `Categoria ${categoryMatch[1]}`
  }

  const normalized = trimmed.toLowerCase()
  switch (normalized) {
    case 'category':
      return 'Categoria'
    case 'subcategory':
      return 'Subcategoria'
    case 'price':
      return 'Preço'
    case 'brand':
      return 'Marca'
    case 'color':
      return 'Cor'
    case 'type':
      return 'Tipo'
    case 'filters':
      return 'Filtros'
    case 'delivery':
      return 'Entrega'
    case 'set location':
      return 'Definir localização'
    default:
      return label
  }
}

const formatPriceSafe = (value: number) => formatPrice(value) ?? String(value)

function CustomFilterDesktop({
  facets,
  testId,
  dispatch,
  expanded,
  title,
}: FilterDesktopProps) {
  const safeTestId = testId ?? 'filter'
  const {
    resetInfiniteScroll,
    state: searchState,
    setState: setSearchState,
  } = useSearch()

  return (
    <UIFilter
      testId={`desktop-${safeTestId}`}
      title={translateLabel(title)}
      indicesExpanded={expanded}
      onAccordionChange={(idx: number) =>
        dispatch({ type: 'toggleExpanded', payload: idx })
      }
    >
      {facets.map((facet, idx) => {
        const index = idx
        const { __typename: type, label } = facet
        const isExpanded = expanded.has(index)

        const sectionLabel =
          translateLabel(label) || 'Filtro'

        return (
          <UIFilterFacets
            key={`${safeTestId}-${sectionLabel}-${index}`}
            testId={safeTestId}
            index={index}
            type={type}
            label={sectionLabel}
          >
            {type === 'StoreFacetBoolean' && isExpanded && (
              <UIFilterFacetBoolean>
                {facet.values.map((item) => (
                  <UIFilterFacetBooleanItem
                    key={`${safeTestId}-${facet.label}-${item.value}`}
                    id={`${safeTestId}-${facet.label}-${item.value}`}
                    testId={safeTestId}
                    onFacetChange={(facet) => {
                      setSearchState({
                        selectedFacets: toggleFacet(
                          searchState.selectedFacets,
                          facet
                        ),
                        page: 0,
                      })
                      resetInfiniteScroll(0)
                    }}
                    selected={item.selected}
                    value={item.value}
                    quantity={item.quantity}
                    facetKey={facet.key}
                    label={item.label}
                    type="checkbox"
                  />
                ))}
              </UIFilterFacetBoolean>
            )}
            {type === 'StoreFacetRange' && isExpanded && (
              <UIFilterFacetRange
                facetKey={facet.key}
                min={facet.min}
                max={facet.max}
                formatter={
                  facet.key.toLowerCase() === 'price'
                    ? formatPriceSafe
                    : (value: number) => String(value)
                }
                onFacetChange={(facet) => {
                  setSearchState({
                    selectedFacets: setFacet(
                      searchState.selectedFacets,
                      facet,
                      true
                    ),
                    page: 0,
                  })
                  resetInfiniteScroll(0)
                }}
              />
            )}
          </UIFilterFacets>
        )
      })}
    </UIFilter>
  )
}

export default CustomFilterDesktop