import React from 'react'
import {NavLink} from 'react-router-dom'

type PropsType = {
    title: string
    to: string
}

export const NavItem: React.FC<PropsType> = ({title, to}) => {
    return (
        <NavLink className='nav_item' to={`/${to}`}>
            {title}
        </NavLink>
    )
}