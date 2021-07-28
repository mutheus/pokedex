import { useState, useRef, useEffect } from 'react'
import { GetStaticProps } from 'next'
import axios from 'axios'
import useSWR from 'swr'
import { MdSearch } from 'react-icons/md'
import { MdNavigateBefore } from 'react-icons/md'
import { MdNavigateNext } from 'react-icons/md'
import { Pokemon } from '../components/Pokemon'

import styles from './styles.module.scss'

const fetcher = url => axios.get(url).then(res => res.data)

export default function Home({ pokemon }) {
  const [pagination, setPagination] = useState(0)
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${pagination}&limit=${pagination === 150 ? 1 : 15}`
  const { data } = useSWR(url, fetcher)
  
  return (
    <div>
      <main className={styles.content}>
        <div className={styles.actions}>
          <MdNavigateBefore size={35} />
          
          <strong>1st Gen Pokemon</strong>
          
          <MdSearch size={35} />
        </div>
        
        <h2 className={styles.title}>
          1ts Gen <br />
          <strong>Pokemon</strong>
        </h2>
        
        <Pokemon data={data} />
        
        <div className={styles.btnContainer}>
          <button onClick={() => pagination > 0 && setPagination(pagination - 15)}>
            <MdNavigateBefore size={35} />
            Previous
          </button>
          
          <button onClick={() => pagination <= 135 && setPagination(pagination + 15)}>
            Next
            <MdNavigateNext size={35} />
          </button>
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
