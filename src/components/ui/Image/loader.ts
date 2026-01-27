import type { ImageLoaderProps } from 'next/image'

function handleVtexUrls(src: string, width: number, quality = 8) {
  const customQuality =
    quality > 10 ? Math.ceil(Math.min(quality, 100) / 10) : quality

  const regex = /(\/ids\/\d+)\/([^/?]+)(\.[^/?]+)(\?.+)?$/
  if (regex.test(src)) {
    return src.replace(
      regex,
      (_match, idPart, filename, _extension, queryString = '') => {
        const qs = new URLSearchParams(queryString)
        qs.set('quality', customQuality.toString())
        return `${idPart}-${width}-auto/${filename}.webp?${qs.toString()}`
      }
    )
  }

  if (src.includes('vtexassets') && src.includes('/assets')) {
    const url = new URL(src)
    url.searchParams.set('width', width.toString())
    url.searchParams.set('aspect', 'true')
    url.searchParams.set('quality', customQuality.toString())
    return url.toString()
  }

  return null
}

export function faststoreLoader({ src, width, quality }: ImageLoaderProps) {
  const vtexResult = handleVtexUrls(src, width, quality)
  if (vtexResult) {
    return vtexResult
  }

  return src
}
