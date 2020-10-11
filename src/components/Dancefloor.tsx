import React, { useRef, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Canvas from 'canvas'
import DancefloorStore from 'stores/Dancefloor'
import styles from 'styles/Dancefloor.module.css'

export default observer(function Dancefloor() {
  const {
    dancefloor: { numberOfColumns, numberOfRows }
  } = useContext(DancefloorStore)

  const canvas = useRef(null)

  useEffect(() => {
    if (canvas.current) canvas.current.clear()
    else canvas.current = new Canvas(document.querySelector('[role=dancefloor]'))
    canvas.current.generate(numberOfColumns, numberOfRows)
  }, [numberOfColumns, numberOfRows])

  return <canvas role="dancefloor" className={styles.canvas} width="800" height="400" />
})
