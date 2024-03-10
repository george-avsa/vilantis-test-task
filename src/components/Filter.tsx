import React, { ChangeEventHandler, DetailedHTMLProps, Dispatch, InputHTMLAttributes, SetStateAction } from 'react'
import FilterInput from './ui/FilterInput'
import FilterButton from './ui/FilterButton'
import { FilterType } from '../App'

type FilterComponentType = {
    setFilterValue: Dispatch<SetStateAction<string>>,
    filterValue: string | undefined,
}


export default function Filter(props: FilterComponentType) {
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFilterValue(e.target.value || '');
  }
  return (
    <div className='mt-3'>
        <FilterInput filterValue={props.filterValue} handleChangeInput={handleChangeInput}></FilterInput>
        <FilterButton text='Применить' color='slate' first value="send"></FilterButton>
    </div>
  )
}
