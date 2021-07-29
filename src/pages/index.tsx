import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { MdSearch } from 'react-icons/md'
import { MdNavigateBefore } from 'react-icons/md'
import { MdNavigateNext } from 'react-icons/md'
import { PokemonContainer } from '../components/PokemonContainer'
import { Actions } from '../components/Actions'

import styles from './styles.module.scss'

const fetcher = url => axios.get(url).then(res => res.data)

export default function Home({ pagination, setPagination}) {
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon/?offset=${pagination}&limit=${pagination === 150 ? 1 : 15}`, fetcher)
  const headingRef = useRef()
  
  return (
    <main className={styles.content}>
      <Actions leftIcon={<MdNavigateBefore size={35} />} rightIcon={<MdSearch size={35} />} text="1st Gen Pokemon" />
      
      <h2 className={styles.title} ref={headingRef}>
        1st Gen <br />
        <strong>Pokemon</strong>
      </h2>
      
      <PokemonContainer data={data} />
      
      <div className={styles.btnContainer}>
        <button onClick={() => pagination > 0 && setPagination(pagination - 15)} style={{display: pagination === 0 ? 'none' : 'flex'}}>
          <MdNavigateBefore size={35} />
          Previous
        </button>
        
        <button onClick={() => pagination <= 135 && setPagination(pagination + 15)} style={{display: pagination < 150 ? 'flex' : 'none'}}>
          Next
          <MdNavigateNext size={35} />
        </button>
      </div>
    </main>
  )
}
