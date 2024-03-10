import React from 'react'

type RadioProps = {
    type: string;
    group: string;
    label: string;
    additionalClass?: string;
}

export default function Radio(props: RadioProps) {

    const additionalClass = props.additionalClass ? props.additionalClass : '';

  return (
    <div className={`${additionalClass}`}>
        <input type="radio" id={props.type} name={props.group}/>
        <label htmlFor={props.type} className='ml-2'>{props.label}</label>
    </div>
  )
}
