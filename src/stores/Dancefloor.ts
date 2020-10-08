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
}

export default createContext(new DancefloorStore())
