import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import DancefloorStore from 'stores/Dancefloor'
import styles from 'styles/SubmitButton.module.css'

function SubmitButton() {
  const { numberOfColumns, numberOfRows, savingStatus } = useContext(DancefloorStore)

  const isSaving = savingStatus === 'pending'
  const isDisabled = isSaving || !numberOfColumns || !numberOfRows

  const label = isSaving ? (
    <>
      Saving<span className="spinner-dot">.</span>
      <span className="spinner-dot">.</span>
      <span className="spinner-dot">.</span>
    </>
  ) : (
    'Generate'
  )

  return (
    <button className={styles.button} disabled={isDisabled}>
      {label}
    </button>
  )
}

export default observer(SubmitButton)
