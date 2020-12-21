import React from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'
import {useFormik} from 'formik'
import {loginTC} from '../redux/loginReducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../redux/store'
import {Redirect} from 'react-router-dom'
import {RequestStatusType} from '../redux/requestStatusType'

export const LogIn = () => {

    const dispatch = useDispatch()
    // @ts-ignore
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.login.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 6) {
                errors.password = 'Must be more than 5 characters'
            }
            return errors
        },
        onSubmit: values => {
            // debugger
            dispatch(loginTC(values))
            formik.resetForm()
        }
    })

    if (isLoggedIn) {
        return <Redirect to={'/profile'}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                                       target={'_blank'}>here </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: nya-admin@nya.nya</p>
                        <p>Password: 1qazxcvBG</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email
                            ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                            : null
                        }
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox {...formik.getFieldProps('rememberMe')}/>}
                        />
                        {status === 'pending' &&
                        <div style={{color: 'red'}}><span>Please, waiting a few seconds...</span></div>}
                        <Button type={'submit'}
                                variant={'contained'}
                                color={'secondary'}
                                disabled={status === 'pending'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}