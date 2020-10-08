import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import DancefloorStore from 'stores/Dancefloor'
import styles from 'styles/FetchDancefloorSpinner.module.css'

function FetchDancefloorSpinner() {
  const { fetchingStatus } = useContext(DancefloorStore)

  if (fetchingStatus === 'pending')
    return (
      <div className={styles.wrapper}>
        Loading<span className="spinner-dot">.</span>
        <span className="spinner-dot">.</span>
        <span className="spinner-dot">.</span>
      </div>
    )

  return null
}

export default observer(FetchDancefloorSpinner)
