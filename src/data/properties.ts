export type RoomCategory = 'Single Sharing' | 'Two Sharing' | 'Three Sharing' | 'Four Sharing'

export type Property = {
  slug: 'kjr-elite' | 'kjr-signature' | 'kjr-platinum'
  name: string
  tagline: string
  description: string
  // Location/rating intentionally left null until verified — the values set
  // below for Elite and Signature come from their own Google Business
  // listings, not invented.
  location: string | null
  mapLink: string | null
  googleRating: { score: number; count: number } | null
  roomCategories: RoomCategory[] | null
  heroImage: string
  heroVideo?: string
  comingSoon?: boolean
}

export const PROPERTIES: Property[] = [
  {
    slug: 'kjr-elite',
    name: 'KJR Elite',
    tagline: 'Comfortable, well-kept rooms for everyday living.',
    description:
      'KJR Elite offers furnished PG accommodation designed around comfort and convenience, with clean common areas and attentive upkeep.',
    location: 'River View Colony, 81A, 6th Cross Street, Karapakkam, Chennai',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=KJR+Elite+PG+for+Men+Karapakkam+Chennai',
    googleRating: { score: 4.8, count: 82 },
    roomCategories: null,
    heroImage: '/gallery/room-1.jpg',
    heroVideo: '/gallery/videos/video-ad.mp4',
  },
  {
    slug: 'kjr-signature',
    name: 'KJR Signature',
    tagline: 'A refined stay with thoughtful everyday comforts.',
    description:
      'KJR Signature is built for residents who want a dependable, well-maintained living space with modern in-room amenities.',
    location: 'River View Colony, 163/45, 6th Cross Street, Karapakkam, Chennai',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=KJR+Signature+PG+for+Men+Karapakkam+Chennai',
    googleRating: { score: 4.9, count: 21 },
    roomCategories: null,
    heroImage: '/gallery/room-3.jpg',
    heroVideo: '/gallery/videos/walkthrough.mp4',
  },
  {
    slug: 'kjr-platinum',
    name: 'KJR Platinum',
    tagline: 'Premium PG living with a focus on quality.',
    description:
      'KJR Platinum brings together comfortable rooms and well-managed common spaces for a convenient, premium living experience.',
    location: null,
    mapLink: null,
    googleRating: null,
    roomCategories: null,
    heroImage: '/gallery/room-4.jpg',
    comingSoon: true,
  },
]
