'use client'

import { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ProfileAlertDialogProps {
  isOpen: boolean
  onClose: () => void
  onContinue: (data: ProfileData) => void
}

interface ProfileData {
  type: string
  isCSCAffiliated: string
}

export function ProfileAlertDialog({ isOpen, onClose, onContinue }: ProfileAlertDialogProps) {
  const [type, setType] = useState<string>('')
  const [isCSCAffiliated, setIsCSCAffiliated] = useState<string>('')

  const handleContinue = () => {
    if (type && isCSCAffiliated) {
      onContinue({ type, isCSCAffiliated })
    } else {
      alert('Please answer all questions before proceeding.')
    }
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Please provide some answers before completing your profile</AlertDialogTitle>
          <AlertDialogDescription>
            We need a bit more information to tailor your profile experience.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-6">
          <div>
            <Label className="text-base">What is your status?</Label>
            <RadioGroup value={type} onValueChange={setType} className="mt-2">
              <div className='flex flex-row gap-4'>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="status-student" />
                  <Label htmlFor="status-student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="status-teacher" />
                  <Label htmlFor="status-teacher">Teacher</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label className="text-base">Are you a student or teacher of CSC?</Label>
            <RadioGroup value={isCSCAffiliated} onValueChange={setIsCSCAffiliated} className="mt-2">
              <div className='flex flex-row gap-4'>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="csc-yes" />
                  <Label htmlFor="csc-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="csc-no" />
                  <Label htmlFor="csc-no">No</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          {/* <div>
            <Label className="text-base">What level are you studying in?</Label>
            <RadioGroup value={studyLevel} onValueChange={setStudyLevel} className="mt-2">
              <div className='flex flex-row gap-4'>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="school" id="level-school" />
                  <Label htmlFor="level-school">School</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="college" id="level-college" />
                  <Label htmlFor="level-college">College</Label>
                </div>
              </div>
            </RadioGroup>
          </div> */}
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleContinue}>Continue</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

