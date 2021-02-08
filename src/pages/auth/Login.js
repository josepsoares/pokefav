import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from 'redux/actions/userActions'

import { Link } from 'react-router-dom'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import {
  Box,
  Text,
  Divider,
  FormControl,
  FormErrorMessage,
  VStack,
  Input,
  Checkbox,
  Icon,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  IconButton,
  Heading,
  Flex
} from '@chakra-ui/react'
import { BiAt, BiKey, BiLogInCircle, BiLowVision, BiShow } from 'react-icons/bi'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import Button from 'components/layout/Button'

const Login = props => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const { registerAutoScroll } = props

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('You must type your e-mail to proceed with the login'),
    password: Yup.string().required(
      'You must type your password to proceed with the login'
    )
  })

  return (
    <Flex flexDir="column" justify="center">
      <Heading textAlign="center" as="h1" pb={10}>
        Login now
      </Heading>
      <Box bg="#ebebd3" color="#3c3c3b" p={[8, 10]} borderRadius="10px">
        <VStack>
          <Button w="60%" colorScheme="facebook" leftIcon={<FaFacebook />}>
            Facebook
          </Button>
          <Button w="60%" bg="white" leftIcon={<FcGoogle />}>
            Google
          </Button>
        </VStack>
        <Box
          display="flex"
          justifyContent="center"
          position="relative"
          w="100%"
        >
          <Heading
            px={6}
            mb={0}
            pb={0}
            as="h5"
            top="28%"
            zIndex="1"
            bg="#ebebd3"
            position="absolute"
          >
            Or
          </Heading>
          <Divider borderColor="#1688b9" my={12} />
        </Box>
        <Formik
          validationSchema={SignupSchema}
          initialValues={{
            email: '',
            password: '',
            rememberMe: true
          }}
          onSubmit={values => {
            dispatch(signIn(values))
          }}
        >
          {props => (
            <VStack
              as="form"
              spacing={4}
              justifyContent="center"
              onSubmit={props.handleSubmit}
            >
              <Field name="email" type="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <InputGroup>
                      <InputLeftElement
                        p={0}
                        pointerEvents="none"
                        children={<BiAt px={2} />}
                      />
                      <Input
                        {...field}
                        id="email"
                        borderColor="#1688b9"
                        placeholder="Type your email"
                        _hover={{
                          borderColor: 'blue.300'
                        }}
                      />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password" type="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <InputGroup>
                      <InputLeftElement
                        p={0}
                        pointerEvents="none"
                        children={<BiKey px={2} color="gray.300" />}
                      />
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        borderColor="#1688b9"
                        placeholder="Type your password"
                        _hover={{
                          borderColor: 'blue.300'
                        }}
                      />
                      <InputRightElement width="4.5rem">
                        <IconButton
                          variant="transparent"
                          h="1.75rem"
                          size="sm"
                          onClick={() => setShow(!show)}
                          icon={show ? <BiShow /> : <BiLowVision />}
                        />
                      </InputRightElement>
                    </InputGroup>

                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="rememberMe">
                {({ field }) => (
                  <FormControl display="flex" justifyContent="center">
                    <Checkbox
                      {...field}
                      id="rememberMe"
                      label="Remember me"
                      defaultIsChecked
                    >
                      Remember me
                    </Checkbox>
                  </FormControl>
                )}
              </Field>

              <Button
                mt={4}
                w="60%"
                type="submit"
                bg="secondary"
                isLoading={props.isSubmitting}
                isDisabled={props.isSubmitting}
                rightIcon={<Icon as={BiLogInCircle} />}
              >
                Login
              </Button>
            </VStack>
          )}
        </Formik>
        <Box pt={6} textAlign="center">
          <Text>
            <Link to="/recover-password" className="basicLink">
              Forgot your password? Click here
            </Link>
          </Text>
          <Text mt={4}>
            <button onClick={() => registerAutoScroll()} className="basicLink">
              Need an account? Click here
            </button>
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default Login
