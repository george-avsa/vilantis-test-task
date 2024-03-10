import React from 'react'

type FilterButtonProps = {
    text: string;
    value: string;
    first?: boolean;
    color: 'slate' | 'transparent';
    onClick?: ()=> void
}

export default function FilterButton(props: FilterButtonProps) {

    const additionalClasses = props.first ? 'ml-0 md:ml-4' : 'ml-4';

    const colorClasses = props.color === 'slate' ? 'bg-slate-400 text-slate-200' : 'border-slate-400 text-slate-400';

    return (
        <button name={props.value} className={`mt-4 md:mt-0 px-3 py-1 rounded-xl text-sm ${colorClasses} ${additionalClasses}`}>{props.text}</button>
    );
}
