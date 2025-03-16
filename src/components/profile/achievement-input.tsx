"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, X, Award } from "lucide-react"

type Achievement = {
  title: string
  description?: string
  date?: Date
}

interface AchievementInputProps {
  achievements: Achievement[]
  setAchievements: (achievements: Achievement[]) => void
}

export function AchievementInput({ achievements = [], setAchievements }: AchievementInputProps) {
  const [newAchievement, setNewAchievement] = useState<Achievement>({
    title: "",
    description: "",
  })

  const addAchievement = () => {
    if (newAchievement.title.trim() === "") return

    setAchievements([...achievements, { ...newAchievement }])
    setNewAchievement({
      title: "",
      description: "",
    })
  }

  const removeAchievement = (index: number) => {
    const updatedAchievements = [...achievements]
    updatedAchievements.splice(index, 1)
    setAchievements(updatedAchievements)
  }

  return (
    <div className="space-y-4">
      {achievements.length > 0 && (
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start gap-2 p-3 rounded-md bg-indigo-50 border border-indigo-100">
              <Award className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-indigo-700">{achievement.title}</h4>
                {achievement.description && <p className="text-sm text-gray-600">{achievement.description}</p>}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeAchievement(index)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3 p-4 border border-dashed border-indigo-200 rounded-md">
        <Input
          placeholder="Achievement title"
          value={newAchievement.title}
          onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
          className="border-indigo-200 focus:border-indigo-600"
        />
        <Textarea
          placeholder="Description (optional)"
          value={newAchievement.description}
          onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
          className="border-indigo-200 focus:border-indigo-600"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addAchievement}
          className="mt-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Achievement
        </Button>
      </div>
    </div>
  )
}

