import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../redux/store'
import {Button, FormControl, FormGroup, Grid, TextField} from '@material-ui/core'
import {Redirect, useParams} from 'react-router-dom'
import {useFormik} from 'formik'
import {changePasswordTC} from '../redux/changePasswordReducer'
import {RequestStatusType} from '../redux/requestStatusType'

export const NewPassword = () => {

    // @ts-ignore
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.password.status)
    const isChangedPassword = useSelector<AppRootStateType, boolean>(state => state.password.isChangedPassword)
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()

    type FormikErrorType = {
        password?: string
    }

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: (values: FormikErrorType) => {
            const errors: FormikErrorType = {}
            if (!values.password || values.password.length < 6) {
                errors.password = 'Password must be no more than 5 characters'
            }
            return errors
        },
        onSubmit: values => {
            const data = {
                password: values.password,
                resetPasswordToken: token
            }
            dispatch(changePasswordTC(data))
            formik.resetForm()
        }
    })

    if (isChangedPassword) {
        return <Redirect to={'/login'}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}/>
                        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        {status === 'pending' &&
                        <div style={{color: 'red'}}><span>Please, waiting a few seconds...</span></div>}
                        <Button type={'submit'}
                                variant={'contained'}
                                color={'secondary'}
                                disabled={status === 'pending'}>
                            Change new password
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}