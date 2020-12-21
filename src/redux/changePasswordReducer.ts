import {changePassword, ChangePasswordRequestType} from '../api/changePassword'
import {Dispatch} from 'redux'
import {RequestStatusType} from './requestStatusType'
import {loggedInAC, loginTC} from './loginReducer'

// Reducer
export const changePasswordReducer = (state = initialState, action: ActionCreatorType) => {
    switch (action.type) {
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                isChangedPassword: action.isChangedPassword,
                status: action.status
            }
        default:
            return state
    }
}

// AC
const changePasswordAC = (isChangedPassword: boolean, status: RequestStatusType) => ({
    type: 'CHANGE_PASSWORD', isChangedPassword, status
} as const)

// TC
export const changePasswordTC = (data: ChangePasswordRequestType) => (dispatch: Dispatch) => {
    dispatch(changePasswordAC(false, 'pending'))
    changePassword.changePassword(data)
        .then(res => {
            dispatch(changePasswordAC(true, 'resolved'))
        }).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        console.log(error)
    })
}

// State && Types
type InitialStateType = {
    isChangedPassword: boolean
    status: RequestStatusType
}
type ActionCreatorType = ReturnType<typeof changePasswordAC>

const initialState = {
    isChangedPassword: false,
    status: 'resolved'
}