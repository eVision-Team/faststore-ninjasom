import React, { ReactElement, cloneElement } from 'react'

interface CustomSortSkeletonProps {
  children?: ReactElement
}

const CustomSortSkeleton: React.FC<CustomSortSkeletonProps> = ({ children }) => {
  if (!children) return null

  // Traduzindo props do children
  const translatedChildren = cloneElement(children, {
    label: 'Ordenar por', // traduzindo label
    options: [
      { value: 'price', label: 'Preço' },
      { value: 'name', label: 'Nome' },
      { value: 'date', label: 'Data' },
    ],
  })

  return <div>{translatedChildren}</div>
}

export default CustomSortSkeleton
