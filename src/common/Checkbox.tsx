import React from 'react'

type PropsType = {
    type: string
    name: string
    value: boolean
    onChange: any // ??
}

export const Checkbox = (props: PropsType) => {
    return (
        <div className="switch">
            <input id="switch-1"
                   className="switch-input"
                   type={props.type}
                   name={props.name}
                   checked={props.value}
                   onChange={props.onChange}/>
            <label htmlFor="switch-1" className="switch-label">Switch</label>
        </div>
    )
}