'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
// import { ScrollArea } from '@/app/ui/utils/scroll-area'
// import { Separator } from '@/app/ui/utils/separator'
import { ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// This would typically come from a global state management solution like Redux or Zustand
const initialCartItems = [
  {
    id: '1',
    name: 'Introduction to React',
    price: 49.99,
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Advanced TypeScript',
    price: 79.99,
    image: '/placeholder.svg'
  }
]

export function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const router = useRouter()

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)

  const handleCheckout = () => {
    // In a real application, this would initiate the checkout process
    console.log('Proceeding to checkout')
    router.push('/checkout')
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-10rem)] pb-10">
          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 py-4">
                <div className="relative h-16 w-16 overflow-hidden rounded">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </ScrollArea>
        <div className="space-y-4 pb-4">
          <Separator />
          <div className="flex justify-between">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Button onClick={handleCheckout} className="w-full" disabled={cartItems.length === 0}>
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

