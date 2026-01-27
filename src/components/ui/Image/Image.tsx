import { memo } from 'react'
import NextImage, { type ImageProps as NextImageProps } from 'next/image'

import { faststoreLoader } from './loader'

type ImageProps = NextImageProps & {
  fetchPriority?: string
}

function Image({ loading = 'lazy', fetchPriority, ...otherProps }: ImageProps) {
  const imageProps: Record<string, unknown> = {
    ...otherProps,
    'data-fs-image': true,
    loader: faststoreLoader,
    loading,
    priority: loading === 'eager',
  }

  if (fetchPriority) {
    imageProps.fetchpriority = fetchPriority
  }

  return <NextImage {...(imageProps as NextImageProps)} />
}

Image.displayName = 'Image'
export default memo(Image)
