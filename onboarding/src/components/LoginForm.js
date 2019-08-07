import React from 'react'

import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const LoginForm = () => {
    return (
        <Form>
            <Field type='text' name='name' placeholder='Name' />
            <Field type='email' name='email' placeholder='Email' />
            <Field type='password' name='password' placeholder='Password' />
            <Field type='checkbox' name='tos' label='Terms of Service' />
            <button>Submit</button>
        </Form>
    )
}

export default LoginForm