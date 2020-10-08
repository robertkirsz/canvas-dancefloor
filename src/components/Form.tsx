import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import DancefloorStore from 'stores/Dancefloor'
import styles from 'styles/Form.module.css'

function Form() {
  const { numberOfColumns, numberOfRows, changeNumberOfColumns, changeNumberOfRows, generateDancefloor } = useContext(
    DancefloorStore
  )

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    generateDancefloor()
  }

  const handleNumberOfColumnsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeNumberOfColumns(parseInt(event.target.value))
  }

  const handleNumberOfRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeNumberOfRows(parseInt(event.target.value))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        placeholder="Set column quantity"
        type="number"
        min="0"
        max="20"
        value={numberOfColumns === 0 ? '' : numberOfColumns}
        onChange={handleNumberOfColumnsChange}
      />

      <input
        placeholder="Set row quantity"
        type="number"
        min="0"
        max="20"
        value={numberOfRows === 0 ? '' : numberOfRows}
        onChange={handleNumberOfRowsChange}
      />

      <button disabled={!numberOfColumns || !numberOfRows}>Generate</button>
    </form>
  )
}

export default observer(Form)
