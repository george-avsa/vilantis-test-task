import React, { useEffect } from 'react'
import ItemCard from './ui/ItemCard'
// import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

type ItemListProps = {
    items: Item[];
}

export default function ItemList(props: ItemListProps) {

  return (
    <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-5 md:px-0 flex-1'>
        {props.items && props.items.map((item, i) => (
            <ItemCard key={`${item.id}-${i}`} item={item}></ItemCard>
        ))}
    </div>
  )
}
