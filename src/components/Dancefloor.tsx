import React, { useRef, useContext, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import throttle from 'lodash.throttle'
import DancefloorStore from 'stores/Dancefloor'
import getRandomColor from 'utils/getRandomColor'
import styles from 'styles/Dancefloor.module.css'


function Dancefloor() {
  const { dancefloor, generateDancefloor } = useContext(DancefloorStore)

  const canvasRef = useRef(null)

  const getCanvas = (): { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D } => {
    const canvas = canvasRef.current
    const context: CanvasRenderingContext2D = canvas.getContext('2d')

    return { canvas, context }
  }

  const drawCanvas = () => {
    const { numberOfColumns, numberOfRows } = dancefloor
    const { canvas, context } = getCanvas()

    for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        const width = (1 / numberOfColumns) * canvas.width
        const height = (1 / numberOfRows) * canvas.height
        const x = columnIndex * width
        const y = rowIndex * height

        context.fillStyle = getRandomColor()
        context.fillRect(x, y, width, height)
      }
    }
  }

  const clearCanvas = () => {
    const { canvas, context } = getCanvas()

    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  useEffect(() => {
    if (dancefloor.numberOfColumns && dancefloor.numberOfRows) {
      clearCanvas()
      drawCanvas()
    }
  }, [dancefloor])

  const handleMouseMove = () => {
    generateDancefloor({ saveToServer: false })
  }

  const throttledMouseMove = useCallback(throttle(handleMouseMove, 300), [])

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      width="800"
      height="400"
      onMouseMove={throttledMouseMove}
      onTouchMove={throttledMouseMove}
    />
  )
}

export default observer(Dancefloor)
