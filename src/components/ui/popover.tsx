'use client'

import React, { useRef, useEffect } from 'react'
import { PopoverProvider, usePopover } from './popover-context'

export const Popover: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <PopoverProvider>{children}</PopoverProvider>
}

export const PopoverTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setIsOpen } = usePopover()

  return React.cloneElement(React.Children.only(children) as React.ReactElement, {
    onClick: () => setIsOpen((prev) => !prev),
  })
}

export const PopoverContent: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  const { isOpen, setIsOpen } = usePopover()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsOpen])

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={`absolute z-10 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${className}`}
    >
      {children}
    </div>
  )
}

