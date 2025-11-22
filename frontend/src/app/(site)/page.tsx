'use client'

import { useToast } from "@/components/use-toast"
import { api } from "@/services/api"
import { characterType } from "@/types/character"
import { useEffect, useState } from "react"
import style from './style.module.css'
import Card from "@/components/site_PS/card/card"
import Navbar from "@/components/site_PS/navbar/navbar"
import Footer from "@/components/site_PS/footer/footer"

export default function Home() {
  const [characters, setCharacters] = useState<characterType[] | undefined>()
  const {toast} = useToast()

  useEffect( ()=>{
    const requestData = async() => {
      const {response} = await api<characterType[]>('GET', `/characters`)

      if (response){
        setCharacters(response)
      }else{
        toast({
          title: 'Personagens não encontrados',
        })
      }
    }
    requestData()
  }, [toast])
  
  return (
    <>
      <div className={style.page}>
       <Navbar logo="./images/logo.png"/>
        <h1 className={style.title}>Personagens</h1>
        <div className={style.wrapper}>
        {characters?.map((character: characterType, index: number) => (
          <Card character={character} key={index}/>
        ))}
        </div>
        <Footer/>
      </div>
    </>
  )
}