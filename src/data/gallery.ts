export type GalleryMedia = {
  src: string
  type: 'image' | 'video'
  propertySlug: 'kjr-elite' | 'kjr-signature' | 'kjr-platinum'
}

// Seed gallery content from real KJR Co-Living site photos/videos. None of
// this has been confirmed per-property by the KJR team yet, so the same set
// is shown under all three properties for now — update propertySlug once
// confirmed, or manage via the admin gallery dashboard once it is wired to
// real storage.
export const GALLERY: GalleryMedia[] = (['kjr-elite', 'kjr-signature', 'kjr-platinum'] as const).flatMap(
  (propertySlug) => [
    { src: '/gallery/room-1.jpg', type: 'image' as const, propertySlug },
    { src: '/gallery/room-2.jpg', type: 'image' as const, propertySlug },
    { src: '/gallery/room-3.jpg', type: 'image' as const, propertySlug },
    { src: '/gallery/room-4.jpg', type: 'image' as const, propertySlug },
    { src: '/gallery/videos/montage.mp4', type: 'video' as const, propertySlug },
    { src: '/gallery/videos/edit-7.mp4', type: 'video' as const, propertySlug },
    { src: '/gallery/videos/edit-8.mp4', type: 'video' as const, propertySlug },
    { src: '/gallery/videos/hostel-edit.mp4', type: 'video' as const, propertySlug },
    { src: '/gallery/videos/video-ad.mp4', type: 'video' as const, propertySlug },
    { src: '/gallery/videos/walkthrough.mp4', type: 'video' as const, propertySlug },
    { src: '/gallery/videos/influencer-tamil.mp4', type: 'video' as const, propertySlug },
  ],
)
