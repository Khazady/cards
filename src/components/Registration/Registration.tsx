import {Button, FormControl, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {registerTC} from '../../redux/registarationReducer'
import {AppRootStateType} from '../../redux/store'
import {useFormik} from 'formik'

type FormikErrorType = {
    email?: string
    password?: string
}

export const Registration: React.FC = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        //вызывает проверку на каждом печатаемом символе
        validate: values => {
            const errors: FormikErrorType = {}
            //ошибки поля email
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            //ошибки поля password
            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < 8) {
                errors.password = 'Password must be at least 8 characters'
            }
            return errors
        },
        //в теге form - handleSubmit ссылка на этот коллбек, он принимает в себя значения из полей
        //в виде объекта {имя поля: введенное значение,...}
        onSubmit: values => {
            dispatch(registerTC(values))
        }
    })

    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered)
    if (isRegistered) {
        return <Redirect to={'/registration/completed'}/>
    }

    return (
        <Grid container justify="center">
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>Registration</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Sign up</Button>
                    </FormGroup>
                </FormControl>
            </form>

        </Grid>
    )
}