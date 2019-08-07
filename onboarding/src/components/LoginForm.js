import React from 'react'

import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

function LoginForm({ values, errors, touched }) {
    return (
        <Form>
            {touched.name && errors.name && <p>{errors.name}</p>}
            <Field type='text' name='name' placeholder='Name' />
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field type='email' name='email' placeholder='Email' />
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field type='password' name='password' placeholder='Password' />
            <label>
                <Field type='checkbox' name='tos' checked={values.tos} />
                Accept TOS
            </label>
            <button type='submit'>Submit</button>
        </Form>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false,
        }
    },

    validationSchema: yup.object().shape({
        name: yup
            .string()
            .required('Name is required'),
        email: yup
            .string()
            .email('Email is not in valid format')
            .required('Email is required'),
        password: yup
            .string()
            .min(6, 'Password must be 6 characters or longer')
            .required('Password is required'),
        // tos: yup
        //     .boolean().oneOf([true], 'You must accept ToS to continue.')
    }),

    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        if (values.email === 'waffle@syrup.com') {
            setErrors({email: 'That email is already taken.'})
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
})(LoginForm)

export default FormikLoginForm