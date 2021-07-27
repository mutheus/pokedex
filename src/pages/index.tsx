import { useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import useSWR from 'swr'
import { MdSearch } from 'react-icons/md'
import { MdNavigateBefore } from 'react-icons/md'
import { Palette } from 'react-palette'

import styles from './styles.module.scss'

const fetcher = url => axios.get(url).then(res => res.data)

export default function Home({ pokemon }) {
  const [pagination, setPagination] = useState(0)
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon/?offset=${pagination}&limit=${pagination === 150 ? 1 : 15}`, fetcher)
  
  if (!data) return <div>Loading...</div> 
 
  const result = data.results.map((item, index) => {
    const str = item.url,
      imgIndex = str.match(/\/[0-9]+/),
      imageURL = `https://pokeres.bastionbot.org/images/pokemon${imgIndex}.png`;
    
    return {
      name: item.name,
      url: item.url,
      image: imageURL
    }
  })
  
  return (
    <div>
      <main className={styles.content}>
        <div className={styles.actions}>
          <MdNavigateBefore size={35} />
          
          <strong>1st Gen Pokemon</strong>
          
          <MdSearch size={35} />
        </div>
        
        <h2 className={styles.title}>1ts Gen <br />
          <strong>Pokemon</strong>
        </h2>
        
        <div className={styles.pokeContainer}>
          { result.map((pokemon, index) => {
            return (
              <div key={index} className={styles.pokeItem}>
                <Palette src={pokemon.image}>
                  {({ data, loading, error }) => (
                    <div className={styles.bg} style={{ backgroundColor: data.lightVibrant }}></div>
                  )}
                </Palette>
                
                <Image 
                  src={pokemon.image}
                  alt={pokemon.name}
                  width={230}
                  height={230}
                />
                <h3>{pokemon.name}</h3>
              </div>
            )
          })}
        </div>
        
        <div className={styles.btnContainer}>
          <button onClick={() => pagination > 0 && setPagination(pagination - 15)}>Prev</button>
          <button onClick={() => pagination <= 135 && setPagination(pagination + 15)}>Next</button>
        </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pokemon = await fetcher('https://pokeapi.co/api/v2/pokemon/?limit=15')
  
  return {
    props: {
      pokemon
    }
  }
}
