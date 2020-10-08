import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from 'components/App'

// I hope I have time to write more!
describe('Main flow', () => {
  it('Has everything in place', async () => {
    const { getByPlaceholderText, getByText } = render(<App />)
    
    const columnsInputField = getByPlaceholderText('Set column quantity') as HTMLInputElement
    expect(columnsInputField).toBeInTheDocument()
    expect(columnsInputField.value).toBe('')

    const rowsInputField = getByPlaceholderText('Set row quantity') as HTMLInputElement
    expect(rowsInputField).toBeInTheDocument()
    expect(rowsInputField.value).toBe('')

    const button = getByText('Generate') as HTMLButtonElement
    expect(button).toBeInTheDocument()

    fireEvent.change(columnsInputField, { target: { value: '4' } })
    expect(columnsInputField.value).toBe('4')
    
    fireEvent.change(rowsInputField, { target: { value: '2' } })
    expect(rowsInputField.value).toBe('2')
  })
})
