import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from 'lucide-react'

interface AchievementInputProps {
  achievements: string[]
  setAchievements: (achievements: string[]) => void
}

export function AchievementInput({ achievements, setAchievements }: AchievementInputProps) {
  const [newAchievement, setNewAchievement] = useState('')

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, newAchievement.trim()])
      setNewAchievement('')
    }
  }

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          value={newAchievement}
          onChange={(e) => setNewAchievement(e.target.value)}
          placeholder="Enter an achievement"
        />
        <Button type="button" onClick={addAchievement}>Add</Button>
      </div>
      <ul className="space-y-2 ">
        {achievements.map((achievement, index) => (
          <li key={index} className="flex items-center space-x-2 ">
            <span className="flex-grow">{achievement}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeAchievement(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

