import React from 'react'
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'
import App from 'components/App'

describe('Main flow', () => {
  it('Has everything in place', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<App />)
    
    expect(getByPlaceholderText('Set column quantity')).toBeInTheDocument()
    expect(getByPlaceholderText('Set row quantity')).toBeInTheDocument()
    expect(getByText('Generate')).toBeInTheDocument()
    expect(getByRole('dancefloor')).toBeInTheDocument()
  })

  it('Fetches data from API', async () => {
    const { getByPlaceholderText, queryByText, findByText } = render(<App />)
  
    const columnsInputField = getByPlaceholderText('Set column quantity') as HTMLInputElement
    const rowsInputField = getByPlaceholderText('Set row quantity') as HTMLInputElement

    expect(columnsInputField.value).toBe('')
    expect(rowsInputField.value).toBe('')

    expect(await findByText('Loading')).toBeVisible()
    await waitForElementToBeRemoved(() => queryByText('Loading'))

    expect(columnsInputField.value).toBe('4')
    expect(rowsInputField.value).toBe('2')
  })

  it('Has working form', () => {
    const { getByPlaceholderText } = render(<App />)
  
    const columnsInputField = getByPlaceholderText('Set column quantity') as HTMLInputElement
    const rowsInputField = getByPlaceholderText('Set row quantity') as HTMLInputElement
    
    fireEvent.change(columnsInputField, { target: { value: '20' } })
    expect(columnsInputField.value).toBe('20')

    fireEvent.change(rowsInputField, { target: { value: '10' } })
    expect(rowsInputField.value).toBe('10')
  })
})
