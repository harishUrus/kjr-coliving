export type PhotoTourMedia = {
  src: string
  type: 'image' | 'video'
  poster?: string
}

export type PhotoTourCategory = {
  id: string
  label: string
  thumbnail: string
  items: PhotoTourMedia[]
}

export type PhotoTour = {
  propertySlug: 'kjr-elite' | 'kjr-signature' | 'kjr-platinum'
  categories: PhotoTourCategory[]
}

// Categorized real photos/videos, Airbnb-style "photo tour" layout. Only
// Elite and Signature have confirmed categorized content so far — add
// Platinum here once its photos are categorized by the KJR team.
export const PHOTO_TOURS: PhotoTour[] = [
  {
    propertySlug: 'kjr-elite',
    categories: [
      {
        id: 'bedroom',
        label: 'Bedroom',
        thumbnail: '/gallery/elite/bedroom-1.jpg',
        items: [
          { src: '/gallery/elite/bedroom-1.jpg', type: 'image' },
          { src: '/gallery/elite/bedroom-2.jpg', type: 'image' },
          { src: '/gallery/elite/bedroom-3.jpg', type: 'image' },
          { src: '/gallery/elite/bedroom-4.jpg', type: 'image' },
        ],
      },
      {
        id: 'wardrobe',
        label: 'Wardrobe',
        thumbnail: '/gallery/elite/wardrobe-1.jpg',
        items: [{ src: '/gallery/elite/wardrobe-1.jpg', type: 'image' }],
      },
      {
        id: 'bathroom',
        label: 'Full Bathroom',
        thumbnail: '/gallery/elite/bathroom-1.jpg',
        items: [{ src: '/gallery/elite/bathroom-1.jpg', type: 'image' }],
      },
      {
        id: 'kitchen',
        label: 'Kitchenette',
        thumbnail: '/gallery/elite/kitchen-1.jpg',
        items: [{ src: '/gallery/elite/kitchen-1.jpg', type: 'image' }],
      },
    ],
  },
  {
    propertySlug: 'kjr-signature',
    categories: [
      {
        id: 'exterior',
        label: 'Exterior',
        thumbnail: '/gallery/signature/exterior-1.jpg',
        items: [{ src: '/gallery/signature/exterior-1.jpg', type: 'image' }],
      },
      {
        id: 'bedroom',
        label: 'Bedroom',
        thumbnail: '/gallery/signature/bedroom-1.jpg',
        items: [{ src: '/gallery/signature/bedroom-1.jpg', type: 'image' }],
      },
      {
        id: 'wardrobe',
        label: 'Wardrobe',
        thumbnail: '/gallery/signature/wardrobe-1.jpg',
        items: [{ src: '/gallery/signature/wardrobe-1.jpg', type: 'image' }],
      },
      {
        id: 'bathroom',
        label: 'Full Bathroom',
        thumbnail: '/gallery/signature/bathroom-1.jpg',
        items: [{ src: '/gallery/signature/bathroom-1.jpg', type: 'image' }],
      },
      {
        id: 'dining',
        label: 'Dining Area',
        thumbnail: '/gallery/signature/dining-1.jpg',
        items: [{ src: '/gallery/signature/dining-1.jpg', type: 'image' }],
      },
      {
        id: 'laundry',
        label: 'Laundry',
        thumbnail: '/gallery/signature/laundry-1.jpg',
        items: [{ src: '/gallery/signature/laundry-1.jpg', type: 'image' }],
      },
      {
        id: 'elevator',
        label: 'Elevator',
        thumbnail: '/gallery/signature/elevator-1.jpg',
        items: [
          { src: '/gallery/signature/elevator-1.jpg', type: 'image' },
          { src: '/gallery/signature/elevator-2.jpg', type: 'image' },
        ],
      },
    ],
  },
]

export function getPhotoTour(propertySlug: PhotoTour['propertySlug']) {
  return PHOTO_TOURS.find((t) => t.propertySlug === propertySlug) ?? null
}
