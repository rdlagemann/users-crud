import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { LoginForm } from './Login'
import { mockInputEvent } from '../../utils'

test('Should render ', async () => {
  const { getByTestId } = render(<LoginForm login={jest.fn()} />)

  expect(getByTestId('login-form')).toBeInTheDocument()
})

test('render is fetching message ', async () => {
  const { getByTestId } = render(<LoginForm isFetching login={jest.fn()} />)

  expect(getByTestId('login-fetching-message')).toBeInTheDocument()
})

test('render error message ', async () => {
  const errorMessage = 'An error occurred'
  const { getByTestId } = render(<LoginForm error={{ message: errorMessage }} login={jest.fn()} />)

  expect(getByTestId('login-error-message')).toBeInTheDocument()
})

test('Should call login function to API', () => {
  const login = jest.fn()

  const { getByTestId } = render(<LoginForm login={login} />)

  const usernameInput = getByTestId('login-username')
  const passwordInput = getByTestId('login-password')
  const submitButton = getByTestId('login-submit-button')

  fireEvent.change(usernameInput, mockInputEvent('João'))
  fireEvent.change(passwordInput, mockInputEvent('123456'))
  fireEvent.click(submitButton)

  expect(login.mock.calls.length).toBe(1)
})
