import { createContext } from 'react'
import { makeAutoObservable } from 'mobx'

class DancefloorStore {
  constructor() {
    makeAutoObservable(this)
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
