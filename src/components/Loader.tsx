import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import DancefloorStore from 'stores/Dancefloor'
import styles from 'styles/Loader.module.css'

function Loader() {
  const { fetchingStatus } = useContext(DancefloorStore)

  if (fetchingStatus === 'pending')
    return (
      <div className={styles.wrapper}>
        Loading<span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    )

  return null
}

export default observer(Loader)
