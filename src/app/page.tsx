'use client'

import dynamic from 'next/dynamic';  
import Hero from '@/components/home/hero'
import Features from '@/components/home/features';



const LazyPrograms = dynamic(() => import('@/components/home/programs'), {  
  loading: () => <p>Loading...</p>, // Optional: loading indication while the component is loading  
  ssr: false // Optional: Disable server-side rendering for this component  
});
const LazyTestimonials = dynamic(() => import('@/components/home/testimonials'), {  
  loading: () => <p>Loading...</p>, // Optional: loading indication while the component is loading  
  ssr: false // Optional: Disable server-side rendering for this component  
});
const LazyCTA = dynamic(() => import('@/components/home/cta'), {  
  loading: () => <p>Loading...</p>, // Optional: loading indication while the component is loading  
  ssr: false // Optional: Disable server-side rendering for this component  
});

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      <Hero />
      <Features />
      <LazyPrograms />
      <LazyTestimonials />
      <LazyCTA />
    </div>
  )
}

