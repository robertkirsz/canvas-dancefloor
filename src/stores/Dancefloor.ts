import { createContext } from 'react'
import { makeAutoObservable } from 'mobx'

interface DancefloorProperties {
  numberOfColumns: number
  numberOfRows: number
}

class DancefloorStore {
  constructor() {
    makeAutoObservable(this)
  }

  dancefloor: DancefloorProperties = { numberOfColumns: 0, numberOfRows: 0 }

  generateDancefloor = () => {
    this.dancefloor = { numberOfColumns: this.numberOfColumns, numberOfRows: this.numberOfRows }
  }

  numberOfColumns: number = 0

  changeNumberOfColumns = (value: number) => {
    this.numberOfColumns = value
  }

  numberOfRows: number = 0

  changeNumberOfRows = (value: number) => {
    this.numberOfRows = value
  }

  fetchingStatus: 'pending' | 'fulfilled' | 'error' = 'pending'

  fetchDancefloor = () => {
    this.fetchingStatus = 'pending'

    fetch('http://localhost:4000/dancefloor')
      .then(response => {
        if (!response.ok) throw Error(response.statusText)
        return response.json()
      })
      .then(this.fetchDancefloorSuccess)
      .catch(this.fetchDancefloorError)
  }

  fetchDancefloorSuccess = (data: DancefloorProperties) => {
    this.numberOfColumns = data.numberOfColumns
    this.numberOfRows = data.numberOfRows
    this.fetchingStatus = 'fulfilled'
  }

  fetchDancefloorError = (error: string) => {
    this.fetchingStatus = 'error'
    // TODO: show error message on UI
    console.error(error)
  }
}

export default createContext(new DancefloorStore())
