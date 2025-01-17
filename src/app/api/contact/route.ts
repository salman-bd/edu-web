import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  
  // Here you would typically send an email or save to a database
  console.log('Received contact form submission:', body)

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Return a success response
  return NextResponse.json({ message: 'Form submitted successfully' })
}

