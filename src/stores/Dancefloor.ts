import { createContext } from 'react'
import { makeAutoObservable } from 'mobx'

interface DancefloorProperties {
  numberOfColumns: number
  numberOfRows: number
}

let timeout: number

class DancefloorStore {
  constructor() {
    makeAutoObservable(this)
  }

  dancefloor: DancefloorProperties = { numberOfColumns: 0, numberOfRows: 0 }

  generateDancefloor = ({ saveToServer }: { saveToServer: boolean }) => {
    this.dancefloor = { numberOfColumns: this.numberOfColumns, numberOfRows: this.numberOfRows }

    if (saveToServer) {
      clearTimeout(timeout)
      timeout = window.setTimeout(this.saveDancefloor, 1000)
    }
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

    this.generateDancefloor({ saveToServer: false })
  }

  fetchDancefloorError = (error: string) => {
    this.fetchingStatus = 'error'
    // TODO: show error message on UI
    console.error(error)
  }

  savingStatus: 'pending' | 'fulfilled' | 'error' = 'fulfilled'

  saveDancefloor = () => {
    this.savingStatus = 'pending'

    fetch('http://localhost:4000/dancefloor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numberOfColumns: this.numberOfColumns, numberOfRows: this.numberOfRows })
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText)
      })
      .then(this.saveDancefloorSuccess)
      .catch(this.saveDancefloorError)
  }

  saveDancefloorSuccess = () => {
    this.savingStatus = 'fulfilled'
  }

  saveDancefloorError = (error: string) => {
    this.savingStatus = 'error'
    // TODO: show error message on UI
    console.error(error)
  }
}

export default createContext(new DancefloorStore())
