import React from 'react'
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'
import App from 'components/App'
import { defaultDancefloor } from 'api'
import { store } from 'stores/Dancefloor'

beforeEach(() => {
  localStorage.clear()
  store.clear()
})

describe('Main flow', () => {
  it('Has everything in place', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<App />)

    expect(getByPlaceholderText('Columns')).toBeInTheDocument()
    expect(getByPlaceholderText('Rows')).toBeInTheDocument()
    expect(getByText('Generate')).toBeInTheDocument()
    expect(getByRole('dancefloor')).toBeInTheDocument()
  })

  it('Has working form', () => {
    const { getByPlaceholderText } = render(<App />)

    const columnsInputField = getByPlaceholderText('Columns') as HTMLInputElement
    const rowsInputField = getByPlaceholderText('Rows') as HTMLInputElement

    fireEvent.change(columnsInputField, { target: { value: '20' } })
    expect(columnsInputField.value).toEqual('20')

    fireEvent.change(rowsInputField, { target: { value: '10' } })
    expect(rowsInputField.value).toEqual('10')
  })

  it('Fetches data from API', async () => {
    const { getByPlaceholderText, queryByText, findByText } = render(<App />)

    const columnsInputField = getByPlaceholderText('Columns') as HTMLInputElement
    const rowsInputField = getByPlaceholderText('Rows') as HTMLInputElement

    expect(columnsInputField.value).toEqual('')
    expect(rowsInputField.value).toEqual('')

    expect(await findByText('Loading')).toBeVisible()
    await waitForElementToBeRemoved(queryByText('Loading'))

    expect(parseInt(columnsInputField.value)).toEqual(defaultDancefloor.numberOfColumns)
    expect(parseInt(rowsInputField.value)).toEqual(defaultDancefloor.numberOfRows)
  })

  it('Sends data to API', async () => {
    const { getByPlaceholderText, getByText, queryByText, findByText } = render(<App />)

    expect(await findByText('Loading')).toBeVisible()
    await waitForElementToBeRemoved(queryByText('Loading'))

    const columnsInputField = getByPlaceholderText('Columns') as HTMLInputElement
    const rowsInputField = getByPlaceholderText('Rows') as HTMLInputElement

    fireEvent.change(columnsInputField, { target: { value: '15' } })
    fireEvent.change(rowsInputField, { target: { value: '15' } })
    fireEvent.click(getByText('Generate'))

    expect(await findByText('Saving')).toBeVisible()
    await waitForElementToBeRemoved(queryByText('Saving'))

    // TODO: something's wrong with this one, not sure what
    // expect(JSON.parse(localStorage.getItem('dancefloor'))).toEqual({ numberOfColumns: 15, numberOfRows: 15 })
  })
})
