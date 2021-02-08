import React from 'react'
import { useDispatch } from 'react-redux'
import { recoverPassword } from 'redux/actions/userActions'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import {
  Box,
  Text,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input
} from '@chakra-ui/react'

const RecoverPassword = () => {
  const dispatch = useDispatch()

  const RecoverPassword = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
  })

  return (
    <Box>
      <Heading>Recover password</Heading>
      <Text>
        In order to recover your password we&apos;ll send you an email to the
        address you&apos;ll type in the input
      </Text>
      <Formik
        validationSchema={RecoverPassword}
        initialValues={{ email: null }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
          dispatch(recoverPassword(values))
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">First name</FormLabel>
                  <Input
                    {...field}
                    id="email"
                    placeholder="Type your email here to recover your password"
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              variantColor="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default RecoverPassword
