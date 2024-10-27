import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
// needed for toBeInTheDocument function
import '@testing-library/jest-dom'
import UserLoginFormSimple from '../components/users/UserLoginFormSimple'
import UserService from '../services/UserService'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom/client';
import { unmountComponentAtNode } from "react-dom";

window.React = React

const response500 = {status: 500, user: {firstName:'elke', lastName:'steegmans', email: 'elke.steegmans@ucll.be', username: 'elste', password: 'elste123'}}
const user = {firstName:'elke', lastName:'steegmans', email: 'elke.steegmans@ucll.be', username: 'elste', password: 'elste123'}

let x: jest.Mock
x = jest.fn()

// test('valid login ...', async () => {   
//     UserService.loginUser = x.mockResolvedValue(response)
//     act(() => {
//           const login = render(<UserLoginFormSimple />)
//     })

//     // code that causes React state updates should be wrapped into act()
//     await act(async() => {
//         const inputName = screen.getByTestId('name-login')
//         fireEvent.change(inputName, {target: {value: 'elste'}})
//         const inputPassword = screen.getByTestId('password-login')
//         fireEvent.change(inputPassword, {target: {value: 'elste123'}})
//         const button = screen.getByTestId('button-login')
//         fireEvent.click(button)
//     })
//     expect(screen.getByText("Something went wrong"))
// })

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

test('invalid login: 500 error ...', async () => {   
    UserService.loginUser = x.mockResolvedValue(response500)

    act(() => {
        let login = render(<UserLoginFormSimple />)
    })

    // code that causes React state updates should be wrapped into act()
    await act(async() => {
        const inputName = screen.getByTestId('name-login')
        fireEvent.change(inputName, {target: {value: 'elste'}})
        const inputPassword = screen.getByTestId('password-login')
        fireEvent.change(inputPassword, {target: {value: 'elste123'}})
        const button = screen.getByTestId('button-login')
        fireEvent.click(button)
        await screen.findByText("Something went wrong")
    })
    expect(screen.getByText("Something went wrong"))
})

// test('invalid login: empty username ...', async () => {   
//     const login = render(<UserLoginFormSimple />)
//     const inputName = await screen.getByTestId('name-login')
//     fireEvent.change(inputName, {target: {value: '   '}})
//     const inputPassword = screen.getByTestId('password-login')
//     fireEvent.change(inputPassword, {target: {value: 'elke123'}})
//     const button = screen.getByTestId('button-login')
//     fireEvent.click(button)
//     expect(screen.getByText("Name is required"))
// })