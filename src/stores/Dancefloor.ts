import { createContext } from 'react'
import { makeAutoObservable } from 'mobx'
import api from 'api'

export interface DancefloorProperties {
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
      timeout = window.setTimeout(this.saveDancefloor, 500)
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

  fetchingStatus: 'pending' | 'fulfilled' = 'pending'

  fetchDancefloor = () => {
    this.fetchingStatus = 'pending'

    api.fetchDancefloor().then(this.fetchDancefloorSuccess)
  }

  fetchDancefloorSuccess = (data: DancefloorProperties) => {
    this.numberOfColumns = data.numberOfColumns
    this.numberOfRows = data.numberOfRows
    this.fetchingStatus = 'fulfilled'

    this.generateDancefloor({ saveToServer: false })
  }

  savingStatus: 'pending' | 'fulfilled' = 'fulfilled'

  saveDancefloor = () => {
    this.savingStatus = 'pending'

    api
      .saveDancefloor({ numberOfColumns: this.numberOfColumns, numberOfRows: this.numberOfRows })
      .then(this.saveDancefloorSuccess)
  }

  saveDancefloorSuccess = () => {
    this.savingStatus = 'fulfilled'
  }

  clear = () => {
    this.numberOfColumns = 0
    this.numberOfRows = 0
    this.dancefloor = { numberOfColumns: 0, numberOfRows: 0 }
    this.fetchingStatus = 'pending'
    this.savingStatus = 'fulfilled'
  }
}

export const store = new DancefloorStore()

export default createContext(store)
