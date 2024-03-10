import React, { useEffect, useState } from 'react';
import PageController from './components/PageController';
import ItemList from './components/ItemList';
import Loader from './components/ui/Loader';
import { getItems } from './api/getItems';
import { getUnique } from './helpers/getUnique';
import { useSearchParams } from 'react-router-dom';
import { pages } from '.';
import FilterForm from './components/FilterForm';

export type FilterType = string | null | undefined;
export type FilterFormType = {
  filter: string;
  filterValue: string | number;
} | null;

export default function App() {
  
  const [items, setItems] = useState<Item[]>([]);

  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useSearchParams();
  
  const [filter, setFilter] = useState<FilterType>();
  const [filterValue, setFilterValue] = useState<string>('');

  const [filterForm, setFilterForm] = useState<FilterFormType>(null);

  useEffect(() => {
    const getData = async () => {
      setItems([]);
      const pageString = params.get("page") || '';
      const page = Number.parseInt(pageString) || 1;

      let filterLocal = null;
      if (filter && filterValue) {
        filterLocal = {[filter]: filterValue};
      }

      const response = await pages.getPage(page, filterLocal);

      if (response.ids && response.ids.length) {
        const data = await getItems(response.ids || []);
        setItems(getUnique(data.result));
      } else {
        setItems([]);
      }

      
    }

    getData().catch(e => {console.error(e.toString())})
  }, [page, filterForm]);

  return (
    <div className='min-h-screen flex flex-col py-8'>

    <PageController setItems={setItems} page={page} setPage={setPage}></PageController>

    <FilterForm 
      filter={filter}
      setFilterForm={setFilterForm}
      setFilter={setFilter}
      filterValue={filterValue}
      setFilterValue={setFilterValue}
    ></FilterForm>

    <>
      {items.length ? (
        <ItemList items={items}></ItemList>
      ):(
        <Loader></Loader>
      )}
    </>

    <PageController setItems={setItems} additionalClasses="mt-3" page={page} setPage={setPage}></PageController>
    </div>
  )
}