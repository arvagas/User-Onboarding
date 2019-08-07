import React from 'react'

import FormikRegistrationForm from './components/RegistrationForm'

import { Box } from '@material-ui/core'

function App() {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <FormikRegistrationForm/>
    </Box>
  )
}

export default App
