'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/select'
import { cn } from '@/lib/utils'
import { api, ResponseErrorType } from '@/services/api'
import { characterType } from '@/types/character'
import { characterClassType } from '@/types/character-class'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsCharacterProps {
  character?: characterType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsCharacter({
  character,
  readOnly,
  error,
}: FormFieldsCharacterProps) {
  const { pending } = useFormStatus()
  const [characterClasses, setCharacterClasses] = useState<characterClassType[]>()
  const [updateImage, setUpdateImage] = useState<string | undefined>()


  const requestData = async () => {
    try {
      const response = await api('GET', '/character-classes')
      if (response.error) {
        console.log('Não foi possível obter as classes dos personagens.')
      } else {
        setCharacterClasses(response.response as characterClassType[])
      }
    } catch (e) {
      console.log('Ocorreu um erro inesperado.')
    }
  }

  useEffect(() => {
    requestData()
  }, [])

  return (
    <>
      <FormFieldsGroup>
        {character && <Input defaultValue={character.id} type="text" name="id" hidden />}

        <FormField>
          <Label htmlFor="name" required>
            Nome
          </Label>
          <Input 
            name="name"
            id="name"
            placeholder="Digite o nome do personagem"
            defaultValue={character?.name}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
      </FormField>

      <FormField>
          <Select
            disabled={pending || readOnly}
            name="character_class_id"
            defaultValue={character?.character_class_id}
          >
            <Label htmlFor="character_class_id" required>Classe</Label>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a classe do personagem" />
            </SelectTrigger>
            <SelectContent id="character_class_id">
              <SelectGroup id="character_class_id">
                {characterClasses?.map((CharacterClass: characterClassType, index: number) => (
                  <SelectItem value={CharacterClass.id} key={index}>
                    {CharacterClass.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {error?.errors?.character_class_id && (
          <p className="text-destructive text-xs mt-2">
            {error?.errors?.character_class_id}
          </p>
        )}
        </FormField>

        <FormField>
            <Label htmlFor="powers" required>
              Poderes
            </Label>
            <Input 
              name="powers"
              id="powers"
              placeholder="Digite os poderes do personagem"
              defaultValue={character?.powers}
              disabled={pending}
              readOnly={readOnly}
              error={error?.errors?.powers}
            />
        </FormField>

        <FormField>
            <Label htmlFor="description" required>
              Descrição
            </Label>
            <Input 
              name="description"
              id="description"
              placeholder="Digite a descrição do personagem"
              defaultValue={character?.description}
              disabled={pending}
              readOnly={readOnly}
              error={error?.errors?.description}
            />
        </FormField>

        <FormField>
          <Label htmlFor="name" required>
            Adquirido
          </Label>
          <Input 
            name="acquired"
            id="acquired"
            type="number"  
            min="0" 
            max="1"
            defaultValue={character?.acquired}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.acquired}
          />
      </FormField>
      
        <FormField>
          <Label
              htmlFor='image'
              hidden={readOnly && !character?.image}
              required={!character}
          >
              Imagem
          </Label>
          <Input
              name='image'
              id='image'
              type='file'
              accept='image/*'
              disabled={pending}
              hidden={readOnly}
              onChange={(e) => handleImageChange(e, setUpdateImage)}
              error={error?.errors?.image}
          />
          <ImageForm
              className='aspect-square size-40'
              src={updateImage || character?.image}
          />
        </FormField>
                
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
