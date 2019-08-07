import React from 'react'

import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import './RegistrationForm.css'
import { Box, Divider, Typography } from '@material-ui/core'

function RegistrationForm({ values, errors, touched }) {
    return (
        <Box border={1} maxWidth='300px' width='100%' p={2} m={3}>
            <Form>
                <Box display='flex' flexDirection='column' justifyContent='space-between'>
                    <h2 style={{textAlign:'center', marginTop:'0'}}>Registration</h2>

                    <Field type='text' name='name' placeholder='Name'/>
                    {touched.name && errors.name && <p className='err'>{errors.name}</p>}

                    <Field type='email' name='email' placeholder='Email' style={{marginTop:'1rem'}}/>
                    {touched.email && errors.email && <p className='err'>{errors.email}</p>}

                    <Field type='password' name='password' placeholder='Password' style={{marginTop:'1rem'}}/>
                    {touched.password && errors.password && <p className='err'>{errors.password}</p>}

                    <Field component='select' name='role' style={{marginTop:'1rem'}}>
                        <option value='roleSelect' disabled>Please Select a Role</option>
                        <option value='Admin'>Admin</option>
                        <option value='Staff'>Staff</option>
                        <option value='Student'>Student</option>
                        <option value='Guest'>Guest</option>
                    </Field>
                    {touched.role && errors.role && <p className='err'>{errors.role}</p>}

                    <Box>
                        <Divider/> 
                        <Typography color='textSecondary' variant='caption'>Optional Information</Typography>
                    </Box>

                    <Field type='text' name='birth' placeholder='Birth: MM/DD/YYYY' style={{marginTop:'1rem'}}/>
                    {touched.birth && errors.birth && <p className='err'>{errors.birth}</p>}

                    <Field type='text' name='phone' placeholder='Phone Number' style={{marginTop:'1rem'}}/>
                    {touched.phone && errors.phone && <p className='err'>{errors.phone}</p>}

                    <Field type='text' name='ssn' placeholder='Social Security Number' style={{marginTop:'1rem'}}/>
                    {touched.ssn && errors.ssn && <p className='err'>{errors.ssn}</p>}

                    <Divider/>

                    <label>
                        <Field type='checkbox' name='tos' checked={values.tos} style={{marginTop:'1rem'}}/>
                        Accept Terms of Service
                    </label>
                    {touched.tos && errors.tos && <p className='err'>{errors.tos}</p>}

                    <button type='submit' style={{marginTop:'1rem'}}>Submit</button>
                </Box>
            </Form>
        </Box>
    )
}

const FormikRegistrationForm = withFormik({
    mapPropsToValues({ name, email, password, role, birth, phone, ssn, tos }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            role: role || 'roleSelect',
            birth: birth || '',
            phone: phone || '',
            ssn: ssn || '',
            tos: tos || false,
        }
    },

    validationSchema: yup.object().shape({
        name: yup
            .string()
            .required('*Name is required'),
        email: yup
            .string()
            .email('*Email is not in valid format')
            .required('*Email is required'),
        password: yup
            .string()
            .min(6, '*Password must be 6 characters or longer')
            .required('*Password is required'),
        role: yup
            .string()
            .matches(/(Admin|Staff|Student|Guest)/, '*Role is required')
            .required('*Role is required'),
        birth: yup 
            .date(),
        phone: yup 
            .string()
            .length(10, '*Phone number invalid'),
        ssn: yup 
            .string()
            .length(9, '*SSN invalid'),
        tos: yup
            .boolean()
            .oneOf([true], '*Accept Terms of Service to continue.')
    }),

    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        if (values.email === 'waffle@syrup.com') {
            setErrors({email: '*That email is already taken.'})
        } else {
            axios
            .post('https://reqres.in/api/users', values)
            .then(res => {
                console.log(res)
                resetForm()
                setSubmitting(false)
            })
            .catch(err => {
                console.log(err)
                setSubmitting(false)
            });
        }
    }
})(RegistrationForm)

export default FormikRegistrationForm