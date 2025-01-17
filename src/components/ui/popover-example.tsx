'use client'

import React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from './popover'
import { Button } from '@/components/ui/button'

export default function PopoverExample() {
  return (
    <div className="p-4">
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="p-4 w-64">
          <h3 className="text-lg font-semibold mb-2">Popover Title</h3>
          <p className="text-sm text-gray-500">
            This is the content of the popover. You can put any React components or HTML here.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  )
}

