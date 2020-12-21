import React from 'react'
import {Button, FormControl, FormGroup, Grid, TextField} from '@material-ui/core'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {recoveryPasswordTC} from '../redux/recoveryPasswordReducer'
import {AppRootStateType} from '../redux/store'
import {RequestStatusType} from '../redux/requestStatusType'

export const Recovery = () => {

    // @ts-ignore
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.recovery.status)
    const dispatch = useDispatch()

    type FormikErrorType = {
        email?: string
    }

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values: FormikErrorType) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            const data = {
                email: values.email,
                from: 'From Ignat - Мяу*',
                message: `<div style="background-color: lime; padding: 15px">Password recovery link: 
	            <span><a href='http://localhost:3000/password/$token$'>Link</a></span></div>`
            }
            dispatch(recoveryPasswordTC(data))
            formik.resetForm()
        }
    })

    return (
        <Grid container justify="center">
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <TextField
                                type="email"
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                            {status === 'pending' &&
                            <div style={{color: 'red'}}><span>Please, waiting a few seconds...</span></div>}
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'secondary'}
                                    disabled={status === 'pending'}>
                                Enter your email...
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}