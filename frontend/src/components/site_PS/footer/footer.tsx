'use client'

import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import style from './style.module.css'

export default function Footer(){

    return (<footer className={style.footer}>
        <div className={style.footer_content}>
            <div className={style.contacts}>
                <h2>Seu site com os personagens do Marvel Rivals!</h2>
                <p>Descubra os personagens mais queridos da temporada!</p>
                <div className={style.social_media}>
                    <a href="#" className={style.social_link} id='instagram'>
                        <FaInstagram />
                    </a>
                    <a href="#" className={style.social_link} id='facebook'>
                        <FaFacebook />
                    </a>
                    <a href="#" className={style.social_link} id='linkedin'>
                        <FaLinkedin />
                    </a>
                </div>
            </div>

            <ul className={style.list}>
          <li>
            <h3>Nossa empresa</h3>
          </li>
          <li>
            <a href="#" className={style.sobre_link}>
              AdaptiCast
            </a>
          </li>
          <li>
            <a href="#" className={style.sobre_link}>
              Adapti - Soluções Web
            </a>
          </li>
        </ul>

        <ul className={style.list}>
          <li>
            <h3>Parcerias</h3>
          </li>
          <li>
            <a href="#" className={style.sobre_link}>
              Spotify
            </a>
          </li>
          <li>
            <a href="#" className={style.sobre_link}>
              UFES
            </a>
          </li>
        </ul>
      </div>
      <div className={style.copyright}>
        2025, Feito com ❤ por Adapti Soluções Web
        </div>
    </footer>)
}