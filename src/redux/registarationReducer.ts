import {Dispatch} from 'redux'
import {registerAPI, RegistrationDataType} from '../api/registration'

// Reducer
export const registrationReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'registration/SET-IS-REGISTERED':
            return {...state, isRegistered: action.value}
        default:
            return state
    }
}

// AC
export const setIsRegisteredAC = (value: boolean) => ({
    type: 'registration/SET-IS-REGISTERED', value
} as const)

// TC
export const registerTC = (registrationData: RegistrationDataType) => (dispatch: Dispatch<ActionsType>) => {
    registerAPI.register(registrationData)
        .then(res => dispatch(setIsRegisteredAC(true)))
}

// State && Types
export type InitialStateType = {
    isRegistered: boolean
}
type ActionsType = | ReturnType<typeof setIsRegisteredAC>

const initialState = {
    isRegistered: false
}