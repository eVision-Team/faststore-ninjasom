import { useCallback } from 'react'

const DEFAULT_PARAM_VALUES: Record<string, string[]> = {
  page: ['0'],
  operator: ['and'],
  fuzzy: ['0', 'auto'],
  sort: ['score_desc'],
  facets: [''],
}

const stripDefaultParams = (url: URL) => {
  const cleanUrl = new URL(url.toString())
  const isSearchPage = cleanUrl.pathname === '/s'

  if (!isSearchPage) {
    cleanUrl.search = ''
    return cleanUrl
  }

  Object.entries(DEFAULT_PARAM_VALUES).forEach(([key, values]) => {
    const currentValue = cleanUrl.searchParams.get(key)
    if (
      (currentValue && values.includes(currentValue)) ||
      (key === 'facets' && currentValue)
    ) {
      cleanUrl.searchParams.delete(key)
    }
  })

  return cleanUrl
}

export const useApplySearchState = () => {
  return useCallback((url: URL) => {
    const cleanUrl = stripDefaultParams(url)
    const newUrl = `${cleanUrl.pathname}${cleanUrl.search}`

    // saves state on URL without triggering a re-render.
    window.history.replaceState(
      {
        ...window.history.state,
        as: newUrl,
        url: newUrl,
      },
      '',
      newUrl
    )
  }, [])
}
