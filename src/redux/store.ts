import {applyMiddleware, combineReducers, createStore} from 'redux'
import {profileReducer} from './profileReducer'
import {loginReducer} from './loginReducer'
import {registrationReducer} from './registarationReducer'
import thunk from 'redux-thunk'
import {changePasswordReducer} from './changePasswordReducer'
import {recoveryPasswordReducer} from './recoveryPasswordReducer'

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    registration: registrationReducer,
    recovery: recoveryPasswordReducer,
    password: changePasswordReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))