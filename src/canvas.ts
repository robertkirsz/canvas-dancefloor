import getRandomPastelColor from 'utils/getRandomPastelColor'

export default class Canvas {
  constructor(element: HTMLCanvasElement) {
    this.element = element
    this.context = element.getContext('2d')
  }

  element: HTMLCanvasElement
  context: CanvasRenderingContext2D
  numberOfColumns = 0
  numberOfRows = 0
  activeColumn: number = null
  activeRow: number = null

  private drawRectangle(columnIndex: number, rowIndex: number) {
    const width = (1 / this.numberOfColumns) * this.element.width
    const height = (1 / this.numberOfRows) * this.element.height
    const x = columnIndex * width
    const y = rowIndex * height

    this.context.fillStyle = getRandomPastelColor()
    this.context.fillRect(x, y, width, height)
  }

  private handleMove(target: HTMLCanvasElement, clientX: number, clientY: number) {
    const { left, top, width, height } = target.getBoundingClientRect()
    const rectangleWidth = (1 / this.numberOfColumns) * width
    const rectangleHeight = (1 / this.numberOfRows) * height
    const activeColumn = Math.floor((clientX - left) / rectangleWidth)
    const activeRow = Math.floor((clientY - top) / rectangleHeight)

    if (activeColumn !== this.activeColumn || activeRow !== this.activeRow) {
      this.activeColumn = activeColumn
      this.activeRow = activeRow
      this.drawRectangle(activeColumn, activeRow)
    }
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.handleMove(event.target as HTMLCanvasElement, event.clientX, event.clientY)
  }

  private handleTouchMove = (event: TouchEvent) => {
    this.handleMove(event.target as HTMLCanvasElement, event.touches[0].clientX, event.touches[0].clientY)
  }

  public generate(numberOfColumns: number, numberOfRows: number) {
    this.numberOfColumns = numberOfColumns
    this.numberOfRows = numberOfRows
    this.element.addEventListener('mousemove', this.handleMouseMove)
    this.element.addEventListener('touchmove', this.handleTouchMove)

    for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
        this.drawRectangle(columnIndex, rowIndex)
      }
    }
  }

  public clear() {
    this.element.removeEventListener('mousemove', this.handleMouseMove)
    this.element.removeEventListener('touchmove', this.handleTouchMove)
    this.context.clearRect(0, 0, this.element.width, this.element.height)
  }
}
