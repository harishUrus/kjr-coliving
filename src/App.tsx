import { useLenis } from './lib/useLenis'
import { useScrollTriggerRefresh } from './hooks/useScrollTriggerRefresh'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Properties } from './components/Properties'
import { Testimonials } from './components/Testimonials'
import { RoomOptions } from './components/RoomOptions'
import { Amenities } from './components/Amenities'
import { WhyChoose } from './components/WhyChoose'
import { HowItWorks } from './components/HowItWorks'
import { AppointmentForm } from './components/AppointmentForm'
import { Faq } from './components/Faq'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { WhatsAppButton } from './components/WhatsAppButton'

function App() {
  useLenis()
  useScrollTriggerRefresh()

  return (
    <div className="bg-cream">
      <Header />
      <main>
        <Hero />
        <About />
        <Properties />
        <Testimonials />
        <RoomOptions />
        <Amenities />
        <WhyChoose />
        <HowItWorks />
        <AppointmentForm />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
