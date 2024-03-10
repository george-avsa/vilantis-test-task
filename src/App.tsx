import React, { useEffect, useState } from 'react';
import PageController from './components/PageController';
import Radio from './components/ui/Radio';
import Filter from './components/Filter';
import ItemList from './components/ItemList';
import Loader from './components/ui/Loader';
import { pages } from '.';
import getData from './api/getData';
import { getItems } from './api/getItems';
import { getUnique } from './helpers/getUnique';
import { useSearchParams } from 'react-router-dom';

type Filter = string | null | undefined;
type Offset = number | undefined;

export default function App() {
  
  const [items, setItems] = useState([]);

  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useSearchParams();
  
  const [filter, setFilter] = useState<Filter>();
  const [offset, setOffset] = useState<Offset>();

  useEffect(() => {
    setFilter(params.get('fitler') || null);
    const page = Number.parseInt(params.get('page') || '') || 1;
    const offset = Number.parseInt(params.get('offset') || '') || 0;
    setPage(page);
    setOffset(offset);
  }, []);
  
  useEffect(() => {
    if ((filter || filter === null) && page && (offset || offset === 0)) {
      const getItemsEffect = async () => {
        const data = await getItems('increment');
        const items = getUnique(data.result) as Item[];
        setItems(items);
      };
      console.log(filter, page, offset);
      if (!items.length) {
        getItemsEffect()
        .catch(e => {
          console.error(e.toString());
        })
      }
    }
    }, [offset, page, filter]);
    
    
    useEffect(() => {
    const pageString = params.get('page') || '';
    const pageInt = Number.parseInt(pageString) || 1;
    setPage(pageInt);
  }, []);

  return (
    <div className='min-h-screen flex flex-col py-8'>

    <PageController page={page} setPage={setPage}></PageController>
    
    <form className='container mx-auto px-5 md:px-0 mt-6'>
      <div className='flex flex-col md:flex-row'>
        <Radio label='По бренду' group='filter' type='brand'></Radio>
        <Radio label='По цене' group='filter' type='price' additionalClass='ml-0 md:ml-2'></Radio>
        <Radio label='По названию' group='filter' type='name' additionalClass='ml-0 md:ml-2'></Radio>
      </div>
      <Filter></Filter>
    </form>

    <>
      {items.length ? (
        <ItemList items={items}></ItemList>
      ):(
        <Loader></Loader>
      )}
    </>

    <PageController additionalClasses="mt-3" page={page} setPage={setPage}></PageController>
    </div>
  )
}