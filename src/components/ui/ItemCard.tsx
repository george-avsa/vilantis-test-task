import React from 'react'

export default function ItemCard(props: {item: Item}) {
  return (
      <div className='flex flex-col bg-slate-100 rounded-xl px-5 py-2'>
        <div className='flex justify-between'>
          {props.item.brand && (
            <p className='text-base'>{props.item.brand}</p>
          )}
          <span className='text-xs text-slate-400'>{props.item.id}</span>
        </div>
        <h3 className='text-xl'>{props.item.product}</h3>
        <p className='text-right text-lg mt-2 text-slate-700 font-semibold flex-1 flex items-end justify-end'>{props.item.price} р</p>
      </div>
  )
}
