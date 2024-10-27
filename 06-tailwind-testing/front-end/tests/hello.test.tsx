import React from 'react'
import { render, screen } from '@testing-library/react'
import Hello from '../components/hello'

window.React = React

test('Test Hello World ...', async () => {
    render(<Hello />)

    expect(screen.getByText('Hello World!'))
})  