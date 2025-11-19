import { characterClassType } from "./character-class"

export type characterType = {
  id: string
  name: string
  image: string
  acquired: number
  description: string
  powers: string
  character_class_id: string
  character_class: characterClassType
  created_at: Date
  updated_at: Date
}
