import React, { createContext, useContext, useState } from 'react'

type PopoverContextType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined)

export const usePopover = () => {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('usePopover must be used within a PopoverProvider')
  }
  return context
}

export const PopoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </PopoverContext.Provider>
  )
}

