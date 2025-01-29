'use client'

import dynamic from 'next/dynamic';  
import AboutHero from '@/components/about/about-hero'
import History from '@/components/about/history'
import Mission from '@/components/about/mission'


const LazyPrograms = dynamic(() => import('@/components/about/programs'), {  
  loading: () => <p>Loading...</p>, // Optional: loading indication while the component is loading  
  ssr: false // Optional: Disable server-side rendering for this component  
});

const LazyContactCTA = dynamic(() => import('@/components/about/contact-cta'), {  
  loading: () => <p>Loading...</p>, // Optional: loading indication while the component is loading  
  ssr: false // Optional: Disable server-side rendering for this component  
});

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      <AboutHero />
      <History />
      <Mission />
      <LazyPrograms />
      <LazyContactCTA />
    </div>
  )
}

