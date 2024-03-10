import React, { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import Arrow from './../assets/down-arrow.svg';
import { useSearchParams } from "react-router-dom";
import { parseUrlParams } from "../helpers/parseUrlParams";
import { stringifyParams } from "../helpers/stringifyParams";
import { getItems } from "../api/getItems";
import { getUnique } from "../helpers/getUnique";

type PageControllerProps = {
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    setItems: Dispatch<SetStateAction<Item[]>>,
    additionalClasses?: string;
};

export default function PageController(props: PageControllerProps) {

  const [params, setParams] = useSearchParams();
  const additionalClasses = props.additionalClasses ? props.additionalClasses : '';


  const handleDecremenet = async () => {
    if (props.page > 1) {
      const parsedParams = parseUrlParams(params) || {};
      props.setPage((page) => page - 1);
      setParams(stringifyParams({...parsedParams, page: props.page - 1}));

      // props.setItems([]);
      // const data = await getItems('decrement');
      // const items = getUnique(data.result) as Item[];
      // props.setItems(items);
    }
  }

  const handleIncremenet = async () => {
    const parsedParams = parseUrlParams(params) || {};
    props.setPage((page) => page + 1);
    setParams(stringifyParams({...parsedParams, page: props.page + 1}));

    // props.setItems([]);
    // const data = await getItems('increment');
    // const items = getUnique(data.result) as Item[];
    // props.setItems(items);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  } 

  return (
    <div className={`container mx-auto px-5 md:px-0 ${additionalClasses}`}>
      <form className='flex gap-2' onSubmit={handleSubmit}>
        <button 
          className={`bg-slate-300 px-1 rounded-md ${props.page === 1 ? 'opacity-40 cursor-default' : ''}`}
          onClick={handleDecremenet}
        >
            <Arrow className='w-4 h-4 text-white rotate-90' />
          </button>
        <span className='px-3 border-slate-300 text-slate-500 border-2 rounded-md'>{props.page}</span>
        <button 
          className='bg-slate-300 px-1 rounded-md'
          onClick={handleIncremenet}
        >
          <Arrow className='w-4 h-4 text-white -rotate-90' />
        </button>
      </form>
    </div>
  )
}
