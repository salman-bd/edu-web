'use client'

import { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"


interface ProfileAlertDialogProps {
  isOpen: boolean
  onClose: () => void
  onContinue: (type: string, isCscAffiliated: string) => void
}


export function ProfileAlertDialog({ isOpen, onClose, onContinue }: ProfileAlertDialogProps) {

  const [type, setType] = useState<string>('')
  const [isCscAffiliated, setIsCscAffiliated] = useState<string>('')

  const handleContinue = () => {
    if (type && isCscAffiliated) {
      onContinue(type, isCscAffiliated);
    } else {
      alert('Please answer all questions before proceeding.')
    }
  }

  return (
    <AlertDialog open={isOpen} >
      <AlertDialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-indigo-600">Complete Your Profile</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              We need a bit more information to tailor your profile experience.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-6 my-6">
            <div>
              <Label className="text-base font-semibold text-gray-700">What is your status?</Label>
              <RadioGroup value={type} onValueChange={setType} className="mt-2">
                <div className='flex flex-row gap-4'>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="status-student" className="text-indigo-600" />
                    <Label htmlFor="status-student" className="text-gray-600">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teacher" id="status-teacher" className="text-indigo-600" />
                    <Label htmlFor="status-teacher" className="text-gray-600">Teacher</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label className="text-base font-semibold text-gray-700">Are you a student or teacher of CSC?</Label>
              <RadioGroup value={isCscAffiliated} onValueChange={setIsCscAffiliated} className="mt-2">
                <div className='flex flex-row gap-4'>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="csc-yes" className="text-indigo-600" />
                    <Label htmlFor="csc-yes" className="text-gray-600">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="csc-no" className="text-indigo-600" />
                    <Label htmlFor="csc-no" className="text-gray-600">No</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          <AlertDialogFooter className='gap-2'>
            <Button variant="outline" onClick={onClose} className="bg-red-700 text-white hover:bg-red-600 hover:text-white">Cancel</Button>
            <Button onClick={handleContinue} className="bg-indigo-600 text-white hover:bg-indigo-500">Continue</Button>
          </AlertDialogFooter>

        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
