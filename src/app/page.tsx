
import Hero from '@/components/home/hero'
import Features from '@/components/home/features';
import Programs from '@/components/home/programs';
// import Testimonials from '@/components/home/testimonials';
import CTA from '@/components/home/cta';
import { AdmissionsContact } from '@/components/admissions/AdmissionsContact';


export default function HomePage() {
  return (
    <div className="bg-gray-50">
      <Hero />
      <Features />
      <Programs />
      <AdmissionsContact/>
      {/* <Testimonials /> */}
      <CTA />
    </div>
  )
}

