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
        id: 'video-tour',
        label: 'Video Tour',
        thumbnail: '/gallery/signature-poster.jpg',
        items: [
          { src: '/gallery/videos/walkthrough.mp4', type: 'video', poster: '/gallery/signature-poster.jpg' },
        ],
      },
    ],
  },
]

export function getPhotoTour(propertySlug: PhotoTour['propertySlug']) {
  return PHOTO_TOURS.find((t) => t.propertySlug === propertySlug) ?? null
}
