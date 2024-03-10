import React from 'react'

export default function FilterInput() {
  return (
    <input 
        type="text" 
        className={`border-2 pl-2 border-slate-100 rounded-xl py-1
        focus:outline-1 focus:outline-slate-200 text-sm w-full md:w-80`} 
        placeholder='Значение'
    />
  )
}
