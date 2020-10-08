import React, { useState, useRef, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import DancefloorStore from 'stores/Dancefloor'
import getRandomPastelColor from 'utils/getRandomPastelColor'
import styles from 'styles/Dancefloor.module.css'

function Dancefloor() {
  const { dancefloor, generateDancefloor } = useContext(DancefloorStore)

  const canvasRef = useRef(null)

  const getCanvas = (): { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D } => {
    const canvas = canvasRef.current
    const context: CanvasRenderingContext2D = canvas.getContext('2d')

    return { canvas, context }
  }

  const drawRectangle = (columnIndex: number, rowIndex: number) => {
    const { numberOfColumns, numberOfRows } = dancefloor
    const { canvas, context } = getCanvas()

    const width = (1 / numberOfColumns) * canvas.width
    const height = (1 / numberOfRows) * canvas.height
    const x = columnIndex * width
    const y = rowIndex * height

    context.fillStyle = getRandomPastelColor()
    context.fillRect(x, y, width, height)
  }

  const drawCanvas = () => {
    const { numberOfColumns, numberOfRows } = dancefloor

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        drawRectangle(columnIndex, rowIndex)
      }
    }
  }

  useEffect(() => {
    if (dancefloor.numberOfColumns && dancefloor.numberOfRows) drawCanvas()
  }, [dancefloor])

  const [columnIndex, setColumnIndex] = useState(null)
  const [rowIndex, setRowIndex] = useState(null)

  useEffect(() => {
    if (columnIndex >= 0 && rowIndex >= 0) {
      drawRectangle(columnIndex, rowIndex)
    }
  }, [columnIndex, rowIndex])

  // TODO: fix any (I also think I should have separate handlers for mouse and touch events)
  const handleMouseMove = (event: any): void => {
    const { numberOfColumns, numberOfRows } = dancefloor
    const { left, top, width, height } = event.target.getBoundingClientRect()
    const squareWidth = (1 / numberOfColumns) * width
    const squareHeight = (1 / numberOfRows) * height

    let x
    let y

    if (event.touches) {
      x = Math.floor((event.touches[0].clientX - left) / squareWidth)
      y = Math.floor((event.touches[0].clientY - top) / squareHeight)
    }

    if (event.clientX && event.clientY) {
      x = Math.floor((event.clientX - left) / squareWidth)
      y = Math.floor((event.clientY - top) / squareHeight)
    }
    
    if (x !== columnIndex) setColumnIndex(x)
    if (y !== rowIndex) setRowIndex(y)
  }

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      width="800"
      height="400"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    />
  )
}

export default observer(Dancefloor)
