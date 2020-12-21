import React from 'react'

type PropsType = {
    text: string
    type: string
    name: string
    value: string
    onChange: any // ??
}

export const InputText = (props: PropsType) => {
    return (
        <div>
            <input type={props.type} name={props.name} value={props.value} onChange={props.onChange}/>
            <h3>{props.text}</h3>
        </div>
    )
}