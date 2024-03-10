import React, { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { FilterType } from '../../App'

export default function FilterInput(props: {filterValue: string | undefined,
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <input 
        value={props.filterValue}
        type="text" 
        onChange={props.handleChangeInput}
        className={`border-2 pl-2 border-slate-100 rounded-xl py-1
        focus:outline-1 focus:outline-slate-200 text-sm w-full md:w-80`} 
        placeholder='Значение'
    />
  )
}
