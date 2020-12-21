import React from 'react'
import {NavItem} from '../common/NavItem'
import {useDispatch} from 'react-redux'
import {logOutTC} from '../redux/loginReducer'

export const Header = () => {

    const dispatch = useDispatch()

    const logOutWrapper = () => {
        dispatch(logOutTC())
    }

    return (
        <ul>
            <NavItem title='PROFILE' to='profile'/>
            <NavItem title='LOG IN' to='login'/>
            <NavItem title='REGISTRATION' to='registration'/>
            <NavItem title='RECOVERY' to='recovery'/>
            <NavItem title='NEW PASSWORD' to='password'/>
            <div onClick={logOutWrapper}><NavItem title='LOG OUT' to='login'/></div>
        </ul>
    )
}