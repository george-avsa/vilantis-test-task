import React from 'react'

type RadioProps = {
    type: string;
    group: string;
    label: string;
    additionalClass?: string;
    checked: boolean;
    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Radio(props: RadioProps) {

    const additionalClass = props.additionalClass ? props.additionalClass : '';

  return (
    <div className={`${additionalClass}`} id={props.type}> 
        <input type="radio" id={props.type} onChange={props.handleRadioChange} name={props.group} checked={props.checked}/>
        <label htmlFor={props.type} className='ml-2'>{props.label}</label>
    </div>
  )
}
