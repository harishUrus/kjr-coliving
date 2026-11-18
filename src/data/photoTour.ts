export type PhotoTourCategory = {
  id: string
  label: string
  images: string[]
}

export type PhotoTour = {
  propertySlug: 'kjr-elite' | 'kjr-signature' | 'kjr-platinum'
  categories: PhotoTourCategory[]
}

// Categorized real photos, Airbnb-style "photo tour" layout. Only KJR Elite
// has confirmed categorized photos so far — add Signature/Platinum here once
// their photos are categorized by the KJR team.
export const PHOTO_TOURS: PhotoTour[] = [
  {
    propertySlug: 'kjr-elite',
    categories: [
      {
        id: 'bedroom',
        label: 'Bedroom',
        images: [
          '/gallery/elite/bedroom-1.jpg',
          '/gallery/elite/bedroom-2.jpg',
          '/gallery/elite/bedroom-3.jpg',
          '/gallery/elite/bedroom-4.jpg',
        ],
      },
      {
        id: 'wardrobe',
        label: 'Wardrobe',
        images: ['/gallery/elite/wardrobe-1.jpg'],
      },
      {
        id: 'bathroom',
        label: 'Full Bathroom',
        images: ['/gallery/elite/bathroom-1.jpg'],
      },
      {
        id: 'kitchen',
        label: 'Kitchenette',
        images: ['/gallery/elite/kitchen-1.jpg'],
      },
    ],
  },
]

export function getPhotoTour(propertySlug: PhotoTour['propertySlug']) {
  return PHOTO_TOURS.find((t) => t.propertySlug === propertySlug) ?? null
}
