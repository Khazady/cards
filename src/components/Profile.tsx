import React from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../redux/store'
import {Redirect} from 'react-router-dom'

export const Profile = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <h1>PROFILE PAGE</h1>
    )
}