import {recoveryPassword, RecoveryPasswordRequestType} from '../api/recoveryPassword'
import {Dispatch} from 'redux'
import {RequestStatusType} from './requestStatusType'


// Reducer
export const recoveryPasswordReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'RECOVERY_PASSWORD':
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}

// AC
export const changeStatusAC = (status: RequestStatusType) => ({
    type: 'RECOVERY_PASSWORD', status
} as const)

// TC
export const recoveryPasswordTC = (data: RecoveryPasswordRequestType) => (dispatch: Dispatch) => {
    dispatch(changeStatusAC('pending'))
    recoveryPassword.recoveryPassword(data)
        .then(res => {
            dispatch(changeStatusAC('resolved'))
        }).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        console.log(error)
    })
}

// State && Types
type InitialStateType = {
    status: RequestStatusType
}
type ActionType = ReturnType<typeof changeStatusAC>

const initialState = {
    status: 'resolved'
}