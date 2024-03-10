import React, { Dispatch, SetStateAction, useState } from 'react';
import Radio from './../components/ui/Radio';
import Filter from './../components/Filter';
import { FilterFormType, FilterType } from '../App';
import FilterButton from './ui/FilterButton';

type FilterFormProps = {
    filter: FilterType,
    setFilter: Dispatch<SetStateAction<FilterType>>,
    setFilterForm: Dispatch<SetStateAction<FilterFormType>>,
    setFilterValue: Dispatch<SetStateAction<string>>,
    filterValue: string | undefined,
}

export default function FilterForm(props: FilterFormProps) {

    const [radios, setRadios] = useState([
        {label: 'По бренду', group: 'filter', type: 'brand', checked: false},
        {label: 'По цене', group: 'filter', type: 'price', checked: false},
        {label: 'По названию', group: 'filter', type: 'product', checked: false},
    ]); 

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newRadios = radios.map(radio => {
            const name = e.target.id;
            props.setFilter(name);
            return {...radio, checked: (name === radio.type)}
        })
        setRadios(newRadios);
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let filter = null;
      if (props.filter && props.filterValue) {
        filter = {filter: props.filter, filterValue: props.filterValue};
      }

      props.setFilterForm(filter);
    } 

  return (
      <>
    <form className='container mx-auto px-5 md:px-0 mt-6' onSubmit={handleFormSubmit}>
      <div className='flex flex-col md:flex-row'>
        {radios.map((radio, i) => (
            <Radio 
                key={radio.type}
                label={radio.label} 
                group={radio.group} 
                type={radio.type}
                checked={radio.checked}
                additionalClass={(i !== 0) ? 'ml-0 md:ml-2' : ''} 
                handleRadioChange={handleRadioChange}
            ></Radio>
        ))}
      </div>
      <Filter
        filterValue={props.filterValue}
        setFilterValue={props.setFilterValue}    
    ></Filter>
    <div color='transparent' className='cursor-pointer border-slate-400 text-slate-400 mt-4 md:mt-0 px-3 py-1 rounded-xl text-sm' onClick={() => {
      props.setFilterForm(null)
      props.setFilter(null)
      props.setFilterValue('')
      setRadios(radios.map(radio => {return {...radio, checked: false}}))
    }}>Очистить фильтр</div>
    </form>
    </>
  )
}
