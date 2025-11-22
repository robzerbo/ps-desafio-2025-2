'use client'

import { acquireCharacter } from "@/actions/character";
import { toast } from "@/components/use-toast";
import { characterType } from "@/types/character";
import { useState } from "react";
import style from './style.module.css'


interface characterProp{
    character: characterType
}

export default function Card({character}: characterProp){
    const [characterAcquired, setCharacterAcquired] = useState(character.acquired)  

    const submit = async () => {
      const { error } = await JSON.parse(await acquireCharacter(character.id))
  
      if (error) {
        toast({
          title: 'Não foi possível comprar o personagem!',
        })
      } else {
        toast({
          title: 'Personagem comprado com sucesso!',
        })
        setCharacterAcquired(1)
      }
    }

    return (
        <div className={style.card}>
            <img src={character.image} alt='Imagem do personagem' className={style.card_img}/>
            <div className={style.card_body}>
                <h2 className={style.card_name}>{character.name}</h2>
                <p className={style.card_content}>Poderes: {character.powers}</p>
                <p className={style.card_content}>Classe: {character.character_class.name}</p>
                <div className={style.card_content}>
                    {characterAcquired == 0 ? (
                        <form action={submit}>
                          <button className={style.acquireButton} type="submit">Comprar</button>
                        </form>
                    ) : (
                        <button className={style.soldOutButton} >Esgotado</button>
                    )}
                </div>
            </div>
        </div>
    )
}