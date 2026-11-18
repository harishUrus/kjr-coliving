export type RoomCategory = 'Single Sharing' | 'Two Sharing' | 'Three Sharing' | 'Four Sharing'

export type Property = {
  slug: 'kjr-elite' | 'kjr-signature' | 'kjr-platinum'
  name: string
  tagline: string
  description: string
  // Location/address intentionally omitted until verified by the KJR team —
  // do not invent addresses, pricing, occupancy, or amenities per property.
  location: string | null
  roomCategories: RoomCategory[] | null
  heroImage: string
  comingSoon?: boolean
}

export const PROPERTIES: Property[] = [
  {
    slug: 'kjr-elite',
    name: 'KJR Elite',
    tagline: 'Comfortable, well-kept rooms for everyday living.',
    description:
      'KJR Elite offers furnished PG accommodation designed around comfort and convenience, with clean common areas and attentive upkeep.',
    location: null,
    roomCategories: null,
    heroImage: '/gallery/room-1.jpg',
  },
  {
    slug: 'kjr-signature',
    name: 'KJR Signature',
    tagline: 'A refined stay with thoughtful everyday comforts.',
    description:
      'KJR Signature is built for residents who want a dependable, well-maintained living space with modern in-room amenities.',
    location: null,
    roomCategories: null,
    heroImage: '/gallery/room-3.jpg',
  },
  {
    slug: 'kjr-platinum',
    name: 'KJR Platinum',
    tagline: 'Premium PG living with a focus on quality.',
    description:
      'KJR Platinum brings together comfortable rooms and well-managed common spaces for a convenient, premium living experience.',
    location: null,
    roomCategories: null,
    heroImage: '/gallery/room-4.jpg',
    comingSoon: true,
  },
]
