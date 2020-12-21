import {Dispatch} from 'redux'
import {loginAPI, LoginRequestType} from '../api/login'
import {RequestStatusType} from './requestStatusType'

// Reducer
export const loginReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: action.isLogged,
                status: action.status
            }
        default:
            return state
    }
}

// AC
export const loggedInAC = (isLogged: boolean, status: RequestStatusType) => ({
    type: 'LOGIN', isLogged, status
} as const)

// TC
export const loginTC = (data: LoginRequestType) => (dispatch: Dispatch) => {
    dispatch(loggedInAC(false, 'pending'))
    loginAPI.login(data)
        .then(res => {
            console.log(res)
            if (res.data._id.length) {
                dispatch(loggedInAC(true, 'resolved'))
            }
        }).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        console.log(error)
    })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(loggedInAC(true, 'pending'))
    loginAPI.logOut()
        .then((res) => {
            dispatch(loggedInAC(false, 'resolved'))
        }).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        console.log(error)
    })
}

// State && Types
type ActionsType = ReturnType<typeof loggedInAC>
type InitialStateType = {
    isLoggedIn: boolean
    status: RequestStatusType
}

const initialState = {
    isLoggedIn: false,
    status: 'resolved'
}