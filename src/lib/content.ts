export const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Properties', href: '#properties' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Contact', href: '#schedule-visit' },
]

// Example amenities pending confirmation from the KJR team — swap/trim this
// list once the actual facilities per property are confirmed.
export const AMENITIES = [
  { icon: 'Wifi', label: 'Wi-Fi' },
  { icon: 'Sparkles', label: 'Housekeeping' },
  { icon: 'Droplet', label: 'Drinking Water' },
  { icon: 'WashingMachine', label: 'Laundry' },
  { icon: 'Camera', label: 'CCTV' },
  { icon: 'BatteryCharging', label: 'Power Backup' },
  { icon: 'Users', label: 'Common Areas' },
  { icon: 'UtensilsCrossed', label: 'Dining Facilities' },
  { icon: 'Car', label: 'Parking' },
  { icon: 'ShieldCheck', label: 'Security' },
  { icon: 'Sofa', label: 'Furnished Rooms' },
] as const

export const WHY_CHOOSE = [
  {
    icon: 'LayoutGrid',
    title: 'Multiple Accommodation Options',
    body: 'Three properties to choose from, each suited to different preferences.',
  },
  {
    icon: 'BedDouble',
    title: 'Comfortable Living Spaces',
    body: 'Clean, well-maintained rooms designed for everyday comfort.',
  },
  {
    icon: 'CalendarCheck',
    title: 'Convenient Property Visits',
    body: 'Schedule a visit at a time that works for you, no pressure involved.',
  },
  {
    icon: 'UsersRound',
    title: 'Different Room Sharing Options',
    body: 'Explore sharing categories that fit your budget and preference.',
  },
  {
    icon: 'MessageCircle',
    title: 'Direct Team Assistance',
    body: 'Talk directly to the KJR team over WhatsApp or phone, any time.',
  },
  {
    icon: 'ClipboardCheck',
    title: 'Simple Enquiry Process',
    body: 'No logins, no paperwork upfront — just share your details and visit.',
  },
]

export const HOW_IT_WORKS = [
  {
    number: '01',
    title: 'Explore',
    body: 'Browse the KJR Co-Living properties and available room options.',
  },
  {
    number: '02',
    title: 'Schedule a Visit',
    body: 'Submit your details and preferred visit date and time.',
  },
  {
    number: '03',
    title: 'Connect with Our Team',
    body: 'Our team will contact you to discuss the request and coordinate your property visit.',
  },
]

export const FAQS = [
  {
    q: 'What is KJR Co-Living?',
    a: 'KJR Co-Living offers PG accommodation across multiple properties in Chennai, designed for comfortable, convenient everyday living.',
  },
  {
    q: 'How can I explore the available properties?',
    a: 'Browse the Properties section to view KJR Elite, KJR Signature, and KJR Platinum, along with their photo galleries.',
  },
  {
    q: 'Can I visit a property before making a decision?',
    a: 'Yes. You can schedule a visit through the form on this page, and our team will coordinate a convenient time with you.',
  },
  {
    q: 'What room-sharing options are available?',
    a: 'Room-sharing options vary by property. Our team can walk you through the categories available at each property during your enquiry.',
  },
  {
    q: 'How can I check current availability?',
    a: 'Availability is confirmed directly by our team. Reach out over WhatsApp, phone, or by scheduling a visit to get the latest availability.',
  },
  {
    q: 'How do I schedule a property visit?',
    a: 'Fill out the Schedule a Visit form with your preferred date and time, and our team will get in touch to confirm.',
  },
  {
    q: 'Does submitting a visit request reserve a room?',
    a: 'No. Submitting a visit request does not reserve a room — it simply lets our team know you would like to visit and discuss options.',
  },
  {
    q: 'How can I contact the KJR team?',
    a: 'You can reach us directly over WhatsApp or phone using the contact details on this page.',
  },
]

export const CONTACT = {
  email: null as string | null,
  location: 'Chennai, Tamil Nadu',
}
