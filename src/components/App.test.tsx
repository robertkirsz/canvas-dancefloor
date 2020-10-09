import React from 'react'
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'
import App from 'components/App'

describe('Main flow', () => {
  it('Has everything in place', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />)

    const columnsInputField = getByPlaceholderText('Set column quantity') as HTMLInputElement
    const rowsInputField = getByPlaceholderText('Set row quantity') as HTMLInputElement
    const button = getByText('Generate') as HTMLButtonElement
  
    expect(getByText('Loading')).toBeVisible()
    
    expect(columnsInputField).toBeInTheDocument()
    expect(columnsInputField.value).toBe('')

    expect(rowsInputField).toBeInTheDocument()
    expect(rowsInputField.value).toBe('')

    expect(button).toBeInTheDocument()

    await waitForElementToBeRemoved(() => queryByText('Loading'))

    expect(columnsInputField.value).toBe('4')
    expect(rowsInputField.value).toBe('2')

    fireEvent.change(columnsInputField, { target: { value: '20' } })
    expect(columnsInputField.value).toBe('20')

    fireEvent.change(rowsInputField, { target: { value: '10' } })
    expect(rowsInputField.value).toBe('10')
  })
})
