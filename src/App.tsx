import React from 'react'
import './App.css'
import {Header} from './components/Header'
import {LogIn} from './components/LogIn'
import {Route} from 'react-router-dom'
import {Registration} from './components/Registration/Registration'
import {Recovery} from './components/Recovery'
import {NewPassword} from './components/NewPassword'
import {Profile} from './components/Profile'

export const App = () => {
    return (
        <div className="App">
            <Header/>
            <Route path='/profile' render={() => <Profile/>}/>
            <Route path='/login' render={() => <LogIn/>}/>
            <Route exact path='/registration' render={() => <Registration/>}/>
            <Route path='/registration/completed' render={() => <h1>Registration completed successfully</h1>}/>
            <Route path='/recovery' render={() => <Recovery/>}/>
            <Route path='/password/:token' render={() => <NewPassword/>}/>
        </div>
    )
}