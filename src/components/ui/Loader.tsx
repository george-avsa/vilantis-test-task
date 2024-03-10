import React from 'react'
import LoaderSpinner from './../../assets/loader.svg';

export default function Loader() {
  return (
    <div className='flex-1 flex justify-center items-center'>
      <LoaderSpinner className='text-slate-400'></LoaderSpinner>
    </div>
  )
}
