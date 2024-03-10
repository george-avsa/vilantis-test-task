import React from 'react'
import FilterInput from './ui/FilterInput'
import FilterButton from './ui/FilterButton'

export default function Filter() {
  return (
    <div className='mt-3'>
        <FilterInput></FilterInput>
        <FilterButton text='Применить' color='slate' first></FilterButton>
        <FilterButton text='Очистить фильтр' color='transparent'></FilterButton>
    </div>
  )
}
