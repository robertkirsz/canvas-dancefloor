import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import DancefloorStore from 'stores/Dancefloor'
import styles from 'styles/SubmitButton.module.css'

function SubmitButton() {
  const { numberOfColumns, numberOfRows } = useContext(DancefloorStore)
  const isDisabled = !numberOfColumns || !numberOfRows

  return (
    <button className={styles.button} disabled={isDisabled}>
      Generate
    </button>
  )
}

export default observer(SubmitButton)
